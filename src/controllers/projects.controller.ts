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
import { ProjectDTO } from 'src/db/dtos/project';
import Project from 'src/db/entities/project';
import { AccountService } from 'src/services/accounts.service';
import { ProjectsService } from 'src/services/projects.service';

// todo add guards for all of these

@Controller('projects')
export default class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  async findAll(@Query() paginationQuery: PaginationQuery): Promise<ProjectDTO[]> {
    return this.projectsService.findAll(paginationQuery);
  }

  @Get(':id')
  async find(@Param('id') id: string): Promise<ProjectDTO> {
    return this.projectsService.findOne(id);
  }

  // @Post()
  // async create(@Body() project: ProjectDTO): Promise<ProjectDTO> {
  //   // todo get accountOwner id from jwt or guard or wtvr
  //   return await this.projectsService.create(project, 1);
  // }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProjectDTO: ProjectDTO,
  ): Promise<ProjectDTO> {
    return this.projectsService.update(id, updateProjectDTO);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ProjectDTO> {
    return await this.projectsService.remove(id);
  }
}
