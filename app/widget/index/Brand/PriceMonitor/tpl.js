
import ThatMain from '../../../HOC/That';
import ContentBox from '../../../components/Layout'
import Copyright from "../../../components/Copyright";
import { Breadcrumb, Dropdown, Menu, Icon, Divider, Avatar, Modal, Select, TimePicker, Button, Alert } from 'antd';
const Option = Select.Option;
const Tpl = ThatMain((that) => {
    let { dataList = [], totalElements, pageSize, pageNum } = that.state;
    return (
        <ContentBox
            breadcrumbList={['数据中心', '售价监控']}
            linkList={['', '']}
        >
        <div className='price-monitor'>
            {/* <div className='Breadcrumb'>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        数据中心
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>售价监控</Breadcrumb.Item>
                </Breadcrumb>
            </div> */}
            <div className='content'>
                <ul className='items'>
                    {
                        dataList.length ?
                            dataList.map((item, index) => {
                                let { id, productClassifyName, platform_name, frequency, monitorDate } = item;
                                return (
                                    <li onClick={(e) => {
                                        if (e.target.tagName.toLocaleLowerCase() !== 'a') {
                                            window.location.href = `/index.html#/MonitorInfo/${id}`;
                                        }
                                    }
                                    } className='item' key={index}>
                                        <div className='action'>
                                            <Dropdown placement='bottomRight' overlay={<Menu>
                                                <Menu.Item>
                                                    <a className='A-COLOR' onClick={() => that.editVisible(true, item)}>
                                                        <img style={{ verticalAlign: 'text-bottom', paddingRight: '4px' }} src='../../../img/icon/icon_operating_edit.png' />
                                                        编辑
                                                    </a>
                                                </Menu.Item>
                                                <Menu.Item>
                                                    <a className='A-COLOR' onClick={() => that.chAngeHis(item)} >
                                                        <img style={{ verticalAlign: 'text-bottom', paddingRight: '4px' }} src='../../../img/icon/icon_operating_history.png' />
                                                        变更历史
                                                    </a>
                                                </Menu.Item>
                                            </Menu>}>
                                                <Icon onClick={(e) => { e.stopPropagation() }} type="ellipsis" />
                                            </Dropdown>
                                        </div>
                                        <div style={{ paddingBottom: '20px' }}>
                                            <Avatar style={{ backgroundColor: '#108CEE', margin: '0px 20px' }} size={40}>{productClassifyName.substr(0, 1)}</Avatar>
                                            <span>{productClassifyName}</span>
                                        </div>
                                        <div className='footer-buts'>
                                            <span>{platform_name}</span>
                                            <Divider type="vertical" />
                                            <span>{frequency}</span>
                                            <Divider type="vertical" />
                                            <span>{monitorDate}</span>
                                        </div>
                                    </li>
                                )
                            })
                            :
                            <li style={{ width: '100%' }}><Alert style={{ textAlign: 'center' }} message="暂无数据" type="error" /></li>
                    }
                </ul>
                <div style={{ textAlign: 'center' }} className='addbut'>
                    {
                        !dataList.length || (pageNum * pageSize >= totalElements) ? null :
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



export default Tpl

const TimeModal = ThatMain((that) => {
    let { visible, classfiyUpdate } = that.state;
    const format = 'HH:mm'
    return (
        <Modal
            title="编辑"
            visible={visible}
            maskClosable={false} 
            onOk={() => that.editSubmit()}
            onCancel={() => that.editVisible(false)}
            // className='YellowWhite'
            okButtonProps={{className:'btn2-main'}}
            cancelButtonProps={{className:'btn2-sub'}}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
            <div style={{ display: 'flex', alignItems: 'center', paddingBottom: '20px' }}>
                <span style={{ flexShrink: 0, minWidth: '100px', textAlign: 'right' }}>平台：</span>
                <Select onChange={(e) => that.editOnchange(e, 'platform_code')} style={{ width: '100%' }} value={classfiyUpdate.platform_code}>
                    <Option value={'1'}>淘宝</Option>
                </Select>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', paddingBottom: '20px' }}>
                <span style={{ flexShrink: 0, minWidth: '100px', textAlign: 'right' }}>频次：</span>
                <Select onChange={(e) => that.editOnchange(e, 'frequency')} style={{ width: '100%' }} value={classfiyUpdate.frequency}>
                    <Option value={'1次/24H'}>1次/24H</Option>
                </Select>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', paddingBottom: '20px' }}>
                <span style={{ flexShrink: 0, minWidth: '100px', textAlign: 'right' }}>监控时间：</span>
                <TimePicker style={{ width: '100%' }} value={classfiyUpdate.monitorDate} onChange={(e) => that.editOnchange(e, 'monitorDate')} format={format} minuteStep={60} />
            </div>
        </Modal>
    )
})