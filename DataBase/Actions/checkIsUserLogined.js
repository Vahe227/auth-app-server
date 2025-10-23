async function isUserLogined(pool, token) {
    const client = await pool.connect();
    try {
        const query = 'SELECT * FROM users_tokens WHERE token_log = $1';
        const values = [
            token
        ];
        const result = await client.query(query, values);
        if(result.rows.length === 0) {
            return 'DontExists';
        } else {
            return 'Exists';
        };
    } catch (error) {
        console.error('isUserLogined function have an error: ', error);
        throw error;
    } finally {
        client.release();
    };
};

export default isUserLogined;