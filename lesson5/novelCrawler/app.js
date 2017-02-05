var Crawler = require('crawler');
// var cheerio = require('cheerio');
var jsdom = require('jsdom');
var utils = require('./utils.js');

//当前书籍信息
var current_book = {};
var site_url = 'http://www.biquku.com/0/330/';
var book_path = site_url.split('http://www.biquku.com/')[1];
book_path.substr(book_path.lastIndexOf('/')) === '/' ? book_path : book_path + '/';
var timeStamp = new Date();
var crawler = new Crawler({
    jQuery: jsdom,
    maxConnections : 100,
    callback: function (error, result, done) {
        if(error){
            console.log(error);
        }else{
            var $ = result.$;

            //获取小说章节路径（目录）
            var urls = $('#list a');

            current_book.title = $('#maininfo h1').text();
            // var authorStr = $('#maininfo p').eq(0).text();
            // current_book.author = authorStr.substr(authorStr.lastIndexOf('：') + 1);
            current_book.author = $('#maininfo p').eq(0).text();
            current_book.update_time = $('#info p').eq(2).text();
            // current_book.latest_chapter = $('#info p').eq(3).find('a').text();
            current_book.latest_chapter = $('#info p').eq(3).text();
            current_book.intro = $('#intro').html();
            // console.log(current_book);
            //当前书籍的章节数组
            current_book.chapters = [];

            //循环遍历目录,获取单章节信息
            for(var i = 0; i < urls.length; i++){
                var url = urls[i];  //元素节点
                var _url = $(url).attr('href') + '';    //链接地址
                // console.log(_url);
                var _num = _url.replace('.html', '');
                var _title = $(url).text();

                current_book.chapters.push({
                    'num': _num,
                    'title': _title,
                    'url': _url
                });

                //获取单章节内容，并写出到文件中
                getOneChapter(current_book.chapters[i]);
            }
            console.log(current_book);
            //生成小说章节目录
            utils.write_config(book_path, current_book);
        }
        done();
    }
});

function getOneChapter(chapter) {
    crawler.queue([{
        uri: site_url + chapter.num + '.html',
        jQuery: jsdom,
        // The global callback won't be called
        callback: function (error, result, done) {
            if(error){
                console.log(error);
            }else{
                var $ = result.$;
                var content = $('#content').html();
                // 将内容写出到本地文件夹中
                utils.write_chapter(book_path, chapter, content, timeStamp);
            }
            done();
        }
    }])
}

function start() {
    crawler.queue(site_url);
}

//启动爬虫
start();