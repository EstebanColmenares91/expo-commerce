import useSWR from 'swr';

export interface Props<T> {
  key: string | null;
  fetcher: () => Promise<T>;
}

export interface Response<T> {
  data: T | undefined;
  isLoading: boolean;
  error: Error | undefined;
}

/**
 * Hook para obtener datos de forma asíncrona.
 * @param key Identificador único de los datos.
 * @param fetcher Función asíncrona que obtiene los datos.
 */
export default function useData<T>({ key, fetcher }: Props<T>): Response<T> {
  const { data, isLoading, error } = useSWR(key, fetcher);
  return {
    data,
    isLoading,
    error,
  };
}
