import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm'

@Entity('account')
export class Account {
    @Column('varchar', { primary: true, name: 'id', length: 36 })
    id: string

    @Column('text', { name: 'accountId', nullable: false })
    accountId: string

    @Column('text', { name: 'providerId', nullable: false })
    providerId: string

    @Column('varchar', { name: 'userId', length: 36, nullable: false })
    userId: string

    @Column('text', { name: 'accessToken', nullable: true })
    accessToken: string

    @Column('text', { name: 'refreshToken', nullable: true })
    refreshToken: string

    @Column('text', { name: 'idToken', nullable: true })
    idToken: string

    @Column('timestamp with time zone', { name: 'accessTokenExpiresAt', nullable: true })
    accessTokenExpiresAt: Date

    @Column('timestamp with time zone', { name: 'refreshTokenExpiresAt', nullable: true })
    refreshTokenExpiresAt: Date

    @Column('text', { name: 'scope', nullable: true })
    scope: string

    @Column('text', { name: 'password', nullable: true })
    password: string

    @CreateDateColumn({ type: 'timestamp with time zone', nullable: true })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp with time zone', nullable: true })
    updatedAt: Date
}
