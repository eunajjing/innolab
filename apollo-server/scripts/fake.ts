import { getConnectionOptions, createConnection } from 'typeorm'
import * as faker from 'faker'
import * as fs from 'fs-extra'
import R from 'ramda'
import { User } from '../src/entity/User'
import { Message } from '../src/entity/Message'

const fakeUsers = R.range(0, 500).map(id => id + "").map(id => ({
  id,
  name: faker.name.findName()
}));

const fakeMessages = R.range(0, 10000).map(id => id + "").map(id => ({
  id,
  payload: faker.lorem.paragraph()
}));

async function fake() {
  console.log('Generating Fake Data...');
  const options = await getConnectionOptions();
  fs.removeSync(options.database + "");
  const connection = await createConnection({ ...options, synchronize: true });
  const userRepo = connection.getRepository(User);
  const messageRepo = connection.getRepository(Message);

  const users = fakeUsers.map(fakeUser => {
    const user = new User();
    user.id = fakeUser.id;
    user.name = fakeUser.name;
    return user;
  });

  const messages = fakeMessages.map(fakeMessage => {
    const userId = ~~(Math.random() * users.length) + "";
    const message = new Message();
    message.id = fakeMessage.id;
    message.payload = fakeMessage.payload;
    message.author = userId;
    return message;
  });

  await userRepo.save(users);


  await Promise.all(R.splitEvery(500, messages)
    .map(messages => messageRepo.save(messages)))
}

fake();