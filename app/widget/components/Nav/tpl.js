
import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;

import ThatMain from '../../HOC/That';

const Tpl = ThatMain((that) => {

    let { collapsed, menulist = [],location,currentBrand} = that.props;
    let tarUrl = {}
    that.formAt().forEach((item,index)=>{
        
        if(location.pathname==item.menuUrl){
            tarUrl = that.formAt()[index]
        }else if(item.remark){
            if(location.pathname.indexOf(item.remark)!= -1){
                tarUrl = that.formAt()[index]
            } 
        }
    })
    // 停约状态
    const STOP_STATUS = {
        normal: 1,
        stop: 2
    }
    let {apply_status = 'DISAGREE', status = 1,Bmcstatus} = that.props.currentBrand;
    let disabled = false;
    if (localStorage.getItem('logintype') === 'DEALER') {
        disabled = !apply_status ? false : Bmcstatus== 0 ? true : (apply_status == 'APPROVED' && status === STOP_STATUS.normal) ? false :true;
    }else if(localStorage.getItem('logintype') === 'HCM'){
        
        disabled = localStorage.catid == "null" ? true : false;
    }
    return (
        <div style={!collapsed ? { width: '200px' } : {width: 'inherit'}} className='navmenu'>
            <h1 className={!collapsed ? 'show' : 'hide'}></h1>
            
            <Menu
                mode="inline"
                theme="dark"
                selectedKeys={[`${tarUrl.menuIcon=='null' ? +(tarUrl.menuName.split(',')[1]):tarUrl.id}`]}
                inlineCollapsed={collapsed}
                openKeys={that.state.openKeys}
                onOpenChange={that.onOpenChange}
            >
            {
                menulist.data?
                menulist.data.map((item, index) => {
                    if (item.children !== null&&item.menuUrl == 'false') {
                        
                        return (
                            <SubMenu disabled={item.menuState == '1' ? disabled : true} key={item.id} title={<span><Icon style={that.oStyle(item,tarUrl)} type="link" /><span>{item.menuName}</span></span>}>
                                {
                                    item.children.map((item2,index2)=>{
                                        if(item2.menuIcon=='null'){
                                            return null
                                        }
                                        if(item2.children !== null&&item2.menuUrl == 'false'){
                                            return(
                                                <SubMenu className='menu-level-2' disabled={item2.menuState == '1' ? disabled : true} key={item2.id} title={<span ostyle={that.oStyle(item2,tarUrl)} className='item-C le2'><span >{item2.menuName}</span></span>}>
                                                    {
                                                        item2.children.map((item3,index3)=>{
                                                            if(item3.menuIcon=='null'){
                                                                return null
                                                            }
                                                            return(
                                                                <Menu.Item disabled={item3.menuState == '1' ? disabled : true} key={item3.id}>
                                                                    <a className='item-B' href={'/index.html#'+item3.routePath}>
                                                                        <span style={{marginLeft:'20px'}}>{item3.menuName}</span>
                                                                    </a>
                                                                </Menu.Item>
                                                            )
                                                        })
                                                    }
                                                   
                                                </SubMenu>
                                            )
                                        }else{
                                            return(
                                                <Menu.Item disabled={item2.menuState == '1' ? disabled : true} key={item2.id}>
                                                    <a className='item-B' href={'/index.html#'+item2.routePath}>
                                                        <span style={{marginLeft:'20px'}}>{item2.menuName}</span>
                                                    </a>
                                                </Menu.Item>
                                            )
                                        }
                                        
                                    })
                                }
                            </SubMenu>
                        )
                    } else {
                        
                        return (
                            <Menu.Item disabled={item.menuState == '1' ? disabled : true} key={item.id}>
                                <a href={'/index.html#'+item.routePath}>
                                    <Icon style={that.oStyle(item,tarUrl)} type="link" />
                                    <span>{item.menuName}</span>
                                </a>
                            </Menu.Item>
                        )
                    }

                })
                :null
            }
            </Menu>
            
        </div>
    )
})
export default Tpl