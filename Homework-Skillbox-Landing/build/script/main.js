!function(l){function e(e){for(var t,n,i=e[0],r=e[1],s=e[2],o=0,a=[];o<i.length;o++)n=i[o],Object.prototype.hasOwnProperty.call(u,n)&&u[n]&&a.push(u[n][0]),u[n]=0;for(t in r)Object.prototype.hasOwnProperty.call(r,t)&&(l[t]=r[t]);for(g&&g(e);a.length;)a.shift()();return d.push.apply(d,s||[]),c()}function c(){for(var e,t=0;t<d.length;t++){for(var n,i=d[t],r=!0,s=1;s<i.length;s++)n=i[s],0!==u[n]&&(r=!1);r&&(d.splice(t--,1),e=o(o.s=i[0]))}return e}function o(e){if(n[e])return n[e].exports;var t=n[e]={i:e,l:!1,exports:{}};return l[e].call(t.exports,t,t.exports,o),t.l=!0,t.exports}var n={},u={0:0},d=[];o.m=l,o.c=n,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)o.d(n,i,function(e){return t[e]}.bind(null,i));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/";var t=window.webpackJsonp=window.webpackJsonp||[],i=t.push.bind(t);t.push=e,t=t.slice();for(var r=0;r<t.length;r++)e(t[r]);var g=i;d.push([5,1]),c()}([,function(e,t,n){"use strict";function i(){var i=s("body"),r=window.innerWidth-i.width();return function(){var e,t=s(".system__slidebar");if(t=t.length?t:((e=s('<div class="system__slidebar">')).css("width","".concat(r,"px")),e.css("right","-".concat(r,"px")),e),"hidden"===i.css("overflowY"))return"hidden"===i.css("overflowY")?(i.css("overflowY",""),i.css("width",""),t.remove(),!0):void 0;i.css("overflowY","hidden");var n=r/i.width()*100;return i.css("width","".concat(100-n,"%")),i.append(t),!0}()}var s;s=n(0),n.d(t,"a",function(){return i})},function(e,t,n){"use strict";function i(n){for(var e=arguments.length,i=Array(1<e?e-1:0),t=1;t<e;t++)i[t-1]=arguments[t];return new Promise(function(t){void 0!==n.jquery&&(n=n[0]),i.forEach(function(e){n.classList.add(e)}),n.onanimationend=function(e){return t(e)}})}function r(e,t,n){var i;return function(e){i=i||setTimeout(function(){clearTimeout(i),i=null,t(e)},n,e)}}n.d(t,"a",function(){return i}),n.d(t,"b",function(){return r})},,function(e,i,r){"use strict";!function(d){function e(e,t){for(var n,i=0;i<t.length;i++)(n=t[i]).enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}r.d(i,"a",function(){return n});var t=r(3),n=(r.n(t),e(g.prototype,[{key:"showMessage",value:function(e,t){e.message.removeClass(t.messageAnimHideClass),e.message.removeClass(t.validClass),e.element.classList.remove(t.validClass),e.message.addClass(t.errorClass),e.element.classList.add(t.errorClass),e.message.addClass(t.messageAnimShowClass)}},{key:"hideMessage",value:function(e,t){e.message.removeClass(t.messageAnimShowClass),e.message.removeClass(t.errorClass),e.element.classList.remove(t.errorClass),e.message.addClass(t.validClass),e.element.classList.add(t.validClass),e.message.addClass(t.messageAnimHideClass)}},{key:"validate",value:function(e){var t=0<arguments.length&&void 0!==e?e:this.fields,n=!0,i=!1,r=void 0;try{for(var s,o=t[Symbol.iterator]();!(n=(s=o.next()).done);n=!0){var a=s.value,l=!1;if(!1===a.change&&null!==a.valid)break;for(var c,u=0,d=Object.entries(this.options.rules);u<d.length;u++)if(c=d[u],a.element.getAttribute("name")===c[0])for(var g,f=Object.entries(c[1]),m=0,p=f;m<p.length&&(g=p[m],!l);m++)this.methods[g[0]]?("boolean"==typeof g[1]&&(g[1]={value:g[1]}),this.methods[g[0]](a,g[1].value,g[1].message,this)?a.valid=!0:(l=!0,a.valid=!1),a.change=!1):console.log("метод ".concat(k," не задан"))}}catch(t){i=!0,r=t}finally{try{n||null==o.return||o.return()}finally{if(i)throw r}}return this.fields.map(function(e){return e.valid}).every(function(e){return!0===e})}}]),g);function g(e,t){var o=this,n=1<arguments.length&&void 0!==t?t:null;if(function(e){if(!(e instanceof g))throw new TypeError("Cannot call a class as a function")}(this),this.options,this.init=!1,this.target,this.targetTag,this.form=null,this.fields=[],this.submit=null,void 0===e.jquery&&(e=d(e)),e[0].tagName.match(/(input|form|textarea)/i)){if(this.target=e,this.targetTag=e[0].tagName.toLowerCase(),"form"===this.targetTag)this.form=this.target,this.form.attr("novalidate","novalidate"),this.fields=d.makeArray(d('input[type!="button"][type!="submit"][type!="reset"], textarea',this.form[0])).map(function(e){return{element:e}}),this.submit=d('[type="submit"]',this.form[0]);else{if(this.target.attr("type").match(/(button|submit|reset)/i))return console.log("Элемент <".concat(e[0].tagName,"> не является полем. Тип ").concat(this.target.attr("type"))),void(this.init=!1);this.fields=[{element:this.target[0]}]}this.defaultOptions={parentClass:"",messageElement:"span",messageClass:"message",messageAnimShowClass:"",messageAnimHideClass:"",errorClass:"error",validClass:"valid",rules:{name:{required:{value:!0,message:"пустое поле"}},phone:{required:!0,pattern:{value:/\+7\s\(\d{3}\)\s\d{3}-\d{4}/,message:"невалидный номер",mask:"+7 (999) 999-9999"}},email:{required:!0,pattern:{value:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,message:"невалидный адрес e-mail"}}}},this.options=n?Object.assign(this.defaultOptions,n):this.defaultOptions,this.methods={required:function(e,t,n,i){var r=2<arguments.length&&void 0!==n?n:"пустое поле",s=3<arguments.length?i:void 0,o=!!e.element.value.trim();return o?s.hideMessage(e,s.options):(e.message.text(r),s.showMessage(e,s.options)),o},pattern:function(e,t,n,i){var r=e.element.value.trim().match(t);return r?i.hideMessage(e,i.options):(e.message.text(n),i.showMessage(e,i.options)),r}};var a=[],i=!0,r=!1,s=void 0;try{for(var l,c=function(){for(var e,t=l.value,n=!1,i=0,r=Object.entries(o.options.rules);i<r.length;i++)e=r[i],t.element.getAttribute("name")===e[0]&&(n=!0,e[1].pattern&&e[1].pattern.mask&&(d(t.element).mask(e[1].pattern.mask),t.element.addEventListener("blur",function(){t.change=!0})));if(n){if(a.push(t),t.message=d("<".concat(o.options.messageElement,">")),t.message.addClass(o.options.messageClass),o.options.parentClass){var s=d(t.element).parent(".".concat(o.options.parentClass));s?t.message.insertAfter(s):t.message.insertAfter(t.element)}else t.message.insertAfter(t.element);t.element.addEventListener("blur",function(){return o.validate([t])}),t.element.addEventListener("change",function(){t.change=!0})}},u=this.fields[Symbol.iterator]();!(i=(l=u.next()).done);i=!0)c()}catch(e){r=!0,s=e}finally{try{i||null==u.return||u.return()}finally{if(r)throw s}}this.fields=a}else console.log("Элемент <".concat(e[0].tagName,"> не является формой или полем"))}}(r(0))},function(e,t,n){"use strict";n.r(t),n(20);var i=n(24);n.n(i),n(6)},function(e,t,n){function i(e){var t=r(e);return n(t)}function r(e){if(n.o(s,e))return s[e];var t=Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}var s={"./img-sprite-vector/bg-char-1.svg":7,"./img-sprite-vector/bg-char-2.svg":8,"./img-sprite-vector/bg-char-3.svg":9,"./img-sprite-vector/bg-char-4.svg":10,"./img-sprite-vector/bg-gradient-1.svg":11,"./img-sprite-vector/icon-adaptive.svg":12,"./img-sprite-vector/icon-completion.svg":13,"./img-sprite-vector/icon-layout.svg":14,"./img-sprite-vector/icon-mail.svg":15,"./img-sprite-vector/icon-phone-circle.svg":16,"./img-sprite-vector/icon-phone.svg":17,"./img-sprite-vector/icon-programming.svg":18,"./img-sprite-vector/icon-user.svg":19};i.keys=function(){return Object.keys(s)},i.resolve=r,(e.exports=i).id=6},function(e,t,n){"use strict";n.r(t),t.default={id:"bg-char-1-usage",viewBox:"0 0 1309 1451",url:n.p+"./img/img-sprite-vector.svg#bg-char-1-usage",toString:function(){return this.url}}},function(e,t,n){"use strict";n.r(t),t.default={id:"bg-char-2-usage",viewBox:"0 0 1200 1566",url:n.p+"./img/img-sprite-vector.svg#bg-char-2-usage",toString:function(){return this.url}}},function(e,t,n){"use strict";n.r(t),t.default={id:"bg-char-3-usage",viewBox:"0 0 2665 1535",url:n.p+"./img/img-sprite-vector.svg#bg-char-3-usage",toString:function(){return this.url}}},function(e,t,n){"use strict";n.r(t),t.default={id:"bg-char-4-usage",viewBox:"0 0 3995 1320",url:n.p+"./img/img-sprite-vector.svg#bg-char-4-usage",toString:function(){return this.url}}},function(e,t,n){"use strict";n.r(t),t.default={id:"bg-gradient-1-usage",viewBox:"0 0 2003 1552",url:n.p+"./img/img-sprite-vector.svg#bg-gradient-1-usage",toString:function(){return this.url}}},function(e,t,n){"use strict";n.r(t),t.default={id:"icon-adaptive-usage",viewBox:"0 0 8475 8055",url:n.p+"./img/img-sprite-vector.svg#icon-adaptive-usage",toString:function(){return this.url}}},function(e,t,n){"use strict";n.r(t),t.default={id:"icon-completion-usage",viewBox:"0 0 4198 4196",url:n.p+"./img/img-sprite-vector.svg#icon-completion-usage",toString:function(){return this.url}}},function(e,t,n){"use strict";n.r(t),t.default={id:"icon-layout-usage",viewBox:"0 0 2790 2580",url:n.p+"./img/img-sprite-vector.svg#icon-layout-usage",toString:function(){return this.url}}},function(e,t,n){"use strict";n.r(t),t.default={id:"icon-mail-usage",viewBox:"0 0 2001 1318",url:n.p+"./img/img-sprite-vector.svg#icon-mail-usage",toString:function(){return this.url}}},function(e,t,n){"use strict";n.r(t),t.default={id:"icon-phone-circle-usage",viewBox:"0 0 3999 3999",url:n.p+"./img/img-sprite-vector.svg#icon-phone-circle-usage",toString:function(){return this.url}}},function(e,t,n){"use strict";n.r(t),t.default={id:"icon-phone-usage",viewBox:"0 0 2667 2667",url:n.p+"./img/img-sprite-vector.svg#icon-phone-usage",toString:function(){return this.url}}},function(e,t,n){"use strict";n.r(t),t.default={id:"icon-programming-usage",viewBox:"0 0 1658 1656",url:n.p+"./img/img-sprite-vector.svg#icon-programming-usage",toString:function(){return this.url}}},function(e,t,n){"use strict";n.r(t),t.default={id:"icon-user-usage",viewBox:"0 0 7987 8155",url:n.p+"./img/img-sprite-vector.svg#icon-user-usage",toString:function(){return this.url}}},function(e,t,n){"use strict";var O,i,j,T,A,r,s;O=n(0),i=n(22),n.n(i),j=n(1),T=n(4),A=n(2),r=n(3),n.n(r),s=n(23),n.n(s),document.addEventListener("DOMContentLoaded",function(){var x=!!("ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch);if(window.paths)var C=window.paths.img||"/img",k=window.paths.libs||"/libs";O('a[href^="#"]').on("click",function(e){e.preventDefault();var t=O(this).attr("href"),n=O(t).offset().top;O("html, body").animate({scrollTop:n},500)}),x||O("button, a").each(function(e,t){return t.dataset.touch="false"}),O(".header-main__btn-nav").on("click",function(e){var t=O(".nav");t.hasClass("nav_mobile")?(t.removeClass("slideDown"),e.currentTarget.classList.remove("btn-nav_close"),Object(A.a)(t[0],"slideUp").then(function(){t.removeClass("nav_mobile"),t.removeClass("slideUp")})):(t.removeClass("slideUp"),t.addClass("slideDown"),t.addClass("nav_mobile"),e.currentTarget.classList.add("btn-nav_close"))});var e,S,t={name:{input:O('<input class="form__input-text form__input-text_name" type="text" id="name" name="name" placeholder="Введите имя">'),icon:O('<svg class="form__icon form__icon_name" viewBox="0 0 96 98" aria-hidden="true" focusable="false"><use xlink:href="#icon-user"></use></svg>'),title:O('<h2 class="form__title">имя:</h2>')},email:{input:O('<input class="form__input-text form__input-text_email" type="email" id="email" name="email" placeholder="Введите e-mail">'),icon:O('<svg class="form__icon form__icon_mail" viewBox="0 0 63 41" aria-hidden="true" focusable="false"><use xlink:href="#icon-mail"></use></svg>'),title:O('<h2 class="form__title">e-mail:</h2>')},phone:{input:O('<input class="form__input-text form__input-text_phone" type="tel" id="phone" name="phone" placeholder="Введите телефон">'),icon:O('<svg class="form__icon form__icon_phone" viewBox="0 0 43 43" aria-hidden="true" focusable="false"><use xlink:href="#icon-phone"></use></svg>'),title:O('<h2 class="form__title">телефон:</h2>')}};e=O("[data-action^=getform-]"),S=t,e.each(function(e,t){var n=t.getAttribute("data-action").match(/\[.*\]/);n&&(n=n[0].slice(1,-1).split(",").map(function(e){return e.trim().toLowerCase()}),O(t).on("click",function(){return function(e,t){function n(e){e&&(document.documentElement.clientHeight<=e.clientHeight+ +getComputedStyle(e).marginTop.slice(0,-2)?r.addClass("blackout-container_overflow"):r.removeClass("blackout-container_overflow"))}var i="".concat(k,"/mail.php");if(t&&0!==t.length){t=new Set(t),Object(j.a)();var r=O('<div class="blackout-container">').on("click",function(e){return e.target===e.currentTarget&&(e.stopPropagation(),Object(j.a)(),void r.remove())}),s=O('<div class="form">'),o=O('<form class="form__wrap" autocomplete="on" action='.concat(i,' method="POST" >')),a=O('\n      <button class="form__btn_close" type="button">\n        <svg class="form__icon form__icon_close" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 288 288">\n          <g class="svg__icons">\n            <path class="fil0 str0" d="M144 288c-79,0 -144,-64 -144,-144 0,-79 65,-144 144,-144 80,0 144,65 144,144 0,80 -64,144 -144,144zm0 -11c-73,0 -133,-59 -133,-133 0,-73 60,-133 133,-133 74,0 133,60 133,133 0,74 -59,133 -133,133z"/>\n            <polygon class="fil1 str1" points="225,208 161,144 225,80 208,63 144,127 80,63 63,80 127,144 63,208 80,225 144,161 208,225 "/>\n          </g>\n        </svg>\n      </button>').on("click",function(e){e.stopPropagation(),Object(j.a)(),r.remove()});x||(a[0].dataset.touch="false"),o.prepend(a),O('<label for="firstName">* Фамилия, имя, отчество:</label>');var l=!0,c=!1,u=void 0;try{for(var d,g,f=t[Symbol.iterator]();!(l=(d=f.next()).done);l=!0){g=d.value;for(var m,p=0,v=Object.entries(S);p<v.length;p++)if(g===(m=v[p])[0]){var h=O('<div class="form__input-wrap">').append(m[1].icon).append(m[1].input),w=O('<label class="form__group">').append(m[1].title).append(h);o.append(w)}}}catch(e){c=!0,u=e}finally{try{l||null==f.return||f.return()}finally{if(c)throw u}}var b=O('<button type="submit" class="form__btn btn_orang">'.concat(O(e).text(),"</button>"));x||(b[0].dataset.touch="false"),o.append(b);var _=new T.a(o,{parentClass:"form__input-wrap",messageClass:"form__message",messageAnimShowClass:"slideDown",messageAnimHideClass:"slideUp"});s.append(o),r.append(s),O("body").append(r),n(o[0]);var y=Object(A.b)(null,function(){return n(o[0])},500);window.addEventListener("resize",function(e){return y(e)},!1),b.click(function(e){if(e.preventDefault(),_.validate()){s.addClass("form_response"),s.html('<div class="form__wrap"><img src="'.concat(C,'/ajax-loader.svg"></div>'));var t={method:"POST",body:new FormData(o[0])};fetch(i,t).then(function(e){e.ok?e.text().then(function(e){return s.html('<div class="form__wrap"><h3 class="form__response">'.concat(e,"</h3></div>"))}):s.html('<div class="form__wrap"><h3 class="form__response">Ошибка !</h3></div>')})}})}}(t,n)}))});var i=O('[data-type="slider"]'),n=O('[data-type="image-cont"]');i.on("setPosition",function(){var e,t;e=O(".slick-arrow"),t=Math.floor(function e(t){var n=0;return t!==i[0]&&(n+=t.offsetTop+e(t.offsetParent)),n}(n[0])+n[0].offsetHeight/2)+"px",e.css("top",t),x||O("button, a",i).attr("data-touch","false")}),i.slick({slidesToShow:3,dots:!1,slidesToScroll:1,autoplay:!1,autoplaySpeed:2e3,prevArrow:'<button id="prev" type="button" class="slider__arrow-back"></button>',nextArrow:'<button id="next" type="button" class="slider__arrow-forward"></button>',dotsClass:"slider__dots",responsive:[{breakpoint:1025,settings:{slidesToShow:2,dots:!0,arrows:!1}},{breakpoint:801,settings:{slidesToShow:1,dots:!0,arrows:!1}}]})})},,function(e,t,n){var r;r=n(0),document.addEventListener("DOMContentLoaded",function(){var e=window.paths.img,t=void 0===e?"/img":e,n='style="border: none; width: 75px; height: 75px"',i='\n    <div id="capOldBrowser" style="border: 1px solid #F7941D; background: #FEEFDA; text-align: center; clear: both; height: 75px; position: relative;">\n        <div style="position: absolute; right: 0; top: 0; font-family: courier new; font-weight: bold; line-height: 0">\n            <a id="capClose" href="" style="line-height: 0;">\n                <img src="'.concat(t,'/close.png" ').concat(n,' alt="Close this notice" />\n            </a>\n        </div>\n        <div style="width: 640px; margin: 0 auto; text-align: left; padding: 0; overflow: hidden; color: black; line-height: 0">\n            <div style="float: left; margin-right: 10px">\n                <img src="').concat(t,'/warning.png" ').concat(n,' alt="Warning!"/>\n            </div>\n            <div style="float: left; font-family: Arial, sans-serif; line-height: 1.4; width: 265px;">\n                <div style="font-size: 14px; font-weight: bold;">Вы используете устаревший браузер</div>\n                <div style="font-size: 12px; margin-top: 6px;">Для полноценной работы, пожалуйста, воспользуйтесь любым современным браузером.</div>\n            </div>\n            <div style="float: left;">\n                <a href="https://www.mozilla.org/ru/firefox/new/" target="_blank" style="line-height: 0;">\n                <img src="').concat(t,'/firefox.png" ').concat(n,' alt="Get Firefox" /></a>\n            </div>\n            <div style="float: left;">\n                <a href="https://www.opera.com/ru" target="_blank" style="line-height: 0;">\n                    <img src="').concat(t,'/opera.png" ').concat(n,' alt="Get Opera" />\n                </a>\n            </div>\n            <div style="float: left;">\n                <a href="https://www.google.com/intl/ru_ru/chrome/" target="_blank" style="line-height: 0;">\n                    <img src="').concat(t,'/chrome.png" ').concat(n,' alt="Get Google Chrome" />\n                </a>\n            </div>\n        </div>\n    </div>\n  ');window.CSS&&window.CSS.supports&&CSS.supports("(display: grid) or (display-style: -ms-grid)")||(console.log(!0),r("body").prepend(r(i)),r("#capClose").click(function(){return r("#capOldBrowser").remove(),!1}))})},,function(e,t,n){var i=n(25),r=n(26);"string"==typeof(r=r.__esModule?r.default:r)&&(r=[[e.i,r,""]]),i(r,{insert:"head",singleton:!1});var s=r.locals?r.locals:{};e.exports=s},,function(){}]);