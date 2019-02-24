
class Copyright extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {

    }
    render() {
        return(
            <div className={this.props.clazzName ? this.props.clazzName:'Copyright'}>
                Copyright &#169; 杭州久点网络技术有限公司
            </div>
        )
        
    }
}
export default Copyright