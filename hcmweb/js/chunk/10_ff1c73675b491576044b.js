(window.webpackJsonp=window.webpackJsonp||[]).push([[10,264],{1075:function(e,t){},1076:function(e,t){},123:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}();t.AddIcon=function(t){function a(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(a.__proto__||Object.getPrototypeOf(a)).call(this,e))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(a,e.Component),n(a,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var t=this.props,n=t.style,a=t.className;return e.createElement("img",{className:a,style:n,src:"../../../../img/icon/add2.png"})}}]),a}()}).call(this,n(1))},28:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}();var a=function(t){function a(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(a.__proto__||Object.getPrototypeOf(a)).call(this,e))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(a,e.Component),n(a,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return e.createElement("div",{className:this.props.clazzName?this.props.clazzName:"Copyright"},"Copyright © 杭州久点网络技术有限公司")}}]),a}();t.default=a}).call(this,n(1))},29:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var a=r(n(48));n(47);var l=r(n(28));function r(e){return e&&e.__esModule?e:{default:e}}n(1075);var i=function(t){return e.createElement("div",{className:"layout-wrapper "+(t.className||"")},e.createElement("div",{className:"header-wrapper"},e.createElement(a.default,{className:"breadcrumb"},t.breadcrumbList.map(function(n,l){return""===t.linkList[l]?e.createElement(a.default.Item,{key:n},n):e.createElement(a.default.Item,{href:"javascript:;",key:n},e.createElement("span",{onClick:function(){t.history.go(-t.linkList[l])}},n))}))),e.createElement("div",{className:"layout-content"},t.children),e.createElement("div",{className:"copyright"},e.createElement(l.default,null)))};i.defaultProps={title:"标题",breadcrumbList:[],linkList:[]},t.default=i}).call(this,n(1))},602:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var a=u(n(38)),l=u(n(14)),r=u(n(25)),i=u(n(23)),o=u(n(30));n(37),n(18),n(24),n(22),n(32),n(760);var c=u(n(15)),s=u(n(29)),m=n(123);function u(e){return e&&e.__esModule?e:{default:e}}var p=(0,c.default)(function(t){var n=o.default.Option,c=i.default.Item,u=t.props.form.getFieldDecorator,p=r.default.Search,f={display:t.state.WangWAN?"block":"none",float:"left",marginLeft:"26px"},g=t.props.brandList.filter(function(e){return"APPROVED"===e.apply_status}),d=g?g.map(function(t,a){return e.createElement(n,{key:t.bmcid},t.companyname)}):"";return e.createElement(s.default,{breadcrumbList:["店铺管理"],linkList:[""],history:t.props.history},e.createElement("div",{className:"StoreManagement"},e.createElement("div",{className:"StoreManagementBOX"},e.createElement("div",{className:"StoreManagementtit"},e.createElement("div",{className:"DIV"},e.createElement(l.default,{type:"primary",onClick:function(){return t.addStore()}},e.createElement(m.AddIcon,{style:{paddingRight:"8px"}}),"新增"),e.createElement(p,{className:"SEAR",placeholder:"请输入店铺或旺旺名",onSearch:function(e){return t.SearchFun(e)},style:{width:215,fontSize:"12px"}}))),e.createElement("div",{className:"StoreManagementTXT"},t.state.StoreManagement_list?e.createElement("ul",null,t.state.StoreManagement_list.map(function(n,a){return e.createElement("li",{key:a,className:"StoreManagementLI"},e.createElement("span",{className:"StoreManagementLeft"},"淘宝网"==n.platform_name?e.createElement("h4",null,n.shop_name," ",n.wangwang?e.createElement("span",null,"（",n.wangwang,"）",e.createElement("img",{src:"../../../../img/icon/Taobao.png",alt:""})," "):e.createElement("img",{src:"../../../../img/icon/Taobao.png",alt:""})):"天猫商城"==n.platform_name?e.createElement("h4",null,n.shop_name," ",n.wangwang?e.createElement("span",null,"（",n.wangwang,"）",e.createElement("img",{src:"../../../../img/icon/Tmall.png",alt:""})):e.createElement("img",{src:"../../../../img/icon/Tmall.png",alt:""})):"京东商城"==n.platform_name?e.createElement("h4",null,n.shop_name," ",n.wangwang?e.createElement("span",null,"（",n.wangwang,"）",e.createElement("img",{src:"../../../../img/icon/jd.png",alt:""})):e.createElement("img",{src:"../../../../img/icon/jd.png",alt:""})):"苏宁易购"==n.platform_name?e.createElement("h4",null,n.shop_name," ",n.wangwang?e.createElement("span",null,"（",n.wangwang,"）",e.createElement("img",{src:"../../../../img/icon/suning.png",alt:""})):e.createElement("img",{src:"../../../../img/icon/suning.png",alt:""})):"国美在线"==n.platform_name?e.createElement("h4",null,n.shop_name," ",n.wangwang?e.createElement("span",null,"（",n.wangwang,"）",e.createElement("img",{src:"../../../../img/icon/gome.png",alt:""})):e.createElement("img",{src:"../../../../img/icon/gome.png",alt:""})):"拼多多"==n.platform_name?e.createElement("h4",null,n.shop_name," ",n.wangwang?e.createElement("span",null,"（",n.wangwang,"）",e.createElement("img",{src:"../../../../img/icon/pinduoduo.png",alt:""})):e.createElement("img",{src:"../../../../img/icon/pinduoduo.png",alt:""})):"亚马逊"==n.platform_name?e.createElement("h4",null,n.shop_name," ",n.wangwang?e.createElement("span",null,"（",n.wangwang,"）",e.createElement("img",{src:"../../../../img/icon/amazon.png",alt:""})):e.createElement("img",{src:"../../../../img/icon/amazon.png",alt:""})):"唯品会"==n.platform_name?e.createElement("h4",null,n.shop_name," ",n.wangwang?e.createElement("span",null,"（",n.wangwang,"）",e.createElement("img",{src:"../../../../img/icon/vipn.png",alt:""})):e.createElement("img",{src:"../../../../img/icon/vipn.png",alt:""})):"1688"==n.platform_name?e.createElement("h4",null,n.shop_name," ",n.wangwang?e.createElement("span",null,"（",n.wangwang,"）",e.createElement("img",{src:"../../../../img/icon/1688.png",alt:""})):e.createElement("img",{src:"../../../../img/icon/1688.png",alt:""})):"速卖通"==n.platform_name?e.createElement("h4",null,n.shop_name," ",n.wangwang?e.createElement("span",null,"（",n.wangwang,"）",e.createElement("img",{src:"../../../../img/icon/aliexpress.png",alt:""})):e.createElement("img",{src:"../../../../img/icon/aliexpress.png",alt:""})):e.createElement("h4",null,n.shop_name," ",n.wangwang?e.createElement("span",null,"（",n.wangwang,"）"):null),e.createElement("span",{className:"StoreManagementContent"},e.createElement("span",{style:{flex:"2"}},n.platform_name,"  ：",e.createElement("a",{href:n.shop_url.replace(/\%2B/g,"+").replace(/\%26/g,"&").replace(/\%27/g,"="),target:"_blank",style:{overflow:"hidden",display:"inline-block",width:"200px",height:"13px"}},n.shop_url)),e.createElement("span",{style:{flex:"1"}},"店铺类型：",n.shop_type)),e.createElement("p",null,"授权品牌方：",n.bmcShopList.map(function(t,n){return e.createElement("span",{key:n},t.bmcname)}))),e.createElement("span",{className:"StoreManagementRight"},e.createElement(l.default,{onClick:function(){return t.BJStore(n)}},"编辑"),e.createElement(l.default,{className:"btn3-main",id:n.id,onClick:t.DeleList},"删除")))})):null),e.createElement(a.default,{title:t.state.type,visible:t.state.visible,footer:null,maskClosable:!1,confirmLoading:t.state.confirmLoading,onCancel:function(){return t.handleCancel()}},e.createElement(i.default,{onSubmit:t.ForgetSubmit,className:"forget-form",style:{display:"inline-block",width:"100%",paddingLeft:20}},t.state.StoreManagement?e.createElement("div",{className:"FORMtit",style:{float:"left",marginLeft:"56px"}}," ",e.createElement("div",{className:"FORMus",style:{width:"auto",float:"left",lineHeight:"40px"}}," ",e.createElement("b",{style:{fontSize:"14px",color:"red"}},"*")," ",e.createElement("b",null,"平台：")),e.createElement(c,{className:"tops",style:{width:"320px",height:"40px",float:"left",borderRadius:"2px"}},u("FieldName",{initialValue:{key:t.state.FieldID,label:t.state.FieldName}})(e.createElement(o.default,{labelInValue:!0,showSearch:!0,initialValue:{key:"lucy",value:"a"},style:{width:320},placeholder:"请选择平台",optionFilterProp:"children",onChange:t.handleChange,filterOption:function(e,t){return(void 0).option.props.children.toLowerCase().indexOf(e.toLowerCase())>=0}},t.state.childrenx)))):null,e.createElement("div",{className:"FORMtit",style:{float:"left",marginLeft:"26px"}}," ",e.createElement("div",{className:"FORMus",style:{width:"auto",float:"left",lineHeight:"40px"}},e.createElement("b",{style:{fontSize:"14px",color:"red"}},"*")," ",e.createElement("b",null,"店铺名称：")),e.createElement(c,{className:"tops",style:{width:"320px",height:"40px",float:"left",borderRadius:"2px"}},u("shop_name",{initialValue:t.state.shop_name||""})(e.createElement(r.default,{className:"user-name",maxLength:"50",placeholder:"请输入店铺名称"})))),e.createElement("div",{className:"FORMtit",style:f},e.createElement("div",{className:"FORMus",style:{width:"auto",float:"left",lineHeight:"40px"}},e.createElement("b",{style:{fontSize:"14px",color:"red"}},"*")," ",e.createElement("b",null,"旺旺名称：")),e.createElement(c,{className:"tops",style:{width:"320px",height:"40px",float:"left",borderRadius:"2px"}},u("wangwang",{initialValue:t.state.wangwang||""})(e.createElement(r.default,{className:"user-name",maxLength:"50",placeholder:"请输入旺旺名称"})))),e.createElement("div",{className:"FORMtit",style:{float:"left"}}," ",e.createElement("div",{className:"FORMus",style:{width:"auto",float:"left",lineHeight:"40px"}},e.createElement("b",{style:{fontSize:"14px",color:"red"}},"*")," ",e.createElement("b",null,"店铺首页地址：")),e.createElement(c,{className:"tops",style:{width:"320px",height:"40px",float:"left",borderRadius:"2px"}},u("shop_url",{initialValue:t.state.shop_url||""})(e.createElement(r.default,{className:"user-name",maxLength:"500",placeholder:"请输入店铺地址"})))),e.createElement("div",{className:"FORMtit",style:{float:"left",marginLeft:"26px"}}," ",e.createElement("div",{className:"FORMus",style:{width:"auto",float:"left",lineHeight:"40px"}},e.createElement("b",{style:{fontSize:"14px",color:"red"}},"*")," ",e.createElement("b",null,"店铺类型：")),e.createElement(c,{className:"tops",style:{width:"320px",height:"40px",float:"left",borderRadius:"2px"}},u("shop_type",{initialValue:t.state.shop_type||""})(e.createElement(o.default,{showSearch:!0,style:{width:320},placeholder:"请选择店铺类型",optionFilterProp:"children",filterOption:function(e,t){return(void 0).option.props.children.toLowerCase().indexOf(e.toLowerCase())>=0}},e.createElement(n,{value:"自营店铺"},"自营店铺"),e.createElement(n,{value:"分销店铺"},"分销店铺"))))),e.createElement("div",{className:"FORMtit",style:{float:"left",marginLeft:"15px"}}," ",e.createElement("div",{className:"FORMus",style:{width:"auto",float:"left",lineHeight:"40px"}},e.createElement("b",{style:{fontSize:"14px",color:"red"}},"*")," ",e.createElement("b",null,"授权品牌方：")),e.createElement(c,{className:"tops",style:{width:"320px",height:"40px",float:"left",borderRadius:"2px"}},u("mcids",{initialValue:t.state.bmcShopList.map(function(e,t){return e.bmcid})})(e.createElement(o.default,{mode:"multiple",style:{width:"100%"},placeholder:"请选择授权品牌方",onChange:t.handleChangesx,onFocus:t.onFocusChang},d)))),e.createElement("div",{className:"FORMtit ",style:{float:"left",width:"100%",textAlign:"right",paddingRight:"22px"}},e.createElement(l.default,{className:"btn2-main",style:{marginRight:"20px"},htmlType:"submit"},"确认"),e.createElement(l.default,{className:"btn2-sub",onClick:function(){return t.handleCancel()}},"取消")))))))});t.default=p}).call(this,n(1))},760:function(e,t){}}]);