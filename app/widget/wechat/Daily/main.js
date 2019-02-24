import Tpl from './tpl';
import axios from '../../../js/common/ajax';
import lib from '../../../js/common/lib';
import { message as Msg } from 'antd'
// import { LoadingModal } from '../../components/LoadingModal/LoadingModal'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            start_time: new Date(),
            end_time: new Date(),
            platform: 'taobao',
            isShowPlatformList: false,
            dataList: [],
            urlType: 'tb',
            openid: '',
        }
    }
    componentWillMount() {
        Msg.config({
            top: 150,
        })
        this.getWechatOpenId(this.getData)
        // this.getData()
    }
    componentDidMount() {
        document.title = '投诉信息查询'
    }
    getWechatOpenId = callback => {
        const code = lib.getQueryString('code');
        axios.post('/hcm/wechat/getGZAccess_token', {
            code:code
        })
        .then(res => {
            if(res.data.openid){
                this.setState({
                    openid:res.data.openid,
                }, () => {
                    callback()
                })
            }else{
                Msg.error("微信接口调用失败，请关注公众号!并从公众号内进入 ")
            }
            
        }).catch(err => {
            Msg.error("微信接口调用失败，请稍后再试！")
        })
    }
    getData = () => {
        const { platform, start_time, end_time, urlType, openid } = this.state
        let url = ''
        const data = {
            start_time: moment(start_time).format('YYYY-MM-DD'),
            end_time: moment(end_time).format('YYYY-MM-DD'),
            openid,
        }
        if (urlType === 'tb') {
            url = '/hcm/wechat/tb_list'
            data.platform_code = platform
        }
        if (urlType === 'jd') {
            url = '/hcm/wechat/list_jd'
        }
        if (urlType === '1688') {
            url = 'hcm/wechat/list_1688'
            data.site = platform
        }
        LoadingModal({bl:true})
        axios.post(url, data).then(res => {
            LoadingModal({bl:false})
            const { data, status, message } = res.data
            if (status === '10000') {
                this.setState({
                    dataList: data.map(v => Object.assign({}, v, {isShowDetail: false}))
                })
            }
        }).catch(err => {
            LoadingModal({bl:false})
            Msg.error('系统繁忙，请稍后再试！')
        })
    }
    showPlatformList = () => {
        this.setState({
            isShowPlatformList: !this.state.isShowPlatformList,
        })
    }
    toggleClick = (index, e) => {
        e.stopPropagation()
        const copyList = JSON.parse(JSON.stringify(this.state.dataList))
        copyList[index].isShowDetail = !copyList[index].isShowDetail
        this.setState({
            dataList: copyList,
        })
    }
    handleClickPlatform = e => {
        e.stopPropagation()
        this.setState({
            platform: e.target.dataset.platform,
            urlType: e.target.dataset.type,
            isShowPlatformList: false,
        }, () => {
            this.getData()
        })
    }
    handleConfirm = (key, date) => {
        const { start_time, end_time } = this.state
        if (moment(date).valueOf() > moment().valueOf()) {
            Msg.warning('时间不能大于当前时间！')
            return
        }
        if (key === 'start_time') {
            if (moment(date).valueOf() > moment(end_time).valueOf()) {
                Msg.warning('开始时间不能大于结束时间！')
                return
            }
        }
        if (key === 'end_time') {
            if (moment(date).valueOf() < moment(start_time).valueOf()) {
                Msg.warning('结束时间不能小于开始时间！')
                return
            }
        }
        this.setState({
            [key]: new Date(date),
        }, () => {
            this.getData()
        })
    }
    render() {
        return <Tpl that={this} />
    }
}

export default App