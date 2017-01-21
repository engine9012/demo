> 一行水平居中，两行就左对齐

当时看到这条消息时，我首先想到的是，最简单的办法应该是通过 JS 去计算这个文字所在的元素的高度，如果大于了一行的高度就改变 `text-align` 的对齐方式。

不过在路上吹着冷风的时候，突然想到，居中、左对齐，`text-align` 不是仅仅只对文本设置对齐方式啊，还可以对 `inline-block` 元素设置对齐方式，那这样的话不就是可以用多个元素的组合的方式来到达效果么。

先看一下最后的效果：
![dfg](http://mmbiz.qpic.cn/mmbiz_gif/7aMczKfM23KAH6lCIyP1pIl4JHiaJsOOgAIGib1cYRiaic3NhmSwVQV1CjjMZfcu6icsg00LHlaichrA9ibjHxmjGJfZw/0?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1)

在这个 gif 的图片中，当文字变多的时候，超过一行的时候，对齐方式就改变了。就如前面我所提到的那样：

* 首先通过父元素的 text-align 将文本对齐方式设置为居中对齐；
* 其次设置子元素的 text-align 的文本对齐方式设置为居左对齐；
* 最后再让这个子元素转为 inline-block 或者不转为 inline-block，反正不要是块级元素就对了，因为块级元素会让这个子元素撑满父级元素的宽度，就达不到预期的效果了；

结合上面这三点，然后把上面的那个 gif 图稍微调整了。加个背景色重新录制 gif 后就可以看到这样的一个效果。
![git2](http://mmbiz.qpic.cn/mmbiz_gif/7aMczKfM23KAH6lCIyP1pIl4JHiaJsOOgWk2CuicgA0Iz8nlsEFzBO2Zph1BlzbR0sEcxYMDDo2kj8l53Few0HcA/0?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1)

OK了，这样我想应该就比较明显看到区别了。当子元素的宽度被撑满的时候，内容都是左对齐的，而没有撑满时，就算是左对齐，我们也看不到效果，反而可以看到因为父元素的 text-align: center; 的影响，变成居中对齐了。

以上就是思路，下面就开始代码，从最初的一个想法开始，然后增加了几种其他的方式，其中有大部分人喜欢的 flex 属性，也有部分人喜欢的一个标签去实现的效果。

#### 方案一
***
通过两个标签，结合 `inline-block` 的方式来实现:
    
	<p class="ps"><span>文字文文字文字文字文字</span></p>
  	<p class="ps"><span>文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字</span></p>

这个结构很简单，就是一个`<p>`标签中包含了 `<span>`标签，然后样式更简单了：

	.ps {
  		text-align: center;
	}
	.ps span {
  		display: inline-block;
  		text-align: left;
	}
就这样，一个需要实现了。先通过父级设置子元素的居中，然后子元素为 `inline-block` 就可以设置 `text-align: left;` 让自身的内容居左。

#### 方案二
***
有了前面的思路之后，就可以开始扩展开其他的方案了，比如现在很多人都喜欢的 flex 属性。

	<div class="flex"><span>文字文文字文字文字文字</span></div>
	<div class="flex"><span>文字文文字文字文字文字文字文文字文字文字文字文字文文字文字文字文字</span></div>
	
虽说要用 `flex` 属性来做效果，但并没有太多其他相关临的属性，而仅仅只是设置了 `display: inline-flex;` 而已。当然，如果是用 `display: flex;` 这个也应该可以的，只不过方式可能变了，需要写的 CSS 也会多一点吧。

	.flex {
  		text-align: center;
	}
	.flex span {
  		display: inline-flex;
  		text-align: left;
	}
嗯嗯嗯，酒浆紫……
#### 方案三
***
讨厌表格么？反正很多人不喜欢。不过 <table> 这个标签也是可以实现的哦，比如这样一个结构。

	<table class="table">
  		<tr>
    		<td>文字文文字文字文字文字</td>
  		</tr>
	</table>
	<table class="table">
  	<tr>
    	<td>文字文文字文字文字文字文字文文字文字文字文字文字文文字文字文字文字</td>
  	</tr>
	</table>
嵌套的层级多了,`table>tr>td`，三层，也难怪很多人不喜欢。就算不是因为层级嵌套深，也有可能是因为据说表格的渲染是 `<table>` 到 `</table>` 这样才算是一个完整的渲染，除非中间有 `<tbody>` 来隔开。但这个不是重点，现在的重点是用这个表格结构来实现最终的效果。

	.table {
  		margin: 0 auto;
	}
	.table td {
  		text-align: left;
	}

表格没设置宽度，然后被 `<td>` 给撑开，同时 `<table>` 的 `display` 属性值应该是 `display: table;` 对吧，那么就这样，用 `margin: 0 auto;` 居中一下，然后设置 `<td>` 的文本对齐方式为居左，就搞定了。

#### 方案四
---
来了来了，单标签的方案来了。这个方案是继表格的方案之后而想到的。
	
	<p class="tab-cell">文字文文字文字文字文字</p>
	<p class="tab-cell">文字文文字文字文字文字文字文文字文字文字文字文字文文字文字文字文字</p>
	
前面提到的表格方案中，有大部分的因素是 `<table>` 和 `<td>` 标签，所以，现在，就尝试把 `display: table;` 用在 `<p>` 标签上，改变原本的 `display: block;` 属性。

* `<table>` 标签的 `display` 属性值是 `table`；
*  `<td>` 标签的 `display` 属性值是 `table-cell;`

```	
	.tab-cell {
  		display:table;
  		margin: 0 auto;
  		text-align: left;
	}
```
OK了，就这样，简单搞定。

#### 方案五
---
到第五个方案了，其实这个方案应该是在 `flex` 之前我就想尝试的，但是感觉好烦，一会儿要 `left: 50%;`，一会儿又要 `left: -50%;` 什么的，然后还要浮动。当然，如果愿意的话，我觉得吧，用 `transform: translateX(-50%);` 这样的也是可以的。

这个方案最早的时候是来自蓝色理想中的一篇文章，首发不知道是不是那里，反正我当时是在那里看到的，文章名中有一个词是`“float: center;”`，所以，我记得比较深。

现在用 `float center` 作为关键词，在百度上还是可以找到一些文章的，具体我也不说了。

	<p class="fc"><span>文字文文字文字文字文字</span></p>
	<p class="fc"><span>文字文文字文字文字文字文字文文字文字文字文字文字文文字文字文字文字</span></p>
	
HTML 结构跟方案一是一样的，当然，类名是因为我在做 demo 的时候为了不重复随便取的。

	.fc {
  		float: left;
  		position: relative;
  		left: 50%;
	}
	.fc span {
  		float: left;
  		position: relative;
  		left: -50%;
	}
哦了，就是这样。这个 CSS 一看就明白。浮动是为了容器“自适应”内容的，方便被撑开，再加上定位属性之后，向左 50%，向右 50%，最后就成了。