export const auth = (data, route) => {
    return fetch("http://localhost:3001/" + route, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    }).then((res) => {
        return res.json();
    });
}

export const update = (data, token) => {
    return fetch("http://localhost:3001/update", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Barear " + token,
        },
        body: JSON.stringify(data)
    }).then((res) => {
        return res.json();
    });
}

export const list = () => {
    return fetch("http://localhost:3001/list").then((res) => {
        return res.json();
    });
}