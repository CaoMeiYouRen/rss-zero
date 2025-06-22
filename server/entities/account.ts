import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm'

@Entity('account')
export class Account {
    @Column('varchar', { primary: true, length: 36 })
    id: string

    @Column('text', { nullable: false })
    accountId: string

    @Column('text', { nullable: false })
    providerId: string

    @Column('varchar', { length: 36, nullable: false })
    userId: string

    @Column('text', { nullable: true })
    accessToken: string

    @Column('text', { nullable: true })
    refreshToken: string

    @Column('text', { nullable: true })
    idToken: string

    @Column('timestamp with time zone', { nullable: true })
    accessTokenExpiresAt: Date

    @Column('timestamp with time zone', { nullable: true })
    refreshTokenExpiresAt: Date

    @Column('text', { nullable: true })
    scope: string

    @Column('text', { nullable: true })
    password: string

    @CreateDateColumn({ type: 'timestamp with time zone', nullable: true })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp with time zone', nullable: true })
    updatedAt: Date
}
