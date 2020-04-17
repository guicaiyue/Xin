(function(){
var utilwrok = {
		setTimeout:function(a){
			//异步执行
			setTimeout(a(), 0);
		},
		cssjudge:function(a){
			//检查浏览器是否支持某样式
			if (a.style["scroll-behavior"] !== undefined) {
				return true;
			}
			return false
		}
	},
	cdnjsdelivr = "https://cdn.jsdelivr.net/gh/guicaiyue/Xin/",
	jslist = [],
	jsondata=[],
	index_message=$("#message")
//监听是否页面上角控制图标改变
window.originTitle = document.title;
var titleTime;
document.addEventListener('visibilitychange', function () {
	if (document.hidden) {
		$('[rel="icon"]').attr('href', window.CONFIG.favicon.hidden);
		document.title = window.CONFIG.favicon.hide_text;
		clearTimeout(titleTime);
	}
	else {
		$('[rel="icon"]').attr('href', window.CONFIG.favicon.narmal);
		document.title = window.CONFIG.favicon.show_text + window.originTitle;
		titleTime = setTimeout(function () {
		document.title = window.originTitle;
		}, 2000);
	}
});
//是否加载Live2D
if(window.innerWidth>991){live2dls()}
//加载pjax
pjaxLoad();
//加载播放器
aplayerls()
//默认消息
messagefun(function(){
	index_message.children("p").click(function(){
		window.location.href = 'https://cdn.jsdelivr.net/gh/guicaiyue/Xin/index/jian_li.png'
	})
})
//判断函数是否存在若存在则实行
judge();
function judge(){
	Valinelist();
	if(jsondata.length!=0 && $(".QQ-tall").length!=0){
		qqtall($(".QQ-tall").data('page'))
	}else{
		$.get('/lib/json/QQList.json',function(ev){
			jsondata = ev;
			if($(".QQ-tall").length!=0){
				qqtall($(".QQ-tall").data('page'))
			}
		})
	}
	if($(".aspect-ratio").length>0){
		biliifram()
	}
	if($('.interest-list-onefile').length>0){
			my_interest()
	}
	my_introduce();
	//懒加载
	Imglazyload();
	//图片放大
	imgmax();
}
//滑动条滚动绑定事件
$(window).bind('scroll',index_about)//是否固定右边元素
$(window).bind('scroll',scroll_return)//显示上去拉绳
//是否固定右边元素
function index_about(){
	if ($(window).scrollTop() >= 670) {
		$(".index-about-me").addClass("index-about-me-fixed")
	}else{
		$(".index-about-me").removeClass("index-about-me-fixed")
	}
}
function scroll_return(){
	// 滚动条距离顶部的距离 大于 200px时
	if ($(window).scrollTop() >= 600) {
		$("#scroll").css("top","0px");
	} else {
		$("#scroll").removeAttr("style");
	}
}
//回到顶部
$("#scroll").click(function(){
	$('body,html').animate({
		scrollTop: 0,
	}, 300);
})
//左边消息提示
function messagefun(zhi){
	index_message.css("left","0px");
	zhi()
	setTimeout(function(){
		index_message.removeAttr('style')
	},3000)
}
//判断js文件是否加载过
function jsjudge(name,url,method){
	if(jslist.indexOf(name) ==-1){
		$.getScript(url,function(){
			method();
		})
	}else{
		method();
	}
}
//哔哩哔哩页面
function liclick(av){
	let liurl = 'https://player.bilibili.com/player.html?aid='+av+'&page=1&as_wide=1&high_quality=1&danmaku=0'
	$('.aspect-ratio>iframe').attr('src',liurl)
	$("html,body").animate({
	   scrollTop: 680}, 300);
}
function timesec(time){
	let min=Math.floor(time%3600);
	let times = Math.floor(time/3600);
	let timef = Math.floor(min/60);
	let timem = time%60
	let t = ''
	if(times != 0){
		let i = times
		if(times<10){
			i = '0'+i+':'
		}
		t +=i
	}
	if(timef != 0){
		let i = timef
		if(timef<10){
			i = '0'+i+':'
		}
		t +=i
	}
	if(timem != 0){
		let i = timem
		if(timem<10){
			i = '0'+i
		}
		t +=i
	}
	return t
}
function biliifram(){
	let biurl = 'https://node.guicai.work/bilifavorite';
	$(".bilibil-ul").on('click','a,p',function(){
		liclick($(this).parent().data("id"))
	})
	$.ajax({
		url: biurl,
		type: 'get',
		dataType: "json",
		headers:{
			Accept:'application/json, text/plain, */*',
		},
		success: function(ev) {
			let html =``;
			let data = ev.data.medias
			liclick(data[0].id)
			for(let i=0;i<data.length;i++){
				let mt = $(['<li data-id="'+data[i].id+'"><a>',
				'<img src="'+data[i].cover+'@380w_240h_100Q_1c.webp" referrerPolicy="no-referrer" alt="'+data[i].title+'">',
				'<span class="length">'+timesec(data[i].duration)+'</span></a>',
				'<p title="'+data[i].title+'" class="title">'+data[i].title+'</p></li>'].join(''))
				html +=mt.prop("outerHTML");
			}
			$('.bilibil-ul').html(html)
		}
	})
}
//随机数
function Mathsum(m,n){
　　let num = Math.floor(Math.random()*(m - n) + n);
	return num
}
//如果是说说界面需要加载的js
function qqtall(page){
	let len = jsondata.length
	let sumpage = parseInt(len/20)+1
	let sum = page*20
	$(".qqpage").html(qqpage(page,sumpage))
	let data = jsondata.slice(sum-20,sum)
	let html =``
	let stycss = ['style-one','style-two','style-three','style-four','style-five',
	'style-six','style-seven','style-eight','style-ten','style-eleven','style-num'
	]
	for(let i of data){
		let h = `<li>
				<p class="tall-context `+stycss[Mathsum(0,12)]+`">`+i.name+`</p>
				<div class="tall-image">
					<img referrerPolicy="no-referrer" data-original="`+i.image.replace('http','https')+`" data-action="zoom" alt="">
				</div>
			</li>`
		html +=h;
	}
	$(".QQ-tall").html(html);
	document.documentElement.scrollTop = 500
}
function qqpage(page,litml){
	let h  = '<span class="page-number current">'+page+'</span>';
	if(page!=1){
	let	x = ''
	if(page<=4){
		for(let i=page-1;i>1;i--){
			x = '<span class="page-number" onclick="qqtall('+i+')">'+i+'</span>'+ x
		}
	}else{
		for(let i=1;i<3;i++){
			x = '<span class="page-number" onclick="qqtall('+(page-i)+')">'+(page-i)+'</span>'+x
		}
		x = '<span class="space">…</span>'+ x
	}
	x = `<span class="extend prev" rel="prev" onclick="qqtall(`+(page-1)+`)">
			  <svg class="icon" aria-hidden="true" fill="#b3d4fc">
				  <use xlink:href="#icon-prev"></use>
			  </svg></span>
			  <span class="page-number" onclick="qqtall(1)">1</span>
		`+x
	h = x+h
	}
	if(page!=litml){
	let n = ''
		if((litml-page)<=3){
			for(let i=litml-1;i>page;i--){
				n = n+'<span class="page-number" onclick="qqtall('+i+')">'+i+'</span>'
			}
		}else{
			n ='<span class="space">…</span>' + n
			for(let i=2;i>0;i--){
				n = '<span class="page-number" onclick="qqtall('+(page+i)+')">'+(page+i)+'</span>'+n
			}
		}
	n = n + `
			<span class="page-number" onclick="qqtall(`+litml+`)">`+litml+`</span>
			<span class="extend next" rel="next" onclick="qqtall(`+(page+1)+`)">
			  <svg class="icon" aria-hidden="true" fill="#b3d4fc">
				  <use xlink:href="#icon-xiayiye"></use>
			  </svg></span>`
	h = h+n
	}
	return h
}
//Valine评论
function Valinelist(){
	if(document.getElementById("article-sole")){
		jsjudge('Valine','//unpkg.com/valine/dist/Valine.min.js',function(){
			utilwrok.setTimeout(function(){
				new Valine({
					el: '#comments',
					appId: 'VwFAsloPPCpOTz4pYiMogp6u-gzGzoHsz',
					appKey: 'teJe5RdpAywYX5kEUi4czhVS',
					notify:false, 
					verify:false, 
					avatar:'monsterid', 
					placeholder: '一言:不要忘记自己的弱小',
					path: window.location.pathname
				})
			})
		})
	}
}
//爱好界面事件
function my_interest(){
	let currentPath = "",
		pageData = "",
		arryVideo = new Array(), //所有视频
		arrayFloder = new Array(), //所有文件夹 
		arrayFile = new Array(), //所有文件
		arrayNoFile =['肉番','B站好视频'], //所有文件
		dp = new DPlayer({
			container: document.getElementById('dplayer'),
			autoplay: true,
			video: {
				url:'/'
			},
		});
	ajaxlist(currentPath)
	function ajaxlist(data){
		$.ajax({
			url: "https://node.guicai.work/voicedlist",
			data:{pagem:data},
			success: function(t) {
				pageData =JSON.parse(window.atob(t)),
				arryVideo = new Array(),
				arrayFloder = new Array(),
				arrayFile = new Array();
				for(let i of pageData){
					if(arrayNoFile.indexOf(decodeURIComponent(i['name'])) != -1){
						continue
					}
					if(getFileType(decodeURIComponent(i['name'])) == "video"){
						arryVideo.push(decodeURIComponent(i['name']))
					}
					if (i['@type'] == 'file') {
						arrayFile.push(i)
					} else if (i['@type'] == 'folder') {
						arrayFloder.push(i)
					}
				}
				view()
			}
		})
	}
	//监听搜索框输入事件
	$('.interest-list-top>div:eq(1)>input').on('input propertychange',function(){
		let zhi =$(this).val()
		let elem = $('.interest-file-list>.interest-list-row');
		if(zhi == '' ||zhi == null ){
			elem.show()
			return 0;}
		elem.hide();
		elem.each(function(index,i){
			if($(i).children().eq(0).text().indexOf(zhi) != -1){
				$(i).show()
			}
		})
	})
	//监听顶部路径事件
	$('.interest-list-top>div:eq(0)').on('click','span,svg',function(){
		let data = $(this).prevAll().text() + $(this).text()
		$(this).nextAll().remove()
		currentPath = data
		ajaxlist(data)
	})
	//视频播放按钮
	$('.interest-file-list').on('click','.icon-bofang',function(){
		let url = $(this).parents('.interest-list-row').data('url')
		dp.switchVideo({url: url,});
		dp.notice("视频切换中，建议下载后观看",5000)
		dp.seek(0)
		dp.play()
		$("html,body").animate({
		   scrollTop: 700}, 300);
	})
	//文件下载按钮
	$('.interest-file-list').on('click','.icon-xiazai1',function(){
		let url = $(this).parents('.interest-list-row').data('url')
		$('<a href="'+url+'" download="'+name+'">Download</a>')[0].click();
	})
	//判断文件类型
	function getFileType(name) {
		if (!name) return false;
		let imgType = ['gif', 'jpeg', 'jpg', 'bmp', 'png'],
			videoType = ['avi', 'wmv', 'mkv', 'mp4', 'mov', '3gp', 'flv', 'mpg', 'rmvb'],
			textType = ['txt', 'pdf', 'css', 'js', 'text', 'doc', 'docx', 'ppt', 'xml'],
			musicType = ['wav', 'acc', 'flac', 'ape', 'ogg', 'mp3'];
		if (RegExp("\.(" + imgType.join("|") + ")$", "i").test(name.toLowerCase())) {
			return 'image'
		}else if (RegExp("\.(" + videoType.join("|") + ")$", "i").test(name.toLowerCase())) {
			return 'video'
		}else if (RegExp("\.(" + textType.join("|") + ")$", "i").test(name.toLowerCase())) {
			return 'text'
		}else if (RegExp("\.(" + musicType.join("|") + ")$", "i").test(name.toLowerCase())) {
			return 'music'
		} else {
			return false
		}
	}
	//生成列表
	function view(){
		let obj = $(".interest-file-list"),
			items = arrayFloder.concat(arrayFile);
		obj.html("")
		for(let i of items)
		{
			let icon = (i['@type'] == 'folder')? '#icon-wenjian':'#icon-wenjian1',
				name = decodeURIComponent(i['name']),
				protocol  = (document.location.protocol == 'https:') ? 'https:' : 'http:',
				href = protocol + '//drive.guicai.work'+ currentPath + '/' + name;
			let fileType = getFileType(name);
			let html = $(['<ul class="interest-list-row" data-url="'+href+'"><li><svg class="icon" aria-hidden="true">',
			'<use xlink:href="'+icon+'"></use></svg>'+name,
			'</li><li></li><li>'+i['size']+'</li></ul>'].join(''))
			if(i['@type'] == 'folder'){
				html.click(function(){
					currentPath +='/' + name;
					$(".interest-list-top>div:eq(0)").append('<span>/'+name+'</span>')
					ajaxlist(currentPath)
				})
			}else{
				let action = actionico(fileType);
				action += actionico('xiazai')
				html.children('li:eq(1)').html(action)
			}
			obj.append(html)
		}
	}
	function actionico(fileType){
		if(fileType == 'video'){
			return `<svg class="icon icon-bofang" aria-hidden="true">
							<use xlink:href="#icon-bofang"></use>
					  </svg>`
		}else if(fileType == 'xiazai'){
			return `<svg class="icon icon-xiazai1" aria-hidden="true">
					  <use xlink:href="#icon-xiazai1"></use>
					</svg>`
		}
		return ''
	}
}
//加载live2d
function live2dls(){
	utilwrok.setTimeout(function(){
		$.getScript(cdnjsdelivr+"live2d/js/live2dcubismcore.min.js", function(){
			$.getScript(cdnjsdelivr+"live2d/js/pixi.min.js", function(){
				$.getScript(cdnjsdelivr+"live2d/js/live2dv3.min.js", function(){
					new l2dViewer({
						el: document.getElementById('L2dCanvas'), // 要添加Live2d的元素
						basePath: cdnjsdelivr+'live2d/model', // 模型根目录
						modelName: 'shengluyisi_3', // 模型名称
						width: 300,
						height: 400
					})
				});
			});
		});
	})
}
//加载右下角音乐播放器
function aplayerls(){
	utilwrok.setTimeout(function(){
		$.getScript(cdnjsdelivr+"js/APlayer.min.js", function(){
			const ap = new APlayer({
			    container: document.getElementById('player'),
			    order:'random',
				lrcType: 3,
				fixed:!0,
			});
			let arrlist = []
			$.ajax({
				url: "https://api.i-meto.com/meting/api?server=netease&type=playlist&id=450158171",
				success: function(t) {
					ap.list.add(JSON.parse(t))
					for(let i of ap.list.audios){
						arrlist.push(i.name)
					}
				}
			})
			let svg = `
			<span class="aplayer-icon aplayer-icon-down">
				<svg class="icon" aria-hidden="true" fill="#686868">
					<use xlink:href="#icon-xiazai"></use>
				</svg>
			</span>
			`
			$('.aplayer-body').addClass('aplayer-body-show');
			$('.aplayer-body').find('.aplayer-icon-forward').after(svg)
			$('.aplayer-body').find('.aplayer-icon-down').click(function(){
				let text = $('.aplayer-title').text()
				let i =arrlist.indexOf(text)
				$('<a href="'+ap.list.audios[i].url+'" download="'+text+'">Download</a>')[0].click();
			})
		});
	})
}
//图片懒加载
function Imglazyload(){
	setTimeout(function(){
		$(".lazyload-image img").lazyload({
		//设置占位图，我这里选用了一个 loading 的加载动画
		placeholder: cdnjsdelivr+'index/img-load.gif',
		threshold : 200,
		//加载效果
		effect:"fadeIn",
		});
	},500)
}
//图片点击放大效果
/**
	* @link https://github.com/fat/zoom.js
*/
function imgmax(){
	var elems = document.querySelectorAll("img[data-action='zoom']");
	var _createClass = function() {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}
		return function(Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);
			if (staticProps) defineProperties(Constructor, staticProps);
			return Constructor;
		};
	}();
	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}
	(function(modules) {
		var installedModules = {};
		function __webpack_require__(moduleId) {
			if (installedModules[moduleId]) return installedModules[moduleId].exports;
			var module = installedModules[moduleId] = {
				i: moduleId,
				l: false,
				exports: {}
			};
			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
			module.l = true;
			return module.exports;
		}
		__webpack_require__.m = modules;
		__webpack_require__.c = installedModules;
		__webpack_require__.i = function(value) {
			return value;
		};
		__webpack_require__.d = function(exports, name, getter) {
			if (!__webpack_require__.o(exports, name)) {
				Object.defineProperty(exports, name, {
					configurable: false,
					enumerable: true,
					get: getter
				});
			}
		};
		__webpack_require__.n = function(module) {
			var getter = module && module.__esModule ? function getDefault() {
				return module["default"];
			} : function getModuleExports() {
				return module;
			};
			__webpack_require__.d(getter, "a", getter);
			return getter;
		};
		__webpack_require__.o = function(object, property) {
			return Object.prototype.hasOwnProperty.call(object, property);
		};
		__webpack_require__.p = "";
		return __webpack_require__(__webpack_require__.s = 3);
	})([ function(module, exports, __webpack_require__) {
		"use strict";
		__webpack_require__.d(exports, "a", function() {
			return windowWidth;
		});
		__webpack_require__.d(exports, "b", function() {
			return windowHeight;
		});
		__webpack_require__.d(exports, "c", function() {
			return elemOffset;
		});
		__webpack_require__.d(exports, "d", function() {
			return once;
		});
		var windowWidth = function windowWidth() {
			return document.documentElement.clientWidth;
		};
		var windowHeight = function windowHeight() {
			return document.documentElement.clientHeight;
		};
		var elemOffset = function elemOffset(elem) {
			var rect = elem.getBoundingClientRect();
			var docElem = document.documentElement;
			var win = window;
			return {
				top: rect.top + win.pageYOffset - docElem.clientTop,
				left: rect.left + win.pageXOffset - docElem.clientLeft
			};
		};
		var once = function once(elem, type, handler) {
			var fn = function fn(e) {
				e.target.removeEventListener(type, fn);
				handler();
			};
			elem.addEventListener(type, fn);
		};
	}, function(module, exports, __webpack_require__) {
		"use strict";
		var __WEBPACK_IMPORTED_MODULE_0__zoom_image_js__ = __webpack_require__(2);
		var __WEBPACK_IMPORTED_MODULE_1__utils_js__ = __webpack_require__(0);
		__webpack_require__.d(exports, "a", function() {
			return zoom;
		});
		var current = null;
		var offset = 80;
		var initialScrollPos = -1;
		var initialTouchPos = -1;
		var setup = function setup(elem) {
			elem.addEventListener("click", prepareZoom);
		};
		var prepareZoom = function prepareZoom(e) {
			if (document.body.classList.contains("zoom-overlay-open")) {
				return;
			}
			if (e.metaKey || e.ctrlKey) {
				window.open(e.target.getAttribute("data-original") || e.target.src, "_blank");
				return;
			}
			if (e.target.width >= __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_js__["a"])() - offset) {
				return;
			}
			closeCurrent(true);
			current = new __WEBPACK_IMPORTED_MODULE_0__zoom_image_js__["a"](e.target, offset);
			current.zoom();
			addCloseListeners();
		};
		var closeCurrent = function closeCurrent(force) {
			if (current == null) {
				return;
			}
			if (force) {
				current.dispose();
			} else {
				current.close();
			}
			removeCloseListeners();
			current = null;
		};
		var addCloseListeners = function addCloseListeners() {
			document.addEventListener("scroll", handleScroll);
			document.addEventListener("keyup", handleKeyup);
			document.addEventListener("touchstart", handleTouchStart);
			document.addEventListener("click", handleClick, true);
		};
		var removeCloseListeners = function removeCloseListeners() {
			document.removeEventListener("scroll", handleScroll);
			document.removeEventListener("keyup", handleKeyup);
			document.removeEventListener("touchstart", handleTouchStart);
			document.removeEventListener("click", handleClick, true);
		};
		var handleScroll = function handleScroll() {
			if (initialScrollPos == -1) {
				initialScrollPos = window.pageYOffset;
			}
			var deltaY = Math.abs(initialScrollPos - window.pageYOffset);
			if (deltaY >= 40) {
				closeCurrent();
			}
		};
		var handleKeyup = function handleKeyup(e) {
			if (e.keyCode == 27) {
				closeCurrent();
			}
		};
		var handleTouchStart = function handleTouchStart(e) {
			var t = e.touches[0];
			if (t == null) {
				return;
			}
			initialTouchPos = t.pageY;
			e.target.addEventListener("touchmove", handleTouchMove);
		};
		var handleTouchMove = function handleTouchMove(e) {
			var t = e.touches[0];
			if (t == null) {
				return;
			}
			if (Math.abs(t.pageY - initialTouchPos) > 10) {
				closeCurrent();
				e.target.removeEventListener("touchmove", handleTouchMove);
			}
		};
		var handleClick = function handleClick() {
			closeCurrent();
		};
		var zoom = Object.create(null);
		zoom.setup = setup;
	}, function(module, exports, __webpack_require__) {
		"use strict";
		var __WEBPACK_IMPORTED_MODULE_0__utils_js__ = __webpack_require__(0);
		var Size = function Size(w, h) {
			_classCallCheck(this, Size);
			this.w = w;
			this.h = h;
		};
		var ZoomImage = function() {
			function ZoomImage(img, offset) {
				_classCallCheck(this, ZoomImage);
				this.img = img;
				this.preservedTransform = img.style.transform;
				this.wrap = null;
				this.overlay = null;
				this.offset = offset;
			}
			_createClass(ZoomImage, [ {
				key: "forceRepaint",
				value: function forceRepaint() {
					var _ = this.img.offsetWidth;
					return;
				}
			}, {
				key: "zoom",
				value: function zoom() {
					var size = new Size(this.img.naturalWidth, this.img.naturalHeight);
					this.wrap = document.createElement("div");
					this.wrap.classList.add("zoom-img-wrap");
					this.img.parentNode.insertBefore(this.wrap, this.img);
					this.wrap.appendChild(this.img);
					this.img.classList.add("zoom-img");
					this.img.setAttribute("data-action", "zoom-out");
					this.overlay = document.createElement("div");
					this.overlay.classList.add("zoom-overlay");
					document.body.appendChild(this.overlay);
					this.forceRepaint();
					var scale = this.calculateScale(size);
					this.forceRepaint();
					this.animate(scale);
					document.body.classList.add("zoom-overlay-open");
				}
			}, {
				key: "calculateScale",
				value: function calculateScale(size) {
					var maxScaleFactor = size.w / this.img.width;
					var viewportWidth = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_js__["a"])() - this.offset;
					var viewportHeight = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_js__["b"])() - this.offset;
					var imageAspectRatio = size.w / size.h;
					var viewportAspectRatio = viewportWidth / viewportHeight;
					if (size.w < viewportWidth && size.h < viewportHeight) {
						return maxScaleFactor;
					} else if (imageAspectRatio < viewportAspectRatio) {
						return viewportHeight / size.h * maxScaleFactor;
					} else {
						return viewportWidth / size.w * maxScaleFactor;
					}
				}
			}, {
				key: "animate",
				value: function animate(scale) {
					var imageOffset = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_js__["c"])(this.img);
					var scrollTop = window.pageYOffset;
					var viewportX = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_js__["a"])() / 2;
					var viewportY = scrollTop + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_js__["b"])() / 2;
					var imageCenterX = imageOffset.left + this.img.width / 2;
					var imageCenterY = imageOffset.top + this.img.height / 2;
					var tx = viewportX - imageCenterX;
					var ty = viewportY - imageCenterY;
					var tz = 0;
					var imgTr = "scale(" + scale + ")";
					var wrapTr = "translate3d(" + tx + "px, " + ty + "px, " + tz + "px)";
					this.img.style.transform = imgTr;
					this.wrap.style.transform = wrapTr;
				}
			}, {
				key: "dispose",
				value: function dispose() {
					if (this.wrap == null || this.wrap.parentNode == null) {
						return;
					}
					this.img.classList.remove("zoom-img");
					this.img.setAttribute("data-action", "zoom");
					this.wrap.parentNode.insertBefore(this.img, this.wrap);
					this.wrap.parentNode.removeChild(this.wrap);
					document.body.removeChild(this.overlay);
					document.body.classList.remove("zoom-overlay-transitioning");
				}
			}, {
				key: "close",
				value: function close() {
					var _this = this;
					document.body.classList.add("zoom-overlay-transitioning");
					this.img.style.transform = this.preservedTransform;
					if (this.img.style.length === 0) {
						this.img.removeAttribute("style");
					}
					this.wrap.style.transform = "none";
					__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_js__["d"])(this.img, "transitionend", function() {
						_this.dispose();
						document.body.classList.remove("zoom-overlay-open");
					});
				}
			} ]);
			return ZoomImage;
		}();
		exports["a"] = ZoomImage;
	}, function(module, exports, __webpack_require__) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: true
		});
		var __WEBPACK_IMPORTED_MODULE_0__src_zoom_js__ = __webpack_require__(1);
		var elems = document.querySelectorAll("img[data-action='zoom']");
		for (var i = 0; i < elems.length; i++) {
			__WEBPACK_IMPORTED_MODULE_0__src_zoom_js__["a"].setup(elems[i]);
		}
	} ]);
}
/**
 * pjax事件，需要pjax.js支持
 */
