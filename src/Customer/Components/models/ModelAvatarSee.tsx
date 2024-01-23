import React, { useEffect, useRef } from 'react'
import { RootState } from '../../../store'
import { useSelector } from 'react-redux'
import { Image, Trash2, X } from 'lucide-react'
import { TAvatarActions } from '../../../reducer/customer.reducer'
import { useQuery, useMutationState } from '@tanstack/react-query'
import axiosCustom from '../../../apis/http'
import Account from '../../../apis/account.api'
import { TUserAvatarUsed } from '../../../types/axiosResponse'

type TProps = {
      modeDispatch: React.Dispatch<TAvatarActions>
}

const ModelAvatarSee = (props: TProps) => {
      const { modeDispatch } = props
      const user = useSelector((state: RootState) => state.authentication.user)
      const refContainer = useRef<HTMLDivElement>(null)
      const userAvatarUsed = useQuery({
            queryKey: ['avatar-used'],
            queryFn: () => Account.getAllAvatar(),
      })

      useEffect(() => {
            const clickGlobal = (e: MouseEvent) => {
                  if (!refContainer?.current?.contains(e.target as Node)) {
                        modeDispatch({ type: 'CLOSE_MODE_AVATAR_SEE', payload: { modeAvatarSee: false, boxModeAvatar: false } })
                  }
            }
            document.addEventListener('click', clickGlobal)

            return () => document.removeEventListener('click', clickGlobal)
      }, [])

      const modelControllClose = () => {
            modeDispatch({ type: 'CLOSE_MODE_AVATAR_SEE', payload: { modeAvatarSee: false, boxModeAvatar: false } })
      }

      const convertDateToString = (date: Date) => {
            console.log({ date })
            date = new Date(date)
            return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
      }

      const data = useMutationState({ filters: { mutationKey: ['getMe'] }, select: (mutation) => mutation.state.data })
      console.log({ data })
      return (
            <div
                  className='fixed top-0 left-0 bg-[rgba(0,0,0,.7)] w-full min-h-screen z-[500] flex items-center justify-center'
                  onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
                        modeDispatch({ type: 'CLOSE_MODE_AVATAR_SEE', payload: { modeAvatarSee: false, boxModeAvatar: false } })
                  }
            >
                  <div
                        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation()}
                        className='scroll-pt-[50px] w-[650px] min-h-[200px] h-[auto] max-h-[600px] bg-white  p-[40px] relative shadow-2xl overflow-y-scroll'
                  >
                        <div className='absolute text-[25px] max-w-max top-[25px] right-[25px]' onClick={modelControllClose}>
                              <X />
                        </div>
                        <div className='h-[10%] flex items-center mb-[15px]'>Xem ảnh đại diện</div>
                        <div className='h-[1px] bg-stone-100'></div>
                        <div className='w-full h-[250px] rounded-full mt-[30px] flex justify-center'>
                              <img
                                    src={user.avatar?.secure_url || user.avartar_url_default || ''}
                                    alt='user_avatar'
                                    className='w-[250px] h-full '
                              />
                        </div>
                        <div className='mt-[70px] w-full min-h-[360px] h-auto flex flex-col gap-[20px] '>
                              <span>Các hình đại diện trước đó</span>
                              {userAvatarUsed.isSuccess ? (
                                    <div className='flex gap-[45px] mb-[70px] min-h-[360px] h-auto flex-wrap '>
                                          {userAvatarUsed?.data?.data.metadata?.avatar_used?.map((avatar: TUserAvatarUsed) => (
                                                <div className='w-[45%] relative'>
                                                      <img
                                                            src={avatar?.secure_url}
                                                            loading='lazy'
                                                            className='w-full min-h-full rounded-tr-md'
                                                            alt='avatar_used[]'
                                                      />
                                                      <p className='absolute top-0 right-0 bg-slate-700 text-white min-w-[60px] px-[6px] py-[2px]'>
                                                            {avatar.date_update ? convertDateToString(avatar.date_update) : 'none'}
                                                      </p>
                                                      <div className='absolute bg-white rounded-md bottom-0 right-0 w-[40px] h-[30px] p-[4px] border-[1px] border-slate-700 text-slate-700 hover:bg-red-700 hover:border-red-700 hover:text-white flex justify-center items-center z-[2]'>
                                                            <Trash2 className='' />
                                                      </div>
                                                </div>
                                          ))}

                                          {userAvatarUsed?.data?.data.metadata?.avatar_used?.map((avatar: TUserAvatarUsed) => (
                                                <div className='w-[45%] relative'>
                                                      <img
                                                            src={avatar?.secure_url}
                                                            loading='lazy'
                                                            className='w-full min-h-full rounded-tr-md'
                                                            alt='avatar_used[]'
                                                      />
                                                      <p className='absolute top-0 right-0 bg-slate-700 text-white min-w-[60px] px-[6px] py-[2px]'>
                                                            {avatar.date_update ? convertDateToString(avatar.date_update) : 'none'}
                                                      </p>
                                                      <div className='absolute bg-white rounded-md bottom-0 right-0 w-[40px] h-[30px] p-[4px] border-[1px] border-slate-700 text-slate-700 hover:bg-red-700 hover:border-red-700 hover:text-white flex justify-center items-center z-[2]'>
                                                            <Trash2 className='' />
                                                      </div>
                                                </div>
                                          ))}
                                    </div>
                              ) : (
                                    <div className='w-full h-full flex gap-[15px]'>
                                          <div className='animate-pulse bg-gray-200 rounded-lg basis-[50%] h-[360px] flex justify-center items-center '>
                                                <Image size={40} />
                                          </div>
                                          <div className='animate-pulse bg-gray-200 rounded-lg basis-[50%] h-[360px] flex justify-center items-center '>
                                                <Image size={40} />
                                          </div>
                                    </div>
                              )}
                        </div>

                        <span>
                              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque consectetur atque dicta ab maiores odit
                              tempore non? Officia voluptates minima quasi. Quod assumenda doloribus quidem minima harum aperiam possimus
                              voluptate. Doloremque laudantium temporibus, tempore ab dicta fugiat rem enim mollitia omnis eum, maiores vero
                              ratione, sapiente eaque labore reiciendis veritatis natus molestias! Tenetur, hic! Nobis, quae minima.
                              Commodi, nisi animi. Quas modi quam eum distinctio, aliquid rerum iusto necessitatibus quidem, explicabo quod
                              assumenda impedit ea culpa eaque, asperiores veniam sint. Suscipit adipisci eius quia odio quidem eos possimus
                              cum reprehenderit! Ex est id perferendis similique autem quo delectus obcaecati quam, doloremque sint eum
                              mollitia unde harum et. Nulla aliquid nemo numquam maiores amet veritatis doloribus, quisquam ipsa animi
                              asperiores! In? Pariatur, ducimus sed repellat rerum, tempora unde suscipit aliquam illum repudiandae ab quasi
                              natus aut corrupti inventore fuga ratione aspernatur accusamus voluptates possimus ex placeat recusandae quae
                              ipsa adipisci? Voluptatem. Delectus ipsam itaque, pariatur quidem dolores soluta dolorum aut perferendis velit
                              est. Tempora, deleniti amet. Ducimus corrupti, expedita quia optio possimus mollitia enim cum obcaecati sunt
                              consequuntur quod asperiores eveniet. Quia laboriosam maiores iusto dolor ratione saepe explicabo sint illum
                              ipsum itaque odio nostrum mollitia, voluptatem officia, tempore, enim veniam accusantium? Quidem, voluptate
                              recusandae omnis alias porro illum suscipit facilis. Quas quod vero excepturi illum neque? Debitis sit
                              delectus officiis et? Ad quaerat minima eveniet voluptatum officiis modi tempora quo nulla quae quisquam est,
                              iure suscipit nisi vero totam? Dolorum! Cum praesentium eius cumque! Asperiores nulla nobis libero, tenetur
                              necessitatibus vel hic? Voluptatem sint odio quia suscipit quisquam repellat hic eligendi eius expedita, in
                              tempore exercitationem deleniti doloremque accusantium. Maiores. Tempore commodi magni ratione iure, eos quia
                              earum porro. Tempora temporibus cumque quo aliquid voluptatum, illo libero aut error ex minima totam
                              blanditiis perferendis, obcaecati qui consequatur ratione animi. Tempore. Sapiente fuga molestias aperiam qui
                              totam, corporis modi ullam voluptatum ex, officia recusandae quae voluptatibus similique molestiae, impedit
                              non at eaque? Officia eius facere excepturi quo quasi. Mollitia, provident beatae? Quae dignissimos quisquam
                              laudantium nulla nobis enim eveniet, voluptates, velit, quia soluta perferendis dicta cum nam. Soluta,
                              perspiciatis, iusto, at dicta provident laudantium voluptatem aspernatur voluptatibus corporis eveniet dolore
                              necessitatibus! Assumenda reprehenderit placeat a architecto praesentium dolore. Adipisci illum, in labore
                              obcaecati eos molestiae vitae assumenda ratione, ipsum enim, accusantium ex incidunt esse eum atque quidem
                              alias officiis aperiam? Nam? Iusto itaque quis exercitationem autem, veniam quia voluptates minima officiis
                              totam commodi assumenda temporibus id quod ipsum. Alias autem id maiores, omnis non aspernatur. Nulla voluptas
                              odio praesentium non. Voluptate! Tenetur, reiciendis doloremque dolore quasi dicta vero ea nulla debitis
                              praesentium qui blanditiis quis facere enim at. Ex officiis nostrum obcaecati nam? Voluptatibus, in sapiente
                              aliquam recusandae optio totam inventore? Impedit, facilis tenetur. Provident magni soluta ullam quo
                              perspiciatis ipsum nobis, repellat at quae numquam obcaecati! Aspernatur, modi? Quibusdam harum doloribus
                              obcaecati qui quaerat consequatur facilis magnam sapiente vitae dignissimos. Ad aspernatur illum commodi illo
                              culpa explicabo ea suscipit numquam natus reiciendis hic necessitatibus nemo ipsa reprehenderit ex possimus
                              autem quibusdam, voluptates consequuntur recusandae. Animi vero est dolorum laboriosam quas! Aperiam vel
                              ratione sint. Iure voluptas ipsum, adipisci delectus est nobis repellendus blanditiis, ex quam hic id!
                              Obcaecati porro, possimus culpa quibusdam facere ipsa sunt nemo, incidunt officiis corrupti ullam. Architecto
                              sunt magni nesciunt doloribus quos nihil facere inventore! Laborum error, expedita quae, nam nobis
                              exercitationem incidunt ipsum eos consequuntur reprehenderit esse. Architecto deserunt corporis iste aliquam
                              velit, saepe repellat? Praesentium, a. Porro omnis excepturi natus eaque doloribus? Porro doloribus dolorem
                              temporibus consequuntur nisi voluptas quidem cum. Optio harum officiis nostrum similique recusandae!
                              Perferendis, nemo totam aut expedita sequi exercitationem.
                        </span>
                  </div>
            </div>
      )
}

export default ModelAvatarSee
