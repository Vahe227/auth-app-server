async function insertToken(pool, usernameLog, passwordLog, tokenLog) {
    const client = await pool.connect();
    try {
        const query = 'INSERT INTO users_tokens (username_log, email_log, token_log) VALUES ($1,$2,$3) RETURNING *';
        const values = [
            usernameLog,
            passwordLog,
            tokenLog
        ];
        const result = await client.query(query, values);
        console.info('Client Token Inserted Successfully');
        return result.rows[0];
    } catch (error) {
        console.error('insertToken function have an error: ', error);
        throw error;
    } finally {
        client.release();
    };
};

export default insertToken;