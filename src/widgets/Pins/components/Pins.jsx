import React from 'react';
import { Pin } from '../../../features/Pin';
import Masonry from 'react-masonry-css'
import '../styles/style.scss'
const Pins = ({ pins }) => {
    const breakpointObj = {
        default: 4,
        3000: 6,
        2000: 5,
        1200: 4,
        992: 3,
        600: 2,
    }

    return (
        <div>
            <Masonry className='masonry_wrapper' breakpointCols={breakpointObj}>
                {pins.map((pin) => (
                    <Pin key={pin._id} pin={pin} />
                ))}
            </Masonry>

        </div>
    );
};

export { Pins };