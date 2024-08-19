const express = require('express');
//const router = express.Router();
//const sqlite3 = require('sqlite3').verbose();
//const db = new sqlite3.Database('data/chickirdatabase.db');

// router.post('/ir/api/register', (req, res) => {
//     const { id, password, name } = req.body;
//     db.run('INSERT INTO IRPlayerData (userId, password, name,rank) VALUES (?, ?, ?, ?)', [id, password, name, 'player'], function(err) {
//         if (err) {
//             res.json({ succeeded: false, message: 'Registration failed' });
//         } else {
//             res.json({ succeeded: true, message: 'Registration successful' });
//         }
//     });
// });

router.post('/ir/api/login', (req, res) => {
    const { id, password } = req.body;
    // 登录逻辑
    return res.json({
        succeeded: true,
        message: 'what',
        data: {
            id: 1,
            name: 'whosyourdaddy'
        }});
    // db.get('SELECT * FROM IRPlayerData WHERE userId = ? AND password = ?',[id,password],(err, row) => {
    //     if (err) {
    //         res.status(500).send({ message: 'Internal Server Error'});
    //     } else if (row) {
    //         const playerData = {id:row.id,name:row.name,rank:'player'};
    //         res.json({succeeded:true, data:playerData});
    //     } else {
    //         res.json({ succeeded: false, message: 'Invalid credentials' });
    //     }
    // })
})

router.post('/ir/api/sendPlayData',(req, res) => {
    const {chartData, scoreData, client} = req.body;
    // 检查请求体是否包含所需数据
    if (!chartData || !scoreData || !client) {
        return res.status(400).json({
            success: false,
            message: '请求体缺少必要的数据: chartData, scoreData, client'
        });
    }

    // 在这里处理 chartData 和 scoreData
    console.log('接收到的数据:', req.body);

    // 处理成功逻辑
    const responseData = {
        // 这里可以根据业务逻辑填充返回的数据
        success: true,
        message: '发送成绩成功',
        data: {
            // 这里可以返回处理后的数据
            chartData,
            scoreData
        }
    };

    return res.json(responseData);
})

router.post('/ir/api/sendCourseData', (req, res) => {
    console.log('course接收到的数据:', req.body);
    return res.json({
        // 这里可以根据业务逻辑填充返回的数据
        success: true,
        message: '发送成绩成功',
        data: null
    })
})

/*
 暂定啥也没有
 */
router.get('/ir/api/getTableDatas', (req, res) => {

})