import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  role: string;

  @Prop({ required: false, default: true })
  isActives?: boolean;

  @Prop({ required: false, default: '' })
  image?: string;

  @Prop({ required: false, default: 10 })
  availableProjects?: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
