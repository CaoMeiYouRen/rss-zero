import { Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('verification')
export class Verification {
    @Column('varchar', { primary: true, name: 'id', length: 36 })
    id: string

    @Column('text', { name: 'identifier', nullable: false })
    identifier: string

    @Column('text', { name: 'value', nullable: false })
    value: string

    @Column('timestamp with time zone', { name: 'expiresAt', nullable: false })
    expiresAt: Date

    @CreateDateColumn({ type: 'timestamp with time zone', nullable: true })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp with time zone', nullable: true })
    updatedAt: Date
}
