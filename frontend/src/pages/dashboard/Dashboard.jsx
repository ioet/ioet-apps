import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../App';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { Icon } from './Icon';
import { AppMenu } from './AppMenu';
import { Loading } from '../../components/Loading';
import appService  from '../../services/appsService';
import './Dashboard.css';

export const Dashboard = () => {
    const { user } = useContext(UserContext);
    const [anchorElement, setAnchorElement] = useState(null);
    const [isMenuVisible, setMenuVisibility] = useState(false);
    const [apps, setApps] = useState([]);

    useEffect(() => {
        appService.getApps(user.email).then(apps => setApps(apps));
    }, [user]);

    return (
        <>
            <AppBar position="static">
                <Toolbar disableGutters className='toolbar'>
                    <Box className="username">
                        <Box src="ioet-logo.png" component="img" className="login-screen-ioet-logo"/>
                        <Typography variant="subtitle1" noWrap component="div" className="username-text">
                            {user.name}
                        </Typography>
                    </Box>
                    <Box className="avatar">
                        <Avatar alt={user.name} src={user.imageUrl}/>
                        <IconButton
                            size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}
                            className="menu-button"
                            onClick={(event) => {setMenuVisibility(true); setAnchorElement(event.currentTarget);}}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

            <AppMenu isVisible={isMenuVisible} anchorElement={anchorElement} setVisibility={setMenuVisibility} />

            {
                apps.length > 0 ? <div className="content">
                    <div className="icons">
                        {apps.map(app => <Icon key={app.title} target={app.target} title={app.title} passToken={app.passToken} />)}
                    </div>
                </div> : <Loading />
            }
            
        </>
    );
}
