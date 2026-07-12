import { AccountCircle, Download, FileUpload, Home, Settings } from '@mui/icons-material';

export const NavItem = ({ setSelectedKey, navigate }) => {
    const items = [
        {
            key: '1',
            label: 'Home',
            icon: <Home />,
            onClick: () => { navigate('/'); setSelectedKey('1'); }
        },
        {
            key: '2',
            label: 'Upload',
            icon: <FileUpload />,
            onClick: () => { navigate('/upload'); setSelectedKey('2'); }
        },
        {
            key: '3',
            label: 'Download',
            icon: <Download />,
            onClick: () => { navigate('/download'); setSelectedKey('3'); }
        },
        {
            key: '5',
            label: 'Profile',
            // icon: <Avatar src={user.photoURL} referrerPolicy="no-referrer" size={'large'} />,
            icon: <AccountCircle />,
            onClick: () => { navigate('/profile'); setSelectedKey('5'); }
        },
        {
            key: '4',
            label: 'Setting',
            icon: <Settings />,
            onClick: () => { navigate('/setting'); setSelectedKey('4'); }
        },
    ]
    return items
}