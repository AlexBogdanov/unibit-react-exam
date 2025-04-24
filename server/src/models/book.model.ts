import mongoose, { Schema } from 'mongoose';
import Config from '../config';

interface IBook {
  title: string;
  author: string;
  description: string;
  imageSrc: string;
  reviews: Array<string>;
  createdAt: Date;
  updatedAt: Date;
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
      type: [String],
      default: [],
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

export { Book, BookDoc, IBook };
