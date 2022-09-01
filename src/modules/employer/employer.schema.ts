import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Common } from 'src/enums/common.enum';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Employer extends Document {
  @Prop({
    ref: 'Workspace',
    index: true,
  })
  workspace: Types.ObjectId;

  @Prop()
  _id: string;

  @Prop()
  name: string;

  @Prop({ unique: true })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(Employer);
