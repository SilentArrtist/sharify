import { useState } from 'react';
import { client } from '../../../app/client';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { getUser } from '../../../shared/utils/getUser';
import { LoaderPin } from '../../../shared/ui';
import { useNavigate } from 'react-router-dom';
import '../styles/style.scss'
import { ProfileLink } from '../../../entities/ProfileLink';
const CreatePin = () => {

    const [title, setTitle] = useState('');
    const [about, setAbout] = useState('');
    const [loading, setLoading] = useState(false);
    const [imageAsset, setImageAsset] = useState();
    const [wrongImageType, setWrongImageType] = useState(false);

    const navigate = useNavigate();


    const uploadImage = (e) => {
        const selectedFile = e.target.files[0];
        // uploading asset to sanity
        if (selectedFile.type === 'image/png' || selectedFile.type === 'image/svg' || selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/gif' || selectedFile.type === 'image/tiff') {
            setWrongImageType(false);
            setLoading(true);
            client.assets
                .upload('image', selectedFile, { contentType: selectedFile.type, filename: selectedFile.name })
                .then((document) => {
                    setImageAsset(document);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log('Upload failed:', error.message);
                });
        } else {
            setLoading(false);
            setWrongImageType(true);
        }
    };

    const savePin = () => {
        if (title && imageAsset?._id) {
            const doc = {
                _type: 'pin',
                title,
                about,
                image: {
                    _type: 'image',
                    asset: {
                        _type: 'reference',
                        _ref: imageAsset?._id,
                    },
                },
                userId: user._id,
                postedBy: {
                    _type: 'postedBy',
                    _ref: user._id,
                },
            };
            client.create(doc).then(() => {
                navigate('/');
            });
        }
    };

    const user = getUser();
    return (
        <section className='create_pin_section'>
            <div className="container">
                <div className="create_pin">
                    <div className="create_block image">
                        {
                            wrongImageType && (
                                <p>It&apos;s wrong file type.</p>
                            )
                        }
                        {
                            loading
                                ?
                                <LoaderPin />
                                :
                                !imageAsset ? (
                                    <>
                                        <label htmlFor={'upload-image'}>
                                            <div className="load">
                                                <AiOutlineCloudUpload />
                                                Click to upload
                                            </div>

                                            <p className="recomendation">
                                                Use JPG, JPEG, SVG, PNG, GIF or TIFF less than 20MB
                                            </p>
                                        </label>
                                        <input
                                            id='upload-image'
                                            type="file"
                                            name="upload-image"
                                            onChange={uploadImage}
                                        />
                                    </>
                                ) : (
                                    <div className="loaded_image">
                                        <img
                                            src={imageAsset?.url}
                                            alt="uploaded-pic"
                                        />
                                        <div
                                            className='delete_btn'
                                            onClick={() => setImageAsset(null)}
                                        >
                                            <MdDelete fontSize={30} />
                                        </div>
                                    </div>
                                )}
                    </div>
                    <div className="create_block info">
                        <div className="info__textblock info__title">
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Add your title"
                            />
                        </div>
                        <div className="info__postedBy">
                            <ProfileLink icon={user?.image} profileId={user?._id} />
                            <div className="userName">
                                {user?.userName}
                            </div>
                        </div>
                        <div className="info__textblock info__about">
                            <input
                                type="text"
                                value={about}
                                onChange={(e) => setAbout(e.target.value)}
                                placeholder="Add text about your pin"
                            />
                        </div>
                        <div className="info__create">
                            <div className='btn'
                                onClick={savePin}
                            >
                                Create Pin
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export { CreatePin };