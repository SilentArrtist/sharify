export const userQuery = (userId) => {
    const query = `*[_type == "user" && _id == '${userId}']`;
    return query;
}

export const searchQueryFunction = (searchTerm) => {
    const query = `*[_type == "pin" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*'] {
        image{
            asset -> {
                url
            }
        },
        _id,
        destination,
        postedBy -> {
            _id,
            userName,
            image
        },
        save[]{
            _key,
            postedBy -> {
                _id,
                userName,
                image
            }
        }
    }`;

    return query;
}

export const feedQuery = `*[_type == "pin"] {
        image{
            asset -> {
                url
            }
        },
        _id,
        destination,
        title,
        about,
        userId,
        postedBy -> {
            _id,
            userName,
            image
        },
        save[]{
            _key,
            postedBy -> {
                _id,
                userName,
                image
            }
        }
    }`;

export const idPinQuery = (_id) => {
    const query = `*[_type == "pin" && _id == '${_id}'] {
            image{
                asset -> {
                    url
                }
            },
            _id,
            destination,
            title,
            about,
            postedBy -> {
                _id,
                userName,
                image
            },
            save[]{
                _key,
                postedBy -> {
                    _id,
                    userName,
                    image
                }
            },
            comments[]{
                comment,
                _key,
                postedBy->{
                  _id,
                  userName,
                  image
                },
              }
        }`;
    return query;
}

export const userCreatedPinsQuery = (userId) => {
    const query = `*[ _type == 'pin' && userId == '${userId}'] | order(_createdAt desc){
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        postedBy->{
          _id,
          userName,
          image
        },
      },
    }`;
    return query;
};