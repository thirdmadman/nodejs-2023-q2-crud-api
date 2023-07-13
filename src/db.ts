import { UserDTO } from './interfaces/dto/UserDTO';

export interface DB {
  users: Array<UserDTO>;
  data: Array<string>;
}

export const db: DB = {
  users: [],
  data: [],
};
