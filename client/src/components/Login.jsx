import React from 'react'
import { assets } from '../assets/assets'

const Login = () => {
  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
      
        <form className='relative bg-white p-10 rounded-xl text-slate-500'>
            <h1 className='text-center text-2xl text-neutral-700 font-medium'>Sign Up</h1>
            <p className='text-sm'>Welcome back! Please sign in to continue</p>

            <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                <img src={assets.user_icon} alt=""/>
                <input type="text" className='outline-none tetx-sm' placeholder='Full Name' required/>
            </div>

            <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5'>
                <img src={assets.email_icon} alt=""/>
                <input type="email" className='outline-none tetx-sm' placeholder='Email id' required/>
            </div>

            <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                <img src={assets.lock_icon} alt=""/>
                <input type="password" className='outline-none tetx-sm' placeholder='Password' required/>
            </div>

            <p className='text-sm text-blue-600 my-4 cursor-pointer'>Forgot Password?</p>

            <button className='bg-blue-600 w-full text-white py-2 rounded-full'>Create Account</button>

            <p className='mt-5 text-center'>Don't have an account? <span className='text-blue-600 cursor-pointer'>Sign Up</span></p>
            
            <p className='mt-5 text-center'>Already have an account? <span className='text-blue-600 cursor-pointer'>Login</span></p>

           <img src={assets.close_icon} alt="" className='absolute top-5 right-5 cursor-pointer'/>
        </form>

    </div>
  )
}

export default Login
