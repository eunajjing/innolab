import DataLoader from 'dataloader'
import R from 'ramda'
import { Connection } from 'typeorm'
import { Message } from '../../entity/Message'
import API from './API'

export default class MessageAPI extends API {
  constructor(private connection: Connection) {
    super();
  }

  private messageRepo = this.connection.getRepository(Message);
  private messageLoader = new DataLoader((ids: string[]) => this.messageRepo.findByIds(ids));

  public async getMessageById(id: string) {
    try {
      return await this.messageLoader.load(id);
    } catch {
      return null;
    }
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