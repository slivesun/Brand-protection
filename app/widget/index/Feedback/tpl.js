import {AddIcon} from '../../components/Component';
import ThatMain from '../../HOC/That';
import ContentBox from '../../components/Layout'
import {Breadcrumb,Button,Input,Table,Pagination,Icon} from 'antd';
// import Copyright from "../../components/Copyright";
const Search = Input.Search;
const Tpl = ThatMain((that) => {
    let {title,pageNo,pageSize,totalNum,dataList} = that.state;
    return (
        <ContentBox
            breadcrumbList={['个人中心', '工单信息']}
            linkList={['', '']}
        >
        <div className='feedback'>
            
            {/* <div className='Breadcrumb'>
                <Breadcrumb>
                    {
                        localStorage.logintype == 'ADMIN' ? 
                        null
                        :
                        <Breadcrumb.Item>个人中心</Breadcrumb.Item>
                    }
                    <Breadcrumb.Item>工单信息</Breadcrumb.Item>
                </Breadcrumb>
            </div> */}
           
            <div className='content'>
                <div className='search-box'>
                    <div>
                        {
                            localStorage.logintype == 'ADMIN' ? 
                            null
                            :
                            <a href='/index.html#/AddFeedback'>
                                <Button style={{color:'#fff'}} className='btn1-main addgd'><AddIcon style={{paddingRight:8}} />新增</Button>
                            </a>
                        }
                    </div>
                    <Search onSearch={()=>that.onSearch()} onChange={(e)=>that.onChange(e,'title')} value={title} placeholder={localStorage.logintype=='ADMIN' ? '请输入工单标题或提交用户' : '请输入工单标题'} style={{ width: 250 }}  />
                </div>
                <div className='content-tab'>
                    <Table rowKey='id' pagination={false}  columns={that.formatColumn()} dataSource={dataList} />
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