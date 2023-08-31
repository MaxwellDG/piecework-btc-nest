import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import AccountsController from 'src/controllers/accounts.controller';
import { Account } from 'src/db/entities/account';
import Coin from 'src/db/entities/coin';
import Project from 'src/db/entities/project';
import { AccountService } from 'src/services/accounts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Account, Project, Coin])],
  controllers: [AccountsController],
  providers: [AccountService],
  exports: [],
})
export default class AccountsModule {}
