(window.webpackJsonp=window.webpackJsonp||[]).push([[174,175],{1075:function(e,t){},1076:function(e,t){},1077:function(e,t){},1078:function(e,t){},1079:function(e,t){},1080:function(e,t){},1081:function(e,t){},1082:function(e,t){},1083:function(e,t){},1084:function(e,t){},28:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}();var a=function(t){function a(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(a.__proto__||Object.getPrototypeOf(a)).call(this,e))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(a,e.Component),n(a,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return e.createElement("div",{className:this.props.clazzName?this.props.clazzName:"Copyright"},"Copyright © 杭州久点网络技术有限公司")}}]),a}();t.default=a}).call(this,n(1))},29:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var a=r(n(48));n(47);var l=r(n(28));function r(e){return e&&e.__esModule?e:{default:e}}n(1075);var i=function(t){return e.createElement("div",{className:"layout-wrapper "+(t.className||"")},e.createElement("div",{className:"header-wrapper"},e.createElement(a.default,{className:"breadcrumb"},t.breadcrumbList.map(function(n,l){return""===t.linkList[l]?e.createElement(a.default.Item,{key:n},n):e.createElement(a.default.Item,{href:"javascript:;",key:n},e.createElement("span",{onClick:function(){t.history.go(-t.linkList[l])}},n))}))),e.createElement("div",{className:"layout-content"},t.children),e.createElement("div",{className:"copyright"},e.createElement(l.default,null)))};i.defaultProps={title:"标题",breadcrumbList:[],linkList:[]},t.default=i}).call(this,n(1))},580:function(e,t,n){"use strict";(function(e,a){Object.defineProperty(t,"__esModule",{value:!0});var l=E(n(43)),r=E(n(74)),i=E(n(40)),o=E(n(14)),c=E(n(25)),s=E(n(11)),u=E(n(35)),m=E(n(57)),p=E(n(30)),f=E(n(23)),d=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e};n(42),n(94),n(49),n(18),n(24),n(26),n(50),n(56),n(32),n(22);var g=E(n(15)),h=E(n(29));function E(e){return e&&e.__esModule?e:{default:e}}var b=f.default.Item,w=p.default.Option,y=m.default.RangePicker,v={width:"14px",height:"14px",opacity:.25,cursor:"pointer"},_={"星":"heart","钻":"Blue_diamond","蓝冠":"Blue_crown","皇冠":"Yellow_crown"},Y=(0,g.default)(function(t){var n=t.state,m=n.platformList,g=n.platform,E=n.start_time,Y=n.end_time,k=n.wangwang,M=n.itemid,D=n.dataList,C=n.pagination,N=n.selectedTableRows,L=n.isCheckedAll,O=f.default.create()(function(n){var l=n.form,r=l.getFieldDecorator,h=l.getFieldsValue,_=l.getFieldValue,D=l.resetFields,C={labelCol:{span:3},wrapperCol:{span:15}};return e.createElement(f.default,{onSubmit:t.handleSearchSubmit.bind(t,h)},e.createElement(i.default,null,e.createElement(u.default,{span:8},e.createElement(b,d({label:"平台"},C),r("platform",{initialValue:g})(e.createElement(p.default,{getPopupContainer:function(e){return e.parentNode}},e.createElement(w,{value:""},"全部"),m.map(function(t){return e.createElement(w,{key:t.id,value:t.dictName},t.dictName)}))))),e.createElement(u.default,{span:8},e.createElement(b,{label:"商品ID",labelCol:{span:4},wrapperCol:{span:15}},r("itemid",{initialValue:M})(e.createElement(c.default,{placeholder:"请输入",suffix:_("itemid")?e.createElement(s.default,{style:v,onClick:function(){M&&t.handleClearInput("itemid"),D(["itemid"])},type:"close-circle"}):null})))),e.createElement(u.default,{span:8},e.createElement(b,{label:"提交时间",style:{float:"right"},labelCol:{span:4},wrapperCol:{span:15}},r("times",{initialValue:[E,Y]})(e.createElement(y,{format:"YYYY-MM-DD HH:mm:ss",showTime:{defaultValue:[a("00:00:00","HH:mm:ss"),a("23:59:59","HH:mm:ss")]},getCalendarContainer:function(e){return e.parentNode}})))),e.createElement(u.default,{span:8},e.createElement(b,d({label:"旺旺"},C),r("wangwang",{initialValue:k})(e.createElement(c.default,{placeholder:"请输入",suffix:_("wangwang")?e.createElement(s.default,{style:v,onClick:function(){k&&t.handleClearInput("wangwang"),D(["wangwang"])},type:"close-circle"}):null})))),e.createElement(u.default,{span:16,style:{textAlign:"right"}},e.createElement(o.default,{className:"btn6",htmlType:"submit"},"查询"))))}),S=[{title:"序号",key:"xuhao",render:function(e,t,n){return n+1}},{title:"商品信息",key:"item",width:"50%",render:function(t,n){for(var l=n.store_name,i=n.wangwang,o=n.authorize,c=n.platform,s=n.shoplevel,u=n.itemurl,m=n.price,p=n.sales_volume,f=n.send_address,d=n.submit_time,g=n.itemtitle,h=""===s?0:parseInt(s.split(",")[0],10),E=""===s?"":s.split(",")[1],b=[],w=0;w<h;w++)b.push(1);return e.createElement("div",null,e.createElement("p",{style:{display:"flex",alignItems:"center"}},e.createElement("span",null,l),e.createElement("span",null,"（",i,"）"),""!==o?e.createElement("img",{src:"../../../../img/Authorized.png",width:"52",height:"15"}):null),e.createElement("p",{style:{display:"flex",alignItems:"center",marginTop:"3px"}},e.createElement("span",null,"淘宝网"===c?e.createElement("img",{width:"21",height:"20",src:"../../../../img/icon/tao.png"}):e.createElement("img",{width:"20",height:"20",src:"../../../../img/icon/Tmall.png"})),"   ",e.createElement("span",null,b.length?b.map(function(t,n){return e.createElement("img",{style:{marginRight:"3px"},key:n,width:"16",height:"16",src:"../../../../img/icon/"+_[E]+".png"})}):null)),e.createElement("p",{className:"text-ellipse"},e.createElement(r.default,{title:g},e.createElement("a",{href:u,target:"_blank"},u))),e.createElement("p",null,e.createElement("span",null,"价格：",m)," ",e.createElement("span",null,"销量：",p)," ",e.createElement("span",null,"发货地：",f)),e.createElement("p",null,"提交时间：",a(d).format("YYYY-MM-DD HH:mm:ss")))}},{title:"标记",key:"mark",render:function(t,n){var a=n.limit_price,l=n.complaint_mode,r=n.complaint_remarks;return e.createElement("div",null,e.createElement("p",null,"限价：",a),e.createElement("p",null,"投诉方式：",l),e.createElement("p",null,"投诉备注：",r))}},{title:"备注",key:"backup",render:function(t,n){var a=n.remarks1,l=n.remarks2,r=n.remarks3,i=n.remarks4,o=n.remarks5;return e.createElement("div",null,e.createElement("p",null,"备注1：",a),e.createElement("p",null,"备注2：",l),e.createElement("p",null,"备注3：",r),e.createElement("p",null,"备注4：",i),e.createElement("p",null,"备注5：",o))}},{title:"鹰智快照",dataIndex:"snapshot_url",key:"snapshot_url",width:100,render:function(t){return""!==t&&t?e.createElement("a",{href:t,target:"_blank"},"查看快照"):e.createElement("span",null,"查看快照")}}],j={onChange:t.handleRowSelection,selectedRowKeys:N};return e.createElement(h.default,{breadcrumbList:["维权服务","插件汇总"],linkList:["",""],className:"out-wrapper"},e.createElement("div",{className:"plugin-summary-wrapper"},e.createElement("section",{className:"seaerch-wrapper"},e.createElement(O,null)),e.createElement("section",{className:"content-warpper"},e.createElement("div",{className:"options-btn"},e.createElement(o.default,{onClick:t.handleDelete},"批量删除"),"  ",e.createElement("a",{href:"/hcm/plugin/down_pluginList?platform="+g+"&start_time="+E.format("YYYY-MM-DD HH:mm:ss")+"&end_time="+Y.format("YYYY-MM-DD HH:mm:ss")+"&wangwang="+k+"&itemid="+M},e.createElement(o.default,null,"下载数据"))),e.createElement("div",{className:"table-info"},e.createElement(s.default,{type:"info-circle",theme:"outlined",style:{color:"#1890ff"}})," ",e.createElement("span",null,"共 ",e.createElement("i",{className:"num"},C.totalElements)," 项，已选择 ",e.createElement("i",{className:"num"},L?C.totalElements:N.length)," 项。"),e.createElement("span",{className:"btn-click",onClick:t.selectAll},"勾选全部/"),e.createElement("span",{className:"btn-click",onClick:t.cancelAll},"取消勾选")),e.createElement(l.default,{rowKey:function(e){return e.id},rowSelection:j,columns:S,dataSource:D,style:{position:"relative"},pagination:{total:C.totalElements,showQuickJumper:!0,onChange:t.pageChange,pageSize:C.pageSize,current:C.pageNo,showTotal:function(t,n){return e.createElement("span",{style:{position:"absolute",left:0}},"共 "+t+" 条记录 第 "+C.pageNo+" / "+C.totalPages+" 页 ")}}}))))});t.default=Y}).call(this,n(1),n(10))},853:function(e,t,n){"use strict";(function(e,a){Object.defineProperty(t,"__esModule",{value:!0});var l=c(n(19)),r=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}();n(20);var i=c(n(580)),o=c(n(13));function c(e){return e&&e.__esModule?e:{default:e}}var s=function(t){function n(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n);var t=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(n.__proto__||Object.getPrototypeOf(n)).call(this,e));return t.handleRowSelection=function(e,n){t.setState({selectedTableRows:n.length?n.map(function(e){return e.id}):[],isCheckedAll:!1})},t.handleClearInput=function(e){t.setState(function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}({},e,""))},t.getDataList=function(){var e=t.state,n=e.platform,a=e.start_time,l=e.end_time,r=e.pagination,i=e.wangwang,c=e.itemid;LoadingModal({bl:!0}),o.default.post("/hcm/plugin/getPluginList",{platform:n,start_time:a.format("YYYY-MM-DD HH:mm:ss"),end_time:l.format("YYYY-MM-DD HH:mm:ss"),wangwang:i,itemid:c,pageNo:r.pageNo,pageSize:r.pageSize}).then(function(e){LoadingModal({bl:!1});var n=t.handleResponse(e);t.setState({dataList:n.content,pagination:Object.assign({},t.state.pagination,{pageNo:n.pageNumber,pageSize:n.pageSize,totalElements:n.totalElements,totalPages:n.totalPages})})}).catch(t.handleResponseError)},t.selectAll=function(){t.setState({isCheckedAll:!0,selectedTableRows:[].concat(function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}(t.state.dataList.map(function(e){return e.id})))})},t.cancelAll=function(){t.setState({isCheckedAll:!1,selectedTableRows:[]})},t.pageChange=function(e){t.setState({pagination:Object.assign({},t.state.pagination,{pageNo:e})},function(){t.getDataList()})},t.handleDelete=function(){var e=t.state,n=e.isCheckedAll,a=e.selectedTableRows,r=e.platform,i=e.start_time,c=e.end_time,s=e.wangwang,u=e.itemid;if(a.length){var m={platform:r,start_time:i.format("YYYY-MM-DD HH:mm:ss"),end_time:c.format("YYYY-MM-DD HH:mm:ss"),wangwang:s,itemid:u};m.ids=n?"checkAll":a.join(","),LoadingModal({bl:!0}),o.default.post("/hcm/plugin/deletePluginList",m).then(function(e){LoadingModal({bl:!1}),t.handleResponse(e)&&(l.default.success(e.data.message),t.getDataList(),t.setState({selectedTableRows:[]}))}).catch(t.handleResponseError)}else l.default.warning("请至少选择一条记录！")},t.handleSearchSubmit=function(e,n){n.preventDefault();var a=e();a.times.length?t.setState({platform:a.platform,start_time:a.times[0],end_time:a.times[1],wangwang:a.wangwang?a.wangwang:"",itemid:a.itemid?a.itemid:"",pagination:Object.assign({},t.state.pagination,{pageNo:1})},function(){t.getDataList()}):l.default.warning("请选择时间！")},t.getPlatformDict=function(){o.default.get("/hcm/sys/GetList",{params:{dictcode:"platform"}}).then(function(e){var n=t.handleResponse(e);n&&t.setState({platformList:n})}).catch(t.handleResponseError)},t.handleResponse=function(e){var t=e.data,n=t.data,a=t.status,r=t.message;return"10000"===a?n:void l.default.error(r)},t.handleResponseError=function(e){LoadingModal({bl:!1}),l.default.error(e.statusText)},t.state={platformList:[],platform:"",start_time:a(a().subtract(6,"d").format("YYYY-MM-DD"),"YYYY-MM-DD HH:mm:ss"),end_time:a(a().format("YYYY-MM-DD")+"T23:59:59","YYYY-MM-DD HH:mm:ss"),wangwang:"",itemid:"",pagination:{pageNo:1,pageSize:10},dataList:[],selectedTableRows:[],isCheckedAll:!1},t}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(n,e.Component),r(n,[{key:"componentWillMount",value:function(){this.getPlatformDict(),this.getDataList()}},{key:"render",value:function(){return e.createElement(i.default,{that:this})}}]),n}();t.default=s}).call(this,n(1),n(10))}}]);