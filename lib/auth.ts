import { betterAuth, type SecondaryStorage } from 'better-auth'
import { username, anonymous, magicLink, emailOTP } from 'better-auth/plugins'
import Redis from 'ioredis'
import { typeormAdapter } from '../server/database/typeorm-adapter'
import { sendEmail } from '../server/utils/email'
import { snowflake } from '../server/utils/snowflake'
import { dataSource } from '../server/database'

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
    // 数据库适配器
    // 使用 TypeORM 适配器连接到 PostgreSQL 数据库
    database: typeormAdapter(dataSource),
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
        sendOnSignUp: process.env.NODE_ENV === 'production', // 注册时发送验证邮件
        autoSignInAfterVerification: true, // 验证后自动登录
        // 发送验证邮件
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
            emailDomainName: process.env.ANONYMOUS_EMAIL_DOMAIN_NAME || 'anonymous.com', // 匿名用户的默认电子邮件域名
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
