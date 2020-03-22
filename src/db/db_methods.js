import axios from "axios";

export function getVideos() {
    const url = global.config.server.url + 'User/generic.php';
    const formData = new FormData();
    formData.append("query","SELECT * FROM songs");
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    return axios.post(url, formData,config)
        .then( responseObj => {
            return responseObj;
        });
}

export function getAtmosphereByUser(user_id) {
    const url = global.config.server.url + 'generic_action.php';
    const formData = new FormData();
    formData.append("action","getAtmosphereByUser");
    formData.append("user_id",user_id);
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    return axios.post(url, formData,config)
        .then( responseObj => {
            return responseObj;
        });
}

export function addAtmosphereByUser(user_id,atmosphere_name) {
    const url = global.config.server.url + 'generic_action.php';
    const formData = new FormData();
    formData.append("action","addAtmosphereByUser");
    formData.append("user_id",user_id);
    formData.append("atmosphere_name",atmosphere_name);
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    return axios.post(url, formData,config)
        .then( responseObj => {
            return responseObj;
        });
}

//User can del song in own atmosphere, Admin can delete from all atmospheres
export function deleteSongFromAtmosphereByUser(user_id, atmosphere_id, song_id) {
    const url = global.config.server.url + 'generic_action.php';
    const formData = new FormData();
    formData.append("action","deleteSongFromAtmosphereByUser");
    formData.append("atmosphere_id",atmosphere_id);
    formData.append("user_id",user_id);
    formData.append("song_id",song_id);
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    return axios.post(url, formData,config)
        .then( responseObj => {
            return responseObj;
        });
}

export function logOnUser(username,password) {
    const url = global.config.server.url + 'generic_action.php';
    const formData = new FormData();
    formData.append("action","logOnUser");
    formData.append("username",username);
    formData.append("password",password);
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    return axios.post(url, formData,config)
        .then( responseObj => {
            return responseObj;
        });
}

export function getSongsByAtmosphere(atmosphere_id) {
    const url = global.config.server.url + 'generic_action.php';
    const formData = new FormData();
    formData.append("action","getSongsByAtmosphere");
    formData.append("atmosphere_id",atmosphere_id);
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    return axios.post(url, formData,config)
        .then( responseObj => {
            return responseObj;
        });
}

//If atmosphere_id not found in db not or atmosphere_id= -1 this method adds songs to db
//Song will not be duplicated by this method
export function addSongToAtmosphere(atmosphere_id,song_title,song_link) {
    const url = global.config.server.url + 'generic_action.php';
    const formData = new FormData();
    formData.append("action","addSongToAtmosphere");
    formData.append("atmosphere_id",atmosphere_id);
    formData.append("song_title",song_title);
    formData.append("song_link",song_link);
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    return axios.post(url, formData,config)
        .then( responseObj => {
            return responseObj;
        });
}

export function getTitle(link){
    const url = 'https://noembed.com/embed?url=' + link;
    return fetch(url).then(response => {
        return response.json();
    }).then(json => {
        return json;
    });
}

export function registerUser(username,mail,password,rights) {
    const url = global.config.server.url + 'generic_action.php';
    const formData = new FormData();
    formData.append("action","registerUser");
    formData.append("username",username);
    formData.append("mail",mail);
    formData.append("password",password);
    formData.append("rights",rights);
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    return axios.post(url, formData,config)
        .then( responseObj => {
            console.log(responseObj);
            return responseObj;
        });
}

export function deleteSongFromAllAtmosphereByAdmin(user_id,song_id) {
    const url = global.config.server.url + 'generic_action.php';
    const formData = new FormData();
    formData.append("action","deleteSongFromAllAtmosphereByAdmin");
    formData.append("user_id",user_id);
    formData.append("song_id",song_id);
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    return axios.post(url, formData,config)
        .then( responseObj => {
            return responseObj;
        });
}

export function updateSongTitleByUser(song_id,new_song_title,user_id) {
    const url = global.config.server.url + 'generic_action.php';
    const formData = new FormData();
    formData.append("action","updateSongTitleByUser");
    formData.append("user_id",user_id);
    formData.append("song_id",song_id);
    formData.append("new_song_title",new_song_title);
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    return axios.post(url, formData,config)
        .then( responseObj => {
            return responseObj;
        });
}

export function aboutFromServer(persons) {
    const url = global.config.server.url + 'about.php';
    const formData = new FormData();
    formData.append("persons",JSON.stringify(persons));

    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    return axios.post(url, formData,config)
        .then( responseObj => {
            return responseObj;
        });
}

