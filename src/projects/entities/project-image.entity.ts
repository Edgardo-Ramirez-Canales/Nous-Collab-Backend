import { Project } from './project.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class ProjectImage extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  url: string;

 
}

export const ProjectImageSchema = SchemaFactory.createForClass(ProjectImage);