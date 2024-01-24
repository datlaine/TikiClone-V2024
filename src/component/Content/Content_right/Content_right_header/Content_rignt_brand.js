import './content_right_brand.css'

import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getData } from '../../../../apis/getDataMain'
import { SLATE_TIME } from '../../../../apis/staleTime'
import { memo } from 'react'

const Content_right_brand = () => {
    const [dataApiBrand, setDataApiBrand] = useState([])

    const { data, isSuccess } = useQuery({
        queryKey: [`thuongHieuChinhHang`],
        queryFn: () => getData('/thuongHieuChinhHang'),
        staleTime: SLATE_TIME,
    })

    useEffect(() => {
        if (isSuccess) {
            setDataApiBrand(data?.data)
        }
    }, [isSuccess])

    return (
        <div className='content_right_brand'>
            {isSuccess &&
                dataApiBrand &&
                dataApiBrand.map((item) => (
                    <div className={`content_right_brand_item itemTemp${item.id}`} key={item.id}>
                        <img src={require(`${item.img}`)} alt='' />
                    </div>
                ))}
        </div>
    )
}

export default memo(Content_right_brand)
