import { Readable } from 'stream'
import { defineEventHandler, readBody, sendStream, createError } from 'h3'
import { parseStringPromise, Builder } from 'xml2js'
import { dataSource } from '../../database'
import { Feed } from '../../entities/feed'
import { getUserSession } from '../../utils/get-user-session'

function feedsToOpml(feeds: Feed[]) {
    const opml = {
        opml: {
            $: { version: '2.0' },
            head: [{ title: 'RSS Zero Subscriptions' }],
            body: [
                {
                    outline: feeds.map((feed) => ({
                        $: {
                            text: feed.title || feed.url,
                            title: feed.title || feed.url,
                            type: 'rss',
                            xmlUrl: feed.url,
                            htmlUrl: feed.siteUrl || '',
                            category: feed.category || '',
                        },
                    })),
                },
            ],
        },
    }
    const builder = new Builder({ headless: true })
    return builder.buildObject(opml)
}

function parseOpmlFeeds(opmlObj: any): { title: string, url: string, siteUrl?: string, category?: string }[] {
    const outlines = opmlObj?.opml?.body?.[0]?.outline || []
    // 兼容 outline 嵌套
    const flatten = (arr: any[]): any[] => arr.flatMap((item) => (Array.isArray(item.outline)
        ? flatten(item.outline)
        : [item]),
    )
    return flatten(outlines)
        .map((item: any) => item.$)
        .filter((o: any) => o && o.xmlUrl)
        .map((o: any) => ({
            title: o.title || o.text || o.xmlUrl,
            url: o.xmlUrl,
            siteUrl: o.htmlUrl,
            category: o.category,
        }))
}

export default defineEventHandler(async (event) => {
    const { userId } = await getUserSession(event)
    const repo = dataSource.getRepository(Feed)

    if (event.method === 'GET') {
        // 导出 OPML
        const feeds = await repo.find({ where: { userId } })
        const opmlXml = feedsToOpml(feeds)
        event.node.res.setHeader('Content-Type', 'text/xml; charset=utf-8')
        event.node.res.setHeader('Content-Disposition', 'attachment; filename="subscriptions.opml"')
        return sendStream(event, Readable.from([opmlXml]))
    }

    if (event.method === 'POST') {
        // 导入 OPML
        const body = await readBody(event)
        let xml = ''
        if (typeof body === 'string') {
            xml = body
        } else if (body?.opml) {
            // multipart/form-data
            xml = body.opml instanceof Buffer ? body.opml.toString('utf-8') : body.opml
        } else {
            throw createError({ statusCode: 400, statusMessage: '未检测到 OPML 文件' })
        }
        let opmlObj
        try {
            opmlObj = await parseStringPromise(xml)
        } catch {
            throw createError({ statusCode: 400, statusMessage: 'OPML 解析失败' })
        }
        const feeds = parseOpmlFeeds(opmlObj)
        if (!feeds.length) {
            throw createError({ statusCode: 400, statusMessage: '未检测到订阅源' })
        }
        // 去重，仅导入当前用户未订阅的
        const existFeeds = await repo.find({ where: { userId } })
        const existUrls = new Set(existFeeds.map((f) => f.url))
        const toImport = feeds.filter((f) => !existUrls.has(f.url))
        if (!toImport.length) {
            return { imported: 0, message: '无新订阅源可导入' }
        }
        const newFeeds = toImport.map((f) => repo.create({
            url: f.url,
            title: f.title,
            siteUrl: f.siteUrl,
            category: f.category,
            userId,
        }))
        await repo.save(newFeeds)
        return { imported: newFeeds.length }
    }

    throw createError({ statusCode: 405, statusMessage: '不支持的请求方法' })
})
