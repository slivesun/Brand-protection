import {GETMENULIST} from '../constants/index';
let data = JSON.parse(window.localStorage.getItem('menuList'))||{data:[]}
    // if(window.location.pathname ==='/index.html'){
    //     if(window.sessionStorage.getItem('menuList')){
    //         data = JSON.parse(window.sessionStorage.getItem('menuList'))
    //     }else{
    //         $.ajax({
    //             url: '/hcm/getMenuListByUser',
    //             method: 'GET',
    //             dataType:'JSON',
    //             async: false,
    //             success:  (response)=>{
    //                 data = response
    //                 window.sessionStorage.setItem('menuList',JSON.stringify(response))
    //             },
    //             error:  (err)=>{
    //                 if(err.status === 503){
    //                     window.sessionStorage.clear()
    //                     if(localStorage.logintype == 'ADMIN'||localStorage.logintype == 'KEFU'){
    //                         window.location = "/user.html#/loginu";
    //                     }else{
    //                         window.location = "/user.html#/loginc";
    //                     }
                        
    //                 } 
    //             },
    //         })
    //     }
        
    // }
const menulist = (state={data:[]} , action) => {
    switch (action.type) {
        case GETMENULIST:
        return data.data.length ?data :action.menulist;
        default: return data
    }
}
export default menulist


