(window.webpackJsonp=window.webpackJsonp||[]).push([[139,269],{1075:function(e,t){},1076:function(e,t){},1077:function(e,t){},1078:function(e,t){},1079:function(e,t){},1080:function(e,t){},1081:function(e,t){},1082:function(e,t){},1083:function(e,t){},1084:function(e,t){},28:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}();var n=function(t){function n(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(n.__proto__||Object.getPrototypeOf(n)).call(this,e))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(n,e.Component),a(n,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return e.createElement("div",{className:this.props.clazzName?this.props.clazzName:"Copyright"},"Copyright © 杭州久点网络技术有限公司")}}]),n}();t.default=n}).call(this,a(1))},29:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var n=i(a(48));a(47);var l=i(a(28));function i(e){return e&&e.__esModule?e:{default:e}}a(1075);var r=function(t){return e.createElement("div",{className:"layout-wrapper "+(t.className||"")},e.createElement("div",{className:"header-wrapper"},e.createElement(n.default,{className:"breadcrumb"},t.breadcrumbList.map(function(a,l){return""===t.linkList[l]?e.createElement(n.default.Item,{key:a},a):e.createElement(n.default.Item,{href:"javascript:;",key:a},e.createElement("span",{onClick:function(){t.history.go(-t.linkList[l])}},a))}))),e.createElement("div",{className:"layout-content"},t.children),e.createElement("div",{className:"copyright"},e.createElement(l.default,null)))};r.defaultProps={title:"标题",breadcrumbList:[],linkList:[]},t.default=r}).call(this,a(1))},562:function(e,t,a){"use strict";(function(e,n){Object.defineProperty(t,"__esModule",{value:!0});var l=p(a(45)),i=p(a(43)),r=p(a(30)),o=p(a(57)),s=p(a(14)),c=p(a(48));a(51),a(42),a(32),a(56),a(18),a(47);var m=p(a(15)),u=(p(a(29)),p(a(28)));function p(e){return e&&e.__esModule?e:{default:e}}a(735);var d=(0,m.default)(function(t){var a=""!=t.state.value?t.state.value.map(function(t,a){return e.createElement(Option,{key:t},t)}):"";return e.createElement("div",{className:"keywordMonitorDetail"},e.createElement("div",{className:"Breadcrumb"},e.createElement(c.default,null,e.createElement(c.default.Item,null,e.createElement("a",{href:"/index.html#/keywordMonitor"},"关键词监控")),e.createElement(c.default.Item,null,"监控详情"))),e.createElement("div",{className:"content"},e.createElement("div",{className:"contentTop"},e.createElement("div",{className:"div"},e.createElement("span",{style:{fontSize:"16px"}},"监控信息"),e.createElement("span",null,e.createElement(s.default,{style:{float:"right"},type:"primary",onClick:t.dataFx},"数据分析"))),e.createElement("div",{className:"div"},e.createElement("span",null,e.createElement("p",{style:{display:"inline-block",marginTop:"5px",marginRight:"24px"}},"关键词："),t.state.key_name),e.createElement("span",null,e.createElement("p",{style:{display:"inline-block",marginTop:"5px",marginRight:"24px"}},"限价："),e.createElement("p",{style:{display:"inline-block"}},t.state.key_price)),e.createElement("span",null,e.createElement("b",{style:{float:"left",marginRight:"24px",marginTop:"5px"}},"平台："),"淘宝天猫"==t.state.platform?e.createElement("b",null,e.createElement("img",{src:"../../../img/icon/Taobao.png",style:{width:"20px",height:"20px"},alt:""}),e.createElement("img",{src:"../../../img/icon/tall.png",style:{width:"20px",height:"20px",marginLeft:"5px"},alt:""})):"1688网"==t.state.platform?e.createElement("img",{src:"../../../img/icon/1688.png",style:{width:"20px",height:"20px"},alt:""}):"唯品会"==t.state.platform?e.createElement("img",{src:"../../../img/icon/vipn.png",style:{width:"20px",height:"20px"},alt:""}):"拼多多"==t.state.platform?e.createElement("img",{src:"../../../img/icon/pinduoduo.png",style:{width:"20px",height:"20px"},alt:""}):e.createElement("span",{style:{marginTop:"5px",display:"inline-block"}},t.state.platform))),e.createElement("div",{className:"div"},e.createElement("span",null,"监控范围：",e.createElement("p",{style:{display:"inline-block",marginTop:"5px",marginLeft:"24px"}}," ",t.state.key_range)),e.createElement("span",null,"频次：",e.createElement("p",{style:{display:"inline-block",marginTop:"5px",marginLeft:"24px"}},t.state.frequency)),e.createElement("span",null,"监控时间：",e.createElement("p",{style:{display:"inline-block",marginTop:"5px",marginLeft:"24px"}},t.state.key_times)))),e.createElement("div",{className:"contentTop"},e.createElement("div",{className:"div"},e.createElement("span",null,"日期： ",e.createElement(o.default,{defaultValue:n(),format:"YYYY-MM-DD",onChange:t.onmomentTime})),e.createElement("span",{style:{position:"relative"}},"监控时间：",e.createElement(r.default,{placeholder:t.state.values,firstActiveValue:t.state.values,getPopupContainer:function(e){return e.parentNode},style:{width:100},onChange:t.onChangeTime},a)),e.createElement("span",{style:{textAlign:"right"}},e.createElement("a",{style:{marginRight:"10px"},href:"/hcm/keyword_monitor/downLoad?platform="+t.state.platform+"&keyword_id="+t.state.keyword_id+"&createtime="+t.state.createtime+"&key_times="+t.state.keytime},e.createElement(s.default,null,"下载数据")))),"淘宝天猫"==t.state.platform?e.createElement(i.default,{pagination:!1,rowKey:"id",scroll:{x:200*(t.state.taobao_list.length-1)},columns:t.state.taobao_list,dataSource:t.state.data,loading:t.state.loading}):"京东商城"==t.state.platform||"苏宁易购"==t.state.platform||"当当网"==t.state.platform?e.createElement(i.default,{pagination:!1,rowKey:"id",scroll:{x:200*(t.state.JD_list.length-1)},columns:t.state.JD_list,dataSource:t.state.data,loading:t.state.loading}):"拼多多"==t.state.platform?e.createElement(i.default,{pagination:!1,rowKey:"id",scroll:{x:200*(t.state.PDD_list.length-1)},columns:t.state.PDD_list,dataSource:t.state.data,loading:t.state.loading}):"1688网"==t.state.platform?e.createElement(i.default,{pagination:!1,rowKey:"id",scroll:{x:200*(t.state.BB_list.length-1)},columns:t.state.BB_list,dataSource:t.state.data,loading:t.state.loading}):"闲鱼"==t.state.platform?e.createElement(i.default,{pagination:!1,rowKey:"id",scroll:{x:200*(t.state.XY_list.length-1)},columns:t.state.XY_list,dataSource:t.state.data,loading:t.state.loading}):"唯品会"==t.state.platform?e.createElement(i.default,{pagination:!1,rowKey:"id",scroll:{x:200*(t.state.wph_list.length-1)},columns:t.state.wph_list,dataSource:t.state.data,loading:t.state.loading}):e.createElement(i.default,{pagination:!1,rowKey:"id",scroll:{x:200*(t.state.taobao_list.length-1)},columns:t.state.taobao_list,dataSource:t.state.data}),e.createElement("div",{className:"ProductInformationFooter"},e.createElement("div",{className:"footer"},e.createElement("div",{className:"info"},"共 "+t.state.totalNum+" 条记录 ","  ","第  "+t.state.pageNo+"  / "+Math.ceil(t.state.totalNum/t.state.pageSize)+" 页"),e.createElement(l.default,{pageSize:t.state.pageSize,current:t.state.pageNo,total:t.state.totalNum,onChange:t.changePagination,onShowSizeChange:t.onPaginationSize,showSizeChanger:!0,showQuickJumper:!0}))))),e.createElement(u.default,{clazzName:"copyright"}))});t.default=d}).call(this,a(1),a(10))},735:function(e,t){}}]);