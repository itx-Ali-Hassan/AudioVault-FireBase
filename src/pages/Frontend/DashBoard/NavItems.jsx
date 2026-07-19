import { AccountCircle, FileUpload, FormatListBulleted, Home, Settings } from '@mui/icons-material';

export const NavItem = ({ setSelectedKey, navigate }) => {
    const items = [
        {
            key: '1',
            label: 'Home',
            icon: <Home className='text-2xl!' />,
            onClick: () => { navigate('/'); setSelectedKey('1'); }
        },
        {
            key: '2',
            label: 'Upload',
            icon: <FileUpload className='text-2xl!' />,
            onClick: () => { navigate('/upload'); setSelectedKey('2'); }
        },
        {
            key: '3',
            label: 'All Songs',
            icon: <FormatListBulleted className='text-2xl!' />,
            onClick: () => { navigate('/all-songs'); setSelectedKey('3'); }
        },
        {
            key: '5',
            label: 'Profile',
            // icon: <Avatar src={user.photoURL} referrerPolicy="no-referrer" size={'large'} />,
            icon: <AccountCircle className='text-2xl!' />,
            onClick: () => { navigate('/profile'); setSelectedKey('5'); }
        },
        {
            key: '4',
            label: 'Setting',
            icon: <Settings className='text-2xl!' />,
            onClick: () => { navigate('/setting'); setSelectedKey('4'); }
        },
    ]
    return items
}