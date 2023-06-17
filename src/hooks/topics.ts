import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const getPosts = (page: number) => {
  let url = `/api/topics?page=${page}`;
  const { data, isLoading, mutate } = useSWR(url, fetcher);

  return {
    topics: data?.data[0]?.topics,
    total_count: data?.data[0]?.total_topics[0]?.totalCount,
    isLoading,
    mutate: mutate,
  };
};

export const getPostById = (fetch: boolean, id: string) => {
  let url = `/api/topics/${id}`;
  const data = useSWR(fetch ? url : null, fetcher);

  return data;
};
