(window.webpackJsonp=window.webpackJsonp||[]).push([[195,196],{1116:function(e,t){},13:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=i(n(499)),r=i(n(500));function i(e){return e&&e.__esModule?e:{default:e}}o.default.defaults.timeout=6e5,o.default.defaults.transformRequest=function(e){return e instanceof FormData?e:e=r.default.stringify(e)},o.default.interceptors.request.use(function(e){return e.headers["X-Requested-With"]="XMLHttpRequest",e},function(e){return Promise.reject(e.response)}),o.default.interceptors.response.use(function(e){return e},function(e){return"503"==e.response.status?void("ADMIN"==localStorage.logintype||"KEFU"==localStorage.logintype?window.location="/user.html#/loginu":window.location="/user.html#/loginc"):Promise.reject(e.response)}),t.default=o.default},15:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();t.default=function(t){return function(o){function r(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,r),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(r.__proto__||Object.getPrototypeOf(r)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(r,e.Component),n(r,[{key:"render",value:function(){return e.createElement(t,this.props.that)}}]),r}()}}).call(this,n(1))},165:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(720);t.default={Encrypt:function(e){var t=o.enc.Utf8.parse("hcmabcdefghijklm"),n=o.enc.Utf8.parse(e);return o.AES.encrypt(n,t,{mode:o.mode.ECB,padding:o.pad.Pkcs7}).toString()},Decrypt:function(e){var t=o.enc.Utf8.parse("hcmabcdefghijklm"),n=o.AES.decrypt(e,t,{mode:o.mode.ECB,padding:o.pad.Pkcs7});return o.enc.Utf8.stringify(n).toString()}}},28:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();var o=function(t){function o(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,o),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(o.__proto__||Object.getPrototypeOf(o)).call(this,e))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(o,e.Component),n(o,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return e.createElement("div",{className:this.props.clazzName?this.props.clazzName:"Copyright"},"Copyright © 杭州久点网络技术有限公司")}}]),o}();t.default=o}).call(this,n(1))},429:function(e,t){},498:function(e,t){},502:function(e,t){},590:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var o=u(n(14)),r=u(n(25)),i=u(n(11)),a=u(n(757)),c=u(n(23));n(18),n(24),n(26),n(755),n(22);var l=u(n(15)),s=u(n(28));function u(e){return e&&e.__esModule?e:{default:e}}var d=c.default.Item,p=a.default.Header,f=(a.default.Sider,a.default.Content,(0,l.default)(function(t){t.props.match;var n=t.props.form.getFieldDecorator,l=t.state.show?"block":"none",u=t.state.show?"none":"block",f=t.state.show?"../../../img/icon_Login_QR code.png":"../../../img/icon_Login_Password_login.png",m=t.state.show?"微信登录":"密码登录",g=t.state.show?"密码登录":"微信登录",h={display:l,img:f,texts:m,tits:g},w={display:u},y=t.state.Focus?"url(../../../img/loginuser_1.png)  no-repeat":"url(../../../img/loginuser_1s.png)  no-repeat",b=t.state.onpwd?"url(../../../img/loginuser_2.png)  no-repeat":"url(../../../img/loginuser_2s.png)  no-repeat",v=t.state.onyzm?"url(../../../img/loginuser_3.png)  no-repeat":"url(../../../img/loginuser_3s.png)  no-repeat",x=t.state.loginxs?" block ":"none",E=(t.state.usertypeDIs,{display:x,width:"330px",height:"40px"});return e.createElement("div",{className:"LoginBox"},e.createElement(p,{className:"headerlog"},e.createElement("span",null,e.createElement("a",null,e.createElement("img",{style:{verticalAlign:"middle",height:"34px"},src:"../../../img/logo_page.png"})))),e.createElement(a.default,{className:"boxlong"},e.createElement("div",{className:"Login_Right"},e.createElement("div",{className:"H1tit"},1==t.state.titX?e.createElement("h2",null,g):null),e.createElement("div",{className:"icon_Login_QR"},e.createElement("span",null,m)," ",e.createElement("b",null),e.createElement("img",{onClick:t.handleClick,src:h.img})),e.createElement(c.default,{onSubmit:t.handleSubmit,style:h,className:"login-form"},e.createElement("div",{className:"usersTS",style:E},e.createElement("img",{src:"../../../img/icon_Login_prompt_failure.png",style:{marginTop:"8px",float:"left",marginRight:"10px"}})," ",e.createElement("b",{style:{lineHeight:"30px"}},t.state.Errortit)," "),e.createElement(d,null,n("userName",{initialValue:t.state.userCookie})(e.createElement(r.default,{className:"user-name",maxLength:"32",prefix:e.createElement(i.default,{type:"user",style:{color:"rgba(0,0,0,0)",background:y,height:"23px",display:"inline-block",width:"23px",margin:"0px 5px"}}),placeholder:"用户名/手机号",onFocus:t.onFocus,onBlur:t.onBlur}))),e.createElement(d,null,n("password")(e.createElement(r.default,{className:"pass-word",maxLength:"32",prefix:e.createElement(i.default,{type:"lock",style:{color:"rgba(0,0,0,0)",background:b,height:"23px",display:"inline-block",width:"23px",margin:"0px 5px"}}),type:"password",placeholder:"密码",onFocus:t.onpwd,onBlur:t.onpws}))),e.createElement(d,{className:"yzmbox"},n("yzm")(e.createElement(r.default,{className:"yzm",prefix:e.createElement(i.default,{type:"lock",style:{color:"rgba(0,0,0,0)",background:v,height:"23px",display:"inline-block",width:"23px",margin:"0px 5px"}}),type:"text",placeholder:"验证码",onFocus:t.onyzm,onBlur:t.onyzms})),e.createElement("div",{className:"ant-rowsx"},e.createElement("span",{className:"hyzimg"},e.createElement("img",{src:t.state.urlsrc})),e.createElement("span",{className:"hyz",onClick:t.HyZ},"换一张"))),e.createElement(d,null,e.createElement("a",{onClick:t.login,className:"wjma"},"忘记密码"),e.createElement("br",null),e.createElement(o.default,{type:"primary",htmlType:"submit",className:"login-form-button"},"登录")),e.createElement("div",null,e.createElement("span",null,e.createElement("img",{src:"../../../img/icon_Login_ WeChat_hover.png",style:{marginTop:"4px",float:"left",marginRight:"10px"}})),e.createElement("span",{className:"wxSM_dl",onClick:t.handleClick},"微信扫码登录"))),e.createElement("div",{className:"wx_ewmbox",style:w},e.createElement("iframe",{className:"ifrm",src:"https://open.weixin.qq.com/connect/qrconnect?appid=wx5a234db344041ccf&redirect_uri=https%3A%2F%2Fbrm.olonger.com%2Fuser.html%23%2FLogIns&response_type=code&scope=snsapi_login&state="+(window.location.hash.indexOf("loginu")>-1?"u":"c")+"#wechat_redirect"})))),e.createElement(s.default,{className:"Copyright"}))}));t.default=f}).call(this,n(1))},69:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default={onVisibilityChange:function(e,t){var n="hidden"in document?"hidden":"webkitHidden"in document?"webkitHidden":"mozHidden"in document?"mozHidden":null,o=n.replace(/hidden/i,"visibilitychange"),r=function(){document[n]||console.log("页面非激活"+new Date),document[n]&&console.log("页面激活"+new Date)};document.addEventListener(o,r)},formatAccount:function(e){return e=e.replace(/[\s]/g,"").replace(/(\d{4})(?=\d)/g,"$1 ")},formatThousandMoney:function(t,n){return isNaN(t)?"":(n=n||"",!1===e.isNumeric(t)||0==t?"0.00":0==(t=(t=+t).toFixed(2))?"0.00":n+" "+(t+"").replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,"$&,"))},encryption:function(){return(""+(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"")).replace(/(\d{3})\d*([0-9a-zA-Z]{4})/,"$1****$2")},browser:{versions:function(){var e=navigator.userAgent,t=(navigator.appVersion,"");if(e.indexOf("Ourydc.Yuebaobao")>-1){var n=e.match(/Ourydc.Yuebaobao.*/);if(n.length>0){var o=n[0];t=o.substr(o.indexOf("/")+1)}}return{trident:e.indexOf("Trident")>-1,presto:e.indexOf("Presto")>-1,webKit:e.indexOf("AppleWebKit")>-1,gecko:e.indexOf("Gecko")>-1&&-1==e.indexOf("KHTML"),mobile:!!e.match(/AppleWebKit.*Mobile.*/),ios:!!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),android:e.indexOf("Android")>-1||e.indexOf("Adr")>-1,iPhone:e.indexOf("iPhone")>-1,iPad:e.indexOf("iPad")>-1,webApp:-1==e.indexOf("Safari"),weixin:e.indexOf("MicroMessenger")>-1,weibo:"WeiBo"==e.match(/WeiBo/i)||"Weibo"==e.match(/Weibo/i)||"weibo"==e.match(/weibo/i),qq:"qq"==e.match(/qq/i)||"QQ"==e.match(/QQ/i),qqBrower:-1==e.indexOf("Mobile MQQBrowser")&&-1!=e.indexOf("MQQBrowser"),isInApp:e.indexOf("Ourydc.Yuebaobao")>-1,locAppVersion:t}}(),language:(navigator.browserLanguage||navigator.language).toLowerCase()},checkAccount:function(e){return/^[a-zA-Z](\w|\s+){5,15}$/.test(this.trim(e||""))},Reg:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return/^[^\u4e00-\u9fa5]{5,31}$/.test(this.trim(e||""))},checkPassword:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return/^.{6,16}$/.test(this.trim(e||""))},trim:function(e){return(e=""+e).replace(/(^\s*)|(\s*$)/g,"")},getCookie:function(e){var t,n=new RegExp("(^| )"+e+"=([^;]*)(;|$)");return(t=document.cookie.match(n))?unescape(t[2]):null},required:function(e){var t=this.trim(e||"");return!(!t||!t.length)},legnthCheck:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"INPUT";return this.trim(e||"").length<this.LENGTH[t]},LENGTH:{URL:500,TEXTAREA:200,INPUT:50},getQueryString:function(e){var t=new RegExp("(^|&|[?])"+e+"=([^&]*)(&|$)"),n=window.location.href.substr(1).match(t);return null!=n?n[2]:""},getParamString:function(e,t){var n=new RegExp("(^|&|[?])"+t+"=([^&]*)(&|$)"),o=e.substr(1).match(n);return null!=o?o[2]:""},Trim:function(e){return e.replace(/(^\s*)|(\s*$)/g,"")},deviceCheck:function(){return browser.versions.mobile?browser.versions.android?"android":browser.versions.ios?"ios":"mobile":"web"}}}).call(this,n(189))},719:function(e,t){},721:function(e,t){},864:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var o=s(n(23)),r=s(n(19)),i=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();n(22),n(20);var a=s(n(590)),c=s(n(13)),l=(s(n(69)),s(n(165)));function s(e){return e&&e.__esModule?e:{default:e}}var u=function(t){function n(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n);var t=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(n.__proto__||Object.getPrototypeOf(n)).call(this,e));return t.getOs=function(){var e=navigator.userAgent;return e.indexOf("Opera")>-1?"Opera":e.indexOf("Firefox")>-1?"FF":e.indexOf("Chrome")>-1?"Chrome":void 0},t.login=function(){"Chrome"==t.getOs()?window.location="/user.html?#/Forgetpwd/"+t.state.usertypeS:"FF"==t.getOs()?window.location="/user.html#/Forgetpwd/"+t.state.usertypeS:window.location="/user.html?#/Forgetpwd/"+t.state.usertypeS},t.Trim=function(e){return e.replace(/(^\s*)|(\s*$)/g,"")},t.getCookie=function(e){var t,n=new RegExp("(^| )"+e+"=([^;]*)(;|$)");return(t=document.cookie.match(n))?unescape(t[2]):null},t.checkCookie=function(){document.cookie.length>0&&null!=t.getCookie("username")&&""!=t.getCookie("username")&&void 0!=t.getCookie("username")&&t.setState({userCookie:t.getCookie("username")})},t.setCookie=function(e,t,n){var o=new Date;o.setTime(o.getTime()+24*n*60*60*1e3);var r="expires="+o.toGMTString();document.cookie=e+"="+t+"; "+r},t.handleSubmit=function(e){e.preventDefault();var n=null;if(window.location.hash.indexOf("loginu")>-1)n="u";else{if(!(window.location.hash.indexOf("loginc")>-1))return;n="c"}t.props.form.validateFields(function(e,o){void 0==o.userName&&void 0==o.password?t.setState({loginxs:!0,Errortit:"请填写用户名/密码/验证码"}):void 0==o.yzm?t.setState({loginxs:!0,Errortit:"验证码错误"}):(t.setState({loginxs:!1}),c.default.post("/hcm/login_login",{username:t.Trim(o.userName),password:l.default.Encrypt(o.password),code:o.yzm,usertype:n,invitecode:"c"==n&&t.props.match.params.invitecode?t.props.match.params.invitecode:null}).then(function(e){if(t.setState({loginxs:!1}),1e4==e.data.status){var n=e.data.data.logintype,i=e.data.data.catid,a=e.data.data.realname,c=e.data.data.roleid;new Date;document.cookie="username="+o.userName,t.setCookie("username",o.userName,3),window.localStorage.setItem("logintype",n),window.localStorage.setItem("catid",i),window.localStorage.setItem("realname",a),window.localStorage.setItem("roleid",c),null==e.data.data.catid&&"HCM"==e.data.data.logintype?window.location="/index.html#/CategorySelect":window.location="/index.html#/"}else t.setState({loginxs:!0,Errortit:e.data.message}),r.default.error(e.data.message)},function(){t.setState({loginxs:!0})}))})},t.HyZ=function(){var e=new Date;t.setState({urlsrc:"/hcm/code?t="+e})},t.handleClick=function(){t.setState({show:!t.state.show,loginxs:!1,titX:!t.state.titX})},t.onFocus=function(){t.setState({Focus:!0})},t.onChange=function(e){console.log(e),t.setState({checked:e.target.checked})},t.onBlur=function(){t.setState({Focus:!1})},t.onpwd=function(){t.setState({onpwd:!0})},t.onpws=function(){t.setState({onpwd:!1})},t.onyzm=function(){t.setState({onyzm:!0})},t.onyzms=function(){t.setState({onyzm:!1})},t.state={show:!0,Focus:!1,onpwd:!1,onyzm:!1,loginxs:!1,urlsrc:"/hcm/code",Errortit:"用户名或密码错误",usertypeDIs:!1,usertypeS:"",userCookie:null,titX:!0,checked:!0},t}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(n,e.Component),i(n,[{key:"componentDidMount",value:function(){if(window.localStorage.clear(),window.location.hash.indexOf("loginu")>-1)this.setState({usertypeDIs:!1,usertypeS:"u"});else{if(!(window.location.hash.indexOf("loginc")>-1))return;this.setState({usertypeDIs:!0,usertypeS:"c"})}this.checkCookie()}},{key:"render",value:function(){return e.createElement(a.default,{that:this})}}]),n}();t.default=o.default.create()(u)}).call(this,n(1))}}]);