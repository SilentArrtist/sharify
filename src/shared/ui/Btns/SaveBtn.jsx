import React from 'react';
import { v4 as uuidv4 } from 'uuid'
import { client } from '../../../app/client';
import { getUser } from '../../utils/getUser';
import { savePin } from '../../utils/savePin';
const SaveBtn = ({ id, pinSaved, setPinSaved, setSavingPin }) => {
    const user = getUser();
    const savePinFunction = (e) => {
        e.stopPropagation();
        savePin(client, uuidv4, setSavingPin, pinSaved, setPinSaved, id, user._id);
    }
    return (
        <div className="save" onClick={(e) => { savePinFunction(e) }}>
            {pinSaved?.length !== 0
                ?
                "SAVED"
                :
                "SAVE"
            }
        </div>
    );
};

export { SaveBtn };