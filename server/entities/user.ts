import { Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('user')
export class User {
    @Column('varchar', { primary: true, length: 36 })
    id: string

    @Column('text', { nullable: false })
    name: string

    @Column('varchar', { length: 255, nullable: false })
    email: string

    @Column('boolean', { default: false })
    emailVerified: boolean

    @Column('text', { nullable: true })
    image: string

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: Date
}
