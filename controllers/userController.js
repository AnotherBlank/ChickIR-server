const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.register = (req, res) => {
    const {email, password, name} = req.body;

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 8);

    User.create(email, hashedPassword, name, "","","", (err, results) => {
        if (err) {
            return res.status(500).send({message: err});
        }
        res.status(201).send({id: results.insertId, email});
    });
};

exports.login = async (req, res) => {
    const { id, password } = req.body;
    console.log(JSON.stringify(req.body));
    try {
        const results = await User.findByEmail(id); // 确保使用 await

        if (results.length === 0) {
            return res.status(404).send({
                succeeded: false,
                message: '用户未找到。',
                data: null
            });
        }

        const user = results[0];
        const passwordIsValid = bcrypt.compareSync(password, user.password);

        if (!passwordIsValid) {
            return res.status(401).send({
                succeeded: false,
                message: '密码无效！',
                data: null
            });
        }

        const playerData = {
            id: user.id.toString(),
            name: user.name,
            rank: user.rank
        };

        return res.status(200).send({
            succeeded: true,
            message: '请求成功',
            data: playerData
        });
    } catch (error) {
        console.error('登录错误:', error); // 打印错误
        res.status(500).send({ message: error.message });
    }
}

exports.getRivals = async (req, res) => {
    console.log("接收到的数据：" + req.body);
    res.status(200).send({ success: true, message:"", data: null });
}