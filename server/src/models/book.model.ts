import mongoose, { Schema, Types } from 'mongoose';

import Config from '../config';

import { IUser } from './user.model';

interface Review {
  reviewerId: Types.ObjectId | IUser;
  reviewContent: string;
}

interface IBook {
  title: string;
  author: string;
  description: string;
  imageSrc: string;
  reviews: Array<Review>;
  ownerId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

interface ReviewResponse extends Review {
  reviewer: string;
}
interface BookResponse extends Omit<IBook, 'reviews'> {
  reviews: Array<ReviewResponse>;
}

const BookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    imageSrc: {
      type: String,
      required: true,
    },
    reviews: {
      type: [Object],
      default: [],
    },
    ownerId: {
      type: Schema.Types.ObjectId,
    }
  },
  {
    timestamps: true,
    collection: 'books',
  }
);

BookSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function(doc, ret){ delete ret._id },
});

BookSchema.index({ title: 1 }, { unique: true });
BookSchema.index({ author: 1 });

const db = mongoose.connection.useDb(Config.getInstance().database, { useCache: true });
const Book = db.model<IBook>('Book', BookSchema);

type BookDoc = ReturnType<(typeof Book)['hydrate']>;

export { Book, BookDoc, IBook, BookResponse, Review, ReviewResponse };
