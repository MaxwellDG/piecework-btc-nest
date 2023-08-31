import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQuery } from 'src/common/dto/pagination.dto';
import { ProjectDTO } from 'src/db/dtos/project';
import { Account } from 'src/db/entities/account';
import Project from 'src/db/entities/project';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
    @InjectRepository(Account)
    private readonly accountsRepository: Repository<Account>
  ) {}

  // add a guard for only their id
  async findAll(paginationQuery: PaginationQuery) {
    const { limit, offset } = paginationQuery;
    return await this.projectsRepository.find({
      relations: { accountOwner: true },
      skip: offset,
      take: limit,
    });
  }

  // todo add a guard for only their id
  async findOne(id: string) {
    return await this.projectsRepository.findOne({ where: { id: +id } });
  }

  // todo the thing to learn here is getting the accountOwner id from the session instead of being passed as a param in the req
  // async create(projectDTO: ProjectDTO, accountOwnerId: number) {
  //   // todo get account
  //   const project: Project = this.projectsRepository.create({
  //     ...projectDTO,
  //     accountOwner: account
  //   });
  //   return await this.projectsRepository.save(project);
  // }

  // todo add guard
  async update(id: string, updateProjectDTO: ProjectDTO) {
    const project = await this.projectsRepository.preload({
      id: +id,
      ...updateProjectDTO,
    });

    if (!project) {
      throw new NotFoundException('Project: ' + updateProjectDTO.name + ' not found');
    }

    return this.projectsRepository.save(project); // todo convert to dto here?
  }

  // todo add guard
  async remove(id: string) {
    // Nest automatically throw a 404 here if not found
    const project = await this.projectsRepository.findOne({
      where: { id: +id },
    });

    if (!project) {
      throw new NotFoundException('Project with id: ' + id + ' not found');
    }
    
    return await this.projectsRepository.remove(project);
  }
}
