import { useState, useCallback } from 'react'
import { NavLink } from 'react-router-dom'

type Props = {
    query: any
    Title?: React.ReactNode | JSX.Element
}

const LinkCategory = ({ query, Title }: Props) => {
    const [active, setActive] = useState(0)

    const handleActive = (id: string) => {
        const idClick = Number(id) - 1
        setActive(idClick)
    }

    const { data } = query
    console.log(data)
    return (
        <div className='flex flex-col gap-3  py-[25px] h-[250px] lg:h-[150px]'>
            {Title && Title}

            <div className='h-full grid grid-cols-3 lg:grid lg:grid-cols-6 gap-2'>
                {data?.data &&
                    data.data.map((item: any) => {
                        return (
                            <NavLink
                                to={`/${item.title}`}
                                key={item.id}
                                onClick={() => handleActive(item.id)}
                                className={`group  py-[15px] lg:py-2 flex rounded-[8px] flex-col gap-1 lg:gap-2 overflow-y-hidden items-center justify-center transition-all duration-300 text-[black] ${
                                    active === item.id - 1 ? 'isActive' : ''
                                } hover:bg-[#2ac1f4e9] hover:text-[white]`}
                            >
                                <img src={require(`../assets/img/${item.img}`)} alt='' className='w-[10%] lg:w-[20%] basis-[20%]' />
                                <h4 className=''>{item.title}</h4>
                            </NavLink>
                        )
                    })}
            </div>
        </div>
    )
}

export default LinkCategory
