import Tpl from './tpl';
import ajax from '../../../js/common/ajax'
import { Form, Modal ,message} from 'antd';
import lib from '../../../js/common/lib'

class LogIns extends React.Component {
    constructor(props) {
        // document.title = '登陆';
        super(props)
        this.state = {

        };
    }
    componentDidMount() {



        ajax.get('/hcm/wechat/loginByWeiXin', {
            params: {
                code: lib.getQueryString("code"),
                state: lib.getQueryString("state")
            }
        }).then((res) => {
            if (res.data.status == 10000) {
                let logintype = res.data.data.logintype;
                let catid = res.data.data.catid;
                let realname = res.data.data.realname;
                let roleid = res.data.data.roleid;
                window.localStorage.setItem('logintype', logintype)
                window.localStorage.setItem('catid', catid)
                window.localStorage.setItem('realname', realname)
                window.localStorage.setItem('roleid', roleid)
                // $.ajax({
                //     url: '/hcm/getMenuListByUser',
                //     method: 'GET',
                //     dataType: 'JSON',
                //     async: false,
                //     success: (response) => {
                //         window.localStorage.setItem('menuList', JSON.stringify(response))
                        if (res.data.data.catid == null && res.data.data.logintype == 'HCM') {
                            window.location = "/index.html#/CategorySelect";
                        } else {
                            window.location = "/index.html#/";
                        }
                        
                    // },
                    // error: (err) => {
                    //     if (err.status === 503) {
                    //         if (localStorage.logintype == 'ADMIN' || localStorage.logintype == 'KEFU') {
                    //             window.location = "/user.html#/loginu";
                    //         } else {
                    //             window.location = "/user.html#/loginc";
                    //         }
                    //         window.localStorage.clear()
                    //     }
                    // },
                // })

            } else {
                Modal.warning({
                    title: '登录失败',
                    content: res.data.message,
                    okText: '返回登录',
                    onOk: () => {
                        window.location.href = '/'
                    }
                });
            }
        });
    }

    render() {
        return <Tpl that={this} />
    }
}

export default Form.create()(LogIns)