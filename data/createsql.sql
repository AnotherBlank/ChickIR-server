CREATE DATABASE
IF
	NOT EXISTS irdatabase CHARACTER 
	SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE irdatabase;
/**
 * 用户表
 **/
CREATE TABLE
IF
	NOT EXISTS `users` (
		`id` INT AUTO_INCREMENT PRIMARY KEY,-- 唯一表示，以后id就传这个
		`email` VARCHAR ( 255 ) NOT NULL,-- 登录的email
		`password` VARCHAR ( 255 ) NOT NULL,-- 密码，明文
		`name` VARCHAR ( 255 ) NOT NULL,-- 昵称
		`rank` VARCHAR ( 255 ),-- 段位等级
		`profile_image` VARCHAR ( 255 ),-- 头像 存储地址
		`bio` TEXT,-- 个人介绍
		`registration_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,-- 注册时间
		`last_login_time` TIMESTAMP -- 最后登录时间
		
	) CHARACTER 
	SET utf8mb4 COLLATE utf8mb4_unicode_ci;
/*
 * 好友（血仇）表
 */
CREATE TABLE
IF
	NOT EXISTS `rivals` (
		`rival_id` INT AUTO_INCREMENT PRIMARY KEY,-- 好友关系
		`user1_id` INT NOT NULL,
		`user2_id` INT NOT NULL,
		`mutal_rival` TINYINT ( 1 ) DEFAULT 0,-- 是否双向rival 0否1是
		FOREIGN KEY ( `user1_id` ) REFERENCES users ( `id` ),
		FOREIGN KEY ( `user2_id` ) REFERENCES users ( `id` ) 
	) CHARACTER 
	SET utf8mb4 COLLATE utf8mb4_unicode_ci;
/*
 * 谱面数据表
 */
CREATE TABLE
IF
	NOT EXISTS `chart_data` (
		`chart_id` INT AUTO_INCREMENT PRIMARY KEY,
		`md5` VARCHAR ( 255 ) UNIQUE,-- bms md5
		`sha256` VARCHAR ( 255 ) UNIQUE,-- 其他的ir都是sha256
		`title` VARCHAR ( 255 ),-- bms 标题
		`subtitle` VARCHAR ( 255 ),-- bms 子标题
		`genre` VARCHAR ( 255 ),-- 音乐类型
		`artist` VARCHAR ( 255 ),-- 艺术家
		`subartist` VARCHAR ( 255 ),-- 子艺术家
		`url` VARCHAR ( 255 ),-- 下载链接，发送数据时没有
		`appendurl` VARCHAR ( 255 ),-- 差分下载链接，发送数据时没有
		`level` INT,-- 难度等级 人家发了就存了
		`total` INT,-- 总分值
		`mode` ENUM ( 'BEAT_5K', 'BEAT_7K', 'BEAT_10K', 'BEAT_14K', 'POPN_5K', 'POPN_9K', 'KEYBOARD_24K', 'KEYBOARD_24K_DOUBLE' ),-- 游戏模式，枚举
		`lntype` INT,-- LN（长音符）类型，-1 表示未指定，0 表示 LN，1 表示 CN，2 表示 HCN。
		`judge` INT,-- 判定宽度 very easy 到 very hard
		`minbpm` INT,-- 最低bpm
		`maxbpm` INT,-- 最高bpm
		`notes` INT,-- note数量
		`hasUndefinedLN` TINYINT ( 1 ),-- 是否存在未定义的长音符
		`hasLN` TINYINT ( 1 ),-- ln
		`hasCN` TINYINT ( 1 ),-- cn
		`hasHCN` TINYINT ( 1 ),-- hcn
		`hasMine` TINYINT ( 1 ),-- 地雷
		`hasRandom` TINYINT ( 1 ),-- 有没有随机块
		`hasStop` TINYINT ( 1 ),-- 时停序列
		`values` JSON DEFAULT NULL-- 发送数据的时候这个是空值
		
	) CHARACTER 
	SET utf8mb4 COLLATE utf8mb4_unicode_ci;
/*
 * 段位数据表 TODO 没写好
 */
CREATE TABLE
IF
	NOT EXISTS `course_data` (
		`course_id` INT AUTO_INCREMENT PRIMARY KEY,-- 主键
		`name` VARCHAR ( 255 ) NOT NULL,-- 段位名
		`lntype` INT,-- LN（长音符）类型，-1 表示未指定，0 表示 LN，1 表示 CN，2 表示 HCN。
		`harts` JSON,-- 只存 sha256 就行了
		`constraint` JSON -- 数组类型json
		
	) CHARACTER 
	SET utf8mb4 COLLATE utf8mb4_unicode_ci;
/*
 * 分数数据表
 */
CREATE TABLE
IF
	NOT EXISTS `score_data` (
		`score_id` INT AUTO_INCREMENT PRIMARY KEY,
		`sha256` VARCHAR ( 255 ),-- bms sha256
		`lntype` INT,-- LN（长音符）类型，-1 表示未指定，0 表示 LN，1 表示 CN，2 表示 HCN。
		`player` INT,-- TODO 发送的是默认值'unknown' 暂时不知道怎么做
		`clear` VARCHAR ( 50 ),-- 点灯情况 最短的是max，最长的是full combo
		`date` BIGINT,-- 发送的Unix 时间戳
		`epg` INT NOT NULL,-- 总 PGREAT 音符数量，early
		`lpg` INT NOT NULL,--                     late
		`egr` INT NOT NULL,-- 总 GREAT 音符数量。
		`lgr` INT NOT NULL,
		`egd` INT NOT NULL,-- 总 GOOD 音符数量。
		`lgd` INT NOT NULL,
		`ebd` INT NOT NULL,-- 总 BAD 音符数量。
		`lbd` INT NOT NULL,
		`epr` INT NOT NULL,-- 总 POOR 音符数量。
		`lpr` INT NOT NULL,
		`ems` INT NOT NULL,-- 总 MISS 音符数量。
		`lms` INT NOT NULL,
		`avgjudge` BIGINT NOT NULL,-- 平均判定值
		`maxcombo` INT NOT NULL,-- 最大连击数
		`notes` INT NOT NULL,-- 音符数量
		`passnotes` INT NOT NULL,-- 已处理数量
		`minbp` INT NOT NULL,-- 最小bp
		`option` INT NOT NULL,-- 可选项
		`seed` BIGINT NOT NULL,-- 验证种子
		`assist` INT NOT NULL,-- assist选项
		`gauge` INT NOT NULL,-- 血条
		`deviceType` ENUM ( 'KEYBOARD', 'BM_CONTROLLER', 'MIDI' ) NOT NULL,-- 假设的输入设备类型
		`judgeAlgorithm` ENUM ( 'Combo', 'Duration', 'Lowest', 'Score' ) NOT NULL,-- 假设的判定算法
		`rule` ENUM ( 'Beatoraja_5', 'Beatoraja_7', 'Beatoraja_9', 'Beatoraja_24', 'Beatoraja_Other', 'LR2', 'Default' ) NOT NULL,-- 假设的规则
		`skin` VARCHAR ( 255 ) NOT NULL,
		`client` VARCHAR ( 255 ) NOT NULL,
		FOREIGN KEY ( `sha256` ) REFERENCES chart_data ( `sha256` ) 
		FOREIGN KEY (`player`) REFERENCES users (`id`)
	) CHARACTER 
	SET utf8mb4 COLLATE utf8mb4_unicode_ci;
	
/*
 * 分数视图
 */
CREATE VIEW score_data_view AS
SELECT `score_id`, `sha256`, `lntype`, `users`.`name` AS `player`, `clear`, `date`, `epg`, `lpg`, `egr`, `lgr`, `egd`, `lgd`, `ebd`, `lbd`, `epr`, `lpr`, `ems`, `lms`, `avgjudge`, `maxcombo`, `notes`, `passnotes`, `minbp`, `option`, `seed`, `assist`, `gauge`, `deviceType`, `judgeAlgorithm`, `rule`, `skin`, `client`
FROM `score_data`
JOIN `users` ON `score_data`.`player` = `users`.`id`;