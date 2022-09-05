import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class User extends Document {
  @Prop({
    ref: 'Workspace',
    index: true,
  })
  workspace: Types.ObjectId;

  @Prop()
  name: string;

  @Prop({ default: null })
  slackUniqueId: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  mobileNumber: string;

  @Prop({})
  userRole: string;

  @Prop({
    ref: 'JobRole',
  })
  jobRole: Types.ObjectId;

  @Prop({
    default: null,
  })
  projectName: string;

  @Prop()
  channelIds: [string];
}

export const UserSchema = SchemaFactory.createForClass(User);
