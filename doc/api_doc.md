# 接口文档
## 数据模型
### IRPlayerData

- **描述**: 表示玩家数据的模型。

- **字段**:
    - `id` (string): 玩家唯一标识符。
    - `name` (string): 玩家昵称。
    - `rank` (string): 玩家段位或等级。

- **示例**:
    ```json
    {
        "id": "4861",
        "name": "エレクトロン",
        "rank": "★3/sl4/◆5/▼2"
    }
    ```

---
## 接口

## 1. 注册接口

- **URL**: `/ir/api/register`
- **方法**: `POST`
- **描述**: 注册新用户。

- **请求参数**:
    - `IRAccount` (JSON):
        - `id` (string): 邮箱
        - `password` (string): 密码
        - `name`     (string): 昵称

- **响应**:
    - `IRResponse<IRPlayerData>`:
        - `success` (boolean): 操作是否成功
        - `message` (string): 响应信息
        - `data` (IRPlayerData): 用户数据（成功时返回）

- **示例请求**:
    ```json
    {
        "id": "123@qq.com",
        "password": "password123",
        "name": "wpcap"
    }
    ```

- **示例响应**:
    ```json
    {
        "success": true,
        "message": "注册成功",
        "data": {
            "id": "123@qq.com",
            "username": "wpcap"
        }
    }
    ```

---

## 2. 登录接口

- **URL**: `/ir/api/login`
- **方法**: `POST`
- **描述**: 用户登录。

- **请求参数**:
    - `IRAccount` (JSON):
        - `id` (string): 邮箱
        - `password` (string): 密码
        - `username` (string): 昵称
        

- **响应**:
    - `IRResponse<IRPlayerData>`:
        - `success` (boolean): 操作是否成功
        - `message` (string): 响应信息
        - `data` (IRPlayerData): 用户数据（成功时返回）

- **示例请求**:
    ```json
    {
        "id": "123@qq.com",
        "password": "password123",
        "username": ""
    }
    ```

- **示例响应**:
    ```json
    {
        "success": true,
        "message": "登录成功",
        "data": {
            "id": "4861",
            "name": "エレクトロン",
            "rank": "★3/sl4/◆5/▼2"
        }
    }
    ```

---

## 3. 获取对手接口

- **URL**: `/ir/api/getRivals`
- **方法**: `GET`
- **描述**: 获取用户的对手列表。

- **响应**:
    - `IRResponse<IRPlayerData[]>`:
        - `success` (boolean): 操作是否成功
        - `message` (string): 响应信息
        - `data` (IRPlayerData[]): 对手用户数据数组

- **示例响应**:
    ```json
    {
        "success": true,
        "message": "获取对手成功",
        "data": [
            {
                "id": 2,
                "name": "rival1",
                "rank": "★1/sl1"
            },
            {
                "id": 3,
                "name": "rival2",
                "rank": "★5/sl11"
            }
        ]
    }
    ```

---

## 4. 获取用户表格数据接口

- **URL**: `/ir/api/getTableDatas`
- **方法**: `GET`
- **描述**: 获取用户的表格数据。

- **响应**:
    - `IRResponse<IRTableData[]>`:
        - `success` (boolean): 操作是否成功
        - `message` (string): 响应信息
        - `data` (IRTableData[]): 表格数据数组

- **示例响应**:
    ```json
    {
        "success": true,
        "message": "获取表格数据成功",
        "data": [
            {
                "rank": 1,
                "score": 100
            },
            {
                "rank": 2,
                "score": 90
            }
        ]
    }
    ```

---

## 5. 获取比赛数据接口

- **URL**: `/ir/api/getPlayData`
- **方法**: `POST`
- **描述**: 获取用户的比赛数据。

- **请求参数**:
    - `IRPlayerData` (JSON): 用户数据
    - `IRChartData` (JSON): 图表数据

- **响应**:
    - `IRResponse<IRScoreData[]>`:
        - `success` (boolean): 操作是否成功
        - `message` (string): 响应信息
        - `data` (IRScoreData[]): 比赛数据数组

- **示例请求**:
    ```json
    {
        "playerData": {
            "id": 1,
            "username": "test"
        },
        "chartData": {
            "type": "line",
            "data": [1, 2, 3]
        }
    }
    ```

- **示例响应**:
    ```json
    {
        "success": true,
        "message": "获取比赛数据成功",
        "data": [
            {
                "score": 95,
                "date": "2023-10-01"
            }
        ]
    }
    ```

---

## 6. 发送比赛数据接口

- **URL**: `/ir/api/sendPlayData`
- **方法**: `POST`
- **描述**: 发送用户的比赛数据。

