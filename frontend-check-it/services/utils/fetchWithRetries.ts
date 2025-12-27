export async function fetchWithRetries(props: {
  url: string;
  body?: BodyInit;
  method: "POST" | "PUT" | "GET" | "DELETE";
  headers: Record<string, string>;
  countRetries?: number;
  retryDelay?: number;
}): Promise<Response> {
  const {
    url,
    headers,
    method,
    body,
    retryDelay = 1000,
    countRetries = 3,
  } = props;

  try {
    const response = await fetch(url, { method, headers, body });

    if (!response.ok) {
      throw response;
    }

    return response;
  } catch (err) {
    if (countRetries <= 0) throw err;

    await new Promise((r) => setTimeout(r, retryDelay));

    return fetchWithRetries({
      ...props,
      countRetries: countRetries - 1,
    });
  }
}
