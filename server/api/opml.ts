import { defineEventHandler, readRawBody } from 'h3'
import { parseStringPromise, Builder } from 'xml2js'
import { dataSource } from '../database'
import { Subscription } from '../entities/subscription'

export default defineEventHandler(async (event) => {
    const method = event.node.req.method
    const userId = event.context.auth?.user?.id || 'anonymous'
    const repo = dataSource.getRepository(Subscription)

    if (method === 'POST') {
        // 导入OPML
        const raw = await readRawBody(event)
        if (!raw) {
            return { error: 'No OPML data' }
        }
        const opml = await parseStringPromise(raw.toString())
        const outlines = opml.opml.body[0].outline || []
        let count = 0
        for (const item of outlines) {
            const url = item['$']?.xmlUrl
            const title = item['$']?.title || item['$']?.text || ''
            if (!url) {
                continue
            }
            const exists = await repo.findOne({ where: { userId, url } })
            if (!exists) {
                const sub = repo.create({
                    url,
                    title,
                    userId,
                    createdAt: new Date(),
                })
                await repo.save(sub)
                count++
            }
        }
        return { success: true, imported: count }
    }
    if (method === 'GET') {
        // 导出OPML
        const subs = await repo.find({ where: { userId } })
        const builder = new Builder()
        const opmlObj = {
            opml: {
                $: { version: '1.0' },
                head: [{ title: 'RSS Zero Subscriptions' }],
                body: [{
                    outline: subs.map((r) => ({
                        $: {
                            text: r.title || r.url,
                            title: r.title || r.url,
                            type: 'rss',
                            xmlUrl: r.url,
                        },
                    })),
                }],
            },
        }
        const xml = builder.buildObject(opmlObj)
        event.node.res.setHeader('Content-Type', 'text/xml')
        return xml
    }
    return { error: 'Method not allowed' }
})
