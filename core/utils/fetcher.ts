import axios, { AxiosRequestConfig } from 'axios';

export async function fetcher<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const { data } = await axios.get<T>(url, config);
  return data;
}
