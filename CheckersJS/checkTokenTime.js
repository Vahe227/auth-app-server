import deleteToken from "../DataBase/Deletes/deleteToken.js";

async function checkTokenTime(jwt, secret, token, pool) {
    try {
        jwt.verify(token, secret);
        return 'notExictedTime';
    } catch (error) {
        if(error.name === 'TokenExpiredError') {
            console.log('The Token Time Was Exited');
            await deleteToken(pool, token);
            return 'ExictedTime';
        } else {
            return 'InvalidToken';
        };
    };
};

export default checkTokenTime;