import { Router, Application } from 'express'
import { Connection } from 'typeorm'
import UserService from '../services/UserService'


export function installUserRouter(app: Application, path: string, connection: Connection) {
  const userService = new UserService(connection);
  const router = Router();

  router.get('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      if (!id)
        return res.sendStatus(400);

      const user = await userService.getUserById(id);
      if (user)
        return res.send(user);
      else
        return res.sendStatus(404);
    } catch {
      return res.sendStatus(500);
    }
  });

  router.get('/', async (req, res) => {
    try {
      const query = req.query;
      const first = +query['first'];
      const after = query['after'];
      const messageId = query['messageId'];

      if (messageId) {
        const user = await userService.getAuthorByMessageId(messageId);
        if (user)
          return res.send(user);
        else
          return res.sendStatus(404);
      }

      if (isNaN(first))
        return res.sendStatus(400);

      const envelop = await userService.getAllUsers(first, after);
      return res.send(envelop);
    } catch {
      return res.sendStatus(500);
    }
  });

  app.use(path, router);
}