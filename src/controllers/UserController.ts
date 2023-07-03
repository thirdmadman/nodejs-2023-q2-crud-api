import { validate } from 'uuid';
/* eslint-disable class-methods-use-this */
import { IncomingMessage, ServerResponse } from 'http';
import { UserDTO } from '../interfaces/dto/UserDTO';
import { IRequestParams } from '../interfaces/IRequestParams';
import { UserRepository } from '../UserRepository';
import { Controller } from './Controller';

export class UserController extends Controller {
  sendError(resp: ServerResponse, code: number, message: string) {
    resp.writeHead(code, { 'Content-Type': 'application/json' });
    resp.end(JSON.stringify({ errors: [{ title: message }] }));
  }

  getBody(request: IncomingMessage) {
    return new Promise<string>((resolve) => {
      let body = '';
      request
        .on('data', (chunk: string | Buffer) => {
          body += chunk.toString();
        })
        .on('end', () => {
          resolve(body);
        });
    });
  }

  validateEntity(userDTO: UserDTO) {
    if (!userDTO) {
      return false;
    }

    if (!userDTO.name || typeof userDTO.name !== 'string' || userDTO.name === '') {
      return false;
    }

    if (!userDTO.age || typeof userDTO.age !== 'number' || userDTO.age <= 0) {
      return false;
    }

    if (!userDTO.hobbies || !Array.isArray(userDTO.hobbies)) {
      return false;
    }

    if (userDTO.hobbies.length > 0) {
      for (let i = 0; i < userDTO.hobbies.length; i++) {
        if (typeof userDTO.hobbies[i] !== 'string' || userDTO.hobbies[i] === '') {
          return false;
        }
      }
    }

    return true;
  }

  onGet(req: IRequestParams, resp: ServerResponse) {
    if (req.pathParam) {
      const isValidUUID = validate(req.pathParam);

      if (!isValidUUID) {
        this.sendError(resp, 400, 'Provided UUID is not valid');
        return;
      }

      const data = UserRepository.findByUUID(req.pathParam);

      if (!data) {
        this.sendError(resp, 404, 'User not found');
        return;
      }

      const respObj = { data };
      resp.writeHead(200, { 'Content-Type': 'application/json' });
      resp.end(JSON.stringify(respObj));
    } else {
      const data = UserRepository.findAll();
      const respObj = { data };
      resp.writeHead(200, { 'Content-Type': 'application/json' });
      resp.end(JSON.stringify(respObj));
    }
  }

  async onPost(req: IRequestParams, resp: ServerResponse) {
    try {
      const data = await this.getBody(req.src);
      const jsonObj = JSON.parse(data) as UserDTO;

      const isValid = this.validateEntity(jsonObj);
      if (!isValid) {
        this.sendError(resp, 400, 'Incorrect data: provided json is invalid schema of User');
        return;
      }

      if (jsonObj) {
        const user = UserRepository.create(jsonObj);
        const respObj = { data: user };
        resp.writeHead(201, { 'Content-Type': 'application/json' });
        resp.end(JSON.stringify(respObj));
      }
    } catch (err) {
      this.sendError(resp, 400, 'Incorrect data: provided json object is not valid.');
    }
  }

  async onPut(req: IRequestParams, resp: ServerResponse) {
    if (!req.pathParam) {
      this.sendError(resp, 400, 'No UUID provided');
      return;
    }

    const isValidUUID = validate(req.pathParam);

    if (!isValidUUID) {
      this.sendError(resp, 400, 'Provided UUID is not valid');
      return;
    }

    try {
      const data = await this.getBody(req.src);
      const jsonObj = JSON.parse(data) as UserDTO;

      const isValid = this.validateEntity(jsonObj);
      if (!isValid) {
        this.sendError(resp, 400, 'Incorrect data: provided json is invalid schema of User');
        return;
      }

      if (jsonObj) {
        const user = UserRepository.updateByUUID(req.pathParam, jsonObj);
        if (!user) {
          this.sendError(resp, 404, 'User not found');
          return;
        }
        const respObj = { data: user };
        resp.writeHead(201, { 'Content-Type': 'application/json' });
        resp.end(JSON.stringify(respObj));
      }
    } catch (err) {
      this.sendError(resp, 400, 'Incorrect data: provided json object is not valid.');
    }
  }

  onDelete(req: IRequestParams, resp: ServerResponse) {
    if (!req.pathParam) {
      this.sendError(resp, 400, 'No UUID provided');
      return;
    }

    const isValidUUID = validate(req.pathParam);

    if (!isValidUUID) {
      this.sendError(resp, 400, 'Provided UUID is not valid');
      return;
    }

    const data = UserRepository.removeByUUID(req.pathParam);

    if (!data) {
      this.sendError(resp, 404, 'User not found');
      return;
    }

    const respObj = { data };
    resp.writeHead(200, { 'Content-Type': 'application/json' });
    resp.end(JSON.stringify(respObj));
  }
}
