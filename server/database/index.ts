import { DataSource } from 'typeorm'
import ms from 'ms'
import { Account } from '../entities/account'
import { Session } from '../entities/session'
import { User } from '../entities/user'
import { Verification } from '../entities/verification'
import { SnakeCaseNamingStrategy } from './naming-strategy'

const entities = [Account, Session, User, Verification]

export const dataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL, // 如果使用环境变量配置数据库连接
    entities: [...entities],
    // migrations: [],
    // migrationsRun: true,
    synchronize: process.env.NODE_ENV !== 'production',
    logging: process.env.NODE_ENV === 'development',
    ssl: false,
    extra: {
        max: 20,
        connectionTimeoutMillis: ms('60s'), // 连接超时设置为 60 秒
    },
    // 所有表（或集合）加的前缀
    entityPrefix: process.env.ENTITY_PREFIX || 'rss_zero_',
    // 表、字段命名策略，改为 snake_case
    namingStrategy: new SnakeCaseNamingStrategy(),
})

// 初始化连接（在 app 启动时调用）
await dataSource.initialize()
