export type Review = {
  reviewerId: string;
  reviewer: string;
  reviewContent: string;
}

export type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  imageSrc: string;
  reviews: Array<Review>;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface BookPreview extends Pick<Book, 'id' | 'title' | 'description' | 'imageSrc' | 'ownerId'> {}

export interface BookDTO extends Omit<Book, 'id' | 'createdAt' | 'updatedAt' | 'reviews' | 'ownerId'> {}
