// 图片弹层
// ImgModal({bl:true,urls:urls,index:index,close:true})
// bl:true||false  展示隐藏  默认false 
// urls:arr 图片集合
// index： 默认展示数组中的第几张图片 默认值0
// close: 是否展示关闭按钮
import './ImgModal.less';
import {Icon,message} from 'antd'
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            index:this.props.index,
            rotate:0,
            size:1
        }
    }
    componentDidMount(){
    }
    onSwitch(bl){
        let {index,rotate,size} = this.state;
        let {urls} = this.props;
        if(bl){
            if(index == urls.length-1){
                index = 0
            }else{
                index++
            }
        }else{
            if(index<=0){
                index = urls.length-1
            }else{
                index--
            }
        }
        this.setState({
            index,
            rotate:0,
            size:1
        })
    }
    onSize(bl){
        let {size} = this.state;
        if(bl){
            size+=0.5
        }else{
            size = size <= 0.5 ? 0.5 : size-0.5
        }
        this.setState({
            size
        })
    }
    onRotate(bl){
        let {rotate} = this.state;
        if(bl){
            rotate+=90
        }else{
            rotate-=90
            
        }
        this.setState({
            rotate
        })
    }
    colse(){
        ReactDom.unmountComponentAtNode(document.getElementById('ImgModal'))
        document.getElementsByTagName("body")[0].removeChild(document.getElementById('ImgModal'));
    }
    render() {
        let {urls=[],close=false} = this.props;
        let {index=0,rotate,size} = this.state;
        let oImg = document.createElement('img');
        oImg.src = urls[index];
        let naturalWidth = oImg.naturalWidth ? oImg.naturalWidth :400;
        let naturalHeight = oImg.naturalHeight ? oImg.naturalHeight :400;
        console.log(naturalWidth)
        return (
            <div  className='flexbox'>
                <div className='imgbox'>
                    {
                        close ? 
                        <Icon className='close' onClick={()=>this.colse()} type="close-circle" />
                        :null
                    }
                    <div className='box'>
                        <img style={{width:`${size*(naturalWidth>500?naturalWidth*0.7:naturalWidth)}px`,transform:`rotate(${rotate}deg)`}}  
                        src={urls[index]} 
                        />
                    </div>
                    <div className='buts'>
                        <Icon onClick={()=>this.onSwitch(false)} type="left" />
                        <Icon onClick={()=>this.onSwitch(true)} type="right" />
                        <Icon onClick={()=>this.onSize(true)} type="plus" />
                        <Icon onClick={()=>this.onSize(false)} type="minus" />
                        <Icon onClick={()=>this.onRotate(false)} className='left' type="reload" />
                        <Icon onClick={()=>this.onRotate(true)} className='right' type="reload" />
                    </div>
                    <div style={{textAlign:'center',fontSize:'12px'}}>
                        <a target='_blank' href={urls[index]}>查看原图</a>
                    </div>
                </div>
            </div>
        )
    }
}

export let ImgModal = function (page) {
    let {bl=false,urls} =  page;
    var div = document.createElement('div');
    div.setAttribute("id", "ImgModal");
    if(bl){
        document.body.appendChild(div);
        ReactDom.render(React.createElement(App,page), document.getElementById('ImgModal'));
    }else{
        ReactDom.unmountComponentAtNode(document.getElementById('ImgModal'));
        document.getElementsByTagName("body")[0].removeChild(document.getElementById('ImgModal'));
    }
}