function pjaxLoad(){
	let load = document.getElementById("page-load")
	//首页导航栏点击
	$(document).pjax('#menu-top a', '#articleList', {fragment:'#articleList', timeout:8000});
	//文章右侧关于我下面按钮
	$(document).pjax('.index-about-ul a:not(.a_blank)', '#articleList', {fragment:'#articleList', timeout:8000});
	//文章列表点击
	$(document).pjax('.article-theme a', '#articleList', {fragment:'#articleList', timeout:8000,scrollTo:680});
	//文章列表分页点击
	$(document).pjax('#paginator a', '#articleList', {fragment:'#articleList', timeout:8000,scrollTo:680});
	//pjax点击开始
	$(document).on({
		"pjax:click": function(xhr, options) {
			load.style.height = '5px';
			load.style.width = '10%';
		}
	});
	//ajax执行触发
	$(document).on({
		"pjax:beforeSend": function(xhr, options) {
			load.style.width = '20%';
		}
	});
	//pjax与服务器建立连接后触发
	$(document).on({
		"pjax:start": function(xhr, options) {
			load.style.width = '30%';
		}
	});
	//pjax:start之后触发
	$(document).on({
		"pjax:send": function(xhr, options) {
			load.style.width = '40%';
		}
	});
	//ajax请求开始后触发
	$(document).on({
		"pjax:clicked": function(xhr, options) {
			load.style.width = '50%';
		}
	});
	//ajax请求开始后触发
	$(document).on({
		"pjax:beforeReplace": function(xhr, options) {
			load.style.width = '60%';
		}
	});
	//内容替换成功后触发
	$(document).on({
		"pjax:success": function(xhr, options) {
			load.style.width = '80%';
		}
	});
	//ajax请求超时后触发。可调用e.preventDefault();继续等待ajax请求结束
	$(document).on({
		"pjax:timeout": function(xhr, options) {
			console.log("发生奇怪错误",xhr)
		}
	});
	//ajax请求失败后触发。默认失败后会跳转url，如要阻止跳转可调用 e.preventDefault();
	$(document).on({
		"pjax:error": function(xhr, options) {
			console.log("发生奇怪错误",xhr)
		}
	});
	//ajax请求结束后触发，不管成功还是失败
	$(document).on({
		"pjax:complete": function(xhr, options) {
			load.style.width = '90%';
		}
	});
	//pjax加载结束后
	$(document).on({
		"pjax:end": function(xhr, options) {
			load.style.width = '100%';
			setTimeout(function(){
				load.style.height = '0px';
				load.style.width = '100%'
			},1000);
			//是否存在函数执行
			judge()
		}
	});
}
/**
 * 中部右边我层
 */
