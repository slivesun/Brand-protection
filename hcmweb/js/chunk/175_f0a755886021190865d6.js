(window.webpackJsonp=window.webpackJsonp||[]).push([[175],{1075:function(e,t){},1076:function(e,t){},1077:function(e,t){},1078:function(e,t){},1079:function(e,t){},1080:function(e,t){},1081:function(e,t){},1082:function(e,t){},1083:function(e,t){},1084:function(e,t){},28:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var n=0;n<t.length;n++){var l=t[n];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(e,l.key,l)}}return function(t,n,l){return n&&e(t.prototype,n),l&&e(t,l),t}}();var l=function(t){function l(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,l),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(l.__proto__||Object.getPrototypeOf(l)).call(this,e))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(l,e.Component),n(l,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return e.createElement("div",{className:this.props.clazzName?this.props.clazzName:"Copyright"},"Copyright © 杭州久点网络技术有限公司")}}]),l}();t.default=l}).call(this,n(1))},29:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var l=r(n(48));n(47);var a=r(n(28));function r(e){return e&&e.__esModule?e:{default:e}}n(1075);var i=function(t){return e.createElement("div",{className:"layout-wrapper "+(t.className||"")},e.createElement("div",{className:"header-wrapper"},e.createElement(l.default,{className:"breadcrumb"},t.breadcrumbList.map(function(n,a){return""===t.linkList[a]?e.createElement(l.default.Item,{key:n},n):e.createElement(l.default.Item,{href:"javascript:;",key:n},e.createElement("span",{onClick:function(){t.history.go(-t.linkList[a])}},n))}))),e.createElement("div",{className:"layout-content"},t.children),e.createElement("div",{className:"copyright"},e.createElement(a.default,null)))};i.defaultProps={title:"标题",breadcrumbList:[],linkList:[]},t.default=i}).call(this,n(1))},580:function(e,t,n){"use strict";(function(e,l){Object.defineProperty(t,"__esModule",{value:!0});var a=g(n(43)),r=g(n(74)),i=g(n(40)),c=g(n(14)),o=g(n(25)),u=g(n(11)),s=g(n(35)),m=g(n(57)),p=g(n(30)),f=g(n(23)),d=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var l in n)Object.prototype.hasOwnProperty.call(n,l)&&(e[l]=n[l])}return e};n(42),n(94),n(49),n(18),n(24),n(26),n(50),n(56),n(32),n(22);var E=g(n(15)),h=g(n(29));function g(e){return e&&e.__esModule?e:{default:e}}var w=f.default.Item,y=p.default.Option,b=m.default.RangePicker,v={width:"14px",height:"14px",opacity:.25,cursor:"pointer"},k={"星":"heart","钻":"Blue_diamond","蓝冠":"Blue_crown","皇冠":"Yellow_crown"},_=(0,E.default)(function(t){var n=t.state,m=n.platformList,E=n.platform,g=n.start_time,_=n.end_time,N=n.wangwang,C=n.itemid,Y=n.dataList,O=n.pagination,M=n.selectedTableRows,x=n.isCheckedAll,j=f.default.create()(function(n){var a=n.form,r=a.getFieldDecorator,h=a.getFieldsValue,k=a.getFieldValue,Y=a.resetFields,O={labelCol:{span:3},wrapperCol:{span:15}};return e.createElement(f.default,{onSubmit:t.handleSearchSubmit.bind(t,h)},e.createElement(i.default,null,e.createElement(s.default,{span:8},e.createElement(w,d({label:"平台"},O),r("platform",{initialValue:E})(e.createElement(p.default,{getPopupContainer:function(e){return e.parentNode}},e.createElement(y,{value:""},"全部"),m.map(function(t){return e.createElement(y,{key:t.id,value:t.dictName},t.dictName)}))))),e.createElement(s.default,{span:8},e.createElement(w,{label:"商品ID",labelCol:{span:4},wrapperCol:{span:15}},r("itemid",{initialValue:C})(e.createElement(o.default,{placeholder:"请输入",suffix:k("itemid")?e.createElement(u.default,{style:v,onClick:function(){C&&t.handleClearInput("itemid"),Y(["itemid"])},type:"close-circle"}):null})))),e.createElement(s.default,{span:8},e.createElement(w,{label:"提交时间",style:{float:"right"},labelCol:{span:4},wrapperCol:{span:15}},r("times",{initialValue:[g,_]})(e.createElement(b,{format:"YYYY-MM-DD HH:mm:ss",showTime:{defaultValue:[l("00:00:00","HH:mm:ss"),l("23:59:59","HH:mm:ss")]},getCalendarContainer:function(e){return e.parentNode}})))),e.createElement(s.default,{span:8},e.createElement(w,d({label:"旺旺"},O),r("wangwang",{initialValue:N})(e.createElement(o.default,{placeholder:"请输入",suffix:k("wangwang")?e.createElement(u.default,{style:v,onClick:function(){N&&t.handleClearInput("wangwang"),Y(["wangwang"])},type:"close-circle"}):null})))),e.createElement(s.default,{span:16,style:{textAlign:"right"}},e.createElement(c.default,{className:"btn6",htmlType:"submit"},"查询"))))}),D=[{title:"序号",key:"xuhao",render:function(e,t,n){return n+1}},{title:"商品信息",key:"item",width:"50%",render:function(t,n){for(var a=n.store_name,i=n.wangwang,c=n.authorize,o=n.platform,u=n.shoplevel,s=n.itemurl,m=n.price,p=n.sales_volume,f=n.send_address,d=n.submit_time,E=n.itemtitle,h=""===u?0:parseInt(u.split(",")[0],10),g=""===u?"":u.split(",")[1],w=[],y=0;y<h;y++)w.push(1);return e.createElement("div",null,e.createElement("p",{style:{display:"flex",alignItems:"center"}},e.createElement("span",null,a),e.createElement("span",null,"（",i,"）"),""!==c?e.createElement("img",{src:"../../../../img/Authorized.png",width:"52",height:"15"}):null),e.createElement("p",{style:{display:"flex",alignItems:"center",marginTop:"3px"}},e.createElement("span",null,"淘宝网"===o?e.createElement("img",{width:"21",height:"20",src:"../../../../img/icon/tao.png"}):e.createElement("img",{width:"20",height:"20",src:"../../../../img/icon/Tmall.png"})),"   ",e.createElement("span",null,w.length?w.map(function(t,n){return e.createElement("img",{style:{marginRight:"3px"},key:n,width:"16",height:"16",src:"../../../../img/icon/"+k[g]+".png"})}):null)),e.createElement("p",{className:"text-ellipse"},e.createElement(r.default,{title:E},e.createElement("a",{href:s,target:"_blank"},s))),e.createElement("p",null,e.createElement("span",null,"价格：",m)," ",e.createElement("span",null,"销量：",p)," ",e.createElement("span",null,"发货地：",f)),e.createElement("p",null,"提交时间：",l(d).format("YYYY-MM-DD HH:mm:ss")))}},{title:"标记",key:"mark",render:function(t,n){var l=n.limit_price,a=n.complaint_mode,r=n.complaint_remarks;return e.createElement("div",null,e.createElement("p",null,"限价：",l),e.createElement("p",null,"投诉方式：",a),e.createElement("p",null,"投诉备注：",r))}},{title:"备注",key:"backup",render:function(t,n){var l=n.remarks1,a=n.remarks2,r=n.remarks3,i=n.remarks4,c=n.remarks5;return e.createElement("div",null,e.createElement("p",null,"备注1：",l),e.createElement("p",null,"备注2：",a),e.createElement("p",null,"备注3：",r),e.createElement("p",null,"备注4：",i),e.createElement("p",null,"备注5：",c))}},{title:"鹰智快照",dataIndex:"snapshot_url",key:"snapshot_url",width:100,render:function(t){return""!==t&&t?e.createElement("a",{href:t,target:"_blank"},"查看快照"):e.createElement("span",null,"查看快照")}}],H={onChange:t.handleRowSelection,selectedRowKeys:M};return e.createElement(h.default,{breadcrumbList:["维权服务","插件汇总"],linkList:["",""],className:"out-wrapper"},e.createElement("div",{className:"plugin-summary-wrapper"},e.createElement("section",{className:"seaerch-wrapper"},e.createElement(j,null)),e.createElement("section",{className:"content-warpper"},e.createElement("div",{className:"options-btn"},e.createElement(c.default,{onClick:t.handleDelete},"批量删除"),"  ",e.createElement("a",{href:"/hcm/plugin/down_pluginList?platform="+E+"&start_time="+g.format("YYYY-MM-DD HH:mm:ss")+"&end_time="+_.format("YYYY-MM-DD HH:mm:ss")+"&wangwang="+N+"&itemid="+C},e.createElement(c.default,null,"下载数据"))),e.createElement("div",{className:"table-info"},e.createElement(u.default,{type:"info-circle",theme:"outlined",style:{color:"#1890ff"}})," ",e.createElement("span",null,"共 ",e.createElement("i",{className:"num"},O.totalElements)," 项，已选择 ",e.createElement("i",{className:"num"},x?O.totalElements:M.length)," 项。"),e.createElement("span",{className:"btn-click",onClick:t.selectAll},"勾选全部/"),e.createElement("span",{className:"btn-click",onClick:t.cancelAll},"取消勾选")),e.createElement(a.default,{rowKey:function(e){return e.id},rowSelection:H,columns:D,dataSource:Y,style:{position:"relative"},pagination:{total:O.totalElements,showQuickJumper:!0,onChange:t.pageChange,pageSize:O.pageSize,current:O.pageNo,showTotal:function(t,n){return e.createElement("span",{style:{position:"absolute",left:0}},"共 "+t+" 条记录 第 "+O.pageNo+" / "+O.totalPages+" 页 ")}}}))))});t.default=_}).call(this,n(1),n(10))}}]);