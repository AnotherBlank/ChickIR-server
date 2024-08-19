const db = require("../config/db.js");

class ChartDataModel {
    // 创建
    static createChart(chartData) {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO chart_data SET ?`;
            db.query(sql,[chartData],(err, res) => {
                if (err) {
                    return reject(err);
                }
                resolve(res.insertId);
            })
        })
    }

    // 查歌
    static getChartBySHA256(sha256) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM chart_data WHERE sha256 = ?';
            db.query(sql, [sha256], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            })
        })
    }
}

module.exports = ChartDataModel;