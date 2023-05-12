import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';

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
        return Promise.resolve([]);
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
});
