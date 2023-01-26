import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../../utils/deleteUser';
import '../styles/style.scss'
const LogOutBtn = () => {
    const navigate = useNavigate();
    return (
        <div className="LogOutBtn"
            onClick={() => {
                deleteUser();
                navigate('/login', { replace: true })
            }}
        >
            Leave
        </div>
    );
};

export { LogOutBtn };