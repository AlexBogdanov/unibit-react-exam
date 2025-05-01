export type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  imageSrc: string;
  reviews: Array<string>;
  createdAt: Date;
  updatedAt: Date;
};

export interface BookDTO extends Omit<Book, 'id' | 'createdAt' | 'updatedAt' | 'reviews'> {}
