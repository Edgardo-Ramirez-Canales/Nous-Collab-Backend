import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/entities/user.entity';
@Schema()
export class Project extends Document {
  @Prop({ required: true })
  nameProject: string;

  @Prop()
  description: string;

  @Prop({ required: false, default: '' })
  image: string;

  @Prop({ required: false, default: '' })
  html?: string;

  @Prop({ required: false, default: '' })
  css?: string;

  @Prop({ required: false, default: '' })
  javaScript?: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId | User | string;
}
export const ProjectSchema = SchemaFactory.createForClass(Project);
