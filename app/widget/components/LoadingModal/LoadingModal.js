
// LoadingModal({bl:true,text:'加载中'})
// LoadingModal({bl:false})
import './LoadingModal.less';
import {Spin} from 'antd'
class App extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount(){

    }
    render() {
        let {text='加载中...'} = this.props;
        return (
            <div  className='flexbox'>
                <Spin  size="large" tip={<p>{text}</p>}></Spin>
            </div>
        )
    }
}

export let LoadingModal = function (page) {
    let {bl=false} =  page;
    var div = document.createElement('div');
    div.setAttribute("id", "LoadingModal");
    if(bl){
        document.body.appendChild(div);
        ReactDom.render(React.createElement(App,page), document.getElementById('LoadingModal'));
    }else{
        ReactDom.unmountComponentAtNode(document.getElementById('LoadingModal'));
        document.getElementsByTagName("body")[0].removeChild(document.getElementById('LoadingModal'));
    }
}

