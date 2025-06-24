export function validateUrl(url: string): boolean {
    try {
        const u = new URL(url)
        return u.protocol === 'http:' || u.protocol === 'https:'
    } catch {
        return false
    }
}

// 判断是否为合法的用户名
// 用户名只能包含字母、数字、下划线和连字符，长度在 3 到 36 个字符之间
export function isUsername(str: string): boolean {
    return /^[a-zA-Z0-9_-]{3,36}$/.test(str)
}

// 判断是否为邮箱
export function isEmail(str: string) {
    return /.+@.+\..+/.test(str)
}

// 判断是否为手机号（中国大陆 11 位手机号）
export function isPhone(str: string) {
    return /^1[3-9]\d{9}$/.test(str)
}

// 用户名验证函数
// 返回 true 表示用户名符合规范，false 表示不符合规范
// 规范：只能包含字母、数字、下划线和连字符，长度在 3 到 36 个字符之间
// 禁止使用邮箱格式和手机号格式
export function usernameValidator(name: string): boolean {
    if (!isUsername(name)) { // 用户名不符合规范
        return false
    }
    if (isEmail(name)) {  // 禁止邮箱格式
        return false
    }
    if (isPhone(name)) { // 禁止手机号格式
        return false
    }
    return true
}
