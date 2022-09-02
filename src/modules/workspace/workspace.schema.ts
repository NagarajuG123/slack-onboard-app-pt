import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Employer } from '../employer/employer.schema';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Workspace extends Document {
  @Prop()
  _id: string;

  @Prop()
  teamName: string;

  @Prop()
  botId: string;

  @Prop()
  botAccessToken: string;

  @Prop()
  slackInvite: string;

  @Prop({
    ref: Employer.name,
    default: null,
  })
  installedBy: Types.ObjectId;
}

export const WorkspaceSchema = SchemaFactory.createForClass(Workspace);
