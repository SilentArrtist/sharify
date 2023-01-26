
import { LogoWhite } from '../../../shared/ui';
import { GoogleLogin } from "@react-oauth/google";
import { client } from '../../../app/client'
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../../shared/utils/setUser';
import shareVideo from '../../../shared/assets/share.mp4'
import jwt_decode from "jwt-decode";
import '../styles/style.scss'
const Login = () => {
    const navigate = useNavigate()
    const googleResponse = (response) => {
        const decode_response = jwt_decode(response.credential);;
        const { name, picture } = decode_response;
        const id = decode_response.email.split('@')[0];
        const doc = {
            _id: id,
            _type: 'user',
            userName: name,
            save: [],
            image: picture,
        }
        localStorage.setItem('user', JSON.stringify(doc))
        client.createIfNotExists(doc)
            .then((data) => {
                setUser(JSON.stringify(data))
                navigate('/', { replace: true })
            })
    }

    return (
        <div className="login">
            <div className="video">
                <video
                    src={shareVideo}
                    type='video/mp4'
                    loop
                    controls={false}
                    muted
                    autoPlay
                >
                </video>
            </div>
            <div className='login__wrapper'>
                <div className="block">
                    <LogoWhite />
                    <span className='logo_name'>Sharify</span>
                </div>
                <GoogleLogin
                    onSuccess={googleResponse}
                    onFailure={googleResponse}
                />
            </div>
        </div >
    );
};

export { Login };