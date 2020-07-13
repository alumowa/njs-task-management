import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
import * as Bcrypt from 'bcrypt';

@Entity()
@Unique(['username'])
export class User extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  async validatePassword(guess: string): Promise<boolean> {

    return Bcrypt.compare(guess, this.password);
  }
}