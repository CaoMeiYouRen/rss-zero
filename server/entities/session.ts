import { Column, Entity } from 'typeorm'

@Entity('session')
export class Session {
    @Column('varchar', { primary: true, name: 'id', length: 36 })
    id: string

    @Column('timestamp with time zone', { name: 'expiresAt', nullable: false })
    expiresAt: Date

    @Column('text', { name: 'token', nullable: false })
    token: string

    @Column('timestamp with time zone', { name: 'createdAt', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @Column('timestamp with time zone', { name: 'updatedAt', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date

    @Column('text', { name: 'ipAddress', nullable: true })
    ipAddress: string

    @Column('text', { name: 'userAgent', nullable: true })
    userAgent: string

    @Column('varchar', { name: 'userId', length: 36, nullable: false })
    userId: string
}