function my_introduce(){
	//关于我与目录之间切换
	var rightTop = $(".index-about-me").children("ul").children("li")
	var rightcen = $(".index-about-catalog").children("section");
	rightTop.on('click',function(){
		let index = rightTop.index(this)
		if(rightcen.eq(index).is(':hidden')){
			rightTop.removeAttr("style")
			rightTop.eq(index).css("border-bottom","1px solid red")
			rightcen.eq(1-index).fadeToggle(100,function(){
				rightcen.eq(index).fadeToggle(200)
			})
		}
	})
	if(!utilwrok.cssjudge($("html")[0])){
		$(".index-about-me .toc").on('click','a',function(){
			$("html,body").animate({
			   scrollTop: $($(this).attr('href')).offset().top}, 500);
			return false
		})
	}
	let arr = $(".index-about-me .toc").find("a");
	let arr_top = [];
	utilwrok.setTimeout(function() {
	  for(let i=0;i<arr.length;i++){
	  	arr_top.push($(arr.eq(i).attr('href')).offset().top-10)
	  }
	  arr_top.push(10000)
	});
	let scroll_qian = 0;
	let arr_index = 0;
	//判断滚动条方向
	function scroll_direction(scroll){
		let flag;
		if (scroll_qian <= scroll) {
		  flag = true
		} else {
		  flag = false
		}
		utilwrok.setTimeout(function() {
		  scroll_qian = scroll;
		});
		return flag
	}
	function direction_color(a,i){
		let sum = a-arr_top[i]
		if(a>=arr_top[i]&&a<=arr_top[i+1]){
			arr.find("span").removeAttr('style')
			arr.eq(i).parents("li").children("a").find("span").css("color","#fc6423")
			arr_index = i;
			return true
		}
		return false
	}
	function catalog_toc(){
		let scrTop = $(window).scrollTop();
		if(scrTop >= arr_top[0]){
			let flag= scroll_direction(scrTop);
			if(flag){
				for(let i=arr_index;i<arr.length;i++){
					if(direction_color(scrTop,i)){
						break;
					}
				}
			}else{
				for(let i=arr_index;i>-1;i--){
					if(direction_color(scrTop,i)){
						break;
					}
				}
			}
		}
	}
	$(window).bind('scroll',catalog_toc);
	if($(".page_message").length!=0){
		let pass = $(".page_message").data("password");
		let text = $("#article-sole-context").html();
		let toc = $("#article-sole-toc").html()
		$("#article-sole-context").remove();
		$("#article-sole-toc").remove();
		$(".page_message").removeAttr("data-password");
		$(".page_message").on('keypress',function(){
			if($(this).val() == pass){
				$("#article-sole").html(text);
				$(".index-about-catalog").children("section").eq(0).html(toc)
				//懒加载
				Imglazyload();
				//图片放大
				imgmax();
				//目录数据
				arr = $(".index-about-me .toc").find("a");
				arr_top = []
				utilwrok.setTimeout(function() {
				  for(let i=0;i<arr.length;i++){
				  	arr_top.push($(arr.eq(i).attr('href')).offset().top-10)
				  }
				  arr_top.push(10000)
				});
			}
		})
	}
	//关于我界面
	Aboutme()
}
function Aboutme(){
	//微信与qq的二维码加载
	$(".index-about-ul li:not(.li-big)").hover(function(e){
		let hou = ".jpg"
		if($(".webpa").length>0){
			hou +='.webp'
		}
		if($(this).children(".QR-img-weixin").length>0){
			$(this).children(".QR-img-weixin").css("background-image","url("+cdnjsdelivr+"index/QR-weixin"+hou+")")
		}else{
			$(this).children(".QR-img-qq").css("background-image","url("+cdnjsdelivr+"index/QR-qq"+hou+")")
		}
	})
}
/**
 * 底部事件
 */
