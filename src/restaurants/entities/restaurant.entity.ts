import { Field, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  @Field((type) => Number)
  id: number;

  @Field((type) => String)
  @Column()
  @IsString()
  @Length(5)
  name: string;

  // GraphQL 스키마에서 이 필드의 기본값이 true라는 뜻.
  @Field((type) => Boolean, { nullable: true })
  // DB에서 이 필드의 기본값이 true라는 뜻.
  @Column({ default: true })
  // @IsOptional == 해당 필드는 필수가 아님.
  @IsOptional()
  @IsBoolean()
  isVegan: boolean;

  @Field((type) => String, { defaultValue: '강남' })
  @Column()
  @IsString()
  address: string;

  @Field((type) => String)
  @Column()
  @IsString()
  owenerName: string;

  @Field((type) => String)
  @Column()
  @IsString()
  categoryName: string;
}
