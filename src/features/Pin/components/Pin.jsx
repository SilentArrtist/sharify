import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { MdDelete } from 'react-icons/md';
import { getUser } from '../../../shared/utils/getUser';
import { client } from '../../../app/client';
import { savePin } from '../../../shared/utils/savePin';
import { DownloadBtn } from '../../../shared/ui';
import { ProfileLink } from '../../../entities/ProfileLink';
import { useEffect } from 'react';
import '../styles/style.scss'
const Pin = ({ pin }) => {
    const navigate = useNavigate()
    const user = getUser();
    const [savingPin, setSavingPin] = useState(false)
    const [pinSaved, setPinSaved] = useState([])
    const savePinFunction = (e) => {
        e.stopPropagation();
        savePin(client, uuidv4, setSavingPin, pinSaved, setPinSaved, pin, user._id);
    }
    const deletePin = (e, id) => {
        e.stopPropagation();
        client
            .delete(id)
            .then(() => {
                window.location.reload();
            })
    };
    useEffect(() => {
        let saved = pin?.save?.filter((item) => item?.postedBy?._id === user?._id)
        saved = saved?.length > 0 ? saved : [];
        setPinSaved(saved)
    }, [pin])
    return (
        <div
            className='pin'
            onClick={() => { navigate(`/pin/${pin._id}`) }}
        >
            <div className="image">
                <img src={pin?.image?.asset?.url} alt="" />
            </div>
            <div className="posted_by">
                <ProfileLink icon={pin?.postedBy?.image} profileId={pin?.postedBy?._id} />
                <div className="userName">
                    {pin?.postedBy?.userName}
                </div>
            </div>
            <DownloadBtn link={pin?.image?.asset?.url} />
            {
                user?._id === pin?.postedBy?._id
                &&
                <div
                    className='delete_btn'
                    onClick={(e) => deletePin(e, pin?._id)}
                >
                    <MdDelete />
                </div>
            }
            {(pin?.postedBy?._id !== user?._id) &&
                <div className="save" onClick={(e) => { savePinFunction(e) }}>
                    {pinSaved?.length !== 0
                        ?
                        "SAVED"
                        :
                        savingPin
                            ?
                            "SAVING..."
                            :
                            "SAVE"
                    }
                </div>
            }
        </div>
    );
};

export { Pin };