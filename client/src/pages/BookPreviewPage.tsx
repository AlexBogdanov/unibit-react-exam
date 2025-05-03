import { useParams } from 'react-router-dom';

import BookPreview from '../features/book/BookPreview';

function BookPreviewPage() {
  const { id } = useParams<{ id: string }>();

  return <BookPreview id={id!} />;
}

export default BookPreviewPage;
