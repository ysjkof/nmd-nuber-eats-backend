import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from 'src/jwt/jwt.service';
import { MailService } from 'src/mail/mail.service';
import { User } from './entities/user.entity';
import { Verification } from './entities/verification.entity';
import { UserService } from './users.service';

const mockRepository = {
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
};
const mockJwtService = {
  sign: jest.fn(),
  verify: jest.fn(),
};
const mockMailService = {
  sendVerification: jest.fn(),
};

describe('UserService', () => {
  let service: UserService;

  beforeAll(async () => {
    // 테스트할 서비스 불러오기.
    const module = await Test.createTestingModule({
      //   Mock repository를 불러온다. 가짜 레포지토리로 실제 레포지토리를 불러오지 않는다. 왜냐면 유저 서비스를 단독으로 테스트 하기 위해서.
      providers: [
        UserService,
        { provide: getRepositoryToken(User), useValue: mockRepository },
        { provide: getRepositoryToken(Verification), useValue: mockRepository },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: MailService,
          useValue: mockMailService,
        },
      ],
    }).compile();
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it.todo('createAccount');
  it.todo('login');
  it.todo('findById');
  it.todo('editProfile');
  it.todo('verifyEmail');
});
