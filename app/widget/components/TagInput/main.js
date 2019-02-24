import Tpl from './tpl';
import { Checkbox,message } from 'antd';
class App extends React.Component {
    constructor(props) {
        super(props)
        this.tag_input_textarea = React.createRef()
        this.state = {
            inputValue:'',
            values:this.props.value||[],
            targetItem:{
                index:null,
                value:null
            }
        }
    }
    
    componentDidMount() {

    }
    componentWillMount() {

    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            values:nextProps.value||[],
        })
    }
    targetValue = (e) =>{
        let targetItem = this.state.targetItem;
        targetItem.value =  e.target.value;
        this.setState({
            targetItem
        })
    }
    editItem = (item,index)=>{
        let targetItem = {
            value:item,
            index
        }
        this.setState({
            targetItem
        })
    }
    onFocusInput = (e) => {
        if(e.target.nodeName!='INPUT'&&e.target.nodeName!='SVG'){
            this.tag_input_textarea.current.focus()
        }
        e.stopPropagation()
    }
    subItem = () =>{
        let targetItem = this.state.targetItem;
        let values = this.state.values;
        values[targetItem.index] = targetItem.value;

        if(targetItem.value.length > this.props.maxText){
            message.error(
                <span>
                    字符长度最大长度
                    <span className='red'>{this.props.maxText}</span>,
                    本条长度为<span className='red'>{targetItem.value.length}</span>, 
                    请重新编辑！
                </span>
            )
            return
        }
        let newSet = new Set(values)
        this.setState({
            values:[...newSet],
            targetItem:{
                index:null,
                value:null
            }
        },()=>{
            this.props.onChange(this.state.values)
        })
    }
    rmItem=(index)=>{
        let values = this.state.values;
        values.splice(index, 1);
        this.setState({
            values
        },()=>{
            this.props.onChange(this.state.values)
        })
    }
    changeValue = (e)=>{
        if(e.target.value != '\n'){
            this.setState({
                inputValue: e.target.value
            })
        }
        
    }
    keyDownValue = (e)=>{
        if(e.keyCode==13&&this.state.inputValue != '\n'){
            let arr = new Set(this.state.values.concat(this.state.inputValue.split('\n')))
            for(let item of arr){
                if(item.length > this.props.maxText){
                    message.error(
                        <span>
                            字符长度最大长度
                            <span className='red'>{this.props.maxText}</span>,
                            {item}长度为<span className='red'>{item.length}</span>, 
                            已经为您自动删除！
                        </span>
                    )
                    arr.delete(item)
                }
            }
            arr.delete('')
            
            this.setState({
                inputValue:'',
                values:[...arr]
            },()=>{
                this.props.onChange(this.state.values)
            })
        }
    }
    onBlurValue = (e)=>{
        if(this.state.inputValue != '\n'){
            let arr = new Set(this.state.values.concat(this.state.inputValue.split('\n')))
            for(let item of arr){
                if(item.length > this.props.maxText){
                    message.error(
                        <span>
                            字符长度最大长度
                            <span className='red'>{this.props.maxText}</span>,
                            {item}长度为<span className='red'>{item.length}</span>, 
                            已经为您自动删除！
                        </span>
                    )
                    arr.delete(item)
                }
            }
            arr.delete('')
            
            this.setState({
                inputValue:'',
                values:[...arr]
            },()=>{
                this.props.onChange(this.state.values)
            })
        }
    }
    render() {
        return <Tpl that={this} />
    }
}
export default App