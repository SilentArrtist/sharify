import { useNavigate } from 'react-router-dom';
import '../styles/style.scss'
const HeaderBtnWhite = ({ children, link }) => {
    const navigate = useNavigate();
    return (
        <div className="header_btn white" onClick={() => { navigate(link, { replace: true }) }}>
            {children}
        </div>
    );
};

export { HeaderBtnWhite };