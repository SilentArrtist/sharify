import React from 'react';
import '../styles/style.scss'
import { Logo } from '../../../shared/ui';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../../../shared/utils/deleteUser';
import { getUser } from '../../../shared/utils/getUser';
import { ProfileLink } from '../../../entities/ProfileLink';

const Search = ({ searchQuery, setSearchQuery }) => {
    const user = getUser();
    const navigate = useNavigate()
    const logOut = () => {
        deleteUser();
        navigate('/', { replace: true })
    }
    return (
        <div className='search_wrapper'>
            <div className="search">
                <Logo />
                <input
                    type="text"
                    placeholder='Search'
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value) }}
                />
            </div>
            <ProfileLink icon={user.image} profileId={user._id} />
        </div>
    );
};

export { Search };