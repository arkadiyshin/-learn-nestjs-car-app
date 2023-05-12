import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      findOne: (id: number) => {
        return Promise.resolve({ id, email: "user@gmail.com", password: "password" } as User);
      },
      find: (email: string) => {
        return Promise.resolve([{ id: 1, email: "user@gmail.com", password: "password" } as User]);
      },
      remove: (id: number) => {
        return Promise.resolve({ id, email: "user@gmail.com", password: "password" } as User);
      },
      update: (id: number, attrs: Partial<User>) => {
        return Promise.resolve({ id, email: "user@gmail.com", password: "password" } as User);
      }
    }

    fakeAuthService = {
      signup: (email: string, password: string) => {
        return Promise.resolve({} as User);
      },
      signin: (email: string, password: string) => {
        return Promise.resolve({} as User);
      }
    }



    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService
        },
        {
          provide: AuthService,
          useValue: fakeAuthService
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUsers returns a list of users with the given email',async () => {
    const users = await controller.findAllUser('user@gmail.com');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('user@gmail.com')
  })

  it('findUser returns a single user with the given id',async () => {
    const user = await controller.findUser('1');
    expect(user).toBeDefined();
  })

  it('throw the error if the user with the given id not found',async () => {
    fakeUsersService.findOne = () => null;
    await expect(controller.findUser('1')).rejects.toThrowError(
      NotFoundException
    )
  })
});
