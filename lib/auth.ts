import { betterAuth, type SecondaryStorage } from 'better-auth'
import { Pool } from 'pg'
import ms from 'ms'
import { username, anonymous, magicLink, emailOTP } from 'better-auth/plugins'
import Redis from 'ioredis'
import { sendEmail } from '@/server/utils/email'
import { Snowflake } from '@/server/utils/snowflake'

// 机器 ID 默认为 1。可以从环境变量中获取机器 ID
const snowflake = new Snowflake(Number(process.env.MACHINE_ID || 1))

// Redis 二级存储配置（仅当有配置时启用）
let secondaryStorage: SecondaryStorage | null = null
if (process.env.REDIS_URL) {
    const redis = new Redis(process.env.REDIS_URL)
    secondaryStorage = {
        get: async (key: string) => {
            const value = await redis.get(key)
            return value ?? null
        },
        set: async (key: string, value: string, ttl?: number) => {
            if (ttl) {
                await redis.set(key, value, 'EX', ttl)
            } else {
                await redis.set(key, value)
            }
        },
        delete: async (key: string) => {
            await redis.del(key)
        },
    }
}

export const auth = betterAuth({
    database: new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.DATABASE_SSL ? { rejectUnauthorized: false } : false, // 是否启用 SSL
        max: 20, // 连接池大小
        idleTimeoutMillis: ms('120s'), //  连接池空闲超时时间
        connectionTimeoutMillis: ms('60s'), // 连接超时时间
        statement_timeout: ms('60s'), // 查询超时时间
        query_timeout: ms('60s'), // 查询超时时间
        lock_timeout: ms('60s'), // 锁超时时间
        idle_in_transaction_session_timeout: ms('60s'), // 事务空闲超时时间
        application_name: 'RssZero', // 应用名称
        client_encoding: 'UTF8', // 客户端编码
    }),

    advanced: {
        database: {  // 自定义 ID 生成逻辑
            // 通过雪花算法 生成一个 16 进制的 ID
            generateId: (options) => snowflake.generateId(),
        },
    },
    rateLimit: {
        window: 60, // time window in seconds
        max: 100, // max requests in the window
        storage: secondaryStorage ? 'secondary-storage' : 'memory', // 如果配置了 Redis，则使用二级存储；否则使用内存存储
        customRules: {
            '/sign-in/email': {
                window: 60,
                max: 3,
            },
        },
    },
    emailAndPassword: {
        enabled: true,
        minPasswordLength: 6,
        maxPasswordLength: 128,
        sendResetPassword: async ({ user, url, token }, request) => {
            await sendEmail({
                to: user.email,
                subject: '重置您的密码',
                text: `点击链接重置您的密码：${url}`,
            })
        },
    },
    emailVerification: {
        sendVerificationEmail: async ({ user, url, token }, request) => {
            await sendEmail({
                to: user.email,
                subject: '验证你的邮箱地址',
                text: `点击链接验证你的邮箱：${url}`,
            })
        },
    },

    plugins: [
        username({
            minUsernameLength: 3, // 最小用户名长度
            maxUsernameLength: 36, // 最大用户名长度
            usernameValidator: (name) => /^[a-zA-Z0-9_-]+$/.test(name), // 用户名只能包含字母、数字、下划线、连字符
        }), // 支持用户名登录
        anonymous({ // 支持匿名登录
            onLinkAccount: async ({ anonymousUser, newUser }) => {
                // 执行操作，如将购物车项目从匿名用户移动到新用户
                // console.log('Linking anonymous user to new user:', anonymousUser, newUser)
                // newUser.session = anonymousUser.session // 例如，保持会话

            },
        }),
        magicLink({ // 支持魔法链接登录
            sendMagicLink: async ({ email, token, url }, request) => {
                await sendEmail({
                    to: email,
                    subject: '您的登录链接',
                    text: `点击此链接登录：${url}`,
                })
            },
        }),
        emailOTP({ // 支持电子邮件 OTP 登录
            async sendVerificationOTP({ email, otp, type }) {
                await sendEmail({
                    to: email,
                    subject: '您的一次性验证码',
                    text: `您的验证码是：${otp}`,
                })
            },
        }),
    ],
    ...secondaryStorage ? { secondaryStorage } : {},
})
