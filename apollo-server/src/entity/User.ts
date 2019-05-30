import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Message } from './Message'

@Entity('users')
export class User {

  @PrimaryGeneratedColumn()
  public id!: string;

  @Column()
  public name!: string;

  @OneToMany(type => Message, message => message.author)
  public messages?: Message[] | string[];
}
