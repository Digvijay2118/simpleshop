import { useEffect, useState } from 'react';


export default function useFetch(asyncFetcher) {
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);


useEffect(() => {
let mounted = true;
setLoading(true);
asyncFetcher()
.then((d) => mounted && setData(d))
.catch((e) => mounted && setError(e.message || e))
.finally(() => mounted && setLoading(false));
return () => (mounted = false);
}, [asyncFetcher]);


return { data, loading, error };
}