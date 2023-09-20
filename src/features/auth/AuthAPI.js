// A mock function to mimic making an async request for data
export function createUser(userData) {
    return new Promise(async (resolve) => {
        const response = await fetch("http://localhost:8080/users", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: { "content-type": "application/json" },
        });
        const data = await response.json();
        // TODO; from server it will return only relevant info
        resolve({ data });
    });
}

export function checkUser(loginInfo) {
    //TODO: MAKE IT POST REQUEST
    const email = loginInfo.email;
    const password = loginInfo.password;
    return new Promise(async (resolve, reject) => {
        const response = await fetch(
            "http://localhost:8080/users?email=" + email
        );
        const data = await response.json();
        if (data.length) {
            if (password === data[0].password) {
                resolve({ data: data[0] });
            } else {
                reject({
                    message: "wrong creds",
                });
            }
        } else {
            reject({
                message: "user not found",
            });
        }
        // TODO; from server it will return only relevant info
    });
}

export function signOut(userId) {
    return new Promise(async (resolve) => {
        /// this will be used by thunk to just delete the local version of loggedInuser
        resolve({ data: "success" });
    });
}
