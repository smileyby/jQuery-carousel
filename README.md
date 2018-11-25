渐隐渐显轮播图原理
================

1. 初始：所有轮播图都叠加在一起 （opacity:0;z-index:0;）
2. 默认展示第一个，第一个样式（opacity:1;z-index:1;）
3. 如果需要展示第二个，首先让第二张的z-index:1，让上一个的z-index变为0，再让第二张的opacity从0-1（动画效果），动画完成后，还需要让一个图片的透明度变为0

```javascript
//=> 插件默认配置项
var _default = {
    initIndex: 0, //=> 初始位置
    autoInterval: 2000, //=> 切换时间
    showFocus: true, //=> 是否显示底部焦点
    needFocus: true, //=> 底部焦点是否可操作
    eventFocus: 'mouseenter', //=> 底部焦点切换事件
    showArrow: true, //=> 是否显示左右切换按钮
    eventArrow: 'click', //=> 左右按钮切换事件
    needAuto: true //=> 是否自动轮播
};
```

`tips` 

> 顺带看了下，目前清除浮动的方法（demo中使用了display:inline-block;，避免去清除浮动）：

```css
/* 方案1 */
.clearfix:after {
	content:'.';
	display:block;
	height:0;
	clear:both;
	visibility:hidden;
}
.clearfix {
	*+height:1%;
}

/* 方案2 */
.clearfix {
	overflow: auto;
	_height:1%;
}

/* 方案3 */
.clearfix {
	overflow: hidden;
	_zoom:1;
}
```