- **请求参数**:
    - `IRChartData` (JSON): 图表数据
    - `IRScoreData` (JSON): 成绩数据

- **响应**:
    - `IRResponse<Object>`:
        - `success` (boolean): 操作是否成功
        - `message` (string): 响应信息
        - `data` (Object): 发送的数据（成功时返回）

- **示例请求**:
    ```json
    {
        "chartData": {
            "type": "bar",
            "data": [1, 2, 3]
        },
        "scoreData": {
            "score": 95,
            "date": "2023-10-01"
        }
    }
    ```

- **示例响应**:
    ```json
    {
        "success": true,
        "message": "发送成绩成功",
        "data": {
            "chartData": {...},
            "scoreData": {...}
        }
    }
    ```

---

## 7. 发送课程数据接口

- **URL**: `/ir/api/sendCourseData`
- **方法**: `POST`
- **描述**: 发送用户的课程数据。

- **请求参数**:
    - `IRCourseData` (JSON): 课程数据
    - `IRScoreData` (JSON): 成绩数据

- **响应**:
    - `IRResponse<Object>`:
        - `success` (boolean): 操作是否成功
        - `message` (string): 响应信息
        - `data` (Object): 发送的数据（成功时返回）

- **示例请求**:
    ```json
    {
        "courseData": {
            "courseId": 1,
            "courseName": "Math"
        },
        "scoreData": {
            "score": 90,
            "date": "2023-10-01"
        }
    }
    ```

- **示例响应**:
    ```json
    {
        "success": true,
        "message": "发送段位成绩成功",
        "data": {
            "courseData": {...},
            "scoreData": {...}
        }
    }
    ```

---

## 8. 获取歌曲链接
- **URL**: `/ir/api/sendCourseData`
- **方法**: `POST`
- **描述**: 发送用户的课程数据。

- **请求参数**:
    - `IRCourseData` (JSON): 课程数据
    - `IRScoreData` (JSON): 成绩数据

- **响应**:
    - `IRResponse<Object>`:
        - `success` (boolean): 操作是否成功
        - `message` (string): 响应信息
        - `data` (Object): 发送的数据（成功时返回）

- **示例请求**:
    ```json
    {
        "courseData": {
            "courseId": 1,
            "courseName": "Math"
        },
        "scoreData": {
            "score": 90,
            "date": "2023-10-01"
        }
    }
    ```

- **示例响应**:
    ```json
    {
        "success": true,
        "message": "发送段位成绩成功",
        "data": {
            "courseData": {...},
            "scoreData": {...}
        }
    }
    ```
  ---

## 9. 获取难度表链接
- **URL**: `/ir/api/sendCourseData`
- **方法**: `POST`
- **描述**: 发送用户的课程数据。

- **请求参数**:
    - `IRCourseData` (JSON): 课程数据
    - `IRScoreData` (JSON): 成绩数据

- **响应**:
    - `IRResponse<Object>`:
        - `success` (boolean): 操作是否成功
        - `message` (string): 响应信息
        - `data` (Object): 发送的数据（成功时返回）

- **示例请求**:
    ```json
    {
        "courseData": {
            "courseId": 1,
            "courseName": "Math"
        },
        "scoreData": {
            "score": 90,
            "date": "2023-10-01"
        }
    }
    ```

- **示例响应**:
    ```json
    {
        "success": true,
        "message": "发送段位成绩成功",
        "data": {
            "courseData": {...},
            "scoreData": {...}
        }
    }
    ```
  ---

## 10. 获取玩家链接
- **URL**: `/ir/api/sendCourseData`
- **方法**: `POST`
- **描述**: 发送用户的课程数据。

- **请求参数**:
    - `IRCourseData` (JSON): 课程数据
    - `IRScoreData` (JSON): 成绩数据

- **响应**:
    - `IRResponse<Object>`:
        - `success` (boolean): 操作是否成功
        - `message` (string): 响应信息
        - `data` (Object): 发送的数据（成功时返回）

- **示例请求**:
    ```json
    {
        "courseData": {
            "courseId": 1,
            "courseName": "Math"
        },
        "scoreData": {
            "score": 90,
            "date": "2023-10-01"
        }
    }
    ```

- **示例响应**:
    ```json
    {
        "success": true,
        "message": "发送段位成绩成功",
        "data": {
            "courseData": {...},
            "scoreData": {...}
        }
    }
    ```
  ---
## 状态码说明

- `200 OK`: 请求成功，返回数据。
- `401 Unauthorized`: 用户名或密码错误。
- `400 Bad Request`: 请求体解析失败或请求格式错误。