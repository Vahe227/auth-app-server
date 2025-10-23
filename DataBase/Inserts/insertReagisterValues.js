async function insertData(pool, usernameFront, emailFront, passwordFront) {
    const client = await pool.connect();
    try {
        const query = 'INSERT INTO users (username_val, email_val, password_val) VALUES ($1, $2, $3) RETURNING *';
        const values = [
            usernameFront,
            emailFront,
            passwordFront
        ];
        const result = await client.query(query, values);
        console.info('Client inserted successfully');
        return result.rows;
    } catch (error) {
        console.error('insertData function have an error: ', error);
        throw error;
    } finally {
        client.release();
    };
};

export default insertData;