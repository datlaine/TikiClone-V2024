import { useState } from 'react'
import Portal from '../Portal'
import AuthWrapper from './AuthWrapper'

const AuthPermission = () => {
      const [showBoxAuth, setShowBoxAuth] = useState(false)

      const handleAuth = () => {
            setShowBoxAuth(true)
      }

      return (
            <div className='bg-white w-full min-h-[80%] flex justify-center items-center text-[42px] font-bold gap-[20px]'>
                  <span>AuthPermission</span>
                  <button
                        className='text-[14px] font-normal w-[150px] h-[45px] hover:bg-slate-900 hover:text-white border-[1px] bg-white border-slate-900 text-slate-900 rounded-md'
                        onClick={handleAuth}
                  >
                        Đăng nhập
                  </button>
                  {showBoxAuth && (
                        <Portal>
                              <AuthWrapper setShowBoxAuth={setShowBoxAuth} />
                        </Portal>
                  )}
            </div>
      )
}

export default AuthPermission
