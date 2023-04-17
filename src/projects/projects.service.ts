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
import { User } from '../users/entities/user.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<Project>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(data: CreateProjectDto, userId: string) {
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
      throw new NotFoundException(`Project with id, name "${term}" not found`);

    return project;
  }

  update(id: string, changes: UpdateProjectDto) {
    const project = this.projectModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!project) {
      throw new NotFoundException(`Project #${id} not found`);
    }
    return project;
  }

  /*  remove(id: string) {
    try {
    return this.projectModel.findByIdAndDelete(id);
    } catch (error) {
      throw new BadRequestException(`Project with id "${id}" not found`);
    }
  } */
  async remove(id: string) {
    const { deletedCount } = await this.projectModel.deleteOne({ _id: id });
    if (deletedCount === 0)
      throw new BadRequestException(`Project with id "${id}" not found`);
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

  /* async getProjectsByUserId(userId: string): Promise<Project[]> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException(`User with ID "${userId}" not found`);
    }

    // Utiliza populate() para cargar los proyectos relacionados con el usuario
    return this.projectModel.find({ user: user._id }).populate('user').exec();
  } */

  async getProjectsByUserId(userId: string): Promise<Project[]> {

    try {
      const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException(`User with ID "${userId}" not found`);
    }

    // Utiliza populate() para cargar solo algunas propiedades del usuario relacionado
    return this.projectModel
      .find({ user: user._id })
      .populate({
        path: 'user',
        select: 'email availableProjects role', // especifica las propiedades del usuario que deseas incluir
      })
      .exec();
    } catch (error) {
       throw new NotFoundException(`User with ID "${userId}" not found `);
    }
    
    
  }
}
