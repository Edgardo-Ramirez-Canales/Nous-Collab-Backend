import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/entities/user.entity';
@Schema()
export class Project extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId | User;
}
export const ProjectSchema = SchemaFactory.createForClass(Project);
