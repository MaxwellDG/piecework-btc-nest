import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Project from './project';
import Coin, { Chain } from './coin';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  wallet_address: string;

  @Column('json', { nullable: true })
  messages: string[];

  @OneToMany(() => Project, (project) => project.accountOwner)
  projects: Project[];

  @ManyToOne(() => Coin, coin => coin.id)
  preferred_coin: Coin;

  @CreateDateColumn({ type: 'timestamp' })
  public created_at: Date;

  @UpdateDateColumn({ nullable: true, type: 'timestamp' })
  public updated_at: Date;

  constructor(){
    this.preferred_coin = new Coin("BTC", "Bitcoin", Chain.Bitcoin);
  }
}
