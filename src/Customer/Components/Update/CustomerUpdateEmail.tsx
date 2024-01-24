import { useSearchParams } from 'react-router-dom'
import { RootState } from '../../../store'
import { useSelector } from 'react-redux'

// () => api
const CustomerUpdateEmail = () => {
    const user = useSelector((state: RootState) => state.authentication.user)
    const emailLength = user.email.length
    // const emailFake = 'sdsssssssssssssssdsdsdsdssssdsdddddddddđssssssdsadsadsasssssssssssssssssssssss'
    console.log(emailLength, user.email)
    return (
        <div className='flex items-center justify-center w-full h-[200px]  '>
            <form
                className='flex flex-col gap-[6px]  min-w-[150px] sm:min-w-[400px]  max-w-auto h-full p-[15px] rounded-sm  border-[1px] border-stone-300'
                style={{ width: Number(user.email.length) * 10 }}
            >
                <label htmlFor='account_email_update'>Địa chỉ email</label>
                <div
                    className='w-full max-w-auto group flex gap-[10px] px-[16px] py-[2px] items-center border-[1px] border-blue-700'
                    tabIndex={0}
                >
                    <div className='icon w-[25px] h-[25px] bg-blue-50'></div>
                    <input className='w-full max-w-auto border-none' type='text' id='account_email_update' value={user.email} />
                    {/* <span className='w-[5px] h-[15px] bg-black hidden group-focus:inline'>x</span> */}
                </div>
                <button type='submit' className='w-full h-[45px] bg-blue-700 text-white rounded-md'>
                    Lưu thay đổi
                </button>
            </form>
        </div>
    )
}

export default CustomerUpdateEmail
