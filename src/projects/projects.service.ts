import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

import { isValidObjectId, Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<Project>,
  ) {}

  async create(data: CreateProjectDto, userId:string) {
    try {
      const newProject = new this.projectModel(data);
      newProject.user = new Types.ObjectId(userId); 
      return newProject.save();
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll() {
     return this.projectModel.find().exec();
  }

  async findOne(term: string) {
     let project: Project;

     // MongoID
     if (!project && isValidObjectId(term)) {
       project = await this.projectModel.findById(term);
     }

     // Name
     if (!project) {
       project = await this.projectModel.findOne({
         name: term.toLowerCase().trim(),
       });
     }

     if (!project)
       throw new NotFoundException(
         `Project with id, name "${term}" not found`,
       );
    
    return project;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Project exists in db ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(
      `Can't create Project - Check server logs`,
    );
  }
}
