(window.webpackJsonp=window.webpackJsonp||[]).push([[56],{1075:function(e,t){},1076:function(e,t){},1078:function(e,t){},1082:function(e,t){},1083:function(e,t){},1084:function(e,t){},1085:function(e,t){},1095:function(e,t){},1106:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var n=u(a(40)),l=u(a(35)),c=u(a(11));a(49),a(50),a(26);var r=u(a(10)),i=u(a(716));function u(e){return e&&e.__esModule?e:{default:e}}a(1107);t.default=function(t){var a=t.infos,u=a.campaign_name,o=a.start_time,s=a.end_time,m=a.shop_name,f=a.createtime,p=a.ping_name,d=(a.brand_name,a.pro_count),y=a.act_count,E=a.reject_count,b=a.campaign_node,h=a.id,_=a.dealer_name;return e.createElement("div",{className:"activity-list-item",onClick:t.clicked.bind(void 0,"/ActivityDetails/"+h+"/"+b)},e.createElement(n.default,null,e.createElement(l.default,{span:24,className:"title"},u)),e.createElement(n.default,{type:"flex",justify:"space-between"},e.createElement(l.default,{span:10,className:"activity-time"},"活动时间：",(0,r.default)(o).format("YYYY-MM-DD HH:mm:ss")+"~"+(0,r.default)(s).format("YYYY-MM-DD HH:mm:ss")),e.createElement(l.default,{span:4,className:"activity-status"},function(t){switch(t){case"活动待审核":return e.createElement(c.default,{type:"clock-circle",style:{color:"#FAAD14"}});case"待审核已过期":return e.createElement(c.default,{type:"minus-circle",style:{color:"#FAAD14"}});case"活动已审核":return e.createElement(c.default,{type:"check-circle",style:{color:"#1890ff"}});case"活动进行中":return e.createElement(c.default,{type:"clock-circle",style:{color:"#1890ff"}});default:return e.createElement(c.default,{type:"check-circle",style:{color:"#52C41A"}})}}(b),"  ",b)),e.createElement(n.default,null,e.createElement(l.default,{span:18,className:"activity-master"},e.createElement("span",null,m),e.createElement("span",{style:{marginLeft:0}},e.createElement(i.default,{pingName:p})),e.createElement("span",null,_),e.createElement("span",null,(0,r.default)(f).format("YYYY-MM-DD HH:mm:ss"))),e.createElement(l.default,{span:6,className:"counts"},e.createElement("span",null,"合计：",d,"条"),"   ",e.createElement("span",null,"|"),"   ",e.createElement("span",null,"通过：",y,"条"),"   ",e.createElement("span",null,"|"),"   ",e.createElement("span",null,"驳回: ",E,"条"))))}}).call(this,a(1))},1107:function(e,t){},28:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}();var n=function(t){function n(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(n.__proto__||Object.getPrototypeOf(n)).call(this,e))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(n,e.Component),a(n,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return e.createElement("div",{className:this.props.clazzName?this.props.clazzName:"Copyright"},"Copyright © 杭州久点网络技术有限公司")}}]),n}();t.default=n}).call(this,a(1))},29:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var n=c(a(48));a(47);var l=c(a(28));function c(e){return e&&e.__esModule?e:{default:e}}a(1075);var r=function(t){return e.createElement("div",{className:"layout-wrapper "+(t.className||"")},e.createElement("div",{className:"header-wrapper"},e.createElement(n.default,{className:"breadcrumb"},t.breadcrumbList.map(function(a,l){return""===t.linkList[l]?e.createElement(n.default.Item,{key:a},a):e.createElement(n.default.Item,{href:"javascript:;",key:a},e.createElement("span",{onClick:function(){t.history.go(-t.linkList[l])}},a))}))),e.createElement("div",{className:"layout-content"},t.children),e.createElement("div",{className:"copyright"},e.createElement(l.default,null)))};r.defaultProps={title:"标题",breadcrumbList:[],linkList:[]},t.default=r}).call(this,a(1))},525:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var n=b(a(45)),l=b(a(14)),c=b(a(40)),r=b(a(35)),i=b(a(25)),u=b(a(11)),o=b(a(125)),s=b(a(30)),m=b(a(57)),f=b(a(23));a(51),a(18),a(49),a(50),a(24),a(26),a(144),a(32),a(56),a(22);var p=b(a(15)),d=b(a(29)),y=b(a(1106)),E=b(a(10));function b(e){return e&&e.__esModule?e:{default:e}}var h=f.default.Item,_=m.default.RangePicker,v=s.default.Option,g=o.default.TabPane,k={width:"242px"},N=(0,p.default)(function(t){var a=t.props.form,m=a.getFieldDecorator,p=a.getFieldValue,b=t.state,N=b.platformList,w=b.cacheActivityList,C=b.currentTabIndex,x=b.statusNums,M=b.pagination,Y=w[C]||[],j={width:"14px",height:"14px",opacity:.25,cursor:"pointer"},D=function(a){return e.createElement(u.default,{onClick:t.handleClearIconClick.bind(t,a),type:"close-circle",style:j})},O=e.createElement(f.default,{onSubmit:t.handleFormSubmit},e.createElement(c.default,null,e.createElement(r.default,{span:7},e.createElement(h,{label:"活动主题",labelCol:{span:4},className:"inputAR"},m("campaign_name",{initialValue:""})(e.createElement(i.default,{placeholder:"请输入",style:k,suffix:p("campaign_name")?D("campaign_name"):null})))),e.createElement(r.default,{span:7},e.createElement(h,{label:"所属客户",labelCol:{span:4},className:"inputAR"},m("dealer_name",{initialValue:""})(e.createElement(i.default,{placeholder:"请输入",style:k,suffix:p("dealer_name")?D("dealer_name"):null})))),e.createElement(r.default,{span:10},e.createElement(h,{label:"提交时间",labelCol:{span:4},wrapperCol:{span:19}},m("time",{initialValue:[(0,E.default)().subtract(90,"d"),(0,E.default)()]})(e.createElement(_,{getCalendarContainer:function(e){return e.parentNode},format:"YYYY-MM-DD HH:mm:ss",showTime:!0,style:{width:"100%"}}))))),e.createElement(c.default,null,e.createElement(r.default,{span:7},e.createElement(h,{label:"店铺名称",labelCol:{span:4},className:"inputAR"},m("shop_name",{initialValue:""})(e.createElement(i.default,{placeholder:"请输入",style:k,suffix:p("shop_name")?D("shop_name"):null})))),e.createElement(r.default,{span:7},e.createElement(h,{label:"平台",labelCol:{span:4},className:"inputAR"},m("ping_id",{initialValue:"all"})(e.createElement(s.default,{style:k,getPopupContainer:function(e){return e.parentNode}},e.createElement(v,{value:"all"},"全部"),N.map(function(t){return e.createElement(v,{value:t.id,key:t.id},t.dictName)}))))),e.createElement(r.default,{span:10},e.createElement(h,{wrapperCol:{span:23},style:{textAlign:"right"}},e.createElement(l.default,{htmlType:"submit",style:{color:"#1890ff",borderColor:"#1890ff"}},"查询")))));return e.createElement(d.default,{title:"活动审核",breadcrumbList:["活动信息","活动审核"],linkList:["",""],className:"activity-review-wrapper"},e.createElement("div",{className:"search-box"},O),e.createElement("div",{className:"search-result"},e.createElement(o.default,{activeKey:""+C,className:"tabs",onChange:t.handleTabChange},[{text:"全部",key:"1",nums:"all_count"},{text:"活动待审核",key:"2",nums:"w_count"},{text:"待审核已过期",key:"3",nums:"wt_count"},{text:"活动已审核",key:"4",nums:"ok_count"},{text:"活动进行中",key:"5",nums:"ing_count"},{text:"活动已完成",key:"6",nums:"ot_count"}].map(function(a){return e.createElement(g,{tab:a.text+"（"+(x[a.nums]||0)+"）",key:a.key},Y.length?Y.map(function(a){return e.createElement(y.default,{clicked:t.goToDetail,infos:a,key:a.id})}):e.createElement("div",{className:"empty-style"},"暂无数据"))}))),e.createElement("div",{className:"pagination"},e.createElement(n.default,{total:M.totalElements,pageSize:M.pageSize,current:M.pageNo,showQuickJumper:!0,showTotal:function(e){return"共"+e+"条"},onChange:t.handlePageChange})))});t.default=N}).call(this,a(1))},716:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),a(1095);t.default=function(t){return e.createElement("i",{className:"ping-icon "+{"淘宝网":"icon-taobao","天猫商城":"icon-tianmao","京东商城":"icon-jd","苏宁易购":"icon-suning","国美在线":"icon-gome","拼多多":"icon-pdd","亚马逊":"icon-amazon","唯品会":"icon-vip",1688:"icon-alibaba","速卖通":"icon-express"}[t.pingName]})}}).call(this,a(1))}}]);