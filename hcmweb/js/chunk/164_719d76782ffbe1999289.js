(window.webpackJsonp=window.webpackJsonp||[]).push([[164,165],{1075:function(e,t){},1076:function(e,t){},1082:function(e,t){},1083:function(e,t){},1084:function(e,t){},1085:function(e,t){},1086:function(e,t){},1088:function(e,t){},1089:function(e,t){},1099:function(e,t){},124:function(e,t,n){"use strict";(function(e,a){Object.defineProperty(t,"__esModule",{value:!0}),t.ImgModal=void 0;var r=function(e){return e&&e.__esModule?e:{default:e}}(n(11)),l=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}();n(26),n(1088);var o=function(t){function n(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n);var t=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(n.__proto__||Object.getPrototypeOf(n)).call(this,e));return t.state={index:t.props.index,rotate:0,size:1},t}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(n,e.Component),l(n,[{key:"componentDidMount",value:function(){}},{key:"onSwitch",value:function(e){var t=this.state,n=t.index,a=(t.rotate,t.size,this.props.urls);e?n==a.length-1?n=0:n++:n<=0?n=a.length-1:n--,this.setState({index:n,rotate:0,size:1})}},{key:"onSize",value:function(e){var t=this.state.size;e?t+=.5:t=t<=.5?.5:t-.5,this.setState({size:t})}},{key:"onRotate",value:function(e){var t=this.state.rotate;e?t+=90:t-=90,this.setState({rotate:t})}},{key:"colse",value:function(){a.unmountComponentAtNode(document.getElementById("ImgModal")),document.getElementsByTagName("body")[0].removeChild(document.getElementById("ImgModal"))}},{key:"render",value:function(){var t=this,n=this.props,a=n.urls,l=void 0===a?[]:a,o=n.close,s=void 0!==o&&o,c=this.state,i=c.index,u=void 0===i?0:i,d=c.rotate,f=c.size,m=document.createElement("img");m.src=l[u];var p=m.naturalWidth?m.naturalWidth:400;m.naturalHeight&&m.naturalHeight;return console.log(p),e.createElement("div",{className:"flexbox"},e.createElement("div",{className:"imgbox"},s?e.createElement(r.default,{className:"close",onClick:function(){return t.colse()},type:"close-circle"}):null,e.createElement("div",{className:"box"},e.createElement("img",{style:{width:f*(p>500?.7*p:p)+"px",transform:"rotate("+d+"deg)"},src:l[u]})),e.createElement("div",{className:"buts"},e.createElement(r.default,{onClick:function(){return t.onSwitch(!1)},type:"left"}),e.createElement(r.default,{onClick:function(){return t.onSwitch(!0)},type:"right"}),e.createElement(r.default,{onClick:function(){return t.onSize(!0)},type:"plus"}),e.createElement(r.default,{onClick:function(){return t.onSize(!1)},type:"minus"}),e.createElement(r.default,{onClick:function(){return t.onRotate(!1)},className:"left",type:"reload"}),e.createElement(r.default,{onClick:function(){return t.onRotate(!0)},className:"right",type:"reload"})),e.createElement("div",{style:{textAlign:"center",fontSize:"12px"}},e.createElement("a",{target:"_blank",href:l[u]},"查看原图"))))}}]),n}();t.ImgModal=function(t){var n=t.bl,r=void 0!==n&&n,l=(t.urls,document.createElement("div"));l.setAttribute("id","ImgModal"),r?(document.body.appendChild(l),a.render(e.createElement(o,t),document.getElementById("ImgModal"))):(a.unmountComponentAtNode(document.getElementById("ImgModal")),document.getElementsByTagName("body")[0].removeChild(document.getElementById("ImgModal")))}}).call(this,n(1),n(12))},28:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}();var a=function(t){function a(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(a.__proto__||Object.getPrototypeOf(a)).call(this,e))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(a,e.Component),n(a,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return e.createElement("div",{className:this.props.clazzName?this.props.clazzName:"Copyright"},"Copyright © 杭州久点网络技术有限公司")}}]),a}();t.default=a}).call(this,n(1))},29:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var a=l(n(48));n(47);var r=l(n(28));function l(e){return e&&e.__esModule?e:{default:e}}n(1075);var o=function(t){return e.createElement("div",{className:"layout-wrapper "+(t.className||"")},e.createElement("div",{className:"header-wrapper"},e.createElement(a.default,{className:"breadcrumb"},t.breadcrumbList.map(function(n,r){return""===t.linkList[r]?e.createElement(a.default.Item,{key:n},n):e.createElement(a.default.Item,{href:"javascript:;",key:n},e.createElement("span",{onClick:function(){t.history.go(-t.linkList[r])}},n))}))),e.createElement("div",{className:"layout-content"},t.children),e.createElement("div",{className:"copyright"},e.createElement(r.default,null)))};o.defaultProps={title:"标题",breadcrumbList:[],linkList:[]},t.default=o}).call(this,n(1))},575:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var a=g(n(125)),r=g(n(57)),l=g(n(14)),o=g(n(25)),s=g(n(91)),c=g(n(101)),i=g(n(168)),u=g(n(40)),d=g(n(35)),f=g(n(350)),m=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e};n(144),n(56),n(18),n(24),n(90),n(102),n(187),n(49),n(50),n(349);var p=g(n(15)),h=(g(n(28)),g(n(29))),y=g(n(10));function g(e){return e&&e.__esModule?e:{default:e}}var b=(0,p.default)(function(t){var n=t.state,p=n.counts,g=n.details,b=void 0===g?[]:g,v=n.inspectResultBtn,E=n.currentDate,_=function(n){var a=n.flag,r=n.index,l=void 0===r?0:r,o=n._index,s=JSON.parse(t.state.details[o][a]);return e.createElement(f.default,{action:"/hcm/hcmWorkOrder/headImgUpload",onChange:t.handleUploadChange.bind(t,a,l,o),showUploadList:!1,accept:"image/*",beforeUpload:t.handleBeforeUpload},s.length&&s[l]?e.createElement("img",{src:s[l],style:{width:"72px",height:"72px",marginLeft:"11px"}}):e.createElement("div",{className:"upload-icon"}))};return e.createElement(h.default,{breadcrumbList:["活动稽查"],linkList:[""]},e.createElement("div",{className:"service-activity-inspect-detail"},e.createElement("main",null,e.createElement("section",{className:"condition-wrapper"},e.createElement("div",{className:"date"},"活动日期：",e.createElement(r.default,{style:{width:"242px"},onChange:t.handleTimeChange,format:"YYYY-MM-DD",defaultValue:(0,y.default)()})),e.createElement(a.default,{defaultActiveKey:"1",className:"custom-tab",onChange:t.handleTabChange},e.createElement(a.default.TabPane,{tab:"全部（"+(p.act_count+p.reject_count||0)+"）",key:"1"}),e.createElement(a.default.TabPane,{tab:"待稽查（"+(p.act_count||0)+"）",key:"2"}),e.createElement(a.default.TabPane,{tab:"已稽查（"+(p.reject_count||0)+"）",key:"3"}))),b.length?b.map(function(n,a){return function(n){var a=n.shop_name,r=n.start_time,f=n.end_time,m=n.product_name,p=n.product_url,h=n.apply_price,g=n.campaign_type,b=n.gift_situation,w=n.actual_price,k=n.play_content,C=n.system_review,I=n.id,x=n.inspect_id,N=n.system_review_explain,O=n.screenshot_b,M=n.screenshot_c,j=n.screenshot_o,S=n._isShowInspectForm,D=n._index,Y=n.brand_review_username,P=n.brand_review_view,B=n.brand_review,T=JSON.parse(O),R=JSON.parse(M),z=JSON.parse(j),L={width:"72px",height:"72px",marginLeft:"11px",cursor:"pointer"};return e.createElement("section",{className:"inspect-item-wrapper",key:I},e.createElement(u.default,{className:"head"},e.createElement(d.default,{span:12,className:"text-overflow-hidden"},"店铺名称：",a),e.createElement(d.default,{span:12},"活动时间：",(0,y.default)(r).format("YYYY-MM-DD HH:mm:ss")+" ~ "+(0,y.default)(f).format("YYYY-MM-DD HH:mm:ss"))),e.createElement(s.default,{className:"card",title:e.createElement(u.default,{className:"card-title"},e.createElement(d.default,{span:12,className:"text-overflow-hidden"},"产品信息：",m),e.createElement(d.default,{span:12,className:"text-overflow-hidden"},"商品链接：",e.createElement("a",{href:p,target:"_blank"},p)))},e.createElement(u.default,{className:"baseinfo"},e.createElement(d.default,{span:8},"活动标价：",h),e.createElement(d.default,{span:8,className:"text-overflow-hidden"},"活动类型：",g),e.createElement(d.default,{span:8,className:"text-overflow-hidden"},"赠品情况：",b),e.createElement(d.default,{span:8},"实际成交价：",w),e.createElement(d.default,{span:8,className:"text-overflow-hidden"},"玩法说明：",k)),e.createElement(u.default,{style:{marginTop:"20px"}},e.createElement(d.default,{span:8},"稽查结果：",B?e.createElement(i.default,{color:"合格"===B?"green":"red"},B):""),e.createElement(d.default,{span:8},"稽查人：",Y),e.createElement(d.default,{span:8},"稽查意见：",P)),S?e.createElement(e.Fragment,null,e.createElement(c.default,{dashed:!0}),e.createElement(u.default,{className:"upload-wrapper"},e.createElement(d.default,{span:8},"标价截图：",_({flag:"screenshot_b",_index:D})),e.createElement(d.default,{span:8},"成交价截图：",_({flag:"screenshot_c",_index:D})),e.createElement(d.default,{span:8},"其他截图：",_({flag:"screenshot_o",index:0,_index:D}),_({flag:"screenshot_o",index:1,_index:D}),_({flag:"screenshot_o",index:2,_index:D})))):null,C?e.createElement(e.Fragment,null,e.createElement(c.default,{dashed:!0}),e.createElement(u.default,{className:"screenshot"},e.createElement(d.default,{span:8,style:{display:"flex"}},"标价截图：",T.map(function(n,a){return e.createElement("img",{onClick:t.handleImgShotClick.bind(t,{bl:!0,close:!0,urls:T,index:a}),src:n,key:n,style:L})})),e.createElement(d.default,{span:8,style:{display:"flex"}},"成交价截图：",R.map(function(n,a){return e.createElement("img",{onClick:t.handleImgShotClick.bind(t,{bl:!0,close:!0,urls:R,index:a}),src:n,key:n,style:L})})),e.createElement(d.default,{span:8,style:{display:"flex"}},"其他截图：",z.map(function(n,a){return n?e.createElement("img",{onClick:t.handleImgShotClick.bind(t,{bl:!0,close:!0,urls:z,index:a}),src:n,key:n,style:L}):null}))),e.createElement(c.default,{dashed:!0}),e.createElement(u.default,null,e.createElement(d.default,{span:8},"稽查结果：",e.createElement(i.default,{color:"合格"===C?"green":"red"},C)),e.createElement(d.default,{span:8},"结果说明：",N))):null),S?e.createElement(u.default,{className:"inspect-form"},e.createElement(d.default,{span:8},"稽查结果：",e.createElement("button",{className:0===v[D]?"qualify customeBtn":"customeBtn",onClick:t.inspectOptionResultClick.bind(void 0,"合格",D)},"合格"),"  ",e.createElement("button",{className:1===v[D]?"disQualify customeBtn":"customeBtn",onClick:t.inspectOptionResultClick.bind(void 0,"不合格",D)},"不合格")),e.createElement(d.default,{span:8},"结果说明：",e.createElement(o.default,{placeholder:"请输入",style:{width:"242px"},onChange:t.handleInputReview.bind(t,D)})),e.createElement(d.default,{span:8,style:{textAlign:"right"}},e.createElement(l.default,{type:"primary",style:{backgroundColor:"#cfa972",borderColor:"#cfa972"},onClick:t.handleConfirmBtnClick.bind(t,{cam_pro_id:I,id:x},D)},"确认"),"  ",e.createElement(l.default,{onClick:t.handleInspectBtnClick.bind(t,!1,D)},"取消"))):null,!B&&!C&&!S&&(0,y.default)().format("YYYY-MM-DD")===(0,y.default)(E).format("YYYY-MM-DD")&&Date.now()>r&&Date.now()<f?e.createElement("div",{className:"inspect-btn"},e.createElement(l.default,{type:"primary",style:{backgroundColor:"#f00",borderColor:"#f00"},onClick:t.handleInspectBtnClick.bind(t,!0,D)},"稽查")):null)}(m({},n,{_index:a}))}):e.createElement("div",{className:"empty-text"},"暂无数据")),e.createElement("footer",null)))});t.default=b}).call(this,n(1))},713:function(e,t){},848:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var a=d(n(19)),r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},l=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}();n(20);var o=d(n(575)),s=d(n(13)),c=d(n(10)),i=n(124),u=d(n(69));function d(e){return e&&e.__esModule?e:{default:e}}function f(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var m=function(t){function n(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n);var t=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(n.__proto__||Object.getPrototypeOf(n)).call(this,e));return t.getCounts=function(e){var n=t.state.bmcid;(0,s.default)({method:"post",url:"/hcm/campgign/InspectStaCount",data:{start_time:e,bmcid:n}}).then(function(e){var n=e.data,a=n.data,r=n.status;n.message;"10000"===r&&t.setState({counts:a})}).catch()},t.getInspectDetail=function(e){var n=t.state,r=n.bmcid,l=n.pagination;LoadingModal({bl:!0}),(0,s.default)({method:"post",url:"/hcm/campgign/InspectDetail",data:{bmcid:r,type:e.type,pageNum:l.pageNum,pageSize:l.pageSize,start_time:e.date}}).then(function(e){LoadingModal({bl:!1});var n=e.data,a=n.data,r=n.status;n.message;"10000"===r&&t.setState({details:0!==a.length?a.map(function(e){return e.screenshot_b=e.screenshot_b?e.screenshot_b:"[]",e.screenshot_c=e.screenshot_c?e.screenshot_c:"[]",e.screenshot_o=e.screenshot_o?e.screenshot_o:"[]",Object.assign({},e,{_isShowInspectForm:!1})}):[]})}).catch(function(e){LoadingModal({bl:!1}),a.default.error("系统繁忙，请稍后再试！")})},t.handleImgShotClick=function(e){(0,i.ImgModal)(e)},t.handleInputReview=function(e,n){t.setState({sysInspectInfo:Object.assign({},t.state.sysInspectInfo,f({},e,Object.assign({},t.state.sysInspectInfo[e],{system_review_explain:n.target.value})))})},t.handleUploadChange=function(e,n,r,l){var o=t.state.details.slice(),s=JSON.parse(o[r][e]);if("done"===l.file.status){var c=l.file.response,i=c.data,u=(c.message,c.status);s[n]=i.data,o[r][e]=JSON.stringify(s),"10000"===u&&(a.default.success(i.msg),t.setState({details:o}))}},t.inspectOptionResultClick=function(e,n){var a=t.state.inspectResultBtn.slice();a[n]="合格"===e?0:1,t.setState({inspectResultBtn:a,sysInspectInfo:Object.assign({},t.state.sysInspectInfo,f({},n,Object.assign({},t.state.sysInspectInfo[n],{system_review:e})))})},t.handleBeforeUpload=function(e,t){var n=e.type?e.type.split("/")[1]:"",r="jpg"===n||"png"===n||"jpeg"===n,l=e.size/1024/1024<10;return l||a.default.error("图片必须小于 10MB!"),r||a.default.error("只能上传JPG或者PNG格式的图片！"),r&&l},t.handleTimeChange=function(e,n){t.setState({currentDate:(0,c.default)(e).format("YYYY-MM-DD HH:mm:ss")}),t.getCounts((0,c.default)(e).format("YYYY-MM-DD HH:mm:ss")),t.getInspectDetail({type:t.state.currentTabIndex,date:(0,c.default)(e).format("YYYY-MM-DD HH:mm:ss")})},t.handleTabChange=function(e){t.setState({currentTabIndex:e}),t.getInspectDetail({type:e,date:t.state.currentDate})},t.handleConfirmBtnClick=function(e,n){var l=t.state,o=l.sysInspectInfo,c=l.details,i=l.currentDate,d=c.slice()[n],f=d.screenshot_b,m=d.screenshot_c,p=d.screenshot_o;if(1===JSON.parse(f).length)if(1===JSON.parse(m).length)if(0!==Object.keys(o).length&&o[n]&&0!==Object.keys(o[n]).length&&o[n].system_review){var h=o[n],y=(h.system_review,h.system_review_explain),g=void 0===y?"":y;if(console.log(g,g.length),!g||u.default.legnthCheck(g,"TEXTAREA")){var b=r({},e,o[n],{screenshot_b:f,screenshot_c:m,screenshot_o:p,type:"sys",createtime:i});LoadingModal({bl:!0}),(0,s.default)({method:"post",url:"/hcm/campgign/InspectCamPro",data:b}).then(function(e){LoadingModal({bl:!1});var n=e.data,r=(n.data,n.status),l=n.message;"10000"===r&&(a.default.success(l),t.getCounts(t.state.currentDate),t.getInspectDetail({type:1,date:t.state.currentDate}))}).catch(function(e){LoadingModal({bl:!1}),a.default.error("系统繁忙，请稍后再试！")})}else a.default.warning("请限制结果说明在"+u.default.LENGTH.TEXTAREA+"字符内！")}else a.default.warning("请选择稽查结果！");else a.default.warning("请上传成交价截图！");else a.default.warning("请上传标价截图！")},t.handleInspectBtnClick=function(e,n){var a=t.state,r=a.details,l=a.inspectResultBtn,o=a.sysInspectInfo,s=r.slice();if(s[n]._isShowInspectForm=e,!e){var c=l.slice();c[n]=null;var i=Object.assign({},o,f({},n,{})),u=r.slice();u[n].screenshot_b="[]",u[n].screenshot_c="[]",u[n].screenshot_o="[]",t.setState({inspectResultBtn:c,sysInspectInfo:i,details:u})}t.setState({details:s})},t.state={bmcid:e.match.params.id,pagination:{pageNum:1,pageSize:10},date:"",counts:{},details:[],sysInspectInfo:{},inspectResultBtn:[],currentTabIndex:1,currentDate:(0,c.default)().format("YYYY-MM-DD HH:mm:ss")},t}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(n,e.Component),l(n,[{key:"componentWillMount",value:function(){var e=this.state.currentDate;this.getCounts(e),this.getInspectDetail({type:1,date:e})}},{key:"render",value:function(){return e.createElement(o.default,{that:this})}}]),n}();t.default=m}).call(this,n(1))}}]);