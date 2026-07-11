import { useState, useEffect } from 'react';
import { Layout, Menu, theme } from 'antd';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthProvider';

import HomeIcon from '@mui/icons-material/Home';
import FileUploadIcon from '@mui/icons-material/FileUpload'
import DownloadIcon from '@mui/icons-material/Download';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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

    const items = [
        {
            key: '1',
            label: 'Home',
            icon: <HomeIcon fontSize='large' />,
            onClick: () => { navigate('/'); setSelectedKey('1'); }
        },
        {
            key: '2',
            label: 'Upload',
            icon: <FileUploadIcon fontSize='large' />,
            onClick: () => { navigate('/upload'); setSelectedKey('2'); }
        },
        {
            key: '3',
            label: 'Download',
            icon: <DownloadIcon fontSize='large' />,
            onClick: () => { navigate('/download'); setSelectedKey('3'); }
        },
        {
            key: '5',
            label: 'Profile',
            // icon: <Avatar src={user.photoURL} referrerPolicy="no-referrer" size={'large'} />,
            icon: <AccountCircleIcon fontSize='large' />,
            onClick: () => { navigate('/profile'); setSelectedKey('5'); }
        },
        {
            key: '4',
            label: 'Setting',
            icon: <SettingsIcon fontSize='large' />,
            onClick: () => { navigate('/setting'); setSelectedKey('4'); }
        },
    ];

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
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
                <Menu theme="dark" defaultSelectedKeys={selectedKey} mode="inline" items={items} />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }} />
                <Content style={{ margin: '0 16px' }}>
                    <div className='p-5! border!'>
                        <Routes>
                            <Route path="/" element={"Home" } />
                            <Route path="/upload" element={"upload" } />
                            <Route path="/download" element={"Download" } />
                            <Route path="/profile" element={"Profile" } />
                            <Route path="/setting" element={"Setting" } />
                        </Routes>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Made by Ali Hassan ©{currentYear}
                </Footer>
            </Layout>
        </Layout>
    );
};
export default MyDashBoard;