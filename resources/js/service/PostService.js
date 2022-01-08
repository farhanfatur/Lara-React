import axios from "axios";
import Static from '../static/Static';

async function get(data) {
    const rest = await axios.get(`${Static.APP_URL}/api/post`, {
        headers: {"Authorization": `Bearer ${data.token}`}
    })

    return rest
}

async function insert(data) {
    const rest = await axios.post(`${Static.APP_URL}/api/post`, data.data, {
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${data.token}`
        }
    })

    return rest
}

async function getByID(data) {
    const rest = await axios.get(`${Static.APP_URL}/api/post/${data.id}/edit`, {
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${data.token}`
        }
    })

    return rest
}

async function update(data) {
    const rest = await axios.put(`${Static.APP_URL}/api/post/${data.data.id}`, data.data, {
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${data.token}`
        }
    })

    return rest
}

async function remove(data) {
    const rest = await axios.delete(`${Static.APP_URL}/api/post/${data.id}`, {
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${data.token}`
        }
    })

    return rest
}

async function search(data) {
    const rest = await axios.get(`${Static.APP_URL}/api/post?search=${data.text}`, {
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${data.token}`
        }
    })

    return rest
}

const PostService = {
    get,
    insert,
    getByID,
    update,
    remove,
    search,
}

export default PostService