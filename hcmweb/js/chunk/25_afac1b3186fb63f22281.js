(window.webpackJsonp=window.webpackJsonp||[]).push([[25,26],{1076:function(e,t){},1077:function(e,t){},1078:function(e,t){},1079:function(e,t){},1080:function(e,t){},1081:function(e,t){},1085:function(e,t){},1087:function(e,t){},123:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}();t.AddIcon=function(t){function a(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(a.__proto__||Object.getPrototypeOf(a)).call(this,e))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(a,e.Component),n(a,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var t=this.props,n=t.style,a=t.className;return e.createElement("img",{className:a,style:n,src:"../../../../img/icon/add2.png"})}}]),a}()}).call(this,n(1))},28:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}();var a=function(t){function a(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(a.__proto__||Object.getPrototypeOf(a)).call(this,e))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(a,e.Component),n(a,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return e.createElement("div",{className:this.props.clazzName?this.props.clazzName:"Copyright"},"Copyright © 杭州久点网络技术有限公司")}}]),a}();t.default=a}).call(this,n(1))},512:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var a=g(n(38)),l=g(n(45)),o=g(n(43)),r=g(n(92)),i=g(n(14)),c=g(n(48)),u=g(n(125)),s=g(n(25)),f=g(n(23)),m=g(n(30));n(37),n(51),n(42),n(93),n(18),n(47),n(144),n(24),n(22),n(32);var d=g(n(15)),p=g(n(28)),h=n(123);function g(e){return e&&e.__esModule?e:{default:e}}m.default.Option;var y=f.default.Item,E=s.default.Search,b=u.default.TabPane,v=(0,d.default)(function(t){var n=t.state,a=n.pageNo,s=n.pageSize,f=n.totalNum,m=n.checkAll,d=n.platform,g=n.title,y=n.selectedRowKeys,v=n.dataList,k={selectedRowKeys:y,onChange:function(e){return t.onTableCheckChange(e)}};return e.createElement("div",{className:"ComplaintsAccount"},e.createElement("div",{className:"Breadcrumb"},e.createElement(c.default,null,e.createElement(c.default.Item,null,"用户管理"),e.createElement(c.default.Item,null,"投诉账号管理"))),e.createElement("div",{className:"content"},e.createElement(u.default,{style:{display:"flex",flexDirection:"column"},activeKey:d,onChange:t.changeTabs},e.createElement(b,{tab:"阿里投诉账号",key:"ALIBABA"},e.createElement("div",{className:"list-box"},e.createElement("div",null,e.createElement("div",{style:{display:"flex",justifyContent:"space-between"}},e.createElement("div",null,e.createElement(i.default,{className:" btn1-main",onClick:function(){return t.onAddBoxFrom(!0)},style:{marginRight:"10px",color:"#fff"}},e.createElement(h.AddIcon,{style:{paddingRight:"8px"}}),"新增"),e.createElement(i.default,{onClick:function(){return t.allStopStart()},style:{marginRight:"10px"}},"批量删除")),e.createElement(E,{placeholder:"请输入",value:g,onSearch:t.onSearch,onChange:t.searchChange,style:{width:250}})),e.createElement("div",{style:{padding:"10px 0px"}},e.createElement(r.default,{message:e.createElement("div",null,"共 ",e.createElement("a",null,f)," 项，已选择 ",e.createElement("a",null,m?f:y.length)," 项 ",e.createElement("a",{onClick:function(){return t.checkAll(!0)}},"勾选全部"),"/",e.createElement("a",{onClick:function(){return t.checkAll(!1)}},"取消勾选")),type:"info",showIcon:!0})),e.createElement(o.default,{rowKey:"id",pagination:!1,rowSelection:k,columns:t.formatColumn(),dataSource:v})),e.createElement("div",{className:"footer"},e.createElement("div",{className:"info"},"共 "+f+" 条记录 ","  ","第  "+a+"  / "+Math.ceil(f/s)+" 页"),e.createElement(l.default,{pageSize:s,current:a,total:f,onChange:t.changePagination,onShowSizeChange:t.onPaginationSize,showSizeChanger:!0,showQuickJumper:!0})))),e.createElement(b,{tab:"京东投诉账号",key:"JINGDONG"},e.createElement("div",{className:"list-box"},e.createElement("div",null,e.createElement("div",{style:{display:"flex",justifyContent:"space-between"}},e.createElement("div",null,e.createElement(i.default,{className:" btn1-main",onClick:function(){return t.onAddBoxFrom(!0)},style:{marginRight:"10px"}},"新增"),e.createElement(i.default,{onClick:function(){return t.allStopStart()},style:{marginRight:"10px"}},"批量删除")),e.createElement(E,{placeholder:"请输入",value:g,onSearch:t.onSearch,onChange:t.searchChange,style:{width:250}})),e.createElement("div",{style:{padding:"10px 0px"}},e.createElement(r.default,{message:e.createElement("div",null,"共 ",e.createElement("a",null,f)," 项，已选择 ",e.createElement("a",null,m?f:y.length)," 项 ",e.createElement("a",{onClick:function(){return t.checkAll(!0)}},"勾选全部"),"/",e.createElement("a",{onClick:function(){return t.checkAll(!1)}},"取消勾选")),type:"info",showIcon:!0})),e.createElement(o.default,{rowKey:"id",pagination:!1,rowSelection:k,columns:t.formatColumn(),dataSource:v})),e.createElement("div",{className:"footer"},e.createElement("div",{className:"info"},"共 "+f+" 条记录 ","  ","第  "+a+"  / "+Math.ceil(f/s)+" 页"),e.createElement(l.default,{pageSize:s,current:a,total:f,onChange:t.changePagination,onShowSizeChange:t.onPaginationSize,showSizeChanger:!0,showQuickJumper:!0})))))),e.createElement(w,{that:t}),e.createElement(p.default,{clazzName:"copyright"}))});t.default=v;var w=f.default.create()(function(t){var n=t.form,l=n.getFieldDecorator,o=n.resetFields,r=n.validateFields,i=t.that,c=i.state,u=i.onAddBoxFrom,m=i.onSubmit,d=function(e){e.preventDefault(),r(function(e,t){e||m(t,o)})};return e.createElement(a.default,{maskClosable:!1,title:c.targetData.id?"编辑":"新增",onCancel:function(e){e.preventDefault(),o(),u(!1)},visible:c.actionVisible,onOk:d,className:"YellowWhite"},e.createElement(f.default,{onSubmit:d},e.createElement(y,{label:e.createElement("span",null,"名称"),labelCol:{span:7},wrapperCol:{span:12}},l("title",{initialValue:c.targetData.title,rules:[{required:!0,message:"请输入名称"}]})(e.createElement(s.default,{placeholder:"请输入名称，并保持在25个字以内",maxLength:25}))),e.createElement(y,{label:e.createElement("span",null,"账号"),labelCol:{span:7},wrapperCol:{span:12}},l("username",{initialValue:c.targetData.username,rules:[{required:!0,message:"请输入账号"}]})(e.createElement(s.default,{placeholder:"请输入",maxLength:45}))),e.createElement(y,{label:e.createElement("span",null,"密码"),labelCol:{span:7},wrapperCol:{span:12}},l("password",{initialValue:c.targetData.password,rules:[{required:!0,message:"请输入密码"}]})(e.createElement(s.default,{placeholder:"请输入",maxLength:45}))),e.createElement(y,{label:e.createElement("span",null,"ALIBABA"==c.platform?"淘宝Cookie":"京东Cookie"),labelCol:{span:7},wrapperCol:{span:12}},l("cookie",{initialValue:c.targetData.cookie,rules:[{required:!0,message:"请输入淘宝Cookie"}]})(e.createElement(s.default,{placeholder:"请输入"}))),"ALIBABA"==c.platform?e.createElement(y,{label:e.createElement("span",null,"1688Cookie"),labelCol:{span:7},wrapperCol:{span:12}},l("cookie1688",{initialValue:c.targetData.cookie1688})(e.createElement(s.default,{placeholder:"请输入"}))):null))})}).call(this,n(1))},772:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var a=c(n(19)),l=c(n(38)),o=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}();n(20),n(37);var r=c(n(512)),i=c(n(13));c(n(69));function c(e){return e&&e.__esModule?e:{default:e}}var u=l.default.confirm,s=function(t){function n(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n);var l=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(n.__proto__||Object.getPrototypeOf(n)).call(this,t));return l.onAddBoxFrom=function(e){e?l.setState({actionVisible:e}):l.setState({actionVisible:e,targetData:{}})},l.changeTabs=function(e){l.setState({platform:e,pageNo:1,pageSize:10,selectedRowKeys:[],title:null,targetData:{}},function(){l.getList()})},l.onSearch=function(){l.setState({pageNo:1,pageSize:10,selectedRowKeys:[],targetData:{}},function(){l.getList()})},l.searchChange=function(e){l.setState({title:e.target.value})},l.onSubmit=function(e,t){e.platform=l.state.platform,e.id=l.state.targetData.id,i.default.post("/hcm/complaiont/save",e).then(function(e){"10000"==e.data.status?(l.getList(),t(),l.onAddBoxFrom(!1),a.default.success(e.data.message)):a.default.error(e.data.message)})},l.getList=function(){var e=l.state,t=e.pageNo,n=e.pageSize,o=e.platform,r=e.title;i.default.get("/hcm/complaiont/getPage",{params:{title:r,platform:o,pageNo:t,pageSize:n}}).then(function(e){l.setState({dataList:e.data.data.content,pageNo:e.data.data.pageNumber,pageSize:e.data.data.pageSize,totalNum:e.data.data.totalElements,checkAll:!1,oldTitle:r,selectedRowKeys:[]})}).catch(function(e){a.default.error(e.statusText)})},l.onTableCheckChange=function(e){l.setState({selectedRowKeys:e,checkAll:!1})},l.changePagination=function(e,t){l.setState({pageNo:e,pageSize:t},function(){l.getList()})},l.onPaginationSize=function(e,t){l.setState({pageNo:1,pageSize:t},function(){l.getList()})},l.formatColumn=function(){var t=[{title:"No",dataIndex:"index",width:"80px",key:"index",render:function(t,n,a){return e.createElement("div",{style:{width:"40px"}},a+1)}},{title:"名称",dataIndex:"title",key:"title"},{title:"账号",dataIndex:"username",key:"username"},{title:"淘宝Cookie",dataIndex:"cookie",key:"cookie",render:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";arguments[1],arguments[2];return e.createElement("div",null,t?t.substring(0,20):null,t&&t.length>=20?"...":null)}},{title:"1688Cookie",dataIndex:"cookie1688",key:"cookie1688",render:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";arguments[1],arguments[2];return e.createElement("div",null,t?t.substring(0,20):null,t&&t.length>=20?"...":null)}},{title:"操作",dataIndex:"action",key:"action",align:"right",render:function(t,n,a){return e.createElement(e.Fragment,null,e.createElement("a",{style:{marginRight:"20px"},onClick:function(){return l.editItem(n)}},"编辑"),e.createElement("a",{onClick:function(){return l.rmItem(n)}},"删除"))}}];return"JINGDONG"==l.state.platform&&(t.splice(4,1),t[3].title="京东Cookie"),t},l.editItem=function(e){l.setState({targetData:e},function(){l.onAddBoxFrom(!0)})},l.rmItem=function(t){var n=l,o=l.state.platform;u({title:null,className:"alert-item-confirm YellowWhite",content:e.createElement("div",null,e.createElement("div",{className:"tips"},"提示"),e.createElement("div",{className:"pline"}),e.createElement("p",{className:"Dtitle"},"你确认要删除这一项吗?"),e.createElement("p",null,"删除后",e.createElement("span",{className:"red"},"将无法恢复!"))),okText:"确定",cancelText:"取消",onOk:function(){i.default.post("/hcm/complaiont/delete",{ids:t.id,platform:o}).then(function(e){"10000"==e.data.status?(n.changeTabs(o),a.default.success(e.data.message)):a.default.error(e.data.message)}).catch(function(e){a.default.error(e.statusText)})}})},l.allStopStart=function(){var t=l.state,n=t.selectedRowKeys,o=t.totalNum,r=t.checkAll,c=t.oldTitle,s=t.platform,f=l;0!=n.length?u({title:null,className:"alert-item-confirm YellowWhite",content:e.createElement("div",null,e.createElement("div",{className:"tips"},"提示"),e.createElement("div",{className:"pline"}),e.createElement("p",{className:"Dtitle"},"你确认要删除",r?o:n.length,"项吗")),okText:"确定",cancelText:"取消",onOk:function(){i.default.post("/hcm/complaiont/delete",{ids:r?"checkAll":n.join(","),title:c,platform:s}).then(function(e){"10000"==e.data.status?(f.changeTabs(s),a.default.success(e.data.message)):a.default.error(e.data.message)}).catch(function(e){a.default.error(e.statusText)})}}):a.default.warning("至少选择一项")},l.checkAll=function(e){var t=l.state.selectedRowKeys;e?l.state.dataList.forEach(function(e,n){t.push(e.id)}):t=[],l.setState({checkAll:e,selectedRowKeys:t})},l.state={platform:"ALIBABA",title:null,dataList:[],pageNo:1,pageSize:10,totalNum:0,checkAll:!1,targetData:{},selectedRowKeys:[],actionVisible:!1},l}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(n,e.Component),o(n,[{key:"componentDidMount",value:function(){this.getList()}},{key:"render",value:function(){return e.createElement(r.default,{that:this})}}]),n}();t.default=s}).call(this,n(1))}}]);