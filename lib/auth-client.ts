import { createAuthClient } from 'better-auth/vue'
import { usernameClient, magicLinkClient, emailOTPClient } from 'better-auth/client/plugins'

export const authClient = createAuthClient({
    /** 服务器的基础 URL（如果您使用相同域名，则可选） */
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    plugins: [
        usernameClient(),
        magicLinkClient(),
        emailOTPClient(),
    ],
})
