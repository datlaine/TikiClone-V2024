import React from 'react'

const ShopSketeton = () => {
      return (
            <div className='w-full min-h-screen h-max'>
                  <div className='w-full xl:w-[1240px] mx-auto  h-[500px]'>
                        <header className='relative w-full h-[250px] xl:h-[150px]'>
                              <div className='animate-pulse bg-slate-300 absolute z-[4] w-full h-full inset-0 flex flex-col gap-[60px] xl:gap-0 xl:justify-between p-[18px_24px] content-between '>
                                    <div className='flex  items-center  gap-[18px]'>
                                          <div className='w-[60px] h-[60px]  bg-slate-200 rounded-full'></div>
                                          <div className=' w-[150px] h-[70px] xl:ml-0 flex justify-center flex-col gap-[10px] xl:gap-[20px]'>
                                                <p className='bg-slate-200 h-[25px] text-white'></p>
                                                <div className='bg-slate-200 h-[25px] text-[13px] '></div>
                                          </div>
                                    </div>
                                    <div className='animate-pulse bg-slate-300 ml-[-40px] xl:ml-0 min-h-[24px] h-[100px] xl:h-[40px] flex flex-col xl:flex-row  items-center w-full mt-[-30px] xl:mt-[16px] overflow-hidden'>
                                          <div className='ml-[93px] xl:ml-0 w-full h-[100px] xl:h-[40px] xl:w-[70%] flex items-center justify-between overflow-x-scroll xl:overflow-visible '>
                                                {Array(3)
                                                      .fill(0)
                                                      .map((btn, index) => (
                                                            <button
                                                                  className={`bg-slate-200 relative pb-[4px] xl:pb-[8px] min-w-[150px] w-max h-[50px] xl:h-[30px]`}
                                                                  key={index}
                                                            ></button>
                                                      ))}
                                          </div>
                                          <div className='ml-auto bg-slate-200 w-[320px] h-[40px]  rounded-lg'></div>
                                    </div>
                              </div>
                        </header>
                        <div className='animate-pulse bg-slate-200 p-[40px] w-full h-[500px] flex gap-[40px] mt-[50px]'>
                              <div className='w-[20%] h-full bg-slate-300'></div>
                              <div className='w-[70%] h-full bg-slate-300'></div>
                        </div>
                  </div>
            </div>
      )
}

export default ShopSketeton
