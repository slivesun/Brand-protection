(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{1075:function(e,t){},1076:function(e,t){},1077:function(e,t){},1087:function(e,t){},1091:function(e,t){},28:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}();var a=function(t){function a(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(a.__proto__||Object.getPrototypeOf(a)).call(this,e))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(a,e.Component),n(a,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return e.createElement("div",{className:this.props.clazzName?this.props.clazzName:"Copyright"},"Copyright © 杭州久点网络技术有限公司")}}]),a}();t.default=a}).call(this,n(1))},29:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var a=o(n(48));n(47);var r=o(n(28));function o(e){return e&&e.__esModule?e:{default:e}}n(1075);var c=function(t){return e.createElement("div",{className:"layout-wrapper "+(t.className||"")},e.createElement("div",{className:"header-wrapper"},e.createElement(a.default,{className:"breadcrumb"},t.breadcrumbList.map(function(n,r){return""===t.linkList[r]?e.createElement(a.default.Item,{key:n},n):e.createElement(a.default.Item,{href:"javascript:;",key:n},e.createElement("span",{onClick:function(){t.history.go(-t.linkList[r])}},n))}))),e.createElement("div",{className:"layout-content"},t.children),e.createElement("div",{className:"copyright"},e.createElement(r.default,null)))};c.defaultProps={title:"标题",breadcrumbList:[],linkList:[]},t.default=c}).call(this,n(1))},517:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var a=u(n(92)),r=u(n(146)),o=u(n(30)),c=u(n(23));n(93),n(145),n(32),n(22);var l=u(n(15)),i=u(n(29));u(n(28));function u(e){return e&&e.__esModule?e:{default:e}}var s=(0,l.default)(function(t){c.default.Item,o.default.Option,t.props.form.getFieldDecorator,r.default.TreeNode;return e.createElement(i.default,{breadcrumbList:["用户管理","品牌方账号","部门管理"],linkList:["","1",""]},e.createElement("div",{className:"DepartmentManagementb"},e.createElement("div",{className:"DepartmentManagementBOX"},e.createElement("h2",null,t.state.HtWO),e.createElement("div",{className:"DepartmentManagementtit"},t.state.treeData?e.createElement(r.default,{showLine:!0,onExpand:t.onExpand,expandedKeys:t.state.expandedKeys,autoExpandParent:t.state.autoExpandParent,checkedKeys:t.state.checkedKeys,onSelect:t.onSelect,selectedKeys:t.state.selectedKeys},t.renderTreeNodes(t.state.treeData)):e.createElement(a.default,{style:{textAlign:"center"},message:"暂无数据",type:"error"})))))});t.default=s}).call(this,n(1))}}]);