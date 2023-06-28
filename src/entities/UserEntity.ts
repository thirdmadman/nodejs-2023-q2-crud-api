import { UserDTO } from '../interfaces/dto/UserDTO';
import { Entity } from './Entity';

export class UserEntity extends Entity {
  name: string;

  age: number;

  hobbies: Array<string>;

  constructor(userDTO: UserDTO) {
    super(userDTO.uuid);
    this.name = userDTO.name;
    this.age = userDTO.age;
    this.hobbies = userDTO.hobbies;
  }
}
