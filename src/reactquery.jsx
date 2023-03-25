import React from 'react'
import axios from 'axios'
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from 'react-query'
import { useEffect } from 'react'
function Reactquery() {
    const AllData = async () => {
        try {
            const api = 'http://192.168.29.173:4000/admin/getAllUsers/1'
            const getData = await axios.get(api);
            console.log(getData)
            return getData.data.data
        } catch (error) {
            console.log(error)
        }

    }
    const shopData = async () => {
        try {
            const api = 'http://192.168.29.173:4000/admin/getAllShop/1'
            const getData = await axios.get(api);
            console.log(getData , 'shop')
            return getData
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        AllData
        shopData
    }, [0])

    const { data, isLoading, isError, error } = useQuery('users', AllData);
    // const {  } = useQuery('shop', shopData);
    // console.log(All)
    // console.log(data)
    if (isLoading) {
        return <h1>loading</h1>
    }
    if (isError) {
        return <h1>{error.message}</h1>
    }
    return (
        <h1>{data[2].name}</h1>

    )
}

export default Reactquery