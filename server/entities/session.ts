import { Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('session')
export class Session {
    @Column('varchar', { primary: true, length: 36 })
    id: string

    @Column('timestamp with time zone', { nullable: false })
    expiresAt: Date

    @Column('text', { nullable: false })
    token: string

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: Date

    @Column('text', { nullable: true })
    ipAddress: string

    @Column('text', { nullable: true })
    userAgent: string

    @Column('varchar', { length: 36, nullable: false })
    userId: string
}
