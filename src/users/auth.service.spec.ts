import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { BadRequestException } from '@nestjs/common';

describe('AuthService', () => {

  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    fakeUsersService = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) => Promise.resolve({ id: 1, email, password } as User)
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
    const user = await service.signup('adv2@ad.com', 'asdf');

    expect(user.password).not.toEqual('asdf');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();

  })

  it('throw the error if the user signs up with email that is in use', async () => {
    fakeUsersService.find = () => (
      Promise.resolve([{ id: 1, email: "adv2@ad.com", password: "asdf" } as User])
    )

    await expect(service.signup("adv2@ad.com", "asdf")).rejects.toThrow(
      BadRequestException,
    )
  })

});
