import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ProjectsController from 'src/controllers/projects.controller';
import Project from 'src/db/entities/project';
import { ProjectsService } from 'src/services/projects.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [],
})
export default class ProjectsModule {}
