import { Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('user')
export class User {
    @Column('varchar', { primary: true, name: 'id', length: 36 })
    id: string

    @Column('text', { name: 'name', nullable: false })
    name: string

    @Column('varchar', { name: 'email', length: 255, nullable: false })
    email: string

    @Column('boolean', { name: 'emailVerified', default: false })
    emailVerified: boolean

    @Column('text', { name: 'image', nullable: true })
    image: string

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: Date
}
