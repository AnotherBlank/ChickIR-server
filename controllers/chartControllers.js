/**
 * 接收分数也在这里
 */
const Score = require('../models/scoreDataModel');
const Chart = require('../models/chartDataModel');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.sendPlayData = async (req, res) => {
    try {
        const {chartData, scoreData, c} = req.body;
        console.log("接收到的分数数据：" + JSON.stringify(req.body));
        const ischart = await Chart.getChartBySHA256(chartData.sha256)
        if (ischart.length === 0) {
            chartData.values =JSON.stringify(chartData.values)
            await Chart.createChart(chartData);
        }
        // 全部扔到客户端
        const scoreId = await Score.createScore(scoreData);
        res.status(201).send({ success: true, message: '分数创建成功', scoreId});
    } catch (e) {
        res.status(500).send({ success: false, message: e.message });
    }
}

exports.getPlayData = async (req, res) => {
    const {playerData, chartData} = req.body;
    // 空值传
    if (playerData === null) {
        try {
            const scores = await Score.getScoreViewBySHA256(chartData.sha256);
            res.status(200).send({ success: true, message:"", data: scores });
        } catch (error) {
            res.status(500).send({ success: false, message: error.message,data:null });
        }
    } else {
        try {
            const scores = await Score.getScoresByPlayerId(playerData.id, chartData.sha256);
            res.status(200).send({ success: true, message:"", data: scores });
        } catch (error) {
            res.status(500).send({ success: false, message: error.message,data:null });
        }
    }
}

exports.getTableDatas = async (req, res) => {
    console.log("接收到的数据：" + req.body);
    res.status(200).send({ success: true, message:"", data: null });
}