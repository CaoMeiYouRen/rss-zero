import { defineEventHandler, readBody, getQuery } from 'h3'
import { Pool } from 'pg'

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
})

// 订阅源表结构: id, url, title, user_id, created_at

export default defineEventHandler(async (event) => {
    const method = event.node.req.method
    const userId = event.context.auth?.user?.id || 'anonymous'
    if (method === 'GET') {
        // 获取所有订阅源
        const { rows } = await pool.query('SELECT * FROM subscriptions WHERE user_id = $1 ORDER BY created_at DESC', [userId])
        return rows
    }
    if (method === 'POST') {
        const body = await readBody(event)
        const { url, title } = body
        if (!url) {
return { error: 'URL required' }
}
        // 简单去重
        const exists = await pool.query('SELECT 1 FROM subscriptions WHERE user_id = $1 AND url = $2', [userId, url])
        if (exists.rowCount) {
return { error: 'Already exists' }
}
        const { rows } = await pool.query('INSERT INTO subscriptions (url, title, user_id, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *', [url, title || '', userId])
        return rows[0]
    }
    if (method === 'DELETE') {
        const { id } = getQuery(event)
        if (!id) {
return { error: 'id required' }
}
        await pool.query('DELETE FROM subscriptions WHERE id = $1 AND user_id = $2', [id, userId])
        return { success: true }
    }
    return { error: 'Method not allowed' }
})
