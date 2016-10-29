!function(t,e){"undefined"!=typeof module&&module.exports?module.exports=e():"function"==typeof define&&define.amd?define(e):t.Banner=e.call(t)}(this,function(){"use strict";function Banner(t){this.options=$.extend(defaults,t||{}),W=this.options.width,H=this.options.height,this.banner=$(this.options.banner),this.index=this.options.index||0,this.total=this.options.images.length||0,this.ready=!1,this.init()}var defaults={banner:null,index:0,autoplay:8e3,width:1200,height:300,images:[],preloadImages:!0,pagination:"",paginationClick:!0,prevButton:"",nextButton:"",onInit:$.noop,onClick:$.noop,onBannerChange:$.noop,Effects:[]},W=0,H=0;return Banner.prototype={EFFECTS:["boomEffect","turnEffect","pageEffect","skewEffect","cubeEffect"],defaultEffect:"boomEffect",init:function(){this.initDom(),this.initEvents(),this.preloadImages(),this.setBannerEffect(this.options.Effects),this.autoPlay(),this.options.onInit(),this.ready=!0},initDom:function(){if(this.options.pagination){for(var t=$(this.options.pagination),e="",n=0;n<this.total;n++)0!=n?e+='<a class="js_nav" href="javascript:;"></a>':e='<a class="js_nav current" href="javascript:;"></a>';t.html(e)}},initEvents:function(){var t=this;if(this.options.nextButton){var e=$(this.options.nextButton);e&&e.on("click",function(){t.bannerChange(t.getNextIndex(!0),"next")})}if(this.options.prevButton){var n=$(this.options.prevButton);n&&n.on("click",function(){t.bannerChange(t.getNextIndex(!1),"prev")})}if(this.options.paginationClick&&this.options.pagination){var i=$(this.options.pagination);i.on("click",function(e){var n=$(e.target).index();t.bannerChange(n,"navi"),$(this).addClass("current").siblings("a").removeClass("current")})}$(this.options.banner).on("click",function(e){t.options.onClick(e,t.index)})},bannerChange:function(index,type){this.ready&&(clearInterval(this.autoplayTimer),$(this.options.pagination).find("a").removeClass("current").eq(index).addClass("current"),eval("this."+this.getBannerEffect(type)+"( "+index+")"),this.banner.attr("href",this.options.images[index].link),this.onBannerChange(),this.autoPlay())},autoPlay:function(){var t=this;this.options.autoplay&&!isNaN(this.options.autoplay)&&(this.autoplayTimer=setInterval(function(){var e=t.getNextIndex(!0);t.bannerChange(e,"next")},this.options.autoplay))},onBannerChange:function(t){this.options.onBannerChange(t)},getNextIndex:function(t){var e=0;return e=t?this.index==this.total-1?0:(this.index+1)%this.total:0==this.index?this.total-1:(this.index-1)%this.total},getBannerUrl:function(t){return"url("+this.getBannerSrc(t)+") "},getBannerSrc:function(t){return this.options.images[t].url||""},preloadImages:function(){if(this.options.preloadImages)for(var t=0;t<this.options.images.length;t++)(new Image).src=this.options.images[t].url},getBannerEffect:function(t){if(t&&this.effect[t]){for(var e,n=0;n<this.EFFECTS.length;n++)this.effect[t]==this.EFFECTS[n]&&(e=!0);if(e)return this.effect[t];throw new Error("effect "+this.effect[t]+" not support.")}return this.defaultEffect},setBannerEffect:function(t){return Utils.isString(t)?this.effect={prev:t,next:t,navi:t}:void(this.effect=$.extend({prev:this.defaultEffect,next:this.defaultEffect,navi:this.defaultEffect},t))},boomEffect:function(t){var e=this;if(this.ready){this.ready=!1;var n=4,i=7,a=W/2,r=H/2;this.banner[0].innerHTML="",this.banner[0].style.background=this.getBannerUrl(t)+" center no-repeat";for(var s=[],o=n*i,l=0;l<n;l++)for(var f=0,c=0;f<i;f++,c++){s[l]={left:W*f/i,top:H*l/n};var d=document.createElement("div");Utils.setStyle(d,{position:"absolute",background:e.getBannerUrl(e.index)+-s[l].left+"px "+-s[l].top+"px no-repeat",width:Math.ceil(W/i)+"px",height:Math.ceil(H/n)+"px",left:s[l].left+"px",top:s[l].top+"px"}),e.banner[0].appendChild(d);var p=(s[l].left+W/(2*i)-a)*Utils.rnd(2,3)+a-W/(2*i),h=(s[l].top+H/(2*n)-r)*Utils.rnd(2,3)+r-H/(2*n);setTimeout(function(n,i,a){return function(){Effect.buffer(n,{left:n.offsetLeft,top:n.offsetTop,opacity:100,x:0,y:0,z:0,scale:1,a:0},{left:i,top:a,opacity:0,x:Utils.rnd(-180,180),y:Utils.rnd(-180,180),z:Utils.rnd(-180,180),scale:Utils.rnd(1.5,3),a:1},function(t){this.style.left=t.left+"px",this.style.top=t.top+"px",this.style.opacity=t.opacity/100,Utils.setStyle3(n,"transform","perspective(500px) rotateX("+t.x+"deg) rotateY("+t.y+"deg) rotateZ("+t.z+"deg) scale("+t.scale+")")},function(){setTimeout(function(){0==--o&&(e.ready=!0,e.index=t),e.banner[0].removeChild(n)},200)},10)}}(d,p,h),Utils.rnd(0,200))}}},turnEffect:function(t){var e=this;if(this.ready){this.ready=!1;var n=3,i=6,a=n*i,r=Math.ceil(W/i),s=Math.ceil(H/n);e.banner[0].style.background="none",e.banner[0].innerHTML="";for(var o=0;o<i;o++)for(var l=0;l<n;l++){var f=document.createElement("div"),c=Math.ceil(H*l/n),d=Math.ceil(W*o/i);Utils.setStyle(f,{position:"absolute",background:e.getBannerUrl(e.index)+-d+"px "+-c+"px no-repeat",left:d+"px",top:c+"px",width:r+"px",height:s+"px"}),function(n,i,r){n.ch=!1,setTimeout(function(){Effect.linear(n,{y:0},{y:180},function(a){a.y>90&&!n.ch&&(n.ch=!0,n.style.background=e.getBannerUrl(t)+-i+"px "+-r+"px no-repeat"),a.y>90?Utils.setStyle3(n,"transform","perspective(500px) rotateY("+a.y+"deg) scale(-1,1)"):Utils.setStyle3(n,"transform","perspective(500px) rotateY("+a.y+"deg)")},function(){0==--a&&(e.ready=!0,e.index=t)},22)},200*(o+l))}(f,d,c),e.banner[0].appendChild(f)}}},pageEffect:function(t){var e=this;if(this.ready){this.ready=!1,this.banner[0].innerHTML="",this.banner[0].style.background=this.getBannerUrl(t)+" center no-repeat";var n=document.createElement("div");Utils.setStyle(n,{position:"absolute",background:this.getBannerUrl(t)+" right no-repeat",zIndex:3,left:"50%",top:0,width:"50%",height:"100%",overflow:"hidden"}),Utils.setStyle3(n,"transform","perspective(1000px) rotateY(0deg)"),Utils.setStyle3(n,"transformOrigin","left"),this.banner[0].appendChild(n);var i=document.createElement("div");Utils.setStyle(i,{position:"absolute",left:0,top:0,width:"50%",height:"100%",zIndex:2,background:this.getBannerUrl(this.index)+" left no-repeat"}),this.banner[0].appendChild(i);var a=document.createElement("div");Utils.setStyle(a,{position:"absolute",right:0,top:0,width:"50%",height:"100%",zIndex:2,background:"rgba(0,0,0,1)"}),this.banner[0].appendChild(a),n.ch=!1,Effect.buffer(n,{y:0,opacity:1},{y:-180,opacity:0},function(i){if(i.y<-90&&!n.ch){n.ch=!0,n.innerHTML="<img />";var r=n.getElementsByTagName("img")[0];r.src=e.getBannerSrc(t),Utils.setStyle3(r,"transform","scaleX(-1)"),Utils.setStyle(r,{position:"absolute",right:0,top:0,width:"200%",height:"100%"}),Utils.setStyle3(n,"transformOrigin","left")}i.y<-90?Utils.setStyle3(n,"transform","perspective(1000px) scale(-1,1) rotateY("+(180-i.y)+"deg)"):Utils.setStyle3(n,"transform","perspective(1000px) rotateY("+i.y+"deg)"),a.style.background="rgba(0,0,0,"+i.opacity+")"},function(){e.ready=!0,e.index=t},14)}},skewEffect:function(t){var e=this;if(this.ready){this.ready=!1;var n=6,i=n,a=Math.ceil(W/n);e.banner[0].style.background="none",e.banner[0].innerHTML="";for(var r=0;r<n;r++){var s=document.createElement("div");Utils.setStyle(s,{width:a+"px",height:"100%",position:"absolute",left:W*r/n+"px",top:0}),Utils.setStyle3(s,"transformStyle","preserve-3d"),Utils.setStyle3(s,"transform","perspective(1000px) rotateX(0deg)"),function(a,r){a.style.zIndex=n/2-Math.abs(r-n/2),setTimeout(function(){Effect.buffer(a,{a:0,x:0},{a:100,x:-90},function(t){Utils.setStyle3(a,"transform","perspective(1000px) rotateY("+3*(r-n/2)*(50-Math.abs(t.a-50))/50+"deg) rotateX("+t.x+"deg)")},function(){0==--i&&(e.ready=!0),e.index=t},8)},130*(r+1))}(s,r),s.innerHTML="<div></div><div></div><div></div><div></div>";var o=s.getElementsByTagName("div")[0],l=s.getElementsByTagName("div")[1],f=s.getElementsByTagName("div")[2],c=s.getElementsByTagName("div")[3];Utils.setStyle([o,l,f,c],{width:"100%",height:"100%",position:"absolute",left:0,top:0}),Utils.setStyle(o,{background:e.getBannerUrl(t)+-W*r/n+"px 0px no-repeat"}),Utils.setStyle3(o,"transform","scale3d(0.870,0.870,0.870) rotateX(90deg) translateZ("+H/2+"px)"),Utils.setStyle(l,{background:e.getBannerUrl(e.index)+-W*r/n+"px 0px no-repeat"}),Utils.setStyle3(l,"transform","scale3d(0.870,0.870,0.870) rotateX(0deg) translateZ("+H/2+"px)"),Utils.setStyle(f,{background:"#666"}),Utils.setStyle3(f,"transform","scale3d(0.870,0.870,0.870) rotateX(0deg) translateZ(-"+H/2+"px)"),Utils.setStyle(c,{background:"#666"}),Utils.setStyle3(c,"transform","scale3d(0.870,0.870,0.870) rotateX(90deg) translateZ(-"+H/2+"px)"),e.banner[0].appendChild(s)}}},cubeEffect:function(t){var e=this;if(this.ready){this.ready=!1,e.banner[0].innerHTML="",e.banner[0].style.background="none",Utils.setStyle3(e.banner[0],"transformStyle","preserve-3d"),Utils.setStyle3(e.banner[0],"transform","perspective("+W/2+") rotateY(0deg)");var n=document.createElement("div"),i=document.createElement("div");Utils.setStyle([n,i],{position:"absolute",width:"100%",height:"100%",left:0,top:0}),Utils.setStyle3(n,"transform","scale3d(0.5, 0.5, 0.5) rotate3d(0, 1, 0, 0deg) translate3d(0, 0,"+W/2+"px)"),Utils.setStyle3(i,"transform","scale3d(0.5, 0.5, 0.5) rotate3d(0, 1, 0, 90deg) translate3d(0, 0,"+W/2+"px)"),e.banner[0].appendChild(i),e.banner[0].appendChild(n),n.style.background=e.getBannerUrl(e.index)+" center no-repeat",i.style.background=e.getBannerUrl(t)+" center no-repeat",setTimeout(function(){Effect.flex(e.banner[0],{y:0},{y:-90},function(t){Utils.setStyle3(e.banner[0],"transform","perspective("+W/2+") rotateY("+t.y+"deg)")},function(){Utils.setStyle3(e.banner[0],"transition","none"),Utils.setStyle3(e.banner[0],"transformStyle","flat"),Utils.setStyle3(e.banner[0],"transform","none"),e.banner[0].innerHTML="",e.banner[0].style.background=e.getBannerUrl(t)+" center no-repeat",e.index=t,e.ready=!0},10,.6)},0)}}},Banner});