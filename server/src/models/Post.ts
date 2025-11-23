import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  description: string;
  budget: number;
  location: string;
  genderTarget: 'Male' | 'Female' | 'Any';
  image: string;
  habits: {
    smoking: boolean;
    cleanliness: 'Messy' | 'Standard' | 'CleanFreak';
    sleepSchedule: 'EarlyBird' | 'NightOwl';
  };
  contactLink: string;
}

const PostSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  budget: { type: Number, required: true },
  location: { type: String, required: true },
  genderTarget: { type: String, enum: ['Male', 'Female', 'Any'], default: 'Any' },
  image: { type: String, required: true },
  habits: {
    smoking: { type: Boolean, default: false },
    cleanliness: { type: String, enum: ['Messy', 'Standard', 'CleanFreak'], default: 'Standard' },
    sleepSchedule: { type: String, enum: ['EarlyBird', 'NightOwl', 'Normal'], default: 'Normal' },
  },
  contactLink: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model<IPost>('Post', PostSchema);