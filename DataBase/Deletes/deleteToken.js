async function deleteToken(pool, token) {
    const client = await pool.connect();
    try {   
        const query = 'DELETE FROM users_tokens WHERE token_log = $1';
        const values = [
            token
        ];
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('deleteToken function have an error: ', error);
        throw error;
    } finally {
        client.release();
    };
};

export default deleteToken;