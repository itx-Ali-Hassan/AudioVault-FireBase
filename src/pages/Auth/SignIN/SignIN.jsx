import { Link, useNavigate } from 'react-router-dom';

import { GoogleOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, Typography } from 'antd';

import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth/web-extension';

import { useAuth } from '@/context/AuthProvider';

const SignIN = () => {
  const { setUser, setLoading, auth, MyToastify } = useAuth()
  const navigate = useNavigate()

  const getValues = values => checkEmail(values)

  const checkEmail = (values) => {
    const email = values.email
    const password = values.password
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|proton\.me|protonmail\.com)$/;
    const validEmail = emailRegex.test(email);

    if (validEmail) handelSingIn(email, password)
    if (!validEmail) MyToastify({ messageText: 'Email is not valid', messageType: 'warn' })
  }

  const handelSingIn = async (email, password) => {
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      MyToastify({ messageText: 'SignIn successFully', messageType: 'success' })
      navigate('/')
    } catch (error) {
      MyToastify({ messageText: 'there is an error', messageType: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const singInGoogle = async () => {
    setLoading(true)
    const provider = new GoogleAuthProvider()

    try {
      const result = await signInWithPopup(auth, provider)
      const userData = result.user
      setUser(userData)
      MyToastify({ messageText: 'SignIn successFully', messageType: 'success' })
      navigate('/')
    } catch (error) {
      MyToastify({ messageText: 'there is an error', messageType: 'error' })
      console.log('error', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col gap-3 justify-center items-center h-screen'>
      <Typography.Title>
        SignIN
      </Typography.Title>
      <div>
        <Form
          name="login"
          initialValues={{ size: 'large' }}
          size={'large'}
          style={{ maxWidth: 360 }}
          onFinish={getValues}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please Enter you'r Email!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Please Enter you'r Password!" }]}
            >
              <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
            </Form.Item>
            <Link to='/auth/ForGotPassword' className='text-myPink!'>for got password</Link>
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit" className='bg-myPink!'>
              Log in
            </Button>
            or Create an <Link to='/auth/sign-up' className='text-myPink!'>Account</Link>
          </Form.Item>
          <Divider variant='' size='large' className='border-myPink!'>continua with</Divider>
          <Form.Item>
            <Button block className='bg-myPink! text-myWhite!'>
              <GoogleOutlined onClick={singInGoogle} />
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div >
  );
};
export default SignIN;