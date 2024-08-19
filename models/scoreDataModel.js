const db = require("../config/db.js");

class ScoreDataModel {
    // 创建新的分数记录
    //
    static createScore(scoreData) {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO score_data SET ?`;
            db.query(sql, [scoreData],(err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result.insertId);
            })
        })
    }

    // 根据 player_id 获取分数记录
    static getScoresByPlayerId(playerId) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM score_data WHERE player_id = ?';
            db.query(sql, [playerId], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }

    // 根据 score_id 获取特定分数记录
    static getScoreById(scoreId) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM score_data WHERE score_id = ?';
            db.query(sql, [scoreId], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results[0]); // 返回单个结果
            });
        });
    }

    // 根据 sha256 获取特定分数记录
    static getScoreBySHA256(sha256) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM score_data WHERE sha256 = ?';
            db.query(sql, [sha256], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results); // 返回全部结果
            });
        });
    }

    // 根据 sha256 获取特定分数记录
    static getScoreViewBySHA256(sha256) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM score_data_view WHERE sha256 = ?';
            db.query(sql, [sha256], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results); // 返回全部结果
            });
        });
    }

    // 根据 sha256 和 id 获取特定分数记录
    static getScoreBySHA256AndId(sha256, player_id) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM score_data WHERE sha256 = ? AMD player_id = ?';
            db.query(sql, [sha256,player_id], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results[0]); // 返回单个结果
            });
        });
    }

    // 更新分数记录
    static updateScore(scoreId, scoreData) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE score_data SET ? WHERE score_id = ?';
            db.query(sql, [scoreData, scoreId], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results.affectedRows); // 返回受影响的行数
            });
        });
    }

    // 删除分数记录
    static deleteScore(scoreId) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM score_data WHERE score_id = ?';
            db.query(sql, [scoreId], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results.affectedRows); // 返回受影响的行数
            });
        });
    }
}

module.exports = ScoreDataModel;