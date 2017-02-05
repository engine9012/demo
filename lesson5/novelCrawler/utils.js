var fs = require('fs');
var mkdirp = require('mkdirp');

exports.write_chapter = function (book_path, chapter, content, timeStamp) {
    //检测文件夹是否存在
    fs.exists('dist/' + book_path + 'chapters/', function (flag) {
        if(!flag){
            fs.mkdir('dist/' + book_path + 'chapters/', function (error) {
                if(error) throw error;
            })
        }
        fs.writeFile('dist/' + book_path + 'chapters/' + chapter.num + '.html', content, function (error) {
            if(error) throw error;
            console.log(chapter.title + ' 抓取完成！ 累计耗时' + (new Date() - timeStamp) + ' ms');
        })
    });
};


exports.write_config = function (book_path, book) {
    mkdirp('dist/' + book_path, function (error) {
        if(error) throw error;
        var content = JSON.stringify(book, null, 4);
        fs.writeFile('dist/' + book_path + 'book.json', content, function (error) {
            if (error) throw error;
            console.log('book.json 生成成功！')
        })
    })
}