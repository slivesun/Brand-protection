(window.webpackJsonp=window.webpackJsonp||[]).push([[163],{28:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();var r=function(t){function r(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,r),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(r.__proto__||Object.getPrototypeOf(r)).call(this,e))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(r,e.Component),n(r,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return e.createElement("div",{className:this.props.clazzName?this.props.clazzName:"Copyright"},"Copyright © 杭州久点网络技术有限公司")}}]),r}();t.default=r}).call(this,n(1))},574:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var r=s(n(40)),a=s(n(35)),l=s(n(14)),o=s(n(25)),c=s(n(11));n(49),n(50),n(18),n(24),n(26);var i=s(n(15)),u=s(n(28));function s(e){return e&&e.__esModule?e:{default:e}}var f=(0,i.default)(function(t){var n=t.state,i=n.waitInspectList,s=void 0===i?[]:i,f=n.brandName;return e.createElement("div",{className:"service-activity-inspect"},e.createElement("header",null,"活动稽查"),e.createElement("main",null,e.createElement("section",{className:"summary"},e.createElement("div",{className:"left"},"服务客户数量：",s.length),e.createElement("div",{className:"right"},"公司名称   ",e.createElement(o.default,{placeholder:"请输入",value:f,style:{width:"242px"},onChange:t.handleInputChange,suffix:e.createElement(c.default,{type:"close-circle",style:{width:"14px",height:"14px",opacity:.25,cursor:"pointer"},onClick:t.handleClearIconClick})}),"  ",e.createElement(l.default,{style:{color:"#1890ff",borderColor:"#1890ff"},onClick:t.handleBtnClick},"查询"))),e.createElement("section",{className:"card-wrapper"},e.createElement(r.default,{type:"flex"},!!s.length&&s.map(function(n,r){return e.createElement(a.default,{span:6,key:r,onClick:t.goToDetail.bind(t,n.bmcid)},e.createElement("h3",null,n.brand_name),e.createElement("p",null,"今日待稽查活动：",n.act_count))})))),e.createElement("footer",{className:"footer"},e.createElement(u.default,null)))});t.default=f}).call(this,n(1))}}]);