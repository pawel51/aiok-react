import React from 'react';
import fs from 'fs'
import jsonReader from "../../../../../psy/src/Helpers/jsonReader";

const ids = [
    "tt0111161",
    "tt0068646",
    "tt0071562",
    "tt0468569",
    "tt0050083"
    ]



const Films = () => {
    const url = process.env.REACT_APP_IMDB_URL
    const api_key = process.env.REACT_APP_IMDB_API_KEY
    //name between //
    const path = url+"//"+api_key

    console.log(ids)

    return (
        <div>

        </div>
    );
};

export default Films;