import { connect } from 'react-redux'
import { getDealerSeven } from '../../../../js/actions/dealer'
import Tpl from './tpl'
import axios from '../../../../js/common/ajax'
import { message as Msg } from 'antd'

@connect(state => (
    {
        sevenActivity: state.dealer.sevenActivity
    }
))
class ActivityInformation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedIndex: 0,
            activityObj: {},
            selectedDate: ''
        }
    }
    componentWillMount() {
        const { dispatch } = this.props
        dispatch(getDealerSeven())
        const date = new Date()
        const str = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
        this.getActivityDayInfo({date: str, type: 1})
    }
    switchActivity = (date, index, type) => {
        const { activityObj } = this.state
        this.setState({
            selectedIndex: index,
            selectedDate: date
        })
        activityObj[date] === undefined && this.getActivityDayInfo({date, type})
    }
    // 查询活动日程信息
    getActivityDayInfo = (obj) => {
        const { activityObj } = this.state
        axios({
            method: 'post',
            url: '/hcm/campgign/ScheduleMy',
            data: {
                campaign_node: '已审核',
                ser_day: obj.date,
                type: obj.type
            }
        }).then(res => {
            const { data, status, message } = res.data
            if (status === '10000') {
                this.setState({
                    activityObj: Object.assign({}, activityObj, {
                        [obj.date]: data
                    }),
                    selectedDate: obj.date
                })
            } else {
                Msg.error(message)
            }
        }).catch(err => {
            Msg.error('网络异常，请稍后再试！')
        })
    }
    render() {
        return <Tpl that={this} />
    }
}

export default ActivityInformation