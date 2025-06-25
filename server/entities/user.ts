import { Column, Entity } from 'typeorm'
import { BaseEntity } from './base-entity'

@Entity('user')
export class User extends BaseEntity {

    /**
     * 用户选择的显示名称
     */
    @Column('text', { nullable: false })
    name: string

    /**
     * 用户邮箱地址
    */
    @Column('varchar', { length: 255, nullable: false })
    email: string

    /**
     * 用户邮箱是否已验证
     */
    @Column('boolean', { default: false })
    emailVerified: boolean

    /**
     * 用户头像
     */
    @Column('text', { nullable: true })
    image: string

    /**
     * 用户名
     */
    @Column('varchar', { length: 128, nullable: true })
    username: string

    /**
     * 非规范化用户名
     */
    @Column('varchar', { length: 128, nullable: true })
    displayUsername: string

    /**
     * 是否为匿名用户
     */
    @Column('boolean', { default: false })
    isAnonymous: boolean

    /**
     * 用户手机号
     */
    @Column('varchar', { length: 64, nullable: true })
    phoneNumber: string

    /**
     * 用户手机号是否已验证
     */
    @Column('boolean', { default: false })
    phoneNumberVerified: boolean

}
