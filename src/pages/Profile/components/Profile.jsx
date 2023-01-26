import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../../../app/client';
import { ProfileLink } from '../../../entities/ProfileLink';
import { userCreatedPinsQuery, userQuery } from '../../../shared/api/clientQueries';
import { LoaderPin, LogOutBtn } from '../../../shared/ui';
import { Pins } from '../../../widgets/Pins';
import '../styles/style.scss'
const Profile = () => {
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [pins, setPins] = useState([])
    const [user, setUser] = useState(null);

    const [btnsList, setBtnsList] = useState([
        { title: "Created", active: false },
        { title: "Saved", active: false },
    ])
    const selectBtn = (title) => {
        const btnsListCopy = JSON.parse(JSON.stringify(btnsList));
        btnsListCopy.forEach(element => {
            element.active = false;
            if (element.title === title) {
                element.active = true;
            }
        });
        setBtnsList(btnsListCopy);
    }
    useEffect(() => {
        setLoading(true);
        client.fetch(userQuery(params.profileId))
            .then((data) => {
                // console.log(data[0]);
                setUser(data[0]);
            })
    }, [params.profileId])

    useEffect(() => {
        if (btnsList[0].active) {
            client.fetch(userCreatedPinsQuery(user?._id))
                .then((data) => {
                    setPins(data)
                })
        } else {
            let savedPins = [];
            user?.save?.forEach(element => {
                savedPins.push(element.pin);
            });
            setPins(savedPins)
        }

    }, [btnsList])
    if (!loading) return (
        <LoaderPin />
    )
    else {
        return (
            <section className='profile_section'>
                <div className="container">
                    <div className="profile">
                        <div className="info">
                            <ProfileLink icon={user?.image} profileId={user?._id} />
                            <h1 className="userName">
                                {user?.userName}
                            </h1>
                            <div className="user_id">
                                @{user?._id}
                            </div>
                            <div className="logout">
                                <LogOutBtn />
                            </div>
                            <div className="pins_btns">
                                {
                                    btnsList.map((btn, index) => (
                                        <div
                                            className={`pin_btn ${btn.active ? "active" : ""}`}
                                            key={index}
                                            onClick={() => { selectBtn(btn.title) }}
                                        >
                                            {btn.title}
                                        </div>
                                    ))
                                }
                            </div>
                            <div className='container'>
                                <Pins pins={pins} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

};

export { Profile };