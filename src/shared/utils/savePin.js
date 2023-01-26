import { deleteUser } from "./deleteUser";
import { setUser } from "./setUser";

export const savePin = (client, uuidv4, setSavingPin, pinSaved, setPinSaved, pin, user_Id) => {
    if (pinSaved?.length === 0) {
        setSavingPin(true);
        client
            .patch(pin._id)
            .setIfMissing({ save: [] })
            .insert('after', 'save[-1]', [{
                _key: uuidv4(),
                userId: user_Id,
                postedBy: {
                    _type: 'postedBy',
                    _ref: user_Id,
                },
            }])
            .commit()
            .then(() => {
                client
                    .patch(user_Id)
                    .insert('after', 'save[-1]', [{
                        _key: uuidv4(),
                        pin: pin
                    }])
                    .commit()
                    .then((data) => {
                        deleteUser();
                        setUser(JSON.stringify(data));
                        setPinSaved(true);
                        setSavingPin(false);
                    });
            });
    }
};