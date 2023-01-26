import React from 'react';
import './style.scss'
const LoaderPin = () => {
    return (
        <div className='loaderPin'>
            <svg xmlns="http://www.w3.org/2000/svg"
                width="200px"
                height="200px"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid">
                <rect x="20" y="20" width="60" height="60" stroke="#221f1f" strokeWidth="10" fill="none"></rect>
                <rect x="20" y="20" width="60" height="60" stroke="#e50914" strokeWidth="10" stroke-lincap="undefined" fill="none">
                    <animate attributeName="stroke-dasharray" repeatCount="indefinite" dur="1s" keyTimes="0;0.5;1" values="24 216;120 120;24 216"></animate>
                    <animate attributeName="stroke-dashoffset" repeatCount="indefinite" dur="1s" keyTimes="0;0.5;1" values="0;-120;-240"></animate>
                </rect>
            </svg>
        </div >
    );
};

export { LoaderPin };