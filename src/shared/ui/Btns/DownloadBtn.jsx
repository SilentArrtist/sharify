import React from 'react';
import { MdDownloadForOffline } from 'react-icons/md'
const DownloadBtn = ({ link }) => {
    return (
        <a
            className="download"
            onClick={(e) => { e.stopPropagation() }}
            download
            href={`${link}?dl=`}
        >
            <MdDownloadForOffline />
        </a>
    );
};

export { DownloadBtn };