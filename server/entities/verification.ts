import { Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('verification')
export class Verification {
    @Column('varchar', { primary: true, length: 36 })
    id: string

    @Column('text', { nullable: false })
    identifier: string

    @Column('text', { nullable: false })
    value: string

    @Column('timestamp with time zone', { nullable: false })
    expiresAt: Date

    @CreateDateColumn({ type: 'timestamp with time zone', nullable: true })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp with time zone', nullable: true })
    updatedAt: Date
}
