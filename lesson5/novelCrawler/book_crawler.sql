----
---- 数据库  book_crawler
----
-----------------------------------------

----
---- 小说列表： 'crawler_list'
----
    DROP TABLE if EXISTS `crawler_list`;
    CREATE TABLE `crawler_list` (
        `id` bigint(20) NOT NULL AUTO_INCREMENT,
        `url` varchar(100) NOT NULL,##采集url
        `state` enum('1','0') NOT NULL,##采集状态
        `info` varchar(100) DEFAULT NULL,##描述
        `frequency` int(11) DEFAULT '60',##采集频率
         PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

    -- ----------------------------
    -- Table structure for `novel_info` 小说简介信息
    -- ----------------------------
    DROP TABLE IF EXISTS `novel_info`;
    CREATE TABLE `novel_info` (
      `id` varchar(32) NOT NULL,
      `url` varchar(100) NOT NULL,##简介页url
      `name` varchar(50) DEFAULT NULL,##小说名
      `author` varchar(30) DEFAULT NULL,##作者名
      `description` text,##小说简介
      `type` varchar(20) DEFAULT NULL,##分类
      `latest_chapter` varchar(100) DEFAULT NULL,##最新章节名
      `chapter_count` int(11) DEFAULT NULL,##章节数
      `chapter_list_url` varchar(100) DEFAULT NULL,##章节列表页url
      `word_count` int(11) DEFAULT NULL,##字数
      `keywords` varchar(100) DEFAULT NULL,##关键字
      `create_time` bigint(20) DEFAULT NULL,##创建时间
      `update_time` bigint(20) DEFAULT NULL,##最后更新时间
      `state` enum('1','0') NOT NULL,##采集状态
      PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

    -- ----------------------------
    -- Table structure for `novel_chapter` 小说章节信息
    -- ----------------------------
    DROP TABLE IF EXISTS `novel_chapter`;
    CREATE TABLE `novel_chapter` (
      `id` varchar(32) NOT NULL,
      `url` varchar(100) NOT NULL,##阅读页URL
      `title` varchar(50) DEFAULT NULL,##章节名
      `word_count` int(11) DEFAULT NULL,##字数
      `chapter_id` int(11) DEFAULT NULL,##章节序号
      `chapter_time` bigint(20) DEFAULT NULL,##章节时间
      `create_time` bigint(20) DEFAULT NULL,##创建时间
      `state` enum('1','0') NOT NULL,##采集状态
      PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

    -- ----------------------------
    -- Table structure for `novel_chapter_detail` 小说章节详细信息
    -- ----------------------------
    DROP TABLE IF EXISTS `novel_chapter_detail`;
    CREATE TABLE `novelchapterdetail` (
      `id` varchar(32) NOT NULL,
      `chapter_id` int(11) DEFAULT NULL,##章节序号
      `content` text,##正文
      PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
















