(window.webpackJsonp=window.webpackJsonp||[]).push([[138,139,269],{1075:function(e,t){},1076:function(e,t){},1077:function(e,t){},1078:function(e,t){},1079:function(e,t){},1080:function(e,t){},1081:function(e,t){},1082:function(e,t){},1083:function(e,t){},1084:function(e,t){},28:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}();var n=function(t){function n(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(n.__proto__||Object.getPrototypeOf(n)).call(this,e))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(n,e.Component),a(n,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return e.createElement("div",{className:this.props.clazzName?this.props.clazzName:"Copyright"},"Copyright © 杭州久点网络技术有限公司")}}]),n}();t.default=n}).call(this,a(1))},29:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var n=i(a(48));a(47);var r=i(a(28));function i(e){return e&&e.__esModule?e:{default:e}}a(1075);var l=function(t){return e.createElement("div",{className:"layout-wrapper "+(t.className||"")},e.createElement("div",{className:"header-wrapper"},e.createElement(n.default,{className:"breadcrumb"},t.breadcrumbList.map(function(a,r){return""===t.linkList[r]?e.createElement(n.default.Item,{key:a},a):e.createElement(n.default.Item,{href:"javascript:;",key:a},e.createElement("span",{onClick:function(){t.history.go(-t.linkList[r])}},a))}))),e.createElement("div",{className:"layout-content"},t.children),e.createElement("div",{className:"copyright"},e.createElement(r.default,null)))};l.defaultProps={title:"标题",breadcrumbList:[],linkList:[]},t.default=l}).call(this,a(1))},562:function(e,t,a){"use strict";(function(e,n){Object.defineProperty(t,"__esModule",{value:!0});var r=p(a(45)),i=p(a(43)),l=p(a(30)),o=p(a(57)),s=p(a(14)),c=p(a(48));a(51),a(42),a(32),a(56),a(18),a(47);var m=p(a(15)),u=(p(a(29)),p(a(28)));function p(e){return e&&e.__esModule?e:{default:e}}a(735);var d=(0,m.default)(function(t){var a=""!=t.state.value?t.state.value.map(function(t,a){return e.createElement(Option,{key:t},t)}):"";return e.createElement("div",{className:"keywordMonitorDetail"},e.createElement("div",{className:"Breadcrumb"},e.createElement(c.default,null,e.createElement(c.default.Item,null,e.createElement("a",{href:"/index.html#/keywordMonitor"},"关键词监控")),e.createElement(c.default.Item,null,"监控详情"))),e.createElement("div",{className:"content"},e.createElement("div",{className:"contentTop"},e.createElement("div",{className:"div"},e.createElement("span",{style:{fontSize:"16px"}},"监控信息"),e.createElement("span",null,e.createElement(s.default,{style:{float:"right"},type:"primary",onClick:t.dataFx},"数据分析"))),e.createElement("div",{className:"div"},e.createElement("span",null,e.createElement("p",{style:{display:"inline-block",marginTop:"5px",marginRight:"24px"}},"关键词："),t.state.key_name),e.createElement("span",null,e.createElement("p",{style:{display:"inline-block",marginTop:"5px",marginRight:"24px"}},"限价："),e.createElement("p",{style:{display:"inline-block"}},t.state.key_price)),e.createElement("span",null,e.createElement("b",{style:{float:"left",marginRight:"24px",marginTop:"5px"}},"平台："),"淘宝天猫"==t.state.platform?e.createElement("b",null,e.createElement("img",{src:"../../../img/icon/Taobao.png",style:{width:"20px",height:"20px"},alt:""}),e.createElement("img",{src:"../../../img/icon/tall.png",style:{width:"20px",height:"20px",marginLeft:"5px"},alt:""})):"1688网"==t.state.platform?e.createElement("img",{src:"../../../img/icon/1688.png",style:{width:"20px",height:"20px"},alt:""}):"唯品会"==t.state.platform?e.createElement("img",{src:"../../../img/icon/vipn.png",style:{width:"20px",height:"20px"},alt:""}):"拼多多"==t.state.platform?e.createElement("img",{src:"../../../img/icon/pinduoduo.png",style:{width:"20px",height:"20px"},alt:""}):e.createElement("span",{style:{marginTop:"5px",display:"inline-block"}},t.state.platform))),e.createElement("div",{className:"div"},e.createElement("span",null,"监控范围：",e.createElement("p",{style:{display:"inline-block",marginTop:"5px",marginLeft:"24px"}}," ",t.state.key_range)),e.createElement("span",null,"频次：",e.createElement("p",{style:{display:"inline-block",marginTop:"5px",marginLeft:"24px"}},t.state.frequency)),e.createElement("span",null,"监控时间：",e.createElement("p",{style:{display:"inline-block",marginTop:"5px",marginLeft:"24px"}},t.state.key_times)))),e.createElement("div",{className:"contentTop"},e.createElement("div",{className:"div"},e.createElement("span",null,"日期： ",e.createElement(o.default,{defaultValue:n(),format:"YYYY-MM-DD",onChange:t.onmomentTime})),e.createElement("span",{style:{position:"relative"}},"监控时间：",e.createElement(l.default,{placeholder:t.state.values,firstActiveValue:t.state.values,getPopupContainer:function(e){return e.parentNode},style:{width:100},onChange:t.onChangeTime},a)),e.createElement("span",{style:{textAlign:"right"}},e.createElement("a",{style:{marginRight:"10px"},href:"/hcm/keyword_monitor/downLoad?platform="+t.state.platform+"&keyword_id="+t.state.keyword_id+"&createtime="+t.state.createtime+"&key_times="+t.state.keytime},e.createElement(s.default,null,"下载数据")))),"淘宝天猫"==t.state.platform?e.createElement(i.default,{pagination:!1,rowKey:"id",scroll:{x:200*(t.state.taobao_list.length-1)},columns:t.state.taobao_list,dataSource:t.state.data,loading:t.state.loading}):"京东商城"==t.state.platform||"苏宁易购"==t.state.platform||"当当网"==t.state.platform?e.createElement(i.default,{pagination:!1,rowKey:"id",scroll:{x:200*(t.state.JD_list.length-1)},columns:t.state.JD_list,dataSource:t.state.data,loading:t.state.loading}):"拼多多"==t.state.platform?e.createElement(i.default,{pagination:!1,rowKey:"id",scroll:{x:200*(t.state.PDD_list.length-1)},columns:t.state.PDD_list,dataSource:t.state.data,loading:t.state.loading}):"1688网"==t.state.platform?e.createElement(i.default,{pagination:!1,rowKey:"id",scroll:{x:200*(t.state.BB_list.length-1)},columns:t.state.BB_list,dataSource:t.state.data,loading:t.state.loading}):"闲鱼"==t.state.platform?e.createElement(i.default,{pagination:!1,rowKey:"id",scroll:{x:200*(t.state.XY_list.length-1)},columns:t.state.XY_list,dataSource:t.state.data,loading:t.state.loading}):"唯品会"==t.state.platform?e.createElement(i.default,{pagination:!1,rowKey:"id",scroll:{x:200*(t.state.wph_list.length-1)},columns:t.state.wph_list,dataSource:t.state.data,loading:t.state.loading}):e.createElement(i.default,{pagination:!1,rowKey:"id",scroll:{x:200*(t.state.taobao_list.length-1)},columns:t.state.taobao_list,dataSource:t.state.data}),e.createElement("div",{className:"ProductInformationFooter"},e.createElement("div",{className:"footer"},e.createElement("div",{className:"info"},"共 "+t.state.totalNum+" 条记录 ","  ","第  "+t.state.pageNo+"  / "+Math.ceil(t.state.totalNum/t.state.pageSize)+" 页"),e.createElement(r.default,{pageSize:t.state.pageSize,current:t.state.pageNo,total:t.state.totalNum,onChange:t.changePagination,onShowSizeChange:t.onPaginationSize,showSizeChanger:!0,showQuickJumper:!0}))))),e.createElement(u.default,{clazzName:"copyright"}))});t.default=d}).call(this,a(1),a(10))},735:function(e,t){},835:function(e,t,a){"use strict";(function(e,n){Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),i=o(a(562)),l=o(a(13));function o(e){return e&&e.__esModule?e:{default:e}}function s(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var c=function(t){function a(t){var r;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a);var i=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(a.__proto__||Object.getPrototypeOf(a)).call(this,t));i.add0=function(e){return e<10?"0"+e:e},i.format=function(e){var t=new Date(e),a=t.getFullYear(),n=t.getMonth()+1,r=t.getDate()+1,l=t.getHours()+1,o=t.getMinutes()+1,s=t.getSeconds()+1;return a+"-"+i.add0(n)+"-"+i.add0(r)+" "+i.add0(l)+":"+i.add0(o)+":"+i.add0(s)},i.functions=function(e){var t=e.split(":")[0],a=e.split(":")[1];return Number(3600*t)+Number(60*a)},i.HeaderList=function(e){l.default.post("/hcm/keyword_monitor/obj",{id:i.props.match.params.id,createtime:i.state.createtime?i.state.createtime:n(parseInt(i.props.match.params.platform)).format("YYYY-MM-DD HH:mm:ss")}).then(function(t){console.log(t),1e4==t.data.status&&i.setState({key_name:t.data.data.key_name,key_price:t.data.data.key_price,key_range:t.data.data.key_range,frequency:t.data.data.frequency,key_times:t.data.data.key_times,platform:t.data.data.platform,keyword_id:i.props.match.params.id,createtime:e,loading:!0,createtimes:n(parseInt(i.props.match.params.platform)).format("YYYY-MM-DD HH:mm:ss"),value:t.data.data.key_times.split(",")},function(){var e=(new Date).getHours()+":"+(new Date).getMinutes(),a=[],n=[];console.log(t.data.data.key_times.split(",").sort()),t.data.data.key_times.split(",").sort().forEach(function(r,l){i.functions(e)<i.functions(t.data.data.key_times.split(",").sort()[l])?(console.log(1),a.push(i.functions(e)-i.functions(t.data.data.key_times.split(",").sort()[l])),i.setState({values:t.data.data.key_times.split(",").sort()[a.indexOf(Math.max.apply([],a))],keytime:t.data.data.key_times.split(",").sort()[a.indexOf(Math.max.apply([],a))]},function(){i.list(i.state.platform,i.state.keyword_id,i.state.createtime,i.state.keytime,i.state.pageNo,i.state.pageSize)})):i.functions(e)>i.functions(t.data.data.key_times.split(",").sort()[l])&&(console.log(2),n.push(i.functions(e)-i.functions(t.data.data.key_times.split(",").sort()[l])),i.setState({values:t.data.data.key_times.split(",").sort()[n.indexOf(Math.min.apply([],n))],keytime:t.data.data.key_times.split(",").sort()[n.indexOf(Math.min.apply([],n))]},function(){i.list(i.state.platform,i.state.keyword_id,i.state.createtime,i.state.keytime,i.state.pageNo,i.state.pageSize)}))},function(){console.log(1)})})})},i.dataFx=function(){window.location.href="/index.html#/monitorDataAnalysis/"+i.props.match.params.id+"/"+i.props.match.params.platform},i.DLSju=function(){l.default.post("/hcm/keyword_monitor/downLoad",{platform:i.state.platform,keyword_id:i.props.match.params.id,createtime:i.state.createtime,key_times:i.state.keytime}).then(function(e){console.log(e),200==e.status&&(window.location.href="/hcm/keyword_monitor/downLoad?keyword_id="+i.props.match.params.id+"&createtime="+n(parseInt(i.props.match.params.platform)).format("YYYY-MM-DD HH:mm:ss")+"&key_times="+i.state.keytime)})},i.onChangeTime=function(e){console.log(e),i.setState({keytime:e,loading:!0},function(){i.list(i.state.platform,i.state.keyword_id,i.state.createtime,i.state.keytime,i.state.pageNo,i.state.pageSize)})},i.onmomentTime=function(e,t){var a;i.setState((s(a={key_name:"",key_price:"",key_range:"",frequency:"",key_times:"",platform:"",keyword_id:""},"key_times",""),s(a,"value",[]),s(a,"values",[]),s(a,"keytime",""),s(a,"loading",!0),s(a,"createtime",t+" 00:00:00"),a),function(){console.log(i.state.createtime),i.HeaderList(t+" 00:00:00")})},i.list=function(e,t,a,n,r,o){l.default.post("/hcm/keyword_monitor/list",{platform:e,keyword_id:t,createtime:a,key_times:n,pageNo:r,pageSize:o}).then(function(e){1e4==e.data.status?i.setState({data:e.data.data.content,pageSize:e.data.data.pageSize,pageNo:e.data.data.pageNumber,totalNum:e.data.data.totalElements,loading:!1}):i.setState({loading:!1})}).catch(function(e){message.error(e.statusText),i.setState({loading:!1})})},i.goTo=function(e){i.props.history.push(e)},i.changePagination=function(e,t){i.setState({pageNo:e,pageSize:t,loading:!0},function(){i.list(i.state.platform,i.state.keyword_id,i.state.createtime,i.state.keytime,i.state.pageNo,i.state.pageSize)})},i.onPaginationSize=function(e,t){i.setState({pageNo:e,pageSize:t,loading:!0},function(){i.list(i.state.platform,i.state.keyword_id,i.state.createtime,i.state.keytime,i.state.pageNo,i.state.pageSize)})};var o=[{title:"序号",render:function(t,a,n){return e.createElement("span",{key:n},n+1)}},{title:"商品信息",render:function(t,a,n){return e.createElement("span",{key:n},e.createElement("img",{style:{width:"50px",float:"left"},src:a.logopicurl,alt:""}),e.createElement("a",{href:a.itemlink,target:"_blank",style:{width:"150px",float:"left",marginLeft:"10px",overflow:"hidden"}},a.itemtitle))}},{title:"店铺信息",render:function(t,a,n){return e.createElement("span",{key:n},a.shopname)}},{title:"价格",render:function(t,a,n){return e.createElement("span",{key:n},"￥",a.itemprice)}},{title:"30天销量",render:function(t,a,n){return e.createElement("span",{key:n},a.salevolume)}},{title:"优惠信息",render:function(t,a,n){return e.createElement("span",{key:n},a.discount)}},{title:"发货地",render:function(t,a,n){return e.createElement("span",{key:n},a.area)}},{title:"低价次数",render:function(t,a,n){return e.createElement("span",{key:n},a.low_count,e.createElement("a",{href:"/index.html#/monitorLowPriceScreenshot/"+a.id+"/"+i.state.platform},"(低价截图)"))}}],c=[{title:"序号",render:function(t,a,n){return e.createElement("span",{key:n},n+1)}},{title:"商品信息",render:function(t,a,n){return e.createElement("span",{key:n},e.createElement("img",{style:{width:"50px",float:"left"},src:a.logopicurl,alt:""}),e.createElement("a",{href:a.itemlink,target:"_blank",style:{width:"150px",float:"left",marginLeft:"10px",overflow:"hidden"}},a.itemtitle))}},{title:"店铺名称",render:function(t,a,n){return e.createElement("span",{key:n},a.shopname)}},{title:"价格",render:function(t,a,n){return e.createElement("span",{key:n},"￥",a.itemprice)}},{title:"评价数",render:function(t,a,n){return e.createElement("span",{key:n},a.evaluate_num)}},{title:"优惠信息",render:function(t,a,n){return e.createElement("span",{key:n},a.discount)}},{title:"低价次数",render:function(t,a,n){return e.createElement("span",{key:n},a.low_count,e.createElement("a",{href:"/index.html#/monitorLowPriceScreenshot/"+a.id+"/"+i.state.platform},"(低价截图)"))}}],m=[{title:"序号",render:function(t,a,n){return e.createElement("span",{key:n},n+1)}},{title:"商品信息",render:function(t,a,n){return e.createElement("span",{key:n},e.createElement("img",{style:{width:"50px",float:"left"},src:a.logopicurl,alt:""}),e.createElement("a",{href:a.itemlink,target:"_blank",style:{width:"150px",float:"left",marginLeft:"10px",overflow:"hidden"}},a.itemtitle))}},{title:"店铺名称",render:function(t,a,n){return e.createElement("span",{key:n},a.shopname)}},{title:"拼单价",render:function(t,a,n){return e.createElement("span",{key:n},"￥",a.itemprice)}},{title:"已拼件数",render:function(t,a,n){return e.createElement("span",{key:n},a.salevolume)}},{title:"评价数",render:function(t,a,n){return e.createElement("span",{key:n},a.evaluate_num)}},{title:"低价次数",render:function(t,a,n){return e.createElement("span",{key:n},a.low_count,e.createElement("a",{href:"/index.html#/monitorLowPriceScreenshot/"+a.id+"/"+i.state.platform},"(低价截图)"))}}],u=[{title:"序号",render:function(t,a,n){return e.createElement("span",{key:n},n+1)}},{title:"商品信息",render:function(t,a,n){return e.createElement("span",{key:n},e.createElement("img",{style:{width:"50px",float:"left"},src:a.logopicurl,alt:""}),e.createElement("a",{href:a.itemlink,target:"_blank",style:{width:"150px",float:"left",marginLeft:"10px",overflow:"hidden"}},a.itemtitle))}},{title:"公司名称",render:function(t,a,n){return e.createElement("span",{key:n},a.shopname)}},{title:"价格",render:function(t,a,n){return e.createElement("span",{key:n},"￥",a.itemprice)}},{title:"30天成交数",render:function(t,a,n){return e.createElement("span",{key:n},a.salevolume)}},{title:"发货地",render:function(t,a,n){return e.createElement("span",{key:n},a.area)}},{title:"低价次数",render:function(t,a,n){return e.createElement("span",{key:n},a.low_count,e.createElement("a",{href:"/index.html#/monitorLowPriceScreenshot/"+a.id+"/"+i.state.platform},"(低价截图)"))}}],p=[{title:"序号",render:function(t,a,n){return e.createElement("span",{key:n},n+1)}},{title:"商品信息",render:function(t,a,n){return e.createElement("span",{key:n},e.createElement("img",{style:{width:"50px",float:"left"},src:a.logopicurl,alt:""}),e.createElement("a",{href:a.itemlink,target:"_blank",style:{width:"150px",float:"left",marginLeft:"10px",overflow:"hidden"}},a.itemtitle))}},{title:"旺旺名称",render:function(t,a,n){return e.createElement("span",{key:n},a.shopnick)}},{title:"价格",render:function(t,a,n){return e.createElement("span",{key:n},"￥",a.itemprice)}},{title:"所在地",render:function(t,a,n){return e.createElement("span",{key:n},a.area)}},{title:"低价次数",render:function(t,a,n){return e.createElement("span",{key:n},a.low_count,e.createElement("a",{href:"/index.html#/monitorLowPriceScreenshot/"+a.id+"/"+i.state.platform},"(低价截图)"))}}],d=[{title:"序号",render:function(t,a,n){return e.createElement("span",{key:n},n+1)}},{title:"商品信息",render:function(t,a,n){return e.createElement("span",{key:n},e.createElement("img",{style:{width:"50px",float:"left"},src:a.logopicurl,alt:""}),e.createElement("a",{href:a.itemlink,target:"_blank",style:{width:"150px",float:"left",marginLeft:"10px",overflow:"hidden"}},a.itemtitle))}},{title:"店铺名称",render:function(t,a,n){return e.createElement("span",{key:n},a.shopname)}},{title:"价格",render:function(t,a,n){return e.createElement("span",{key:n},"￥",a.itemprice)}},{title:"原价",render:function(t,a,n){return e.createElement("span",{key:n},a.original_price)}},{title:"折扣率",render:function(t,a,n){return e.createElement("span",{key:n},a.rebate)}},{title:"优惠信息",render:function(t,a,n){return e.createElement("span",{key:n},a.discount)}},{title:"低价次数",render:function(t,a,n){return e.createElement("span",{key:n},a.low_count,e.createElement("a",{href:"/index.html#/monitorLowPriceScreenshot/"+a.id+"/"+i.state.platform},"(低价截图)"))}}];return i.state=(s(r={pageSize:10,pageNo:1,totalNum:0,loading:!1,data:[],taobao_list:o,JD_list:c,PDD_list:m,BB_list:u,XY_list:p,wph_list:d,JKXX:"",TimeB:"",key_name:"",key_price:"",key_range:"",frequency:"",key_times:"",platform:"",keyword_id:"",createtime:""},"key_times",""),s(r,"value",[]),s(r,"values",[]),s(r,"keytime",""),r),i}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(a,e.Component),r(a,[{key:"componentDidMount",value:function(){var e=new Date,t=e.getFullYear()+"-"+(e.getMonth()+1)+"-"+e.getDate()+" "+e.getHours()+":"+e.getMinutes()+":"+e.getSeconds();this.HeaderList(t)}},{key:"render",value:function(){return e.createElement(i.default,{that:this})}}]),a}();t.default=c}).call(this,a(1),a(10))}}]);