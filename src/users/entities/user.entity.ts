import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Exclude} from 'class-transformer'
@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  nameUser: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Exclude()
  @Prop({ required: true })
  password: string;

  @Prop({ required: false, default: 'free' })
  role?: string;

  @Prop({ required: false, default: true })
  isActives?: boolean;

  @Prop({ required: false, default: '' })
  image?: string;

  @Prop({ required: false, default: 10 })
  availableProjects?: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
