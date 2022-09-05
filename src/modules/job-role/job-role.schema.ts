import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class JobRole extends Document {
  @Prop()
  name: string;

  @Prop()
  noOfChannels: string;

  @Prop()
  userChannelNames: string;

  @Prop({ default: null })
  projectChannelNames: string;

  @Prop({
    ref: 'Workspace',
    index: true,
  })
  workspace: Types.ObjectId;
}

export const JobRoleSchema = SchemaFactory.createForClass(JobRole);
