import { Spin, Icon } from 'antd';
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
function Loading(props){
        return(
            <Spin indicator={antIcon} />
        )
}

export default Loading