import { Link } from 'react-router-dom';
import { Button, Divider, Form, Input, Typography } from 'antd';
import { Google, Lock, Person } from '@mui/icons-material';
import { useAuth } from '@/context/AuthProvider';

const SignUP = () => {
  const { checkEmail, signInGoogle } = useAuth();

  const getValues = values => checkEmail({ values, page: 'SIGN_UP' });

  return (
    <div className='flex flex-col gap-3 justify-center items-center h-screen'>
      <Typography.Title>SignUP</Typography.Title>
      <div>
        <Form
          name='login'
          initialValues={{ size: 'large' }}
          size={'large'}
          style={{ maxWidth: 360 }}
          onFinish={getValues}
        >
          <Form.Item
            name='email'
            rules={[
              { type: 'email', message: 'The input is not valid E-mail!' },
              { required: true, message: 'Please input your E-mail!' },
            ]}
          >
            <Input prefix={<Person />} placeholder='Email' />
          </Form.Item>

          <Form.Item
            name='password'
            rules={[{ required: true, message: 'Please input your password!' }]}
            hasFeedback
          >
            <Input.Password prefix={<Lock />} placeholder='Password' />
          </Form.Item>

          <Form.Item
            name='confirm'
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('The new password that you entered do not match!'),
                  );
                },
              }),
            ]}
          >
            <Input.Password prefix={<Lock />} placeholder='Confirm Password' />
          </Form.Item>

          <Form.Item>
            <Button block type='primary' htmlType='submit' className='bg-myPink!'>
              Sign UP
            </Button>
            Already have an account{' '}
            <Link to='/auth/sign-in' className='text-myPink!'>
              Sign In
            </Link>
          </Form.Item>
          <Divider size='large' className='border-myPink!'>
            continua with
          </Divider>
          <Form.Item>
            <Button block className='bg-myPink! text-myWhite!' onClick={signInGoogle}>
              <Google />
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignUP;