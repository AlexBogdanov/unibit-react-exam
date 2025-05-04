import { useParams } from 'react-router-dom';

import BookForm from '../features/book/BookForm';

function EditBookPage() {
  const params = useParams();

  return <BookForm id={params.id} />;
}

export default EditBookPage;
