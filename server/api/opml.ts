import { defineEventHandler, readBody, sendStream, getQuery } from 'h3'
import { Pool } from 'pg'
import { parseStringPromise, Builder } from 'xml2js'

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
})

// OPML导入/导出API
export default defineEventHandler(async (event) => {
    const method = event.node.req.method
    const userId = event.context.auth?.user?.id || 'anonymous'
    if (method === 'POST') {
        // 导入OPML
        const body = await readBody(event)
        if (!body || !body.opml) {
            return { error: 'No OPML data' }
        }
        const opml = await parseStringPromise(body.opml)
        const outlines = opml.opml.body[0].outline || []
        let count = 0
        for (const item of outlines) {
            const url = item['$']?.xmlUrl
            const title = item['$']?.title || item['$']?.text || ''
            if (!url) {
                continue
            }
            // 去重
            const exists = await pool.query('SELECT 1 FROM subscriptions WHERE user_id = $1 AND url = $2', [userId, url])
            if (!exists.rowCount) {
                await pool.query('INSERT INTO subscriptions (url, title, user_id, created_at) VALUES ($1, $2, $3, NOW())', [url, title, userId])
                count++
            }
        }
        return { success: true, imported: count }
    }
    if (method === 'GET') {
        // 导出OPML
        const { rows } = await pool.query('SELECT * FROM subscriptions WHERE user_id = $1', [userId])
        const builder = new Builder()
        const opmlObj = {
            opml: {
                $: { version: '1.0' },
                head: [{ title: 'RSS Zero Subscriptions' }],
                body: [{
                    outline: rows.map((r) => ({
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
