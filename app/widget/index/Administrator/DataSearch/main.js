import Tpl from './tpl';
import axios from '../../../../js/common/ajax';
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            keyWord: null,
            pagination: {
                page: 1,
                pageSize: 10,
                total: 100
            }
        }
    }
    componentDidMount() {
        this.getData()
    }
    changeSearch = (e) => {
        this.setState({
            keyWord: e.target.value
        })
       
    }
    handleClearIconClick =  (type) => {
        let state = this.state;
        state[type] = null;
        this.setState(state);
    }
    getData = (bl) => {
        let pagination = this.state.pagination;
        axios.get('/hcm/cus/getPageByKeyWord', {
            params: {
                "pageNo": bl ? 1: pagination.page,
                "pageSize": pagination.pageSize,
                "bmcId": 5,
                "keyWord": this.state.keyWord
            }
        })
            .then((res) => {
                let data = res.data.data
                pagination.page = data.pageNumber
                pagination.pageSize = data.pageSize
                pagination.total = data.totalElements
                this.setState({
                    list: data.content,
                    pagination: pagination
                })
            })
    }
    changePagination = (page, pageSize) => {
        let pagination = this.state.pagination;
        pagination.page = page;
        pagination.pageSize = pageSize;
        this.setState({
            pagination: pagination
        }, () => {
            this.getData()
        })


    }
    onPaginationSize = (current, size) => {
        let pagination = this.state.pagination;
        pagination.page = current;
        pagination.pageSize = size;
        this.setState({
            pagination: pagination
        }, () => {
            this.getData()
        })
    }

    render() {
        return <Tpl that={this} />
    }
}
export default App