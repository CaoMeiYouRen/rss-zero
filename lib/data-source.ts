import { DataSource } from 'typeorm'
import { entities, migrations } from '@hedystia/better-auth-typeorm'

export const dataSource = new DataSource({
    type: 'postgres',
    // host: process.env.DB_HOST || 'localhost',
    // port: Number(process.env.DB_PORT) || 5432,
    // username: process.env.DB_USER || 'your_username',
    // password: process.env.DB_PASS || 'your_password',
    // database: process.env.DB_NAME || 'your_database',
    url: process.env.DATABASE_URL, // 如果使用环境变量配置数据库连接
    entities: [...entities],
    migrations: [...migrations],
    migrationsRun: true,
})

// 初始化连接（在 app 启动时调用）
await dataSource.initialize()
