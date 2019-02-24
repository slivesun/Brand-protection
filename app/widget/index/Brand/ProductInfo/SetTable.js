
import { Modal ,Tree,Checkbox,Icon, Popconfirm, message,Tooltip, Button } from 'antd';
const TreeNode = Tree.TreeNode;
import ajax from '../../../../js/common/ajax';
class App extends React.Component {
    constructor(props) {
        super(props)
        let {id,name,status} = this.props.params;
        this.state = {
            id,
            name,
            status,
            dataList:{},
            showid:null,
            stateID:null,
            endId:null,
        }
    }
    componentDidMount() {
        this.getByProduct()
    }

    getByProduct = () => {
        ajax.get('/hcm/hcmCustomModel/getByProduct', {
            params: {
                productClassifyid:this.state.id
            }
        }).then((response) => {
            let dataList = response.data.data;
            this.setState({
                dataList: dataList
            })
        }).catch((error) => {
            message.error(error.statusText);
        });
    }
    onMouseOver(key,item,index){
        let data = this.state.dataList;
        let showid = this.state.showid;
        if(data[key].data[index].id == showid){
            return
        }
        showid = data[key].data[index].id;
        this.setState({
            showid:showid
        })
    }
    onRmitem(key,item,index){
        let data = this.state.dataList;
        ajax.get('/hcm/hcmCustomModel/delete', {
            params: {
                id:data[key].data[index].id,
                module:'PRODUCT'
            }
        }).then((response) => {
            message.success(response.data.message);
            this.getByProduct()
        }).catch((error) => {
            message.error(error.statusText);
        });
    }
    onEdititem(key,item,index,bl){
        let data = this.state.dataList;
        data[key].data[index].edit = bl;
        this.setState({
            data:data,
            showid:null
        })
    }
    onSubItem(key,index){
        let data = this.state.dataList;
        let item = data[key].data[index];
        if(!this.refs[item.id].value.trim().length){
            message.error('请输入字段名')
            return
        }
        if(this.refs[item.id].value.trim().length>20){
            message.error('字段名过长 请限制在20字符以内')
            return
        }
        data[key].data[index].edit = false;
        data[key].data[index].fieldname = this.refs[item.id].value
        
        
        ajax.get('/hcm/hcmCustomModel/save', {
            params: {
                id:item.id,
                productClassifyId:this.state.id,
                fieldClassify:item.fieldClassify,
                fieldname:this.refs[item.id].value,               
                module:'PRODUCT'
            }
        }).then((response) => {
            message.success(response.data.message);
            this.setState({
                dataList:data
            })
        }).catch((error) => {
            message.error(error.statusText);
        });
    }
    num = 100
    oCheckitem(e, key, item, index){
        let setTableData = this.state.dataList;
        setTableData[key].data[index].isChecked = e.target.checked ? 1 : 0;
        setTableData[key].data[index].sort = this.num++
        this.setState({
            dataList: setTableData
        })
    }
    onSortSubmit(fn){
        let arr = [];
        let data = this.formAtDom(false).sort((a,b)=>a.sort-b.sort);
        data.forEach((item, index) => { arr.push(item.id) })
        
        ajax.get('/hcm/hcmCustomModel/saveSort', {
            params: {
                ids: arr.join(','),
                productClassifyId:this.state.id,
                module: 'PRODUCT'
            }
        }).then((response) => {
            if (response.data.status == '10000') {
                message.success(response.data.message);
                this.props.onShow(false,'getlist')
            }
        }).catch((error) => {
            
            message.error(error.statusText);
        });

    }
    addButStatus(key,bl){
        let data = this.state.dataList;
        data[key].addStatus = bl;
        this.setState({
            dataList:data
        })
    }
    addSubItem(key){
        if(!this.refs[key].value.trim().length){
            message.error('请输入字段名')
            return
        }
        if(this.refs[key].value.trim().length>20){
            message.error('字段名过长 请限制在20字符以内')
            return
        }
        let data = this.state.dataList;
        data[key].addStatus = false;
        ajax.get('/hcm/hcmCustomModel/save', {
            params: {
                productClassifyId:this.state.id,
                fieldClassify:key.toLocaleUpperCase(),
                fieldname:this.refs[key].value,               
                module:'PRODUCT'
            }
        }).then((response) => {
            if(response.data.status=='10000'){
                response.data.data.sort =  this.num++;
                data[key].data.push(response.data.data)
                this.setState({
                    dataList:data
                })
            }
            message.success(response.data.message);
            
        }).catch((error) => {
            message.error(error.statusText);
        });

    }
    formAtDom = (type) =>{
        let arr = [];
        let data = this.state.dataList
        let showid = this.state.showid
        
        if(type){
            for (const key in data) {
                arr.push(
                    <div className='item' key={Math.random()}>
                        <p>{data[key].title}</p>
                        <div className='info'>
                            {
                                data[key].data.map((item,index)=>{
                                    if(item.edit){
                                        return (
                                            <div key={index} className='inputbox'>
                                                <input ref={item.id} defaultValue={item.fieldname} className='editinput'/>
                                               
                                                <span className='anticonbox'>
                                                    <Icon onClick={()=>this.onSubItem(key,index)} type="check" />
                                                    <Icon onClick={()=>this.onEdititem(key,item,index,false)} type="close" />
                                                </span>
                                                    
                                            </div>
                                            
                                        )
                                    }else{
                                        return (
                                            <div key={index} onMouseMove={()=>this.onMouseOver(key,item,index)} className='checkbox'>
                                                <Checkbox  onChange={(e)=>this.oCheckitem(e,key,item,index)} disabled={item.fieldRequired=='1'} checked={item.isChecked}><Tooltip placement="topLeft" title={item.fieldname}>{item.fieldname}</Tooltip></Checkbox>
                                                {item.fieldRequired=='1'  ? null:
                                                    item.id == showid ?
                                                    <span className='anticonbox'>
                                                        <Icon onClick={()=>this.onEdititem(key,item,index,true)} type="edit" />
                                                        <Popconfirm title={<div><p style={{fontWeight:'bold'}}>你确定要删除该字段吗？</p><p>删除后录入的信息会被删除</p></div>} onConfirm={()=>this.onRmitem(key,item,index)} okText="确定" cancelText="取消">
                                                            <Icon type="delete" />
                                                        </Popconfirm> 
                                                    </span>
                                                    :null
                                                }
                                            </div>
                                            
                                        )
                                    }
                                    
                                })
                            }
                            <div className='inputbox'>
                                {
                                   data[key].addStatus ? 
                                    <React.Fragment>
                                        <input ref={key} className='editinput'/>
                                        <span className='anticonbox'>
                                            <Icon onClick={()=>this.addSubItem(key)} type="check" />
                                            <Icon onClick={()=>this.addButStatus(key,false)} type="close" />
                                        </span>
                                    </React.Fragment>
                                    :
                                    <a onClick={()=>this.addButStatus(key,true)}><Icon style={{paddingRight:'6px'}} type="plus-circle-o" />新增</a>
                                }
                                
                                
                            </div>
                        </div>
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
            let data = this.state.dataList;
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
            this.setState({
                dataList:data
            })
        })
    }
    
    onDragStart = (info)=>{
        this.setState({
            stateID:info.node.props.eventKey
        })
        
    }
    canCelItem = (item)=>{
        console.log(item)
        this.oCheckitem({target:{checked:0}},item.target[0],item,item.target[1])
    }
    render() {
        let {visible} = this.state;
        let checkData = this.formAtDom(false).sort((a,b)=>a.sort-b.sort);
        return (
            <Modal
                title="设置表格"
                visible={this.props.visible}
                maskClosable={false} 
                onOk={()=>this.onSortSubmit()}
                onCancel={()=>this.props.onShow(false)}
                className='set-table-header'
                okButtonProps={{className:'btn2-main'}}
                cancelButtonProps={{className:'btn2-sub'}}
            >
                <div className='box'>
                    <div className='left'>
                        <p className='title'>可用字段</p>
                        <div className='items'>
                            {this.formAtDom(true)}
                        </div>
                    </div>
                    <div className='right'>
                        <p className='title'>已选字段</p>
                        <Tree
                                className="draggable-tree"
                                draggable
                                onDragStart={(e)=>this.onDragStart(e)}
                                onDrop={(e)=>this.onDrop(e)}
                            >
                                {
                                    checkData.map((item,index)=>{
                                        return (
                                           <TreeNode title={<div className='TreeNode-title'><span>{item.fieldname}</span>{item.fieldRequired=='1' ? null : <Icon onClick={()=>this.canCelItem(item)} type="close-circle" />}</div>} key={item.target.join(',')} />
                                        )
                                    })
                                }
                            </Tree>
                        <p className='footer'>按上下拖动可排序</p>    
                    </div>
                </div>
            </Modal>
        )
    }
}
export default App;
