import { useState } from 'react'
import BoxCenter from '../../ui/BoxCenter'
import ButtonAdd from './ButtonAdd'

const GridProductList = () => {
      const [numberProduct, setNumberProduct] = useState<number>(30)

      const handleAddNumberProduct = () => {
            setNumberProduct((prev) => prev + 30)
      }

      return (
            <>
                  <div className='mt-[10px] p-5 lg:p-0 lg:mt-[30px] grid grid-rows-[350px] lg:grid-rows-[350px] auto-rows-[350px] lg:auto-rows-[350px] grid-cols-3 lg:grid-cols-6 gap-[14px] lg:gap-[12px]'>
                        <div className='hidden lg:block lg:col-[1/3] bg-white rounded-lg'>
                              <img src={require('../assets/img/ImgFirst/itemSpe1.png')} alt='' className='w-full h-full' />
                        </div>
                        <div className='bg-[green] '>
                              <div className='h-full px-[10px] py-[5px]  flex flex-col gap-1'>
                                    <div className='basis-[55%] lg:basis-[45%]  bg-[blue]'>img</div>
                                    <div className='basis-[4%] lg:basis-[8%] bg-[pink]'>label</div>
                                    <div className='basis-[30%] lg:basis-[35%] lg:grow bg-[yellow] flex flex-col gap-1 overflow-hidden'>
                                          <p className='grow lg:basis-[65%] truncate  w-full bg-[orange]'>
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas dignissimos quis fugit est
                                                cumque quidem nesciunt ab doloribus reprehenderit accusamus magni impedit, nulla beatae
                                                suscipit, corrupti tenetur quia pariatur quaerat! Quasi alias vitae iusto veritatis
                                                molestiae quod architecto saepe doloremque! Quod voluptatum, unde officiis eos vero ducimus
                                                temporibus magni porro alias repellat minima inventore tempora? Ad optio aliquid inventore
                                                autem. Dignissimos, sit nihil. Laboriosam cumque exercitationem consequuntur quo quam
                                                accusantium minima, nostrum sapiente tempora distinctio quod pariatur libero inventore illo,
                                                ab error. Ea qui similique cumque minima voluptatem? Dolorem, distinctio.
                                          </p>
                                          <p>8000000</p>
                                    </div>
                                    <div className='basis-[6%] lg:basis-[10%] bg-[gray]'>time</div>
                              </div>
                        </div>

                        {Array(numberProduct)
                              .fill(0)
                              .map((item: any, index) => {
                                    return (
                                          <div className='rounded-sm'>
                                                <div className='h-full px-[10px] py-[5px] bg-white flex flex-col gap-1'>
                                                      <div className='basis-[55%] lg:basis-[45%]  bg-[blue]'>img</div>
                                                      <div className='basis-[4%] lg:basis-[8%] bg-[pink]'>label</div>
                                                      <div className='basis-[30%] lg:basis-[35%] lg:grow bg-[yellow] flex flex-col gap-1 overflow-hidden'>
                                                            <p className='grow lg:basis-[65%] truncate  w-full bg-[orange]'>
                                                                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
                                                                  dignissimos quis fugit est cumque quidem nesciunt ab doloribus
                                                                  reprehenderit accusamus magni impedit, nulla beatae suscipit, corrupti
                                                                  tenetur quia pariatur quaerat! Quasi alias vitae iusto veritatis molestiae
                                                                  quod architecto saepe doloremque! Quod voluptatum, unde officiis eos vero
                                                                  ducimus temporibus magni porro alias repellat minima inventore tempora? Ad
                                                                  optio aliquid inventore autem. Dignissimos, sit nihil. Laboriosam cumque
                                                                  exercitationem consequuntur quo quam accusantium minima, nostrum sapiente
                                                                  tempora distinctio quod pariatur libero inventore illo, ab error. Ea qui
                                                                  similique cumque minima voluptatem? Dolorem, distinctio.
                                                            </p>
                                                            <p>8000000</p>
                                                      </div>
                                                      <div className='basis-[6%] lg:basis-[10%] bg-[gray]'>time</div>
                                                </div>
                                          </div>
                                    )
                              })}

                        <div className='bg-[green] '>
                              <div className='h-full px-[10px] py-[5px] bg-[red] flex flex-col gap-1'>
                                    <div className='basis-[55%] lg:basis-[45%]  bg-[blue]'>img</div>
                                    <div className='basis-[4%] lg:basis-[8%] bg-[pink]'>label</div>
                                    <div className='basis-[30%] lg:basis-[35%] lg:grow bg-[yellow] flex flex-col gap-1 overflow-hidden'>
                                          <p className='grow lg:basis-[65%] truncate  w-full bg-[orange]'>
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas dignissimos quis fugit est
                                                cumque quidem nesciunt ab doloribus reprehenderit accusamus magni impedit, nulla beatae
                                                suscipit, corrupti tenetur quia pariatur quaerat! Quasi alias vitae iusto veritatis
                                                molestiae quod architecto saepe doloremque! Quod voluptatum, unde officiis eos vero ducimus
                                                temporibus magni porro alias repellat minima inventore tempora? Ad optio aliquid inventore
                                                autem. Dignissimos, sit nihil. Laboriosam cumque exercitationem consequuntur quo quam
                                                accusantium minima, nostrum sapiente tempora distinctio quod pariatur libero inventore illo,
                                                ab error. Ea qui similique cumque minima voluptatem? Dolorem, distinctio.
                                          </p>
                                          <p>8000000</p>
                                    </div>
                                    <div className='basis-[6%] lg:basis-[10%] bg-[gray]'>time</div>
                              </div>
                        </div>
                        {/* <div className='bg-[yellow]'></div> */}
                        {/* <div className='bg-[pink]'></div> */}

                        {/* <div className='bg-[blue]'></div> */}
                        {/* <div className='bg-[gray]'></div> */}

                        {/* <div className='bg-[green]'></div> */}
                        {/* <div className='bg-[yellow]'></div> */}
                        {/* <div className='bg-[pink]'></div> */}

                        {/* <div className='bg-[blue]'></div> */}
                        {/* <div className='bg-[gray]'></div> */}
                  </div>
                  <div onClick={handleAddNumberProduct}>
                        <BoxCenter content={<ButtonAdd />} />
                  </div>
            </>
      )
}

export default GridProductList
