(window.webpackJsonp=window.webpackJsonp||[]).push([[116],{1075:function(e,t){},1076:function(e,t){},1078:function(e,t){},1082:function(e,t){},1083:function(e,t){},1084:function(e,t){},1085:function(e,t){},1095:function(e,t){},28:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}();var n=function(t){function n(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(n.__proto__||Object.getPrototypeOf(n)).call(this,e))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(n,e.Component),a(n,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return e.createElement("div",{className:this.props.clazzName?this.props.clazzName:"Copyright"},"Copyright © 杭州久点网络技术有限公司")}}]),n}();t.default=n}).call(this,a(1))},29:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var n=c(a(48));a(47);var l=c(a(28));function c(e){return e&&e.__esModule?e:{default:e}}a(1075);var r=function(t){return e.createElement("div",{className:"layout-wrapper "+(t.className||"")},e.createElement("div",{className:"header-wrapper"},e.createElement(n.default,{className:"breadcrumb"},t.breadcrumbList.map(function(a,l){return""===t.linkList[l]?e.createElement(n.default.Item,{key:a},a):e.createElement(n.default.Item,{href:"javascript:;",key:a},e.createElement("span",{onClick:function(){t.history.go(-t.linkList[l])}},a))}))),e.createElement("div",{className:"layout-content"},t.children),e.createElement("div",{className:"copyright"},e.createElement(l.default,null)))};r.defaultProps={title:"标题",breadcrumbList:[],linkList:[]},t.default=r}).call(this,a(1))},552:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var n=y(a(45)),l=y(a(14)),c=y(a(40)),r=y(a(35)),o=y(a(25)),u=y(a(11)),i=y(a(125)),s=y(a(23)),m=y(a(57)),f=y(a(48)),d=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e};a(51),a(18),a(49),a(50),a(24),a(26),a(144),a(22),a(56),a(47);var p=y(a(15)),h=y(a(29)),E=(y(a(28)),y(a(10))),b=y(a(716));function y(e){return e&&e.__esModule?e:{default:e}}f.default.Item;var _=m.default.RangePicker,g=s.default.Item,N=i.default.TabPane,v={width:"14px",height:"14px",opacity:.25,cursor:"pointer"},w=(0,p.default)(function(t){var a=t.props.form,n=a.getFieldDecorator,i=a.getFieldValue,m=function(a){return e.createElement(u.default,{onClick:t.handleClearIconClick.bind(t,a),type:"close-circle",style:v})};return e.createElement(s.default,{onSubmit:t.handleSearchSubmit},e.createElement(c.default,null,e.createElement(r.default,{span:6,className:"col"},e.createElement(g,{label:"活动主题",colon:!0,className:"form-item"},n("campaign_name",{initialValue:""})(e.createElement(o.default,{placeholder:"请输入",suffix:i("campaign_name")?m("campaign_name"):null})))),e.createElement(r.default,{span:6,className:"col"},e.createElement(g,{label:"店铺名称",colon:!0,className:"form-item"},n("shop_name",{initialValue:""})(e.createElement(o.default,{placeholder:"请输入",suffix:i("shop_name")?m("shop_name"):null})))),e.createElement(r.default,{span:12,className:"col"},e.createElement(g,{label:"提交时间",colon:!0,className:"form-item"},n("time",{initialValue:[(0,E.default)().subtract(90,"d"),(0,E.default)()]})(e.createElement(_,{getCalendarContainer:function(e){return e.parentNode},format:"YYYY-MM-DD",showTime:!0}))))),e.createElement(c.default,{justify:"end",type:"flex"},e.createElement(l.default,{htmlType:"submit",style:{color:"#1890ff",borderColor:"#1890ff"}},"查询")))}),k=(0,p.default)(function(t){var a=t.state.statusNum,n=a.all_count,l=a.w_count,o=a.wt_count,s=a.ok_count,m=a.ing_count,f=a.ot_count,p=t.state,h=p.cacheListObj,E=p.currentStatus,y=h[E]||[],_=[{tabName:"全部（"+(n||0)+"）",status:"1"},{tabName:"活动待审核（"+(l||0)+"）",status:"2"},{tabName:"待审核已过期（"+(o||0)+"）",status:"3"},{tabName:"活动已审核（"+(s||0)+"）",status:"4"},{tabName:"活动进行中（"+(m||0)+"）",status:"5"},{tabName:"活动已完成（"+(f||0)+"）",status:"6"}],g=function(a){return e.createElement("div",{className:"result-item",onClick:function(){t.goTo("/ActivityDetails/"+a.id+"/"+a.campaign_node)},key:a.id},e.createElement(c.default,{className:"row"},e.createElement(r.default,{span:24},e.createElement("span",null,a.campaign_name))),e.createElement(c.default,{className:"row"},e.createElement(r.default,{span:12},"活动时间：",t.formatTime(a.start_time,!0),"~",t.formatTime(a.end_time,!0)),e.createElement(r.default,{span:12,className:"status"},function(t){switch(t){case"活动待审核":return e.createElement(u.default,{type:"clock-circle",style:{color:"#FAAD14"}});case"待审核已过期":return e.createElement(u.default,{type:"minus-circle",style:{color:"#FAAD14"}});case"活动已审核":return e.createElement(u.default,{type:"check-circle",style:{color:"#1890ff"}});case"活动进行中":return e.createElement(u.default,{type:"clock-circle",style:{color:"#1890ff"}});default:return e.createElement(u.default,{type:"check-circle",style:{color:"#52C41A"}})}}(a.campaign_node),"  ",a.campaign_node)),e.createElement(c.default,{className:"row"},e.createElement(r.default,{span:4},a.shop_name,e.createElement(b.default,{pingName:a.ping_name})),e.createElement(r.default,{span:4},t.formatTime(a.createtime,!0)),e.createElement(r.default,{span:2,offset:10},"合计：",a.pro_count,"条"),e.createElement(r.default,{span:2},"通过：",a.act_count,"条"),e.createElement(r.default,{span:2},"驳回：",a.reject_count,"条")))};return e.createElement(i.default,{activeKey:""+E,onChange:t.handleTabChange,className:"result-list"},_.map(function(t){return e.createElement(N,{tab:t.tabName,key:t.status},y.length?y.map(function(e){return g(d({},e))}):e.createElement("div",{className:"empty-style"},"暂无数据"))}))}),j=(0,p.default)(function(t){var a=t.state,l=(a.cacheListObj,a.currentStatus,t.state.pagination),c=l.totalElements,r=l.pageSize,o=l.pageNo;return e.createElement(h.default,{breadcrumbList:["活动信息","审批查询"],linkList:["",""]},e.createElement("div",{className:"approval-query-wrapper"},e.createElement("section",{className:"content"},e.createElement("div",{className:"condition-search"},e.createElement(w,{that:t})),e.createElement("div",{className:"search-result"},e.createElement(k,{that:t}),e.createElement(n.default,{className:"pagination",total:c,defaultPageSize:r,current:o,showQuickJumper:!0,onChange:t.handlePageChange,showTotal:function(e,t){return"共 "+e+" 条记录"}})))))});t.default=j}).call(this,a(1))},716:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),a(1095);t.default=function(t){return e.createElement("i",{className:"ping-icon "+{"淘宝网":"icon-taobao","天猫商城":"icon-tianmao","京东商城":"icon-jd","苏宁易购":"icon-suning","国美在线":"icon-gome","拼多多":"icon-pdd","亚马逊":"icon-amazon","唯品会":"icon-vip",1688:"icon-alibaba","速卖通":"icon-express"}[t.pingName]})}}).call(this,a(1))}}]);