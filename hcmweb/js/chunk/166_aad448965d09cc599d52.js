(window.webpackJsonp=window.webpackJsonp||[]).push([[166,167,283],{1075:function(e,t){},1076:function(e,t){},1082:function(e,t){},1083:function(e,t){},1084:function(e,t){},29:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var n=i(a(48));a(47);var o=i(a(28));function i(e){return e&&e.__esModule?e:{default:e}}a(1075);var l=function(t){return e.createElement("div",{className:"layout-wrapper "+(t.className||"")},e.createElement("div",{className:"header-wrapper"},e.createElement(n.default,{className:"breadcrumb"},t.breadcrumbList.map(function(a,o){return""===t.linkList[o]?e.createElement(n.default.Item,{key:a},a):e.createElement(n.default.Item,{href:"javascript:;",key:a},e.createElement("span",{onClick:function(){t.history.go(-t.linkList[o])}},a))}))),e.createElement("div",{className:"layout-content"},t.children),e.createElement("div",{className:"copyright"},e.createElement(o.default,null)))};l.defaultProps={title:"标题",breadcrumbList:[],linkList:[]},t.default=l}).call(this,a(1))},576:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var n=c(a(109)),o=c(a(23)),i=c(a(57));a(105),a(22),a(56),a(744);var l=c(a(15)),r=c(a(29));c(a(28)),c(a(164));function c(e){return e&&e.__esModule?e:{default:e}}i.default.RangePicker,o.default.Item;var u=(0,l.default)(function(t){t.props.form.getFieldDecorator;var a=e.createElement("div",null,e.createElement("img",{style:{width:"200px"},src:t.state.ticket,alt:""}));return e.createElement(r.default,{breadcrumbList:["个人中心","资料信息"],linkList:["",""]},e.createElement("div",{className:"DataInformationx"},e.createElement("div",{className:"ChangeHistoryBOXs"},e.createElement("div",{className:"ChangeHeadx"},e.createElement("span",null,t.state.realname),e.createElement("span",null,"服务客户：",t.state.count)),e.createElement("div",{className:"ChangeBodyn"},e.createElement("p",null,e.createElement("img",{src:"../../../../img/DataInformation/Personal center_username.png",alt:""}),"  ",e.createElement("span",null,"用户名：",t.state.username)," ",e.createElement("a",{onClick:t.password},"修改密码>")),e.createElement("br",null),e.createElement("p",null,e.createElement("img",{src:"../../../../img/DataInformation/Personal center_ipone.png",alt:""})," ",e.createElement("span",null,"绑定手机：",t.state.mobile?t.state.mobile:"")," ",e.createElement("a",{onClick:t.MePhone},t.state.BTNtit)),e.createElement("br",null),e.createElement("p",null,e.createElement("img",{src:"../../../../img/DataInformation/Personal center_wechat.png",alt:""})," ",e.createElement("span",null,"绑定微信：",t.state.WEIXING),t.state.PopoWei?e.createElement("a",{onClick:t.JBWEIxing},"立即解绑>"):e.createElement(n.default,{content:a,title:"绑定微信",trigger:"click"},e.createElement("a",{onClick:t.BDWEIxing},"绑定微信>"))),e.createElement("br",null)),e.createElement("div",{className:"ChangeBodyn"},t.state.data?e.createElement("ul",null,t.state.data.map(function(t,a){return e.createElement("li",{key:a},e.createElement("span",null,t.companyname.substr(0,1)),e.createElement("span",null,t.companyname))})):null))))});t.default=u}).call(this,a(1))},744:function(e,t){},849:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var n=c(a(23)),o=c(a(19)),i=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}();a(22),a(20);var l=c(a(576)),r=c(a(13));function c(e){return e&&e.__esModule?e:{default:e}}var u=function(t){function a(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a);var t=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(a.__proto__||Object.getPrototypeOf(a)).call(this,e));return t.HistoryGo=function(){window.history.go(-1)},t.password=function(){window.location="/index.html#/ModifyPassword/"+t.state.username},t.MePhone=function(){""!=t.state.mobile&&void 0!=t.state.mobile?window.location="/index.html#/ModifyBindings/u/"+t.state.mobile+"/nx":window.location="/index.html#/ModifyPhone/u/"+t.state.mobile},t.JBWEIxing=function(){r.default.post("/hcm/user/unbindWX",{userid:t.state.id,usertype:"u"}).then(function(e){console.log(e),1e4==e.data.status?t.setState({WEIXING:"未绑定"},function(){t.DidMountText()}):o.default.error(e.data.message)})},t.BDWEIxing=function(){console.log(1),r.default.post("/hcm/wechat/getQRcode",{userid:t.state.id,usertype:"u"}).then(function(e){1e4==e.data.status?t.setState({ticket:"https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket="+e.data.data},function(){t.DidMountText()}):o.default.error(e.data.message)})},t.DidMountText=function(){r.default.post("/hcm/userin/selectBmainIn").then(function(e){console.log(e),1e4==e.data.status&&null!=e.data.data&&void 0!=e.data.data?(t.setState({realname:e.data.data.data.kefu.realname,username:e.data.data.data.kefu.username,usertype:e.data.data.data.kefu.usertype,mobile:e.data.data.data.kefu.mobile,count:e.data.data.data.count,data:e.data.data.data.bc,id:e.data.data.data.kefu.id,PopoWei:e.data.data.data.kefu.unionid}),console.log(e),""!=t.state.PopoWei&&void 0!=t.state.PopoWei&&t.setState({WEIXING:e.data.data.data.kefu.nickname}),""!=t.state.mobile&&void 0!=t.state.mobile?t.setState({BTNtit:"修改绑定>"}):t.setState({BTNtit:"绑定手机>"})):t.setState({BTNtit:"绑定手机>"})})},t.BJBtn=function(){t.setState({visible:!0,confirmLoading:!0})},t.ForgetSubmit=function(e){e.preventDefault(),t.props.form.validateFields(function(e,t){console.log(t)})},t.handleCancel=function(){t.setState({visible:!1,confirmLoading:!1})},t.state={visible:!1,confirmLoading:!1,realname:"",username:"",mobile:"",count:"",data:"",usertype:"",BTNtit:"",WEIXING:"未绑定",PopoWei:"",ticket:"",id:""},t}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(a,e.Component),i(a,[{key:"componentDidMount",value:function(){this.DidMountText()}},{key:"render",value:function(){return e.createElement(l.default,{that:this})}}]),a}();t.default=n.default.create()(u)}).call(this,a(1))}}]);