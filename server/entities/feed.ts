import { Entity, Column, ManyToOne } from 'typeorm'
import { BaseEntity } from './base-entity'
import { User } from './user'

@Entity('feed')
export class Feed extends BaseEntity {
    /**
     * 订阅源名称
     */
    @Column('varchar', { length: 255, nullable: false })
    title: string

    /**
     * RSS 源地址，每个用户唯一
     */
    @Column('varchar', { length: 1024, nullable: false })
    url: string

    /**
     * 订阅源主页（可选）
     */
    @Column('varchar', { length: 1024, nullable: true })
    siteUrl?: string

    /**
     * 简介（可选）
     */
    @Column('text', { nullable: true })
    description?: string

    /**
     * 封面/图标地址（可选）
     */
    @Column('varchar', { length: 1024, nullable: true })
    imageUrl?: string

    /**
     * 分类/分组（可选）
     */
    @Column('varchar', { length: 255, nullable: true })
    category?: string

    /**
     * 标签（可选）
     */
    @Column('simple-array', { nullable: true })
    tags?: string[]

    /**
     * 源最近更新时间（用于活跃度统计）
     */
    @Column('timestamp with time zone', { nullable: true })
    lastUpdate?: Date

    /**
     * 未读文章数（可选）
     */
    @Column('integer', { nullable: true, default: 0 })
    unreadCount?: number

    /**
     * 是否活跃/启用（可选）
     */
    @Column('boolean', { default: true })
    isActive?: boolean

    /**
     * 用户 ID，关联到 User 实体
     */
    @Column('varchar', { length: 36, nullable: true })
    userId: string

    @ManyToOne(() => User)
    user: User
}
