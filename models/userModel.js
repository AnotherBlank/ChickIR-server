const db = require("../config/db.js");

class User {
    static create(email, password, name, rank="", profile_image="", bio="", callback) {
        const sql = 'INSERT INTO users (email, password, name, rank, profile_image, bio) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(sql, [email, password, name, rank, profile_image, bio], callback);
    }

    // 根据电子邮件查找用户
    static findByEmail(email) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM users WHERE email = ?';
            db.query(sql, [email], (err, results) => {
                if (err) {
                    console.error('查询错误:', err); // 打印查询错误
                    return reject(err);
                }
                console.log('查询结果:', results); // 打印查询结果
                resolve(results); // 返回所有匹配的用户
            });
        });
    }
}

module.exports = User;