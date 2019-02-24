
import ThatMain from '../../../HOC/That';
// import Copyright from "../../../components/Copyright";
import ContentBox from '../../../components/Layout'

import { Breadcrumb, Button, Select, Input, Icon, Modal, Menu, Dropdown, TimePicker, Tooltip } from 'antd';
const Option = Select.Option;
const Tpl = ThatMain((that) => {
    let { dataList, addStatus, addDroductClassifyName, productClassifyName, pageNo, pageSize, totalElements } = that.state;
    const clearIconStyle = {
        width: '14px',
        height: '14px',
        opacity: 0.25,
        cursor: 'pointer'
    }
    const clearIcon = fieldName => (
        that.state[fieldName] && that.state[fieldName].length ?
            <Icon
                type="close-circle"
                onClick={() => that.handleClearIconClick(fieldName)}
                style={clearIconStyle}
            />
            : null
    )
    return (
        <ContentBox 
      title="活动详情" 
      breadcrumbList={['售价公示']}
      linkList={['']}
      history={that.props.history}
    >
        <div className='pricenotice'>
            {/* <div className='Breadcrumb'>
                <Breadcrumb>
                    
                    <Breadcrumb.Item>售价公示</Breadcrumb.Item>
                </Breadcrumb>
            </div> */}
            <div className='content'>
                <div className='header-search'>
                    {/* <p><Icon type="sound" className='icon-sound' theme="outlined" /></p> */}
                    <p><img src="../../../../img/laba.png" style={{margin: "0 5px",float: "left"}} alt=""/><b>常用分类方式有，品牌；品类；系列等。请选择一种最适合的分类去管理。</b></p>
                    <div className='search-info'>
                        <span className='item'>产品分类：</span>
                        <Input placeholder="请输入" onChange={(e) => that.onChange(e, 'productClassifyName')} value={productClassifyName} suffix={clearIcon('productClassifyName')} style={{ width: 200 }} className='item' />
                        <Button onClick={() => that.onSearch()} className='btn6 item'>查询</Button>
                        <a className='item' href='/index.html#/ChangeHistory/HcmProductClassify'>
                            <Button>变更历史</Button>
                        </a>
                    </div>
                </div>
                <div className='item-list'>
                    <div onClick={() => that.onAddStatus(true)} className='item add-but'>

                        <Icon type="plus" />
                        新增分类
                    </div>
                    {
                        addStatus ?
                            <div className='item add-box'>
                                <Input onChange={(e) => that.onChange(e, 'addDroductClassifyName')} value={addDroductClassifyName} className='addipt' placeholder='请输入分类名称' />

                                <div className='iptbut'>
                                    <Icon onClick={() => that.onAddStatus(false)} type="close" />
                                    <Icon onClick={() => that.addSubmit()} type="check" />
                                </div>
                            </div>
                            : null
                    }
                    {
                        dataList.map((item, index) => {
                            return (
                                <div onClick={(e) => {
                                    if (e.target.tagName.toLocaleLowerCase() !== 'a') {
                                        window.location.href = `/index.html#/ProductInfo/${item.id}/${item.productClassifyName}`;
                                    }
                                }
                                } key={index} className='item'>
                                    <div className='status'>
                                        <img src={`../../../../img/monitoring-${item.monitorState}.png`} />
                                    </div>
                                    <div className='info'>
                                        <div className='box'>
                                            <Tooltip placement="top" title={item.productClassifyName}>
                                                <span className={item.readid ? 'title' : 'title read'}>{item.productClassifyName}</span>
                                            </Tooltip>

                                            {
                                                item.monitorState ? null :
                                                    <a onClick={(e) => { that.onVisible(true, item); e.stopPropagation() }} className='but'>一键监控</a>
                                            }

                                        </div>
                                    </div>
                                    <div className='action'>
                                        <Dropdown placement='bottomRight' overlay={<Menu>
                                            <Menu.Item>
                                                <a className='A-COLOR' href={`/index.html#/MonitorInfo/${item.id}`}>
                                                    <img style={{ verticalAlign: 'text-bottom', paddingRight: '6px' }} src='../../../img/icon/icon_operating_Details.png' />
                                                    低价详情
                                                </a>
                                            </Menu.Item>
                                            {
                                                item.monitorState ?
                                                    <Menu.Item>
                                                        <a className='A-COLOR' onClick={(e) => { that.onMonitorStop(item); }}>
                                                            <img style={{ verticalAlign: 'text-bottom', paddingRight: '6px' }} src='../../../img/icon/icon_operating _stop.png' />
                                                            停止监控
                                                        </a>
                                                    </Menu.Item>
                                                    : null
                                            }
                                            <Menu.Item>
                                                <a className='A-COLOR' onClick={(e) => { that.onEditItem(item); }}>
                                                    <img style={{ verticalAlign: 'text-bottom', paddingRight: '6px' }} src='../../../img/icon/icon_operating_edit.png' />
                                                    编辑
                                                </a>
                                            </Menu.Item>
                                            <Menu.Item>
                                                <a className='A-COLOR' onClick={(e) => { that.onRmItem(item); }}>
                                                    <img style={{ verticalAlign: 'text-bottom', paddingRight: '6px' }} src='../../../img/icon/icon_operating_del.png' />
                                                    删除
                                                </a>
                                            </Menu.Item>
                                        </Menu>}>
                                            <Icon onClick={(e) => { e.stopPropagation() }} type="ellipsis" />
                                        </Dropdown>
                                    </div>
                                </div>
                            )
                        })
                    }



                </div>
                <div className='addbut'>
                    {
                        pageNo * pageSize >= totalElements ? null :
                            <Button onClick={() => that.getMore()}>加载更多...</Button>
                    }

                </div>
            </div>
            {/* <Copyright clazzName='copyright' /> */}
            <TimeModal that={that} />
            
        </div>
        </ContentBox>
    )
})
const TimeModal = ThatMain((that) => {
    let { visible, classfiyUpdate } = that.state;
    const format = 'HH:mm'
    return (
        <Modal
            title="设置时间"
            visible={visible}
            maskClosable={false} 
            onOk={() => that.onUpdateMonitoring(false)}
            onCancel={() => that.onVisible(false)}
            okButtonProps={{className:'btn2-main'}}
            cancelButtonProps={{className:'btn2-sub'}}

            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
            <div style={{ display: 'flex', alignItems: 'center', paddingBottom: '20px' }}>
                <span style={{ flexShrink: 0, minWidth: '100px', textAlign: 'right',color:'#333' }}>平台：</span>
                <Select onChange={(e) => that.editOnchange(e, 'platform_code')} style={{ width: '100%' }} value={classfiyUpdate.platform_code}>
                    <Option value={1}>淘宝</Option>
                </Select>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', paddingBottom: '20px' }}>
                <span style={{ flexShrink: 0, minWidth: '100px', textAlign: 'right',color:'#333'  }}>频次：</span>
                <Select onChange={(e) => that.editOnchange(e, 'frequency')} style={{ width: '100%' }} value={classfiyUpdate.frequency}>
                    <Option value={'1次/24H'}>1次/24H</Option>
                </Select>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', paddingBottom: '20px' }}>
                <span style={{ flexShrink: 0, minWidth: '100px', textAlign: 'right',color:'#333'  }}>监控时间：</span>
                <TimePicker style={{ width: '100%' }} value={classfiyUpdate.MonitorDate} onChange={(e) => that.editOnchange(e, 'MonitorDate')} format={format} minuteStep={60} />
            </div>
        </Modal>
    )
})
export default Tpl