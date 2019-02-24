import Tpl from './tpl';
import axios from '../../../../js/common/ajax'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            brandName: '',
            waitInspectList: []
        }
    }
    componentWillMount() {
        this.getWaitInspectList(null)
    }
    // 获取待稽查列表
    getWaitInspectList = companyname => {
        axios({
            method: 'post',
            url: '/hcm/campgign/InspectKEFU',
            data: {
                companyname
            }
        }).then(res => {
            const { data, status, message } = res.data
            if (status === '10000') {
                this.setState({
                    waitInspectList: data
                })
            }
        }).catch()
    }
    goToDetail = bmcid => {
        this.props.history.push({
            pathname: '/ActivityInspectDetail/'+bmcid
        })
    }
    handleBtnClick = () => {
        const { brandName } = this.state
        this.getWaitInspectList(brandName)
    }
    handleClearIconClick = () => {
        this.setState({
            brandName: ''
        })
    }
    handleInputChange = e => {
        this.setState({
            brandName: e.target.value
        })
    }
    render() {
        return <Tpl that={this} />
    }
}

export default App