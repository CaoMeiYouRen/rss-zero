import { defineEventHandler, readBody, getQuery } from 'h3'
import { dataSource } from '../../database'
import { Feed } from '../../entities/feed'
import { getUserSession } from '../../utils/get-user-session'

export default defineEventHandler(async (event) => {
    const { userId } = await getUserSession(event)
    const repo = dataSource.getRepository(Feed)
    if (event.method === 'GET') {
        // 获取当前用户所有订阅
        const feeds = await repo.find({ where: { userId } })
        return feeds
    }
    if (event.method === 'POST') {
        const body = await readBody(event)
        const { url, title, siteUrl, description, imageUrl, category, tags } = body
        if (!url) {
            return { error: 'URL不能为空' }
        }
        // 检查是否已存在
        const exist = await repo.findOne({ where: { url, userId } })
        if (exist) {
            return { error: '该订阅已存在' }
        }
        const feed = repo.create({
            url,
            title: title || url,
            siteUrl,
            description,
            imageUrl,
            category,
            tags,
            userId,
        })
        await repo.save(feed)
        return feed
    }
    if (event.method === 'DELETE') {
        const { id } = getQuery(event)
        if (!id) {
            return { error: '缺少订阅ID' }
        }
        // id 需为 string 或 number，避免 QueryValue 类型错误
        const feed = await repo.findOne({ where: { id: String(id), userId } })
        if (!feed) {
            return { error: '无权限或订阅不存在' }
        }
        await repo.delete({ id: String(id), userId })
        return { success: true }
    }
    return { error: '不支持的请求方法' }
})
