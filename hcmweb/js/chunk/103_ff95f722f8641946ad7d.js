(window.webpackJsonp=window.webpackJsonp||[]).push([[103,104],{1085:function(e,t){},1086:function(e,t){},1092:function(e,t){},1097:function(e,t){},28:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}();var a=function(t){function a(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(a.__proto__||Object.getPrototypeOf(a)).call(this,e))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(a,e.Component),n(a,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return e.createElement("div",{className:this.props.clazzName?this.props.clazzName:"Copyright"},"Copyright © 杭州久点网络技术有限公司")}}]),a}();t.default=a}).call(this,n(1))},546:function(e,t,n){"use strict";(function(e,a){Object.defineProperty(t,"__esModule",{value:!0});var r=p(n(14)),o=p(n(383)),i=p(n(91)),l=p(n(40)),c=p(n(35)),u=p(n(426));n(18),n(380),n(90),n(49),n(50),n(427);var s=p(n(15)),f=p(n(28));function p(e){return e&&e.__esModule?e:{default:e}}var d=(0,s.default)(function(t){var n=t.state,s=n.dataList,p=(n.userList,{bjw2264:"#55a0f8",lijing:"#72c77c","常德闯":"#66c8ca"});return s.length?e.createElement("div",{className:"commits"},e.createElement("div",{className:"Breadcrumb"},e.createElement("h3",null,"GitLab "," <HCM_WEB> "," 提交记录")),e.createElement("div",{className:"content"},e.createElement(o.default,null,s.map(function(t,n){return e.createElement(o.default.Item,{dot:e.createElement(u.default,{style:{backgroundColor:p[t.author_name]},size:"large"},t.author_name),key:n},e.createElement(i.default,{style:{margin:"0 0 40px 20px"},type:"inner",title:e.createElement("p",null,"No:",n+1,e.createElement("span",{style:{marginLeft:"20px"}},"标题：",t.title)),extra:a(t.committed_date).format("YYYY年MM月DD日 HH:mm:ss")},e.createElement(l.default,null,e.createElement(c.default,{span:24},"提交人：",t.author_name)),e.createElement(l.default,null,e.createElement(c.default,{span:12},"short_id：",e.createElement("a",{target:"_blank",href:"http://n1a6884762.iok.la/chang/HCM_WEB/commit/"+t.short_id},t.short_id)),e.createElement(c.default,{span:12},"邮箱：",t.author_email)),e.createElement(l.default,null,e.createElement(c.default,{span:12},"id：",t.id),e.createElement(c.default,{span:12},"parent_ids：",t.parent_ids[0]))))})),t.state.show?e.createElement("div",{style:{textAlign:"center"}},e.createElement(r.default,{type:"primary",loading:t.state.loading,onClick:t.loading},"加载更多")):null),e.createElement(f.default,{clazzName:"copyright"})):null});t.default=d}).call(this,n(1),n(10))},816:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),r=i(n(546)),o=i(n(13));function i(e){return e&&e.__esModule?e:{default:e}}var l=function(t){function n(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n);var t=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(n.__proto__||Object.getPrototypeOf(n)).call(this,e));return t.getList=function(){o.default.get("http://n1a6884762.iok.la/api/v4/projects/95/repository/commits",{params:{private_token:"iHARe64RLtMbPFQcnJEt",per_page:"20",page:t.state.page}}).then(function(e){t.setState({dataList:t.state.dataList.concat(e.data),loading:!1,show:20==e.data.length})}).catch(function(e){message.error(e.statusText),t.setState({loading:!0})})},t.loading=function(){t.setState({loading:!0,page:t.state.page+1},t.getList)},t.state={userList:[],dataList:[],page:1,loading:!1,show:!0},t}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(n,e.Component),a(n,[{key:"componentDidMount",value:function(){this.getList()}},{key:"render",value:function(){return e.createElement(r.default,{that:this})}}]),n}();t.default=l}).call(this,n(1))}}]);