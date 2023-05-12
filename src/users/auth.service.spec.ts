import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {

  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;
  const users: User[] = [];

  beforeEach(async () => {
    fakeUsersService = {
      find: (email: string) => {
        const filtredUsers = users.filter(user => user.email === email);
        return Promise.resolve(filtredUsers);
      },
      create: (email: string, password: string) => {
        const user = {id: Math.floor(Math.random() * 99999), email, password} as User;
        users.push(user);
        return Promise.resolve(user);
      }
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService
        }
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create a new user with a salted and hashed password', async () => {
    const user = await service.signup('user@gmail.com', 'password');

    expect(user.password).not.toEqual('asdf');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();

  })

  it('throw the error if the user signs up with email that is in use', async () => {
    fakeUsersService.find = () => (
      Promise.resolve([{ id: 1, email: "user@gmail.com", password: "password" } as User])
    )

    await expect(service.signup("user@gmail.com", "password")).rejects.toThrow(
      BadRequestException,
    )
  })

  it('throw the  error if the user singns in with an unused email', async () => {
    await expect(service.signin("unused@gmail.com", "password")).rejects.toThrow(
      NotFoundException,
    )
  })

  it('throw the error if an invalid password is provided',async () => {
    fakeUsersService.find = () => (
      Promise.resolve([{ id: 1, email: "user@gmail.com", password: "invalid" } as User])
    )

    await expect(service.signin("user@gmail.com", "invalid")).rejects.toThrow(
      BadRequestException,
    )
  })

  it('return a user if if correct password provided',async () => {
    await service.signup("newuser@gmail.com", "password");
    
    const user = await service.signin("newuser@gmail.com", "password");

    expect(user).toBeDefined();

  })
});
