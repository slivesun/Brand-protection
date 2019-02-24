import Tpl from './tpl';
import ajax from '../../../js/common/ajax';
import { Form,message,Modal } from 'antd';
const confirm = Modal.confirm;
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            visible: false,
            type: null,
            menu_type: "ALL",
            tergetData: {}
        }
    }
    componentDidMount() {
        this.getList()
    }
    menuType = (value, option) => {

        this.setState({
            menu_type: value
        })
    }
    modalVisible = (bl, data,type) => {
        
        this.setState({
            visible: bl,
            tergetData: data,
            type:type
        })
    }
    getList = () => {
        ajax.get('/hcm/menu/getList', {
            params: {
                type: this.state.menu_type
            }
        }).then(res => {
            this.setState({
                list: res.data.data,
                visible: false,
                tergetData: {},
                type:null
            })
        })
    }
    rmMenu=(record)=>{
        let that = this;
        if(record.children&&record.children.length){
            message.warning('请先删除子级菜单');
            return
        }
        confirm({
            title: null,
            content: <div><div className='tips'>提示</div><div className='pline'></div><p className='Dtitle'>你确定要删除此条信息吗?</p><p>删除后<span className='red'>将无法继续展示相关内容</span></p></div>,
            okText: '删除',
            cancelText: '取消',
            className:'alert-item-confirm',
            onOk() {
                ajax.post('/hcm/menu/delete', {
                    menuId:record.id
                }).then((res)=>{
                    if(res.data.status==10000){
                        message.success(res.data.message)
                        that.getList()
                    }
        
                })
            }
        });
        
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                
                values.menuName = values.menuName
                values.menuState = values.menuState||values.menuState =='1' ? '1':'0';
                values.menuType = 'ALL'
                if(this.state.type=='编辑'){
                    values.id = this.state.tergetData.id;
                    
                    ajax.post('/hcm/menu/Update', values).then((res)=>{
                        if(res.data.status==10000){
                            message.success(res.data.message)
                            this.getList()
                        }

                    },(rej)=>{
                        console.log(rej)
                    })
                }else{
                    ajax.post('/hcm/menu/Create', values).then((res)=>{
                        if(res.data.status==10000){
                            message.success(res.data.message)
                            // this.getList()
                        }
                    })
                    .catch((error)=>{
                        console.log(error);
                    });
                }
                
            }
        });
    }
    render() {
        return <Tpl that={this} />
    }
}
export default Form.create()(App);