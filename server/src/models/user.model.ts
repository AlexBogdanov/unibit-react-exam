import mongoose, { Schema } from 'mongoose';

import bcryptjs from 'bcryptjs';

import Config from './../config';

interface IUser {
  email: string;
  password: string;
  name: string;
  token?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UserPayload extends Omit<IUser, 'password' | 'token'> {}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: 'users',
  },
);

UserSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc: any, ret: any) { delete ret._id },
});

UserSchema.pre('save', async function(next): Promise<void> {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcryptjs.genSalt(12);

  this.password = await bcryptjs.hash(this.password, salt);
});

UserSchema.pre('findOneAndUpdate', async function(next): Promise<void> {
  const update = this.getUpdate() as { password?: string };

  if (!update.password) {
    return next();
  }

  const salt = await bcryptjs.genSalt(12);
  update.password = await bcryptjs.hash(update.password, salt);

  this.setUpdate(update);
});

UserSchema.index({ token: 1 }, { unique: true });

const db = mongoose.connection.useDb(Config.getInstance().database, { useCache: true });
const User = db.model<IUser>('User', UserSchema);

type UserDoc = ReturnType<(typeof User)['hydrate']>;

export { User, UserDoc, IUser, UserPayload };
