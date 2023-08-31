import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQuery } from 'src/common/dto/pagination.dto';
import { AccountDTO, UpdateAccountDTO } from 'src/db/dtos/account';
import { Account } from 'src/db/entities/account';
import { Repository } from 'typeorm';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async findAll(paginationQuery: PaginationQuery) {
    const { limit, offset } = paginationQuery;
    return await this.accountRepository.find({
      relations: { projects: true },
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: string) {
    return await this.accountRepository.findOne({
      where: { id: +id },
      relations: { projects: true },
    });
  }

  async create(accountDTO: AccountDTO) {
    // todo check for username taken
    const account: Account = this.accountRepository.create(accountDTO);
    console.log('Created: ', account);
    return await this.accountRepository.save(account);
  }

  async update(id: string, updateAccountDto: UpdateAccountDTO) {
    const account = await this.accountRepository.preload({
      id: +id,
      ...updateAccountDto,
    });

    if (!account) {
      throw new NotFoundException('Account: ' + id + ' not found');
    }

    return this.accountRepository.save(account); // todo convert to dto here?
  }

  async remove(id: string) {
    // Nest automatically throw a 404 here if not found
    const account = await this.accountRepository.findOne({
      where: { id: +id },
    });

    if (!account) {
      throw new NotFoundException('Account: ' + id + ' not found');
    }

    return await this.accountRepository.remove(account);
  }
}
