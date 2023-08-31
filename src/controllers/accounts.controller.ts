import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PaginationQuery } from 'src/common/dto/pagination.dto';
import { AccountDTO, UpdateAccountDTO } from 'src/db/dtos/account';
import { Account } from 'src/db/entities/account';
import { AccountService } from 'src/services/accounts.service';

@Controller('accounts')
export default class AccountsController {
  constructor(private readonly accountsService: AccountService) {}

  @Get()
  async findAll(@Query() paginationQuery: PaginationQuery): Promise<Account[]> {
    return this.accountsService.findAll(paginationQuery);
  }

  @Get(':id')
  async find(@Param('id') id: string): Promise<AccountDTO> {
    return this.accountsService.findOne(id);
  }

  @Post()
  async create(@Body() account: AccountDTO): Promise<AccountDTO> {
    return await this.accountsService.create(account);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAccountInfo: UpdateAccountDTO,
  ): Promise<AccountDTO> {
    return this.accountsService.update(id, updateAccountInfo);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<AccountDTO> {
    return await this.accountsService.remove(id);
  }
}
