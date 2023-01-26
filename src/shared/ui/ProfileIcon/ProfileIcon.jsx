import '../styles/style.scss'
const ProfileIcon = ({ icon }) => {
    return (
        <div className="profile_icon">
            <img src={icon} alt="" />
        </div>
    );
};

export { ProfileIcon };