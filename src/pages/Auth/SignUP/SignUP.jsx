import { Link, useNavigate } from 'react-router-dom';

import { Button, Divider, Form, Input, Typography } from 'antd';

import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import { useAuth } from '@/context/AuthProvider';

import { Google, Lock, Person } from '@mui/icons-material';

const SignIN = () => {
  const { setUser, setLoading, auth, MyToastify } = useAuth()
  const navigate = useNavigate()

  const getValues = values => checkEmail(values)

  const checkEmail = (values) => {
    const email = values.email
    const password = values.password
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|proton\.me|protonmail\.com)$/;
    const validEmail = emailRegex.test(email);

    if (!validEmail) {
      MyToastify({ messageText: 'Email is not valid', messageType: 'warn' })
      return
    }
    handelSingUp({ email, password })
  }

  const handelSingUp = async ({ email, password }) => {
    setLoading(true)
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setUser(user)
      MyToastify({ messageText: 'SignIn successFully', messageType: 'success' })
      navigate('/auth/sign-in')
    } catch (error) {
      MyToastify({ messageText: `${error}`, messageType: 'error' })
      console.log('error', error)
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
      MyToastify({ messageText: `${error}`, messageType: 'error' })
      console.log('error', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col gap-3 justify-center items-center h-screen'>
      <Typography.Title>
        SignUP
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
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input prefix={<Person />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password prefix={<Lock />} placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The new password that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<Lock />} placeholder='Confirm Password' />
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit" className='bg-myPink!'>
              Sign UP
            </Button>
            Already have an account <Link to='/auth/sign-in' className='text-myPink!'>Sign In</Link>
          </Form.Item>
          <Divider size='large' className='border-myPink!'>continua with</Divider>
          <Form.Item>
            <Button block className='bg-myPink! text-myWhite!' onClick={singInGoogle}>
              <Google />
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div >
  );
};
export default SignIN;