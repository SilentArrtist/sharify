import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { client } from '../../../app/client';
import { useOutletContext } from "react-router-dom";
import { feedQuery, searchQueryFunction } from '../../../shared/api/clientQueries';
import { LoaderHome } from '../../../shared/ui';
import { Pins } from '../../../widgets/Pins';

const Home = ({ props }) => {
    const [searchQuery, setSearchQuery] = useOutletContext();
    const [loading, setLoading] = useState(false);
    const [pins, setPins] = useState([]);
    useEffect(() => {
        if (searchQuery === "") {
            setLoading(true);
            client.fetch(feedQuery)
                .then((data) => {
                    setPins(data)
                    setLoading(false);
                })
        }
        else {
            setLoading(true);
            client.fetch(searchQueryFunction(searchQuery))
                .then((data) => {
                    setPins(data)
                    setLoading(false);
                })
        }
    }, [searchQuery])
    if (loading) return <LoaderHome />
    return (
        <div className='container homeContainer'>
            <Pins pins={pins} />
        </div>
    );
};

export { Home };