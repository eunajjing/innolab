import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, RelationId } from 'typeorm'
import { User } from './User'

@Entity('messages')
export class Message {

  @PrimaryGeneratedColumn()
  public id!: string;

  @Column()
  public payload!: string;

  @CreateDateColumn()
  public createdAt!: string;

  @ManyToOne(type => User, user => user.messages, { onDelete: 'CASCADE' })
  public author?: User | string;

  @RelationId('author', 'authorId')
  public authorId!: string;
}