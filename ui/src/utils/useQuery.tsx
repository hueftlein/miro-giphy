import axios from "axios";
import * as React from "react";

interface UseQueryProps {
  basePath: string;
  getParams?: { [key: string]: string };
  skip?: boolean;
}

export const useQuery = <T extends any>({
  basePath,
  getParams,
  skip,
}: UseQueryProps) => {
  const [data, setData] = React.useState<T | undefined>();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState();

  const url = React.useMemo(() => {
    const url = new URL(basePath);
    url.search = new URLSearchParams(getParams).toString();
    return url.toString();
  }, [basePath, getParams]);

  React.useEffect(() => {
    if (skip) {
      return;
    }
    const requestedUrl = url;
    setLoading(true);
    axios
      .request<T>({ url })
      .then((response) => {
        if (requestedUrl === url) {
          setData(response.data);
          setError(undefined);
        }
      })
      .catch((error) => {
        if (requestedUrl === url) {
          setData(undefined);
          setError(error);
        }
      })
      .finally(() => {
        if (requestedUrl === url) {
          setLoading(false);
        }
      });
  }, [url, skip]);

  return { data, loading, error };
};
