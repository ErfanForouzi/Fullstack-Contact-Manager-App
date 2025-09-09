import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000/api/v1";
axios.defaults.timeout = 3000;

function getError(e) {
    if (e?.response?.data) {
        return e.response.data;
    }
    return { success: false, body: null, message: "خطا در برقراری ارتباط", status: 500 };
}

async function sendRequest(config) {
    try {
        const { data } = await axios.request(config);
        return data;
    } catch (e) {
        return getError(e);
    }
}

export async function getContactById(id) {
    return sendRequest({ method: "get", url: "/contacts/" + id });
}

export async function getContacts(q) {
    return sendRequest({ method: "get", url: "/contacts", params: { q } });
}

export async function createContact(data) {
    return sendRequest({ method: "post", url: "/contacts", data });
}

export async function updateContact(id, data) {
    return sendRequest({ method: "put", url: "/contacts/" + id, data });
}

export async function deleteContact(id) {
    return sendRequest({ method: "delete", url: "/contacts/" + id });
}
