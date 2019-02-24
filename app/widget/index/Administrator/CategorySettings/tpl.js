import ThatMain from '../../../HOC/That';
import Copyright from "../../../components/Copyright";
import { Button,Input,Breadcrumb , Popconfirm, message} from 'antd';



const Tpl = ThatMain((that) => {

    let { dictName, dictType,addState,dataList} = that.state;

    return (
        <div className='category-settings'>
            <div className='Breadcrumb'>
            <Breadcrumb>
                <Breadcrumb.Item>系统设置</Breadcrumb.Item>
                <Breadcrumb.Item>行业类目设置</Breadcrumb.Item>
            </Breadcrumb>
            </div>
            <div className='content'>
                <div>
                <Button disabled={addState} className='addbut' onClick={()=>that.addBoxState(true)} type="dashed">+新增类目</Button>
                </div>
                <ul className='listbox'>
                    {
                        addState?
                        <li className='add'>
                            <div style={{flexBasis:'260px'}}>
                                <Input onChange={e=>that.addChangev(e,'dictName')} value={dictName} placeholder='请输入行业类目名称'/>
                            </div>
                            <div style={{flexBasis:'260px'}}>
                                <Input onChange={e=>that.addChangev(e,'dictType')} value={dictType} placeholder='请输入行业类目对应关键字'/>
                            </div>
                            <div className='operation'>
                                <a onClick={()=>that.subAdd()} >保存</a>
                                <a onClick={()=>that.addBoxState(false)}>取消</a>
                            </div>
                        </li>
                        :null
                    }
                    {
                        dataList.map((item,index)=>{
                            return(
                                <li key={index} className='item'>
                                    <div style={{flexBasis:'260px'}}>
                                        {
                                            item.status ? 
                                            <Input onChange={e=>that.editChangev(e,index,'dictName')} value={item.dictName}/>
                                            :
                                            item.dictName
                                        }

                                    </div>
                                    <div style={{flexBasis:'260px'}}>
                                        {
                                            item.status ? 
                                            <Input onChange={e=>that.editChangev(e,index,'pricename')} value={item.pricename}/>
                                            :
                                            item.pricename
                                        }
                                    </div>
                                    {
                                        item.status ? 
                                        <div className='operation'>
                                            <a onClick={()=>that.saveDict(item)} >保存</a>
                                            <a onClick={()=>that.editDict(item,index,false)} >取消</a>
                                        </div>
                                        :
                                        <div className='operation'>
                                            <a onClick={()=>that.editDict(item,index,true)}>编辑</a>
                                            <Popconfirm title="确定删除此条记录吗？" onConfirm={()=>that.rmDict(item)} okText="确定" cancelText="取消">
                                                <a>删除</a>
                                            </Popconfirm>
                                        </div>
                                    }
                                    
                                </li>
                            )
                        })
                    }

                </ul>
            </div>
            <Copyright clazzName='copyright' />
        </div>
    )

})


export default Tpl