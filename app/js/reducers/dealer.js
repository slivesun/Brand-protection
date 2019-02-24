import * as type from '../constants';
import {message} from 'antd'
const MOCK = {
  apply_status: "CUSTOM",
  bmcid: 365,
  checked: "true",
  company_memoname: "",
  companyname:"暂无品牌方",
  end_days: 100000000000000000,
  status: 1,
  _customBrand: true
}



let initialState = {
  menulist:{data:[]},
  brandListToKefu: [],
  currentBrandToKefu: {},
  brandList: [],  // 品牌方列表
  currentBrand: {}, // 当前选中品牌方
  shopList: [], // 店铺列表(活动申请页)
  productList: [],  // 产品列表(活动申请页)
  sevenActivity: [], // 经销商7日活动
  SevenUserName: [] //经销商用户名（资料信息）
}



  const isDealer = localStorage.getItem('logintype') === 'DEALER' || false
  const isKefu = localStorage.getItem('logintype') === 'KEFU' || false
  if (isDealer) {
    $.ajax({
      url: '/hcm/cus/getCustomerlistOfDealer',
      method: 'GET',
      dataType: 'JSON',
      async: false,
      success: (response) => {
        let {data} = response
        if(response.status == '10000'){
          dMenulist()
          
        }else{
          message.error(response.message)
        }
        initialState.brandList = data&&data.length !== 0 ? [...data] : [MOCK];
        initialState.currentBrand =  data&&data.length !== 0 ?  data.filter(v => v.checked === 'true')[0] : MOCK
        
      },
      error: (err) => {
        if (err.status === 503) {
          window.localStorage.clear()
          
          if (localStorage.logintype == 'ADMIN' || localStorage.logintype == 'KEFU') {
            window.location = "/user.html#/loginu";
          } else {
            window.location = "/user.html#/loginc";
          }

        }
      },
    })
  } else if(isKefu) {
    $.ajax({
      url: '/hcm/userin/getBmcListByKefuid',
      method: 'GET',
      dataType: 'JSON',
      async: false,
      success: (response) => {
        let {data} = response
        if(response.status == '10000'){
          dMenulist()
        }else{
          message.error(response.message)
        }
        initialState.brandListToKefu = data&&data.length !== 0 ? [...data] : [MOCK];
        initialState.currentBrandToKefu =  data&&data.length !== 0 ?  data.filter(v => v.checked === 'true')[0] : MOCK;
      },
      error: (err) => {
        if (err.status === 503) {
          window.localStorage.clear()
          if (localStorage.logintype == 'ADMIN' || localStorage.logintype == 'KEFU') {
            window.location = "/user.html#/loginu";
          } else {
            window.location = "/user.html#/loginc";
          }

        }
      },
    })
  }else{
    dMenulist()
  }
  function dMenulist(){
    $.ajax({
      url: '/hcm/getMenuListByUser',
      method: 'GET',
      dataType:'JSON',
      async: false,
      success:  (response)=>{
          initialState.menulist =response;
          window.sessionStorage.setItem('menuList',JSON.stringify(response))
      },
      error:  (err)=>{
          if(err.status === 503){
              window.sessionStorage.clear()
              if(localStorage.logintype == 'ADMIN'||localStorage.logintype == 'KEFU'){
                  window.location = "/user.html#/loginu";
              }else{
                  window.location = "/user.html#/loginc";
              }
              
          } 
      },
    })
  }
const brandListToKefu = (state = [], action) => {
  switch (action.type) {
    case type.GETBRANDLISTTOKEFU:
      return [...action.data]
      break;

    default:
      return state;
  }
}
const setCurrentBrandToKefu = (state = {}, action) => {
  switch (action.type) {
    case type.SETCURRENTBRANDTOKEFU:
      return Object.assign({}, state, {
        ...action.data
      })
      break;

    default:
      return state;
  }
}

const setCurrentBrand = (state = {}, action) => {
  switch (action.type) {
    case type.SETCURRENTBRAND:
      return Object.assign({}, state, {
        ...action.data
      })
      break;

    default:
      return state;
  }
}

const productList = (state = [], action) => {
  switch (action.type) {
    case type.GETPRODUCTLIST:
      return [...action.data]
      break;

    default:
      return state
  }
}

const brandList = (state = [], action) => {
  switch (action.type) {
    case type.GETBRANDLIST:
      return [...action.data]
      break;

    default:
      return state;
  }
}
const SevenUserName = (state = [], action) => {
  switch (action.type) {
    case type.GETSEVENUSERNAME:
      return [...action.data]
      break;

    default:
      return state;
  }
}
const shopList = (state = [], action) => {
  switch (action.type) {
    case type.GETSHOPLIST:
      return [...action.data]
      break;

    default:
      return state;
  }
}

const sevenActivity = (state = [], action) => {
  switch (action.type) {
    case type.GETDEALERSEVENACTIVITY:
      return [...action.data]
      break;

    default:
      return state;
  }
}
const menulist = (state={data:[]} , action) => {
  switch (action.type) {
      case type.GETMENULIST:
      return action.menulist;
      default: return state
  }
}
export default (state = initialState, action) => {
  return ({
    menulist:menulist(state.menulist, action),
    brandListToKefu: brandListToKefu(state.brandListToKefu, action),
    currentBrandToKefu: setCurrentBrandToKefu(state.currentBrandToKefu, action),
    brandList: brandList(state.brandList, action),
    shopList: shopList(state.shopList, action),
    productList: productList(state.productList, action),
    currentBrand: setCurrentBrand(state.currentBrand, action),
    sevenActivity: sevenActivity(state.sevenActivity, action),
    SevenUserName: SevenUserName(state.SevenUserName, action)
  })
}
  






