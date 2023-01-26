import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'
import { MdDelete } from 'react-icons/md';
import { client } from '../../../app/client';
import { ProfileLink } from '../../../entities/ProfileLink';
import { idPinQuery } from '../../../shared/api/clientQueries';
import { DownloadBtn, LoaderPin, SaveBtn } from '../../../shared/ui';
import { getUser } from '../../../shared/utils/getUser';
import { savePin } from '../../../shared/utils/savePin';
import '../styles/style.scss'
const PinDetails = () => {
    const [loading, setLoading] = useState(false);
    const [pin, setPin] = useState([]);
    const [savingPin, setSavingPin] = useState(false)
    const [pinSaved, setPinSaved] = useState([])
    const [comment, setComment] = useState('');
    const [addingComment, setAddingComment] = useState(false);
    const user = getUser();
    const navigate = useNavigate()
    const params = useParams();
    const savePinFunction = (e) => {
        e.stopPropagation();
        savePin(client, uuidv4, setSavingPin, pinSaved, setPinSaved, pin, user._id);
    }
    const addComment = () => {
        if (comment) {
            setAddingComment(true);

            client
                .patch(pin?._id)
                .setIfMissing({ comments: [] })
                .insert('after', 'comments[-1]', [{ comment, _key: uuidv4(), postedBy: { _type: 'postedBy', _ref: user._id } }])
                .commit()
                .then(() => {
                    setComment('');
                    setAddingComment(false);
                });
        }
    };
    const deletePin = (id) => {
        client
            .delete(id)
            .then(() => {
                navigate('/', { replace: true })
            });
    };
    useEffect(() => {
        setLoading(true);
        client.fetch(idPinQuery(params.id))
            .then((data) => {
                setPin(data[0])
                setLoading(false);
            })
    }, [params.id])

    useEffect(() => {
        let saved = pin?.save?.filter((item) => item?.postedBy?._id === user?._id)
        saved = saved?.length > 0 ? saved : [];
        setPinSaved(saved)
    }, [pin])
    console.log(pin);
    if (loading) return (
        <LoaderPin />
    )
    else {
        return (
            <section className='pin_details_section'>
                <div className="container">
                    <div className="pin_details">
                        <div className="details_block image">
                            <img src={pin?.image?.asset?.url} alt="" />
                        </div>
                        <div className="details_block info">
                            <div className="info__btns">
                                <div className="btns">
                                    <DownloadBtn link={pin?.image?.asset?.url} />
                                    {
                                        user?._id === pin?.postedBy?._id
                                        &&
                                        <div
                                            className='delete_btn'
                                            onClick={() => deletePin(pin?._id)}
                                        >
                                            <MdDelete fontSize={30} />
                                        </div>
                                    }
                                </div>
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
                            <div className="info__title">
                                {pin?.title}
                            </div>
                            <div className="info__about">
                                {pin?.about}
                            </div>
                            <div className="info__postedBy">
                                <ProfileLink icon={pin?.postedBy?.image} profileId={pin?.postedBy?._id} />
                                <div className="userName">
                                    {pin?.postedBy?.userName}
                                </div>
                            </div>
                            <div className="info__comments">
                                <div className="comments">
                                    {pin?.comments?.map((item) => (
                                        <div className="comment_block" key={item.comment}>
                                            <div className="profile">
                                                <Link to={`/${item.postedBy?._id}`}>
                                                    <img
                                                        src={item.postedBy?.image}
                                                        alt="user-profile"
                                                    />
                                                </Link>
                                                <p className="name">{item.postedBy?.userName}</p>
                                            </div>
                                            <div className='comment'>{item.comment}</div>
                                        </div>
                                    ))}

                                    <div className="add_comment_block">
                                        <div className="first">
                                            <Link to={`/${user._id}`}>
                                                <img src={user.image} className="user_comment_image" alt="user-profile" />
                                            </Link>
                                            <input
                                                type="text"
                                                placeholder="Add a comment"
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                            />
                                        </div>
                                        <div
                                            className='add_comment_btn'
                                            onClick={addComment}
                                        >
                                            {addingComment ? 'Doing...' : 'Done'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

};

export { PinDetails };