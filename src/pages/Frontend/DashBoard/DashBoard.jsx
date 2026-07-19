import { useState, useEffect } from 'react';
import { Layout, Menu, } from 'antd';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import UploadAudio from './Upload/Upload';
import ViewSongs from './Songs/ViewSongs';
import UserProfile from './User/Profile';
import UserSetting from './Setting/Setting';
import { NavItem } from './NavItems.jsx';
import Home from './Home/Home';


const { Header, Content, Footer, Sider } = Layout;

const MyDashBoard = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const getSelectedKey = (pathname) => {
        if (pathname.endsWith('/upload')) return '2';
        if (pathname.endsWith('/download')) return '3';
        if (pathname.endsWith('/profile')) return '5';
        if (pathname.endsWith('/setting')) return '4';
        return '1';
    };

    const [selectedKey, setSelectedKey] = useState(() => getSelectedKey(location.pathname));

    useEffect(() => {
        setSelectedKey(getSelectedKey(location.pathname));
    }, [location.pathname]);

    const [collapsed, setCollapsed] = useState(false)
    const currentYear = new Date().getFullYear();
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
                <div className={`flex items-center justify-center font-bold tracking-wider transition-all duration-300 ease-in-out my-5 mx-5
                ${collapsed
                        ? "text-xl w-10 h-10 bg-zinc-800 rounded-lg text-myPink! mx-auto shadow-md"
                        : "text-2xl text-transparent bg-clip-text bg-linear-to-r from-myWhite! via-myPink! to-myPink! px-2 justify-start w-full"}
                `}>
                    {collapsed ? "AV" : "Audio Vault"}
                </div>
                <Menu theme="dark" defaultSelectedKeys={selectedKey} mode="inline" items={NavItem({ setSelectedKey, navigate })} />
            </Sider>
            <Layout className='bg-myWhite!'>
                <Content style={{ margin: '0 16px' }} className='my-3!'>
                    <div className='w-full h-full!'>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/upload" element={<UploadAudio />} />
                            <Route path="/all-songs" element={<ViewSongs />} />
                            <Route path="/profile" element={<UserProfile />} />
                            <Route path="/setting" element={<UserSetting />} />
                        </Routes>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }} className='bg-[#222234]! text-myWhite!'>
                    Made by Ali Hassan ©{currentYear}
                </Footer>
            </Layout>
        </Layout>
    );
};
export default MyDashBoard;