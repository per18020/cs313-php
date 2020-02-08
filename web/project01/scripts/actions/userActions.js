const GET_USER_REQUEST = "GET_USER_REQUEST";
const GET_USER_RESPONSE = "GET_USER_RESPONSE";

function getUserRequest() {
    return { type: GET_USER_REQUEST };
}

function getUserResponse(response) {
    return { type: GET_USER_RESPONSE, response };
}

function getUser(id) {
    return (dispatch) => {
        dispatch(getUserRequest());
        return fetchUser(id)
            .then((res) => { return res.json() })
            .then((res) => {
                dispatch(getUserResponse(res));
            });
    }
}