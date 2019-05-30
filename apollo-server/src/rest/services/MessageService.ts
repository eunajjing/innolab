import R from 'ramda'
import { Connection } from 'typeorm'
import { Message } from '../../entity/Message'

export default class MessageService {
  constructor(private connection: Connection) { }
  private messageRepo = this.connection.getRepository(Message);

  public async getMessageById(id: string) {
    return this.messageRepo.findOneOrFail(id);
  }

  public async getMessageByAuthorId(id: string, first: number, after?: string) {
    const queryBuilder = this.messageRepo
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.author', 'author')
      .where('author.id = :id', { id })
      .orderBy('message.id', 'DESC')
      .take(first);

    const [totalCount, messages] = await Promise.all([
      queryBuilder.getCount(),
      queryBuilder
        .andWhere(after ? 'message.id < :cursor' : '1 = 1', { cursor: after })
        .getMany()
    ]);

    const hasNextPage = messages.length === first;
    const endCursor = hasNextPage ? R.last(messages)!.id : undefined;
    const pageInfo = { hasNextPage, endCursor };
    const edges = messages.map(message => ({ cursor: message.id, node: message }));

    return { totalCount, pageInfo, edges };
  }


  public async getAllMessages(first: number, after?: string) {
    const queryBuilder = this.messageRepo
      .createQueryBuilder('message')
      .orderBy('message.id', 'DESC')
      .take(first);

    const [totalCount, messages] = await Promise.all([
      queryBuilder.getCount(),
      queryBuilder
        .where(after ? 'message.id < :cursor' : '1 = 1', { cursor: after })
        .getMany()
    ]);

    const hasNextPage = messages.length === first;
    const endCursor = hasNextPage ? R.last(messages)!.id : undefined;
    const pageInfo = { hasNextPage, endCursor };
    const edges = messages.map(message => ({ cursor: message.id, node: message }));

    return { totalCount, pageInfo, edges };
  }

}