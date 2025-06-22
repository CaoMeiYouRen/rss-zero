import { Column, Entity } from 'typeorm'
import { BaseEntity } from './base-entity'

@Entity('user')
export class User extends BaseEntity {

    @Column('text', { nullable: false })
    name: string

    @Column('varchar', { length: 255, nullable: false })
    email: string

    @Column('boolean', { default: false })
    emailVerified: boolean

    @Column('text', { nullable: true })
    image: string

}
