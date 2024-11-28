'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUserData } from '@/store'
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
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
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('login successful');
        const data = await response.json()
        console.log(data)
        //save user data in the store
        setUser({
          username: data.username,
          email: data.email
        })

        // Save the access token to localStorage
        localStorage.setItem('accessToken', data.access);  // Store access token
        localStorage.setItem('refreshToken', data.refresh);  // Store refresh token
        router.push("/")
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className='flex items-center justify-between gap-10'>
      <Card className="space-y-6 mt-20 overflow-hidden w-1/2 p-5">
        <h2 className="text-white text-3xl font-bold text-center">Welcome Back!</h2>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name='email'
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="mazharhussain@gmail.com"
          />
        </div>
        <div>
          <Label>Password</Label>
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              name='password'
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
            />
            <button
              type="button"
              className="absolute right-3 top-1 text-gray-400"
              onClick={() => { setShowPassword(!showPassword) }}
            >
              👁️
            </button>
          </div>
          <div className="mt-2">
            <button
              type="button"
              className="text-sm text-blue-500 hover:underline"
              onClick={() => router.push('/forgot-password')}
            >
              Forgot Password?
            </button>
          </div>
        </div>
        <Button
          type="submit"
          className="float-right w-full"
          onClick={handleSubmit}
        >
          Login
        </Button>
      </Card>
      <div className='w-full h-screen '>
      </div>
    </div>
  )
}

export default Login
