import { Injectable } from '@nestjs/common';

const users = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    address: {
      street: 'Lucas Light',
      suite: 'Apt. 556',
      city: 'Montevideo',
      zip: '92998-3874',
      geo: {
        lat: '-37.3159',
        lng: '81.1496',
      },
    },
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    company: {
      name: 'Pedro',
      catchPhrase: 'Multi-layered client-server neural-net',
      bs: 'harness real-time e-markets',
    },
  },
  {
    id: 2,
    name: 'Ervin Howell',
    username: 'lucas',
    email: 'Shanna@melissa.tv',
    address: {
      street: 'Victor Plains',
      suite: 'Suite 879',
      city: 'Montevideo',
      zip: '90566-7771',
      geo: {
        lat: '-43.9509',
        lng: '-34.4618',
      },
    },
    phone: '010-692-6593 x09125',
    website: 'anastasia.net',
    company: {
      name: 'Microsoft',
      catchPhrase: 'Proactive didactic contingency',
      bs: 'supply scalable supply-chains',
    },
  },
];

@Injectable()
export class UsersService {
  public async getMany(): Promise<any> {
    return users;
  }

  public async getOne(id: number): Promise<any> {
    return users.find((user) => user.id === id);
  }

  public async create(user: any): Promise<any> {
    user.id = users.length + 1;
    users.push(user);
    return user;
  }

  public async update(id: number, user: any): Promise<any> {
    const index = users.findIndex((user) => user.id === id);
    users[index] = user;
    return user;
  }

  public async delete(id: number): Promise<any> {
    const index = users.findIndex((user) => user.id === id);
    users.splice(index, 1);
    return { id };
  }
}
