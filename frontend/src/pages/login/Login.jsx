import { useContext } from 'react';
import { UserContext } from '../../App';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { GoogleLogin } from 'react-google-login';
import './Login.css';
import config from "../../config.json";

export const LogIn = () => {
    const { setUser } = useContext(UserContext);

    const loggedIn = (loginResponse) => {
        console.log('--------->>>>> login response', loginResponse);
        setUser({
            email: loginResponse.profileObj.email,
            name: loginResponse.profileObj.name,
            imageUrl: loginResponse.profileObj.imageUrl,
            idToken: loginResponse.tokenObj.id_token,
        });
    };

    const loginError = (response) => {
        console.error(response);
    }

    return (
        <Box className="login-screen-wrapper">
            <Card className="login-screen-card">
                <CardContent className="login-screen-content">
                    <Box src="ioet-logo.png" component="img" className="login-screen-ioet-logo"/>
                    <Typography variant="h5" gutterBottom component="div" className="ioet-screen-title">
                        ioet Apps
                    </Typography>
                    <Typography variant="body2" gutterBottom component="div" className="ioet-screen-description">
                        Login to get access to ioet apps
                    </Typography>
                </CardContent>
                <CardActions className="login-screen-actions">
                    <GoogleLogin
                        className="login-button"
                        clientId={config.googleClientId}
                        onSuccess={loggedIn}
                        onFailure={loginError}
                        cookiePolicy={'single_host_origin'}
                        accessType='offline'
                        responseType='code'
                    />
                </CardActions>
            </Card>
        </Box>
    );
};
