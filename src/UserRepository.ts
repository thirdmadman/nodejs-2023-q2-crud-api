/* eslint-disable class-methods-use-this */
import { db } from './db';
import { UserEntity } from './entities/UserEntity';
import { UserDTO } from './interfaces/dto/UserDTO';

export class UserRepository {
  static create(dto: UserDTO) {
    const newUserDTO: UserDTO = { ...dto };
    delete newUserDTO.uuid;
    const user = new UserEntity(newUserDTO);
    db.users.push(user);
    return user;
  }

  static findByUUID(uuid: string) {
    const { users } = db;
    if (users && users.length > 0) {
      const userDTO = users.find((user) => user.uuid === uuid);
      if (userDTO) {
        return new UserEntity(userDTO);
      }
    }
    return null;
  }

  static findAll() {
    const { users } = db;
    if (users && users.length > 0) {
      const entities = [];
      for (let i = 0; users.length > i; i += 1) {
        const dto = users[i];
        if (dto) {
          entities.push(new UserEntity(dto));
        }
      }
      return entities;
    }
    return [];
  }

  static updateByUUID(uuid: string, dto: UserDTO) {
    const { users } = db;
    const index = users.findIndex((user) => user.uuid === uuid);
    if (index > -1) {
      const newDTO: UserDTO = { ...dto };
      delete newDTO.uuid;
      db.users[index] = { ...users[index], ...newDTO };
      return new UserEntity(db.users[index]);
    }
    return null;
  }

  static removeByUUID(uuid: string) {
    const { users } = db;
    const index = users.findIndex((user) => user.uuid === uuid);
    if (index > -1) {
      const oldDTO: UserDTO = { ...db.users[index] };
      delete db.users[index];
      db.users = db.users.filter((user) => user);
      return new UserEntity(oldDTO);
    }
    return null;
  }
}
