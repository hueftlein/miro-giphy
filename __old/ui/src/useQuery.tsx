import axios from 'axios';
import * as React from 'react'

interface UseQueryProps {
    basePath: string;
    getParams?: { [key: string]: string };
}

export const useQuery = <T extends any>({ basePath, getParams }: UseQueryProps) => {
    const [data, setData] = React.useState<T | undefined>();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState();

    React.useEffect(() => {
        setLoading(true);
        let url = new URL(basePath);
        url.search = new URLSearchParams(getParams).toString();
        axios.request<T>({ url: url.toString() })
            .then(response => {
                setData(response.data);
                setError(undefined);
                setLoading(false);
            })
            .catch(error => {
                setData(undefined);
                setError(error)
                setLoading(false);
            })
    }, [basePath, getParams])

    return { data, loading, error };
}