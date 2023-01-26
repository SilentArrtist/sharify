import '../styles/style.scss'
import { ProfileIcon } from '../../../shared/ui';
import { Link } from 'react-router-dom';

const ProfileLink = ({ icon, profileId }) => {
    return (
        <Link to={`/${profileId}`} onClick={(e) => { e.stopPropagation() }}>
            <ProfileIcon icon={icon} />
        </Link>
    );
};

export { ProfileLink };