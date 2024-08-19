const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/userRoutes'); // 引入 userModel.js
const scoreRoutes = require('./routes/chartRoutes'); // 引入 userModel.js

const app = express();

// 使用 body-parser 中间件来解析 JSON 请求体
app.use(bodyParser.json());

// 使用用户路由
app.use('/ir/api',authRoutes);
app.use('/ir/api',scoreRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});