import { auth } from '@/config/FireBase';
import { useAuth } from '@/context/AuthProvider';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';
const App = () => {
  const { setUser, SetLoading } = useAuth()

  const onFinish = values => {
    console.log('Received values of form: ', values);
    const googleMailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const isGoogleMail = googleMailRegex.test();
    if (isGoogleMail) handelSingIn()
    return alert("Wrong mail")
  };

  // const handelSingIn = async () => {
  //   SetLoading(true)
  //   try {
  //     await signInWithEmailAndPassword(auth, values.email, values.password)
  //   } catch (error) {
  //     console.log('error', error)
  //   } finally {
  //     SetLoading(false)
  //   }
  // }

  return (
    <div className='flex justify-center items-center h-screen'>
      <Form
        name="login"
        initialValues={{ size: 'large' }}
        size={'large'}
        style={{ maxWidth: 360 }}
        onFinish={onFinish}
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
          <Link>for got password</Link>
        </Form.Item>


        <Form.Item>
          <Button block type="primary" htmlType="submit" onClick={onFinish}>
            Log in
          </Button>
          or Create an <Link to='/auth/sign-up'>Account</Link>
        </Form.Item>
      </Form>
    </div>
  );
};
export default App;