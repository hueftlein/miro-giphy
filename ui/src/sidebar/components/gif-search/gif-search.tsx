import * as React from 'react'
import { useQuery } from '../../../useQuery';

interface GifSearchProps {
    searchBasePath: string;
}

export const GifSearch: React.FC<GifSearchProps> = ({ searchBasePath }: GifSearchProps) => {
    const [query, setQuery] = React.useState("");

    const { data, loading, error } = useQuery({
        basePath: searchBasePath,
        getParams: {
            query,
            api_key: "CQiN4X9NTXZWAFeZT9FzsOFbXYrkUGlh"
        }
    });

    if (loading) {
        return <>Loading...</>;
    }
    if (error) {
        return <>😢</>;
    }
    return <>Hi</>
}