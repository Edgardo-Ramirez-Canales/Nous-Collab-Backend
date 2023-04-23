import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
  Req
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../auth/decorators/public.decorator';

import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../users/entities/user.entity';



/* @UseGuards(AuthGuard('jwt'))*/
@UseGuards(JwtAuthGuard)
@Controller('project')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  createProject(
    @Body() createProjectDto: CreateProjectDto,
    @Req() req: Request,
  ) {
    const {role, _id  } = req.user as User;
    /* console.log(_id); */
    return this.projectsService.create(createProjectDto,_id);
  }

  /*   @Public()*/
  @Get('getAll')
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.projectsService.findOne(term);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }

  @Get('myproyects/:userId')
  async getProjectsByUserId(@Param('userId') userId: string) {
   /*  console.log(userId); */
    return this.projectsService.getProjectsByUserId(userId);
  }
}
