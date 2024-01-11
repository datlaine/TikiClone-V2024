type Props = {
      data: any[]
}

export default function HeaderResultSearch(props: Props) {
      const { data } = props

      return (
            <>
                  <div className=' absolute left-0 top-full right-0  m-h-25 overflow-hidden  rounded-[2px]  bg-white border-[1px] border-solid border-[#ccc] min-h-55 z-[9999] m-h-40'>
                        <div className='sanPhamTheoTen dienThoai:my-2 flex flex-col gap-y-2 overflow-hidden'>
                              {data.length === 0 && <span className='p-2 opacity-50'>Hãy nhập tìm kiếm</span>}

                              {data &&
                                    data?.map(
                                          (item: any, index: number) =>
                                                index <= 5 && (
                                                      <a
                                                            key={item.id}
                                                            href={`/Buy/${item.id}`}
                                                            className='hover:bg-blue-500 hover:ring-sky-300 p-2 hover:text-white rounded-md dienThoai:mx-2'
                                                      >
                                                            <span className='hover:text-white'>{item.name}</span>
                                                      </a>
                                                ),
                                    )}
                        </div>
                  </div>
            </>
      )
}
