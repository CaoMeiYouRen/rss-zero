import { defineEventHandler, readBody, getQuery } from 'h3'
import { dataSource } from '../database'
import { Subscription } from '../entities/subscription'

export default defineEventHandler(async (event) => {
    const method = event.node.req.method
    const userId = event.context.auth?.user?.id || 'anonymous'
    const repo = dataSource.getRepository(Subscription)

    if (method === 'GET') {
        // 获取所有订阅源
        const subs = await repo.find({
            where: { userId },
            order: { createdAt: 'DESC' },
        })
        return subs
    }
    if (method === 'POST') {
        const body = await readBody(event)
        const { url, title } = body
        if (!url) {
            return { error: 'URL required' }
        }
        // 简单去重
        const exists = await repo.findOne({ where: { userId, url } })
        if (exists) {
            return { error: 'Already exists' }
        }
        const sub = repo.create({
            url,
            title: title || '',
            userId,
            createdAt: new Date(),
        })
        await repo.save(sub)
        return sub
    }
    if (method === 'DELETE') {
        const { id } = getQuery(event)
        if (!id) {
            return { error: 'id required' }
        }
        // Ensure id is string or number
        const deleteId = String(id)
        await repo.delete({ id: deleteId, userId })
        return { success: true }
    }
    return { error: 'Method not allowed' }
})
