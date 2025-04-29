import { FetchError } from "@/lib/classes";

export default function safeFetch(fetchFn) {
  const dataOrThrow = async () => {
    let response;
    try {
      response = await fetchFn();
    } catch {
      throw new FetchError(0);
    }

    if (!response.ok) {
      throw new FetchError(response.status);
    }
    return response.json();
  };

  return dataOrThrow;
}
