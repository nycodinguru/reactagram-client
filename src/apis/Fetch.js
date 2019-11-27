const base = 'http://localhost:3000';
//const base = process.env.REACT_APP_BASE_URL === 'development' ? 'http://localhost:3000' : 'https://reactagram-demo-server.herokuapp.com';

function readJson(url, params) {
    return fetch(`${url}/${params}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return response.json();
    })
 }

export function getUser(username) {
    return readJson(`${base}/api/reactagram/users`,
        username
    )
}

export function getAllUsers() {
    return readJson(`${base}/api/reactagram`,
    'users'
    )
}

export function getUserPosts(userId) {
    return readJson(`${base}/api/reactagram/posts`,
        userId
    )
}

export function getSinglePost(username, userId) {
    return readJson(`${base}/api/reactagram/posts/${username}`,
        userId
    )
}

export function searchUsers(searchArg) {
    return readJson(`${base}/api/reactagram/users/search`,
        searchArg.toLowerCase()
    )
}



   