import React, { useState } from 'react'
import { Button, Checkbox, Divider, Form, Input, Typography, message } from 'antd'
import { useAuthContext } from 'contexts/AuthContext'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from 'config/firebase'
import { Link } from 'react-router-dom'

const { Title } = Typography

export default function Login() {

  const { readUserProfile } = useAuthContext()
  const [state, setState] = useState({ email: "", password: "" })
  const [isProcessing, setIsProcessing] = useState(false)

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

  const handleLogin = e => {
    e.preventDefault()

    let { email, password } = state

    setIsProcessing(true)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        readUserProfile(user)
      })
      .catch(err => {
        message.error("Something went wrong while signing user")
        console.error(err)
      })
      .finally(() => {
        setIsProcessing(false)
      })
  }

  return (
    <main className='auth'>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card p-3 p-md-4">
              <Title level={2} className='m-0 text-center'>Login</Title>

              <Divider />

              <Form layout="vertical">
                <Form.Item label="Email" name="email" hasFeedback
                  rules={[
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail !',
                    },
                    {
                      required: true,
                      message: 'Please input your E-mail !',
                    },
                  ]}>
                  <Input placeholder='Input your email' name='email' onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Password" name="password" hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Password!',
                    },
                  ]}
                >
                  <Input.Password placeholder='Input your password' name='password' onChange={handleChange} />
                </Form.Item>
                  <Form.Item name='remember' valuePropName="checked"
                     rules={[
                       {
                         validator: (_, value) =>
                         value ? Promise.resolve() : Promise.reject(new Error('Should accept Remember')),
                        },
                      ]}
                      >
                    <Checkbox >Remember me</Checkbox>
                  </Form.Item>
                <Button type='primary' htmlType='submit' className='w-100' loading={isProcessing} onClick={handleLogin}>Login</Button>
                    {/* <p className='mt-2'>
                    If you don't have an Account.
                    <Link to="/auth/register" className='text-decoration-none text-info'>
                   Register now !
                    </Link>
                    </p> */}
                      <p className='mb-0 text-center mt-4'>
                        &copy;2023. All Rights Reserved By <span className='fw-bold'>Zaman Ali</span>
                      </p>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