//秒转换方法
function formatSeconds(value) { 
 var theTime = parseInt(value/1000);// 需要转换的时间秒 
 var theTime1 = 0;// 分 
 var theTime2 = 0;// 小时 
 var theTime3 = 0;// 天
 if(theTime > 60) { 
  theTime1 = parseInt(theTime/60); 
  theTime = parseInt(theTime%60); 
  if(theTime1 > 60) { 
   theTime2 = parseInt(theTime1/60); 
   theTime1 = parseInt(theTime1%60); 
   if(theTime2 > 24){
    //大于24小时
    theTime3 = parseInt(theTime2/24);
    theTime2 = parseInt(theTime2%24);
   }
  } 
 } 
 var result = '';
 if(theTime > 0){
  result = ""+parseInt(theTime)+"秒";
 }
 if(theTime1 > 0) { 
  result = ""+parseInt(theTime1)+"分"+result; 
 } 
 if(theTime2 > 0) { 
  result = ""+parseInt(theTime2)+"小时"+result; 
 } 
 if(theTime3 > 0) { 
  result = ""+parseInt(theTime3)+"天"+result; 
 }
 return result; 
}
let qitime = (new Date("2020/04/07 00:00:00")).getTime();
let bottomtime = $('.bottom-information>li:eq(0)>span');
setInterval(function(){
	let da = new Date();
	bottomtime.html(formatSeconds(da.getTime()-qitime))
},1000)
/** 
 * 背景线条点击特效
 */
