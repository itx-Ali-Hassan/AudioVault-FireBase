import { Link } from 'react-router-dom';
import { Button, Divider, Form, Input, Typography } from 'antd';
import { useAuth } from '@/context/AuthProvider';
import { Google, Lock, Person } from '@mui/icons-material';

const SignIN = () => {
  const { checkEmail, signInGoogle } = useAuth();

  const getValues = values => checkEmail({ values, page: 'SIGN_IN' });

  return (
    <div className='flex flex-col gap-3 justify-center items-center h-screen'>
      <Typography.Title>SignIN</Typography.Title>
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
            rules={[{ required: true, message: "Please Enter you'r Email!" }]}
          >
            <Input prefix={<Person />} placeholder='Email' />
          </Form.Item>
          <Form.Item>
            <Form.Item
              name='password'
              rules={[{ required: true, message: "Please Enter you'r Password!" }]}
            >
              <Input prefix={<Lock />} type='password' placeholder='Password' />
            </Form.Item>
            <Link to='/auth/ForGotPassword' className='text-myPink!'>
              for got password
            </Link>
          </Form.Item>

          <Form.Item>
            <Button block type='primary' htmlType='submit' className='bg-myPink!'>
              Log in
            </Button>
            or Create an <Link to='/auth/sign-up' className='text-myPink!'>Account</Link>
          </Form.Item>
          <Divider variant='' size='large' className='border-myPink!'>
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

export default SignIN;