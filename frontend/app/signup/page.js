'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUserData } from '@/store'

function Signup() {
  const [showPassword, setShowPassword] = useState(false)
  const [exactPasswordLength, setExactPasswordLength] = useState(true)
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })
  const router = useRouter()
  const setUser = useUserData((state) => state.setUser)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    setExactPasswordLength(true)
    setIsEmailValid(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setIsEmailValid(false)
      return
    }

    // Validate password length
    if (formData.password.length < 12) {
      setExactPasswordLength(false)
      return
    }

    try {
      const response = await fetch('http://localhost:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.status === 201) {
        console.log('Signup successful')
        const data = await response.json()
        console.log(data)
        // Save user data in the store
        setUser({
          username: data.user.username,
          email: data.user.email,
        })

        router.push('/login')
      } else {
        console.error('Signup failed')
        // Handle failure
      }
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

  return (
    <div className=' min-h-screen flex items-center justify-center py-20 overflow-y-scroll no-scrollbar'>
      <div className="bg-black-900 rounded-lg shadow-lg p-8 border-2 w-1/2">
        <h2 className="text-white text-3xl font-bold text-center">Create An Account</h2>
        <form className="space-y-6 mt-6">
          <div>
            <label className="block text-gray-300">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="MazharHussain69xx"
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="mazharhussain@gmail.com"
              className={`w-full bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 ${
                isEmailValid ? 'focus:ring-green-500' : 'focus:ring-red-500'
              }`}
            />
            {!isEmailValid && (
              <p className="text-sm text-red-600">Please enter a valid email address.</p>
            )}
          </div>
          <div>
            <label className="block text-gray-300">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="********"
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {!exactPasswordLength && (
                <p className="text-sm text-red-600">Password must be at least 12 characters long.</p>
              )}
              <button
                type="button"
                className="absolute right-3 top-2 text-gray-400"
                onClick={() => {
                  setShowPassword(!showPassword)
                }}
              >
                👁️
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-green-900 py-2 rounded-md font-semibold hover:bg-gray-700 hover:text-green-300"
            onClick={handleSubmit}
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  )
}

export default Signup