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
  privateChannelNames: string;

  @Prop({ default: null })
  publicChannelNames: string;

  @Prop({ default: null })
  has_projectChannels: boolean;

  @Prop({
    ref: 'Workspace',
    index: true,
  })
  workspace: Types.ObjectId;
}

export const JobRoleSchema = SchemaFactory.createForClass(JobRole);
