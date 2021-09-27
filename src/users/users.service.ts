import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput } from './dtos/login.dto';
import { User } from './entities/user.entity';
import { JwtService } from 'src/jwt/jwt.service';
import { EditProfileInput } from './dtos/edit-profile.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<{ ok: boolean; error?: string }> {
    try {
      const exists = await this.users.findOne({ email });
      if (exists) {
        return { ok: false, error: 'There is a user with that email already' };
      }
      await this.users.save(this.users.create({ email, password, role }));
    } catch (e) {
      return { ok: false, error: "Couldn't create account" };
    }
  }

  async login({
    email,
    password,
  }: LoginInput): Promise<{ ok: boolean; error?: string; token?: string }> {
    try {
      // 이하 user는 findOne한 user다.
      const user = await this.users.findOne({ email });
      if (!user) {
        return { ok: false, error: 'User not found' };
      }
      // 이하 user는 entity의 user다.
      const passwordCorrect = await user.checkPassword(password);
      if (!passwordCorrect) {
        return { ok: false, error: 'Wrong password' };
      }
      const token = this.jwtService.sign(user.id);
      return {
        ok: true,
        token,
      };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async findById(id: number): Promise<User> {
    // findOne은 TypeORM에서 제공되는 함수.
    return this.users.findOne({ id });
  }

  // {email, password} 이렇게 destructuring syntax 사용하면 둘 중 보내지 않은 값이 있으면 undefined가 전달되서 graphql에러 난다. 해결하려면 아래 update()를 쓸 때처럼 해야한다.
  // update를 쓰면 entities를 확인하지 않기 때문에 @BeforeUpdate가 실행되지 않는다. 그래서 save를 사용한다.
  async editProfile(userId: number, { email, password }: EditProfileInput) {
    const user = await this.users.findOne(userId);
    if (email) {
      user.email = email;
    }
    if (password) {
      user.password = password;
    }
    return this.users.save(user);
  }
  // update()는 db에 실제 존재하는지 체크하지 않고 그냥 실행한다. 빠르다. 로그인한 경우가 아니면 user service에서 editProfile을 실행할 수 없으니까 체크할 필요 없다.
  // 이 경우에는 userId가 GraphQL에서 오지 않고 token에서 온다. graphql input으로 userid를 받는다면 update를 쓰지 않는다. 왜냐면 아무나 어떤 번호든 보낼 수 있기 떄문.
  // async editProfile(userId: number, editProfileInput: EditProfileInput) {
  //   this.users.update(userId, { ...editProfileInput });
  // }
}
