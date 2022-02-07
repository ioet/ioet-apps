import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Box from '@mui/material/Box';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useGoogleLogout } from 'react-google-login';
import config from "../../config.json";


export const AppMenu = (props) => {
    const { setUser } = useContext(UserContext);
    const { signOut } = useGoogleLogout({
        clientId: config.googleClientId,
        onLogoutSuccess: () => setUser(null)
    });

    return (
        <Box>
            <Menu
                open={props.isVisible}
                anchorEl={props.anchorElement}
                onClose={() => props.setVisibility(false)}
                MenuListProps={{
                    'aria-labelledby': 'lock-button',
                    role: 'listbox',
                }}
            >
                <MenuList>
                    <MenuItem onClick={signOut}>Sign Out</MenuItem>
                </MenuList>
            </Menu>
        </Box>
    );
}
