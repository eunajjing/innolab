import { Router, Application } from 'express'
import { Connection } from 'typeorm'
import MessageService from '../services/MessageService'


export function installMessageRouter(app: Application, path: string, connection: Connection) {
  const messageService = new MessageService(connection);
  const router = Router();

  router.get('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      if (!id)
        return res.sendStatus(400);

      const message = await messageService.getMessageById(id);
      if (message)
        return res.send(message);
      else
        return res.sendStatus(404);
    } catch {
      return res.sendStatus(500);
    }
  });

  router.get('/', async (req, res) => {
    try {
      const query = req.query;
      const authorId = query['author-id'];
      const first = +query['first'];
      const after = query['after'];

      if (isNaN(first))
        return res.sendStatus(400);

      if (!authorId) {
        const envelop = await messageService.getAllMessages(first, after);
        return res.send(envelop);
      } else {
        const envelop = await messageService.getMessageByAuthorId(authorId, first, after);
        return res.send(envelop);
      }

    } catch {
      return res.sendStatus(500);
    }
  });

  app.use(path, router);
}