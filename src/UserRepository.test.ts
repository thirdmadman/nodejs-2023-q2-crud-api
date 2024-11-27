import { expect } from 'vitest';
import { UserRepository } from './UserRepository';

describe('UserRepository', () => {
  it('should be empty from start', () => {
    const result = UserRepository.findAll();
    expect(result.length).toBe(0);
  });

  it('should create user', () => {
    const user = {
      name: 'Sam',
      age: 25,
      hobbies: [],
    };

    const result = UserRepository.create(user);

    expect(result.name).toBe(user.name);
    expect(result.age).toBe(user.age);
    expect(result.hobbies).toStrictEqual(user.hobbies);
  });

  it('should not be empty after add', () => {
    const result = UserRepository.findAll();
    expect(result.length).toBe(1);
  });
});
