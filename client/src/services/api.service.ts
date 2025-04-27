const API_URL = 'http://localhost:8080/api';

const getBaseHeaders = (): HeadersInit => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`,
});

const handleSuccess = (res: Response) => {
  const token = res.headers.get('Authorization-Access');

  if (token) {
    localStorage.setItem('token', token);
  }

  return res.json();
};

const handleError = (res: Response) => {
  return res.json()
    .then(error => {
      throw new Error(error.message);
    });
};

function basicRequest<B, R>(
  path: string,
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  headers: HeadersInit,
  body?: B,
): Promise<R> {
  const url = `${API_URL}/${path}`;

  let options;

  if (body) {
    options = {
      method,
      headers,
      body: JSON.stringify(body),
    };
  } else {
    options = {
      method,
      headers,
    };
  }

  return fetch(
    url,
    // @ts-ignore
    options,
  ).then((res) => {
    if (!res.ok) {
      return handleError(res);
    } else {
      return handleSuccess(res);
    }
  }).catch((err: Error) => {
    throw err;
  });
}

export function get<R>(path: string): Promise<R> {
  return basicRequest<{}, R>(path, 'GET', getBaseHeaders());
}

export function post<B, R>(path: string, body: B): Promise<R> {
  return basicRequest<B, R>(path, 'POST', getBaseHeaders(), body);
}

export function patch<B, R>(path: string, body: B): Promise<R> {
  return basicRequest<B, R>(path, 'PATCH', getBaseHeaders(), body);
}

export function del<R>(path: string): Promise<R> {
  return basicRequest<{}, R>(path, 'DELETE', getBaseHeaders());
}
