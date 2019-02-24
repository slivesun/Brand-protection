
import ThatMain from '../../HOC/That';
import ContentBox from '../../components/Layout'
import Copyright from "../../components/Copyright";
import { Breadcrumb,Alert, Input, Button, Select, DatePicker, Pagination,Icon,Tooltip } from 'antd';
const { RangePicker } = DatePicker;
const Option = Select.Option;
const Tpl = ThatMain((that) => {

    let { dataList, notice_title, user_name, noticeTypeList, notice_type, start_time, end_time, pageNo, pageSize, totalNum } = that.state;
    const clearIconStyle = {
        width: '14px',
        height: '14px',
        opacity: 0.25,
        cursor: 'pointer'
    }
    const clearIcon = fieldName => (
        that.state[fieldName]&&that.state[fieldName].length?
        <Icon
            type="close-circle"
            onClick={()=>that.handleClearIconClick(fieldName)}
            style={clearIconStyle}
        />
        :null
    )
    return (
        <ContentBox
            breadcrumbList={['通知公告']}
            linkList={['']}
        >
        <div className='Announcements'>
            {/* <div className='Breadcrumb'>
                <Breadcrumb>
                    
                    <Breadcrumb.Item>通知公告</Breadcrumb.Item>
                </Breadcrumb>
            </div> */}
            <div className='content'>
                <div className='search-box'>
                    <div className='input-box'>
                        <div className='item'>
                            <span className='lab'>公告主题:</span>
                            <Input onChange={(e) => that.chSearchIpt(e, 'notice_title')} value={notice_title} suffix={clearIcon('notice_title')} className='ipt' />
                        </div>
                        <div style={{position: 'relative'}} id="alert-type" className='item'>
                            <span className='lab'>公告类型:</span>
                            <Select
                                style={{ width: '100%' }}
                                showSearch
                                placeholder='请选择'
                                getPopupContainer={() => document.getElementById('alert-type')}
                                value={notice_type}
                                onChange={(value, label, extra) => that.chTreeSelect(value, label, extra, 'notice_type')}

                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                <Option value={null}>{'全部'}</Option>
                                {
                                    noticeTypeList.map((item, index) => {
                                        return (
                                            <Option key={index} value={item.id}>{item.dictName}</Option>
                                        )
                                    })
                                }

                            </Select>
                        </div>
                        <div style={{ width: '35%',justifyContent:'flex-end' }} className='item'>
                            <span className='lab'>提交时间:</span>
                            <RangePicker
                                onChange={(e) => that.onRangePicker(e)}
                                value={[start_time, end_time]}
                                format={'YYYY-MM-DD'}
                            />
                        </div>
                    </div>
                    <div className='input-box'>
                        <div className='item'>
                            {
                                localStorage.logintype == "HCM" ? 
                                    <React.Fragment>
                                    <span className='lab'>发布人:</span>
                                    <Input onChange={(e) => that.chSearchIpt(e, 'user_name')} value={user_name} suffix={clearIcon('user_name')} className='ipt' />
                                    </React.Fragment>
                                :null
                            }
                        </div>

                        <div style={{ justifyContent: 'flex-end' }} className='item'>
                            <Button className="btn6" onClick={e => that.onSearch()}>查询</Button>
                        </div>
                    </div>
                </div>

                <div className='infolist'>
                    {
                        localStorage.logintype == "HCM"||localStorage.logintype == "HCMSUB" ? 
                        <a className='addbut' href='/index.html#/AddAnnouncement'>
                            <Button style={{ width: '100%' }} type="dashed">新增 </Button>
                        </a>
                        :null
                    }
                    <ul className='items'>
                        {
                            dataList.length ?
                            dataList.map((item, index) => {
                                let {isread,notice_title,notice_content,notice_typename,user_name,noticeDepartsList=[],createtime} = item;
                                let div = document.createElement('div');
                                div.innerHTML = notice_content;

                                return (
                                    <li key={index} className='item'>
                                        <h5 className={isread ? 'title ':'title state'}><a href={`/index.html#/InfoAnnouncement/${item.id}`}>{notice_title}</a></h5>
                                        <p className='text-info'>
                                            {
                                                div.innerText.length > 300 ?
                                                div.innerText.substring(0,300)+'...'
                                                :
                                                div.innerText
                                            }
                                        </p>
                                        <footer>
                                            <div style={{display:'flex',width:'100%'}}>
                                                <span >{notice_typename}<i style={{borderRight:"1px solid #D9D9D9",marginLeft:'16px'}}></i></span>
                                                <span>{moment(createtime).format('YYYY-MM-DD HH:mm:ss')}<i style={{borderRight:"1px solid #D9D9D9",marginLeft:'16px'}}></i></span>
                                                
                                                {
                                                    localStorage.logintype == "HCM"||localStorage.logintype == "HCMSUB" ? 
                                                    <React.Fragment>
                                                        <span>From：{user_name}<i style={{borderRight:"1px solid #D9D9D9",marginLeft:'16px'}}></i></span>
                                                        <Tooltip overlayStyle={{maxWidth:'inherit'}} placement="bottom" title={`To：${noticeDepartsList.map((item,index)=>item.depart_name)}、`}>
                                                            <span className='departs'>To：{ noticeDepartsList.map((item,index)=>item.depart_name+' 、')}</span>
                                                        </Tooltip>
                                                    </React.Fragment>
                                                    :
                                                    null
                                                    
                                                }
                                                
                                            </div>
                                            {
                                                localStorage.logintype == "HCM"||localStorage.logintype == "HCMSUB" ? 
                                                    <span onClick={()=>that.rmDepart(item)} className='AnnDEL' >
                                                        {/* <Icon  type="delete" /> */}
                                                        <i ></i>
                                                    </span>
                                                :
                                                    null
                                            }
                                        </footer>
                                    </li>
                                )
                            })
                            :
                             <li style={{width:'100%'}}><Alert style={{textAlign:'center'}} message="暂无数据" type="error" /></li>
                        }

                    </ul>


                    <div className='footer'>
                        <div className='info'>
                            {`共 ${totalNum} 条记录 `}
                            &nbsp;&nbsp;
                        {`第  ${pageNo}  / ${Math.ceil(totalNum / pageSize)} 页`}
                        </div>
                        <Pagination pageSize={pageSize} current={pageNo} total={totalNum} onChange={that.changePagination} onShowSizeChange={that.onPaginationSize} showSizeChanger showQuickJumper />
                    </div>
                </div>

            </div>
            {/* <Copyright clazzName='copyright' /> */}
        </div>
        </ContentBox>

    )
})

export default Tpl