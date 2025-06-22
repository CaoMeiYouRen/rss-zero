import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm'
import { BaseEntity } from './base-entity'

@Entity('subscription')
export class Subscription extends BaseEntity {

    @Column('varchar', { length: 1024 })
    url: string

    @Column('varchar', { length: 255, default: '' })
    title: string

    @Index()
    @Column('varchar', { length: 36, nullable: false })
    userId: string

}
