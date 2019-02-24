import { Modal, Icon } from 'antd';
import ThatMain from '../../HOC/That';
import {Tree} from 'antd';
const TreeNode = Tree.TreeNode;
const Tpl = ThatMain((that) => {
    let {data,visible,clazzName,setTableStatus,onSubmit} = that.props;
    let checkData = that.formAtDom(false).sort((a,b)=>a.sort-b.sort);
    
    return (
        <Modal
            maskClosable={false} 
            title={'设置表格'}
            className={clazzName}
            visible={visible}
            onCancel={()=>setTableStatus(false)}
            onOk={()=>onSubmit(checkData)}
            okButtonProps={{className:'btn2-main'}}
            cancelButtonProps={{className:'btn2-sub'}}
        >
            <div className='set-table-box'>
                <div className='info'>
                    <h3>可用字段</h3>
                    <div className='box'>
                        {that.formAtDom(true)}
                    </div>
                </div>
                <div className='sort'>
                    <p>已选字段</p> 
                            <Tree
                                className="draggable-tree"
                                draggable
                                
                                onDragStart={(e)=>that.onDragStart(e)}
                                onDrop={(e)=>that.onDrop(e)}
                            >
                                {
                                    checkData.map((item,index)=>{
                                        return (
                                           <TreeNode  title={<div className='TreeNode-title'><span>{item.fieldname}</span>{item.fieldRequired=='1' ? null : <Icon onClick={()=>that.canCelItem(item)} type="close-circle" />}</div>} key={item.target.join(',')} />
                                        )
                                    })
                                }
                            </Tree>
                    <h6>按住上下拖动可排序</h6>
                </div>
                
            </div>
        </Modal>
    )
})
export default Tpl