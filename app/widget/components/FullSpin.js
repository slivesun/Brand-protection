import { Spin, Modal } from 'antd';
class FullSpin extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {

    }
    render() {
        return (
            
            <Modal maskClosable={false} className='full-spin' bodyStyle={{textAlign: 'center'}} footer={null} closable={false} visible={this.props.spinning} >
                <Spin  size="large" delay={100} spinning={true} className='example' tip="Loading...">
                </Spin>
            </Modal>
        )

    }
}
export default FullSpin