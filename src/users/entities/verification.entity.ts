import { v4 as uuidv4 } from 'uuid';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Verification extends CoreEntity {
  @Column()
  @Field(type => String)
  code: string;

  //   onDelete: 'CASCADE : user를 삭제하면 user와 붙어 있는 verification도 삭제한다.
  @OneToOne(type => User, { onDelete: 'CASCADE' })
  // JoinColumn: 관계를 갖는 한 쪽에 정의돼 있어야 한다. 이걸 추가한 쪽에는 relation Id를 갖는다.
  // Verification으로부터 User에 접근하길 원한다면 JoinColumn은 이곳에 있으면 된다.
  @JoinColumn()
  user: User;

  @BeforeInsert()
  createCode(): void {
    this.code = uuidv4();
  }
}
