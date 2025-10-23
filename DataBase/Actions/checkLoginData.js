async function checkLoginData(pool, username, password) {
    const client = await pool.connect();
    try {
        const query = 'SELECT * FROM users WHERE username_val = $1';
        const values = [
            username,
        ];
        const result = await client.query(query, values);
        if(result.rows.length === 0) {
            return 'wrongLogin';
        } else {
            if (result.rows[0].password_val === password) {
                return 'successfullyLogin';
            } else {
                return 'wrongLogin';
            };
        };
    } catch (error) {
        console.error('checkLoginData function have an error: ', error);
        throw error;
    } finally {
        client.release();
    };
};

export default checkLoginData;
