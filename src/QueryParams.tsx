import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import axiosCustom from './apis/http'
import { Link } from 'react-router-dom'

const QueryParams = () => {
    const [page, setPage] = useState(1)

    const queryparam = useQuery({
        queryKey: ['page', page],
        queryFn: () => axiosCustom.get(`v1/api/test?page=${page}&name=dat`),
    })

    return (
        <div>
            <ul>
                <li onClick={() => setPage(1)}>
                    <Link to={`/query-params?page=${page}&name=dat`}>1</Link>
                </li>
                <li onClick={() => setPage(2)}>
                    <Link to={`/query-params?page=${page}&name=mai`}>2</Link>
                </li>
                <li onClick={() => setPage(3)}>
                    <Link to={`/query-params?page=${page}&name=super`}>3</Link>
                </li>
            </ul>
        </div>
    )
}

export default QueryParams
