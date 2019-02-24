import * as type from '../constants'
import axios from '../common/ajax'

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

const setCurrentBrand = (data = {}) => ({
  type: type.SETCURRENTBRAND,
  data: Object.assign({}, { ...data })
})

const getBrandList = () => dispatch => {
  return axios({
    method: 'post',
    url: '/hcm/cus/getCustomerlistOfDealer',
    // data: {
    //   dealer_id: 15
    // }
  })
    .then(res => {
      const { status, message, data } = res.data
      if (status === '10000') {
        dispatch({
          type: type.GETBRANDLIST,
          data: data.length !== 0 ? [...data] : [MOCK]
        })
        dispatch(setCurrentBrand(
          data.length !== 0 ? 
          data.filter(v => v.checked === 'true')[0] :
          MOCK
        ))
      }
    })
    .catch(err => {
      console.log('---err', err)
    })
} 
  
const getShopList = () => dispatch => {
  return axios({
    url: '/hcm/dealerShop/GetList',
    method: 'post',
    data: {
      type: 'bmc'
    }
  })
    .then(res => {
      dispatch({
        type: type.GETSHOPLIST,
        data: [...res.data.data]
      })
    })
    .catch(err => {
      console.log('-----errr', err)
    })
}
 
    
        
const getProductList = () => dispatch => {
  return axios({
    method: 'post',
    url: '/hcm/hcmProduct/getListBybmcid',
    // data: {
    //   classfyid: 111,
    //   pageSize: 9999999,
    //   pageNo: 1
    // }
  }).then(res => {
    dispatch({
      type: type.GETPRODUCTLIST,
      data: [...res.data.data]
    })
  }).catch(err => {
    console.log(err)
  })
}

const getDealerSeven = () => dispatch => {
  return axios({
    method: 'post',
    url: '/hcm/campgign/ScheduleSeven',
    // data: {
    //   dealer_id: 15
    // }
  }).then(res => {
    dispatch({
      type: type.GETDEALERSEVENACTIVITY,
      data: res.data.data
    })
  }).catch(err => {
    console.log('------err', err)
  })
}

export {
  getBrandList,
  getShopList,
  setCurrentBrand,
  getProductList,
  getDealerSeven
}