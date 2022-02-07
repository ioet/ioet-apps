import { useContext, useState } from 'react';
import { UserContext } from '../../App';
import tokenService from '../../services/tokenService';
import CircularProgress from '@mui/material/CircularProgress';

import "./Icon.css";

export const Icon = (props) => {
    const { user } = useContext(UserContext);
    const [loadingToken, setLoadingToken] = useState(false);


    const onIconClicked = async () => {
        if (props.passToken) {
            setLoadingToken(true);
            const token = await tokenService.getValidToken(user.idToken);
            setLoadingToken(false);
            window.open(`${props.target}?token=${token}`, "_blank");
        } else {
            window.open(props.target, "_blank");
        }
    };

    return <div className="icon-container" onClick={onIconClicked}>
        { loadingToken ? <CircularProgress className="icon" /> : <img className="icon" src={`${props.target}/favicon.ico`} alt="" /> }
        <span className="icon-title">{props.title}</span>
    </div>
};
