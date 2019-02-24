import Tpl from './tpl';
import { Checkbox } from 'antd';
class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            menuList:[],
            sortList:[],
            stateID:null,
            endId:null,
        }
    }
    componentDidMount(){

    }
    componentWillMount(){
    }
    formAtDom = (type) =>{
        let arr = [];
        let data = this.props.data
        
        if(type){
            for (const key in data) {
                arr.unshift(
                    <div className='item' key={Math.random()}>
                        <p>{data[key].title}</p>
                        {
                            data[key].data.map((item,index)=>{
                                return (
                                    <Checkbox onChange={(e)=>this.props.oCheckitem(e,key,item,index)} className='Checkbox' disabled={item.fieldRequired=='1'} key={index} checked={item.isChecked}>{item.fieldname}</Checkbox>
                                )
                            })
                        }
                    </div>
                )
            }
        }else{
            for (const key in data) {
                    
                data[key].data.forEach((item,index)=>{
                    if(item.isChecked){
                        item.target = [key,index,item.fieldRequired]
                        return (
                            arr.push(item)
                        )
                    }
                    
                })
            }
        }
        
        return arr
    }

    onDrop = (info) => {
        this.setState({
            endId:info.node.props.eventKey
        },()=>{
            
            const dropPos = info.node.props.pos.split('-');
            const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

            let {stateID,endId} = this.state;
            let state = stateID.split(',')
            let end = endId.split(',')
            let data = this.props.data;
            let endnum = data[end[0]].data[end[1]].sort;
            let statenum = data[state[0]].data[state[1]].sort;
            if(dropPosition===0){
                data[end[0]].data[end[1]].sort = statenum;
                data[state[0]].data[state[1]].sort = endnum;
            }else if(dropPosition>0){
                data[state[0]].data[state[1]].sort = endnum+0.01;
            }else if(dropPosition<0){
                data[state[0]].data[state[1]].sort = endnum-0.01;
            }
            this.props.onSortList(data)
        })
    }
    canCelItem=(item)=>{
        this.props.oCheckitem({target:{checked:0}},item.target[0],item,item.target[1])
    }
    onDragStart = (info)=>{
        this.setState({
            stateID:info.node.props.eventKey
        })
        
    }
    render(){
        return <Tpl that={this}/>
    }
}
export default App