if (document.getElementById("canvas")) {
	var n, i   = function() {
			for (a.clearRect(0, 0, u, c), n = [{
					x: 0,
					y: .7 * c + h
				}, {
					x: 0,
					y: .7 * c - h
				}]; n[1].x < u + h;) r(n[0], n[1])
		},
		r = function(t, e) {
			a.beginPath(), a.moveTo(t.x, t.y), a.lineTo(e.x, e.y);
			var i = e.x + (2 * v() - .25) * h,
				r = o(e.y);
			a.lineTo(i, r), a.closePath(), f -= p / -50, a.fillStyle = "#" + (127 * m(f) + 128 << 16 | 127 * m(f + p / 3) +
				128 << 8 | 127 * m(f + p / 3 * 2) + 128).toString(16), a.fill(), n[0] = n[1], n[1] = {
				x: i,
				y: r
			}
		},
		o = function t(e) {
			var n = e + (2 * v() - 1.1) * h;
			return n > c || n < 0 ? t(e) : n
		},
		s = document.getElementById("canvas"),
		a = s.getContext("2d"),
		l = window.devicePixelRatio || 1,
		u = window.innerWidth,
		c = window.innerHeight,
		h = 90,
		d = Math,
		f = 0,
		p = 2 * d.PI,
		m = d.cos,
		v = d.random;
	s.width = u * l, s.height = c * l, a.scale(l, l), a.globalAlpha = .6, document.onclick = i, document.ontouchstart =
		i, i()
}
!function(){
	function n(t, e) {
		var n = Object.keys(t);
		if (Object.getOwnPropertySymbols) {
			var i = Object.getOwnPropertySymbols(t);
			e && (i = i.filter(function(e) {
				return Object.getOwnPropertyDescriptor(t, e).enumerable
			})), n.push.apply(n, i)
		}
		return n
	}
	
	function i(t, e, n) {
		return e in t ? Object.defineProperty(t, e, {
			value: n,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : t[e] = n, t
	}
	
	function r(t, e) {
		if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
	}
	
	function o(t, e) {
		for (var n = 0; n < e.length; n++) {
			var i = e[n];
			i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t,
				i.key, i)
		}
	}
	
	function a(t, e, n) {
		return e && o(t.prototype, e), n && o(t, n), t
	}
	var s = function() {
			function t(e) {
				var o = e.origin,
					a = e.speed,
					s = e.color,
					u = e.angle,
					l = e.context;
				r(this, t), this.origin = o, this.position = function(t) {
					for (var e = 1; e < arguments.length; e++) {
						var r = null != arguments[e] ? arguments[e] : {};
						e % 2 ? n(Object(r), !0).forEach(function(e) {
							i(t, e, r[e])
						}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : n(
							Object(r)).forEach(function(e) {
							Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(r, e))
						})
					}
					return t
				}({}, this.origin), this.color = s, this.speed = a, this.angle = u, this.context = l, this.renderCount = 0
			}
			return a(t, [{
				key: "draw",
				value: function() {
					this.context.fillStyle = this.color, this.context.beginPath(), this.context.arc(this.position.x, this.position
						.y, 2, 0, 2 * Math.PI), this.context.fill()
				}
			}, {
				key: "move",
				value: function() {
					this.position.x = Math.sin(this.angle) * this.speed + this.position.x, this.position.y = Math.cos(this.angle) *
						this.speed + this.position.y + .3 * this.renderCount, this.renderCount++
				}
			}]), t
		}(),
		u = function() {
			function t(e) {
				var n = e.origin,
					i = e.context,
					o = e.circleCount,
					a = void 0 === o ? 10 : o,
					s = e.area;
				r(this, t), this.origin = n, this.context = i, this.circleCount = a, this.area = s, this.stop = !1, this.circles = []
			}
			return a(t, [{
				key: "randomArray",
				value: function(t) {
					var e = t.length;
					return t[Math.floor(e * Math.random())]
				}
			}, {
				key: "randomColor",
				value: function() {
					var t = ["8", "9", "A", "B", "C", "D", "E", "F"];
					return "#" + this.randomArray(t) + this.randomArray(t) + this.randomArray(t) + this.randomArray(t) + this.randomArray(
						t) + this.randomArray(t)
				}
			}, {
				key: "randomRange",
				value: function(t, e) {
					return (e - t) * Math.random() + t
				}
			}, {
				key: "init",
				value: function() {
					for (var t = 0; t < this.circleCount; t++) {
						var e = new s({
							context: this.context,
							origin: this.origin,
							color: this.randomColor(),
							angle: this.randomRange(Math.PI - 1, Math.PI + 1),
							speed: this.randomRange(1, 6)
						});
						this.circles.push(e)
					}
				}
			}, {
				key: "move",
				value: function() {
					var t = this;
					this.circles.forEach(function(e, n) {
						if (e.position.x > t.area.width || e.position.y > t.area.height) return t.circles.splice(n, 1);
						e.move()
					}), 0 == this.circles.length && (this.stop = !0)
				}
			}, {
				key: "draw",
				value: function() {
					this.circles.forEach(function(t) {
						return t.draw()
					})
				}
			}]), t
		}();
	(new(function() {
		function t() {
			r(this, t), this.computerCanvas = document.createElement("canvas"), this.renderCanvas = document.createElement(
					"canvas"), this.computerContext = this.computerCanvas.getContext("2d"), this.renderContext = this.renderCanvas
				.getContext("2d"), this.globalWidth = window.innerWidth, this.globalHeight = window.innerHeight, this.booms = [],
				this.running = !1
		}
		return a(t, [{
			key: "handleMouseDown",
			value: function(t) {
				var e = new u({
					origin: {
						x: t.clientX,
						y: t.clientY
					},
					context: this.computerContext,
					area: {
						width: this.globalWidth,
						height: this.globalHeight
					}
				});
				e.init(), this.booms.push(e), this.running || this.run()
			}
		}, {
			key: "handlePageHide",
			value: function() {
				this.booms = [], this.running = !1
			}
		}, {
			key: "init",
			value: function() {
				var t = this.renderCanvas.style;
				t.position = "fixed", t.top = t.left = 0, t.zIndex = "999999999999999999999999999999999999999999", t.pointerEvents =
					"none", t.width = this.renderCanvas.width = this.computerCanvas.width = this.globalWidth, t.height = this.renderCanvas
					.height = this.computerCanvas.height = this.globalHeight, document.body.append(this.renderCanvas), window.addEventListener(
						"mousedown", this.handleMouseDown.bind(this)), window.addEventListener("pagehide", this.handlePageHide.bind(
						this))
			}
		}, {
			key: "run",
			value: function() {
				var t = this;
				if (this.running = !0, 0 == this.booms.length) return this.running = !1;
				requestAnimationFrame(this.run.bind(this)), this.computerContext.clearRect(0, 0, this.globalWidth, this.globalHeight),
					this.renderContext.clearRect(0, 0, this.globalWidth, this.globalHeight), this.booms.forEach(function(e, n) {
						if (e.stop) return t.booms.splice(n, 1);
						e.move(), e.draw()
					}), this.renderContext.drawImage(this.computerCanvas, 0, 0, this.globalWidth, this.globalHeight)
			}
		}]), t
	}())).init()
	
}()
})()