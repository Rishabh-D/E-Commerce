export function fetchLoggedInUserOrders(userId) {
    return new Promise(async (resolve) => {
        // const response = await fetch("/orders/own/");
        const response = await fetch(
            "http://localhost:8080/orders/?user.id=" + userId
        );
        const data = await response.json();
        resolve({ data });
    });
}

export function fetchLoggedInUser(userId) {
    return new Promise(async (resolve) => {
        // const response = await fetch("/users/own");
        const response = await fetch("http://localhost:8080/users/" + userId);
        const data = await response.json();
        resolve({ data });
    });
}

// will be uncommented after created backend

// export function updateUser(update) {
//     return new Promise(async (resolve) => {
//         const response = await fetch("/users/" + update.id, {
//             method: "PATCH",
//             body: JSON.stringify(update),
//             headers: { "content-type": "application/json" },
//         });
//         const data = await response.json();
//         resolve({ data });
//     });
// }

export function updateUser(update) {
    return new Promise(async (resolve) => {
        const response = await fetch(
            "http://localhost:8080/users/" + update.id,
            {
                method: "PATCH",
                body: JSON.stringify(update),
                headers: { "content-type": "application/json" },
            }
        );
        const data = await response.json();
        // TODO; from server it will return only relevant info
        resolve({ data });
    });
}
