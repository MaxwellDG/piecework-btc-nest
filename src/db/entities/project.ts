import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from './account';

export enum Size {
  SM = "SM",
  MD = "MD",
  LG = "LG",
  XL = "XL"
}

@Entity()
export default class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: false, nullable: false })
  name: string;

  @ManyToOne(() => Account, (account) => account.projects)
  accountOwner: Account;

  @Index()
  @Column()
  size: Size;
}
