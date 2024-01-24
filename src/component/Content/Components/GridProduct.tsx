import React from 'react'

type Props = {
    query: any
}

const GridProduct = ({ query }: Props) => {
    const { data } = query

    //select 0 / 3 /6

    console.log(data?.data)

    return (
        <div className='flex lg:grid lg:grid-cols-4 lg:grid-rows-[150px_150px] lg:gap-[35px]'>
            {data?.data && (
                <>
                    <div className='col-[1/2] row-[1/3] bg-[red]'>
                        <img src={require(`../assets/img/${data?.data[0].img}`)} alt='' className='w-full h-full' />
                    </div>
                    <div className='col-[2/3] row-[1/2] bg-[blue]'>
                        <img src={require(`../assets/img/${data?.data[1].img}`)} alt='' className='w-full h-full' />
                    </div>
                    <div className='col-[2/3] row-[2/3] bg-[yellow]'>
                        <img src={require(`../assets/img/${data?.data[2].img}`)} alt='' className='w-full h-full' />
                    </div>
                    <div className='col-[3/4] row-[1/3] bg-[green]'>
                        <img src={require(`../assets/img/${data?.data[3].img}`)} alt='' className='w-full h-full' />
                    </div>
                    <div className='col-[4/5] row-[1/2 bg-[black]'>
                        <img src={require(`../assets/img/${data?.data[4].img}`)} alt='' className='w-full h-full' />
                    </div>
                    <div className='col-[4/5] row-[2/3] bg-[gray]'>
                        <img src={require(`../assets/img/${data?.data[5].img}`)} alt='' className='w-full h-full' />
                    </div>
                </>
            )}
        </div>
    )
}

export default GridProduct
