(window.webpackJsonp=window.webpackJsonp||[]).push([[52],{787:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0});var n=p(a(19)),s=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(t[n]=a[n])}return t},r=function(){function t(t,e){for(var a=0;a<e.length;a++){var n=e[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,a,n){return a&&t(e.prototype,a),n&&t(e,n),e}}();a(20);var i=p(a(597)),o=p(a(10)),u=p(a(13)),c=a(124),l=p(a(69));function p(t){return t&&t.__esModule?t:{default:t}}function f(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}var d="YYYY-MM-DD HH:mm:ss",m=function(e){function a(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a);var e=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(a.__proto__||Object.getPrototypeOf(a)).call(this,t));return e.getActivityNums=function(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=a.shop_name,s=void 0===n?"":n,r=a.system_review,i=void 0===r?"":r;(0,u.default)({method:"post",url:"/hcm/campgign/InspectStaCount",data:{start_time:t,shop_name:s,system_review:i}}).then(function(t){var a=t.data,n=a.data,s=a.status;a.message;"10000"===s&&e.setState({activityNums:n})}).catch(function(t){})},e.getInspectDetail=function(t){LoadingModal({bl:!0}),(0,u.default)({method:"post",url:"/hcm/campgign/InspectDetail",data:t}).then(function(t){LoadingModal({bl:!1});var a=t.data,n=a.data,s=a.status;a.message;"10000"===s&&e.setState({detailList:0!==n.length?n.map(function(t){return Object.assign({},t,{_isShowInspectInput:!1})}):[]})}).catch(function(t){LoadingModal({bl:!1}),n.default.error("系统繁忙，请稍后再试！")})},e.handleSearchClick=function(){var t=e.state,a=t.shop_name,n=t.sys_result,s=t.start_time,r=(t.currentTab,t.pagination);e.getInspectDetail({shop_name:a,sys_result:n,start_time:""===s?(0,o.default)().format(d):s,type:"1",pageNum:r.pageNum,pageSize:r.pageSize}),e.getActivityNums(""===s?(0,o.default)().format(d):s,{shop_name:a,system_review:n}),e.setState({currentTab:"1"})},e.handleComSubmitResult=function(t,a){var r=e.state,i=r.brandInspectInfo,o=r.start_time;if(0!==Object.keys(i).length&&i[a]&&0!==Object.keys(i[a]).length&&i[a].brand_review){var c=e.state.brandInspectInfo[a],p=c.brand_review,f=void 0===p?"":p,d=c.brand_review_view,m=void 0===d?"":d;!m||l.default.legnthCheck(m,"TEXTAREA")?(LoadingModal({bl:!0}),(0,u.default)({method:"post",url:"/hcm/campgign/InspectCamPro",data:s({brand_review:f,brand_review_view:m,createtime:o},t)}).then(function(t){LoadingModal({bl:!1});var a=t.data,s=(a.data,a.status),r=a.message;"10000"===s&&(n.default.success(r),e.handleSearchClick())}).catch(function(t){LoadingModal({bl:!1}),n.default.error("网络繁忙，请稍后再试！")})):n.default.warning("请限制稽查意见在"+l.default.LENGTH.TEXTAREA+"字符内！")}else n.default.warning("请选择稽查结果！")},e.handleComInspectInfo=function(t,a,n){var s=e.state.inspectResultBtn.slice();s[a]="合格"===t?0:1,"input"===t?e.setState({brandInspectInfo:Object.assign({},e.state.brandInspectInfo,f({},a,Object.assign({},e.state.brandInspectInfo[a],{brand_review_view:n.target.value})))}):e.setState({brandInspectInfo:Object.assign({},e.state.brandInspectInfo,f({},a,Object.assign({},e.state.brandInspectInfo[a],{brand_review:t}))),inspectResultBtn:s})},e.handleComToggleClick=function(t,a){var n=e.state,s=n.detailList,r=n.inspectResultBtn,i=n.brandInspectInfo,o=[].concat(function(t){if(Array.isArray(t)){for(var e=0,a=Array(t.length);e<t.length;e++)a[e]=t[e];return a}return Array.from(t)}(s));if(o[a]._isShowInspectInput=t,!t){var u=r.slice();u[a]=null;var c=Object.assign({},i,f({},a,{}));e.setState({inspectResultBtn:u,brandInspectInfo:c})}e.setState({detailList:o})},e.handleComImageClick=function(t){(0,c.ImgModal)(t)},e.handleTabChange=function(t){var a=e.state,n=a.start_time,s=a.pagination,r=a.shop_name,i=a.sys_result;e.setState({currentTab:t}),e.getInspectDetail({type:t,start_time:""===n?(0,o.default)().format(d):n,pageNum:s.pageNum,pageSize:s.pageSize,shop_name:r,sys_result:i})},e.handleChange=function(t,a){var n="start_time"===t?a?(0,o.default)(a).format(d):"":a;e.setState(f({},t,n))},e.handleClearIconClick=function(){e.setState({shop_name:""})},e.handleInputChange=function(t){e.setState({shop_name:t.target.value})},e.state={shop_name:"",sys_result:"",start_time:(0,o.default)().format(d),currentTab:"1",pagination:{pageNum:1,pageSize:10},activityNums:{},detailList:[],isShowInspectInput:!1,brandInspectInfo:{},inspectResultBtn:[]},e}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(a,t.Component),r(a,[{key:"componentWillMount",value:function(){this.getActivityNums((0,o.default)().format(d),{shop_name:this.state.shop_name,system_review:this.state.sys_result}),this.getInspectDetail({type:1,start_time:(0,o.default)().format(d),pageNum:this.state.pagination.pageNum,pageSize:this.state.pagination.pageSize,shop_name:this.state.shop_name,sys_result:this.state.sys_result})}},{key:"render",value:function(){return t.createElement(i.default,{that:this})}}]),a}();e.default=m}).call(this,a(1))}}]);