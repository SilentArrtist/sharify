import { useNavigate } from 'react-router-dom';
import '../styles/style.scss'
const HeaderBtnBlack = ({ children, link, setSearchQuery }) => {
    const navigate = useNavigate();
    return (
        <div className="header_btn black" onClick={() => {
            setSearchQuery("");
            navigate(link, { replace: true })
        }}>
            {children}
        </div>
    );
};

export { HeaderBtnBlack };