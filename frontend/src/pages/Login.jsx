import axios from 'axios'
import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const {login} = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        toast.loading("Please await for verification...",{ id:"123"})
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", {email, password})
            if (response.data.success) {
                login(response.data.user)
                localStorage.setItem("token",response.data.token)
                if (response.data.user.role === "Admin") {
                    setTimeout(() => {
                         toast.success(response.data.message, { duration:5000,id:"123"})
                        navigate('/admin-dashboard')
                     },2000)
                }
                else{
                    setTimeout(() => {
                        //  navigate('/employee-dashboard')
                        toast.error("Not Authorized", {id:"123"})
                     },3000)
                    // navigate("/employee-dashboard")
                }
            }
        } catch (error) {
                if (error.response && !error.response.data.message) {
                     toast.error(error.response.data.error,{id:123})
                     setError(error.response.data.error)
                }
                else{
                     toast.error('Server Error')
                     setError('Server Error')
                }
        }
    }
  return (
    <div className='flex flex-col items-center h-screen justify-center font-bold bg-gradient-to-b from-[#41436A] from-50% to-white-300 to-50% space-y-6'>
            <h2 className='font-poppins text-3xl text-white'>HTP Membership Registration System</h2>
       <div className='border shadow p-6 w-80 bg-white rounded-md '>
            <h2 className='text-2xl font-bold mb-4'>Login</h2>
            {error && <p className='text-red-500'>{error}</p>}
       <form onSubmit={handleSubmit}>
            <div className='mb-4'>
                <label htmlFor="email" className='block text-gray-700'>Email</label>
                <input type="email" required className='w-full px-3 py-2 border'  placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className='mb-4'>
                <label htmlFor="password" className='block text-gray-700'>Password</label>
                <input type="password" required className=' w-full px-3 py-2 border' placeholder='*****' onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className='mb-4 flex items-center justify-between'>
                <label htmlFor="password" className='inline-flex items-center'>
                    <input type="checkbox" className='form-checkbox' />
                    <span className='ml-2  text-gray-700'>Remember me</span>
                </label>
                <a href="#" className='text-[#41436A] hover:text-[#3e44b7]'>Forgot password ?</a>
            </div>
            <div className="mb-4 ">
            <button type='submit' className='w-full bg-[#41436A] text-white py-2 rounded-md'>Login</button>
            </div>
        </form>
       </div>
    </div>
  )
}

export default Login