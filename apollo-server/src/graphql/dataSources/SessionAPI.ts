import { Connection } from 'typeorm'
import API from './API'

export default class SessionAPI extends API {
  constructor(private connection: Connection) {
    super();
  }
}