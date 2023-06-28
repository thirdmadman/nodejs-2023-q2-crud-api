import { v4 } from 'uuid';

export class Entity {
  uuid: string;

  constructor(id: string | null = null) {
    if (id === null) {
      this.uuid = v4();
    } else {
      this.uuid = id;
    }
  }
}
