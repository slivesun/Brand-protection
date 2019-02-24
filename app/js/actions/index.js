import axios from '../common/ajax'
import {NAVSHOW,GETMENULIST,GOCLIENTINFO,GETSEVENUSERNAME,GETBRANDLISTTOKEFU,SETCURRENTBRANDTOKEFU} from '../constants/index';
//导航缩放开关
export const toggleCollapsed = (otype) => {
    return {
        type:NAVSHOW
    }
}

export const getMenuList = (otype) => {
    let data =null;
    $.ajax({
        url: '/hcm/getMenuListByUser',
        method: 'GET',
        dataType:'JSON',
        async: false,
        success:  (res)=>{
            window.localStorage.setItem('menuList',JSON.stringify(res))
            data = res 
        },
        error:  (err)=>{
            if(err.status === 503){
                if(localStorage.logintype == 'ADMIN'||localStorage.logintype == 'KEFU'){
                    window.location = "/user.html#/loginu";
                }else{
                    window.location = "/user.html#/loginc";
                }
                window.localStorage.clear()
            } 
        },
    })
    return {
        type:GETMENULIST,
        menulist:data
    }
}
//商品库
export const goClientInfo = (state) => {
    return {
        type:GOCLIENTINFO,
        state:state
    }
}
export const getNavList = (Nav) => {
    return {
        type: GETSEVENUSERNAME,
        Nav
    }
}


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
export const setCurrentBrandToKefu = (data = {}) => ({
    type: SETCURRENTBRANDTOKEFU,
    data: Object.assign({}, { ...data })
})
export const getBrandListToKefu = () => dispatch => {
    return axios({
      method: 'post',
      url: '/hcm/userin/getBmcListByKefuid',
      
    })
    .then(res => {
        const { status, message, data } = res.data
        if (status === '10000') {
            dispatch({
                type: GETBRANDLISTTOKEFU,
                data: data.length !== 0 ? [...data] : [MOCK]
            })
            dispatch(setCurrentBrandToKefu(
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