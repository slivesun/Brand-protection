(window.webpackJsonp=window.webpackJsonp||[]).push([[96],{1076:function(e,t){},28:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}();var r=function(t){function r(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,r),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(r.__proto__||Object.getPrototypeOf(r)).call(this,e))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(r,e.Component),a(r,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return e.createElement("div",{className:this.props.clazzName?this.props.clazzName:"Copyright"},"Copyright © 杭州久点网络技术有限公司")}}]),r}();t.default=r}).call(this,a(1))},811:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var r=d(a(14)),n=d(a(25)),o=d(a(11)),l=d(a(48)),i=d(a(19)),u=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}();a(18),a(24),a(26),a(47),a(20);var c=d(a(13)),s=d(a(28)),f=d(a(69));function d(e){return e&&e.__esModule?e:{default:e}}var m=function(t){function a(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a);var t=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(a.__proto__||Object.getPrototypeOf(a)).call(this,e));return t.addItem=function(){var e=t.state.dataList;e.push({url:null,price:null}),t.setState({dataList:e})},t.rmItem=function(e){var a=t.state.dataList;1!=a.length?(a.splice(e,1),t.setState({dataList:a})):i.default.error("最少保留一条链接")},t.changeItem=function(e,a,r){var n=t.state.dataList;"price"===a&&isNaN(+e.target.value)||(n[r][a]=e.target.value,n[r].editStatus=!1,n[r].url&&f.default.getParamString(n[r].url,"id").length&&n[r].price&&f.default.legnthCheck(""+n[r].price,"INPUT")&&(n[r].editStatus=!0),!0===n[r].checkStatus&&(n[r].checkStatus=!1),t.setState({dataList:n}))},t.ckeckUrl=function(){for(var e=t.state.dataList,a=0;a<e.length;a++)if(!e[a].editStatus){var r=e[a],n=r.price;if(!r.url)return void i.default.error("第"+(a+1)+"条链接地址不能为空");if(!f.default.getParamString(e[a].url,"id").length)return void i.default.error("第"+(a+1)+"条请输入正确的链接地址");if(!f.default.legnthCheck(e[a].url,"URL"))return void i.default.error("第"+(a+1)+"条请输入正确的链接地址");if(!n)return void i.default.error("第"+(a+1)+"条价格不能为空");if(!f.default.legnthCheck(""+n,"INPUT"))return void i.default.error("第"+(a+1)+"条价格字符长度不允许超过50")}var o=e.map(function(e,t){return f.default.getParamString(e.url,"id")}),l=Object.assign([],o);l.sort();for(var u=0;u<l.length-1;u++)if(l[u]==l[u+1]){for(var s=null,d=null,m=0;m<o.length;m++)o[m]===l[u]&&(null===s?s=m+1:d=m+1);return void i.default.error("第"+s+"条和第"+d+"条重复")}LoadingModal({bl:!0,text:"商品链接验证中,请耐心等候..."}),c.default.post("/hcm/monitorLink/check",{itemIds:o.join(",")}).then(function(a){(LoadingModal({bl:!1}),"10000"==a.data.status)&&(JSON.parse(a.data.data).data.forEach(function(t,a){t.WangWang.length&&t.itemTitle.length&&t.shopName.length?(e[a].checkStatus=!0,e[a].WangWang=t.WangWang,e[a].itemTitle=t.itemTitle,e[a].shopName=t.shopName,e[a].platform="True"==t.isTmall?"天猫":"淘宝",i.default.success("第"+(a+1)+"条数据验证成功")):(e[a].checkStatus=!1,i.default.error("第"+(a+1)+"条数据验证失败，请检查"))}),t.setState({dataList:e}))}).catch(function(e){LoadingModal({bl:!1}),i.default.error(e.statusText)})},t.onSubmit=function(){for(var e=t.state.dataList,a=0;a<e.length;a++){if(!1===e[a].checkStatus)return void i.default.error("第"+(a+1)+"条链接验证失败，请重新编辑后验证");if(void 0===e[a].checkStatus)return void i.default.error("第"+(a+1)+"条链接未验证，请验证")}var r=[];e.forEach(function(e,t){r.push({itemid:f.default.getParamString(e.url,"id"),itemlink:"https://item.taobao.com/item.htm?id="+f.default.getParamString(e.url,"id"),itemprice:e.price,itemtitle:e.itemTitle,shopname:e.shopName,shopnick:e.WangWang,platform:e.platform,status:"上架"})}),(0,c.default)({method:"post",url:"/hcm/monitorLink/Create",transformRequest:function(e){return e},headers:{"Content-Type":"application/json;charset=utf-8"},data:JSON.stringify(r)}).then(function(e){"10000"==e.data.status?(i.default.success(e.data.message),window.location.href="/index.html#/UrlMonitor"):e.data.data?e.data.data.forEach(function(t){return i.default.error(e.data.message+t)}):i.default.error(e.data.message)}).catch(function(e){i.default.error(e.statusText)})},t.state={dataList:[{url:null,price:null}]},t}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(a,e.Component),u(a,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var t=this,a=this.state.dataList;return e.createElement("div",{className:"addmonitor"},e.createElement("div",{className:"Breadcrumb"},e.createElement(l.default,null,e.createElement(l.default.Item,null,e.createElement("a",{href:"/index.html#/UrlMonitor"},"单链接监控")),e.createElement(l.default.Item,null,"新增"))),e.createElement("div",{className:"content"},e.createElement("h4",null,"设置监控链接"),e.createElement("p",{className:"p"},e.createElement(o.default,{type:"sound",className:"icon-sound",theme:"outlined"}),"暂时仅支持淘宝网商品链接，链接越多，验证链接时间越长"),e.createElement("div",{className:"url-list"},e.createElement("span",{className:"red tit"},"链接地址："),e.createElement("div",null,e.createElement("ul",{className:"items"},a.map(function(a,r){return e.createElement("li",{key:r,className:"item"},e.createElement(n.default,{style:!1===a.checkStatus?{borderColor:"red"}:!0===a.checkStatus?{borderColor:"green"}:{},onChange:function(e){return t.changeItem(e,"url",r)},value:a.url,placeholder:"链接地址",className:"url"}),e.createElement("span",{className:"zw"},"-"),e.createElement(n.default,{onChange:function(e){return t.changeItem(e,"price",r)},value:a.price,placeholder:"限价",className:"num"}),e.createElement(o.default,{onClick:function(e){return t.rmItem(r)},type:"minus-square-o"}))})),e.createElement(r.default,{onClick:function(e){return t.addItem()},className:"addbut",type:"dashed"},"+新增"),e.createElement(r.default,{onClick:function(e){return t.ckeckUrl()},style:{marginTop:"20px"},className:"url-check"},"验证链接"),e.createElement("div",{style:{paddingTop:"20px"}},e.createElement(r.default,{className:"btn2-main",onClick:function(e){return t.onSubmit()},style:{marginRight:"20px"},type:"primary"},"保存"),e.createElement("a",{href:"/index.html#/UrlMonitor"},e.createElement(r.default,null,"取消")))))),e.createElement(s.default,{clazzName:"copyright"}))}}]),a}();t.default=m}).call(this,a(1))}}]);