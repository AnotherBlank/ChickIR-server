const db = require('../config/db')

const registerUser = (user) => {
    const query = `INSERT INTO users (email, password, name) VALUES (?,?,?)`;
    const values = [user.email, user.password, user.name];

    return new Promise((resolve, reject) => {
        db.query(query, values, (err, result) => {
            if (err) {
                console.error('Error registering user: ' + err);
                reject(err);
            } else {
                console.log('User registered successfully');
                resolve(result);
            }
        });
    });
};

const loginUser = (email, callback, requestData) => {
    const query = `SELECT * FROM users WHERE email = ?`;
    const values = [email];

    db.query(query, values)
        .then(result => {
            if (result.length > 0) {
                // 登录成功
                callback({ success: true, message: '登录成功', data: requestData });
            } else {
                // 登录失败
                callback({ success: false, message: '登录失败', data: requestData });
            }
        })
        .catch(err => {
            console.error('Error logging in: ' + err);
        });
};

module.exports = {
    registerUser,
    loginUser
}