import { useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { fetchData } from '../../../apis/fetchData'

export const useFetchProducts = (url: string, key: string) => {
      // const [data, setData] = useState<string[]>()

      // useEffect(() => {
      //   const fetchApi = async () => {
      //     const res = await fetch(url)
      //     const dataRes = await res.json()
      //     setData(dataRes)
      //   }

      //   fetchApi()
      // }, [data])

      return useQuery([key], () => fetchData(url), { staleTime: Infinity })
}
