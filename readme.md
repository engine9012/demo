第一步：建立本地Git仓库
cd到你的本地项目根目录下，执行git命令
git
init
第二步：将本地项目工作区的所有文件添加到暂存区
git
add .
如果想添加项目中的指定文件，那就把.改为指定文件名即可

第三步：将暂存区的文件提交到本地仓库
git
commit -m ""
冒号里面写注释语句
第四步：在Github上创建自己的repository，创建如图所示
点击下面的Create repository就会进入下面这个界面，然后复制一下地址栏里的https地址
第五步：将本地仓库关联到Github上
git remote add origin https://github.com/FISHBALL1/DropList
后面的URL地址就是我在第四步时复制的那个https地址
在这一步时如果出现错误：fatal:remote origin already exists
那就先输入 git remote rm origin
再输入 git remote add origin https://github.com/FISHBALL1/DropList 就不会报错了。

第六步：最后一步，将代码由本地仓库上传到Github远程仓库
git push -u origin master
执行完之后如果无错误就上传成功了，需要提示的是这里的master是Github默认的分支，如果你本地的当前分支不是               master，就用git checkout master命令切换到master分支，如果你想用本地当前分支上传代码，则把第六步的命令
里的master切换成你的当前分支名即可。
上传成功界面



最后分享一些Github常用的命令：
切换分支：git checkout name
撤销修改：git checkout -- file
删除文件：git rm file
查看状态：git status
添加记录：git add file 或 git add .
添加描述：git commit -m "miao shu nei rong"
同步数据：git pull
提交数据：git push origin name
分支操作
查看分支：git branch
创建分支：git branch name
切换分支：git checkout name
创建+切换分支：git checkout -b name
合并某分支到当前分支：git merge name
删除分支：git branch -d name
删除远程分支：git push origin :name