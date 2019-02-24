import './DownloadProgress.less'
import ThatMain from '../../../HOC/That';
import ContentBox from '../../../components/Layout'
import Copyright from "../../../components/Copyright";
import { Breadcrumb, Tooltip, Button, Input, Select, DatePicker, Form, Pagination, Table } from 'antd';
const FormItem = Form.Item;
const Tpl = ThatMain((that) => {


    const { getFieldDecorator } = that.props.form;
    return (
        <ContentBox
            breadcrumbList={['检索中心', '店铺内检索', "下载记录"]}
            linkList={['', '', '']}
        >
            <div className='DownloadProgress'>
                {/* <div className="Breadcrumb">
                <Breadcrumb >
                    <Breadcrumb.Item>
                        检索中心
                            </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        店铺内检索
                            </Breadcrumb.Item>
                </Breadcrumb>
            </div> */}

                <div className='content'>
                    <div className='contentTop'>
                        <div className="ProductInformationFooter">
                            <div className='footer' style={{padding:"10px"}}>
                                <div className='info'>

                                </div>
                              <Button type="primary" onClick={that.downLoads}>手工刷新查看最新进度</Button>
                            </div>
                        </div>
                        <Table
                            pagination={false}
                            rowKey="current_page"
                            scroll={{ x: (that.state.ProductInformation_list.length - 1) * 200 }}
                            columns={that.state.ProductInformation_list}
                            dataSource={that.state.data}
                        />
                        <div className="ProductInformationFooter">
                            <div className='footer'>
                                <div className='info'>
                                    {`共 ${that.state.totalNum} 条记录 `}
                                    &nbsp;&nbsp;
                        {`第  ${that.state.pageNo}  / ${Math.ceil(that.state.totalNum / that.state.pageSize)} 页`}

                                </div>
                                <Pagination pageSize={that.state.pageSize} current={that.state.pageNo} total={that.state.totalNum} onChange={that.changePagination} onShowSizeChange={that.onPaginationSize} showSizeChanger showQuickJumper />

                            </div>
                        </div>
                    </div>


                </div>
                {/* <Copyright clazzName='copyright' /> */}
            </div>
        </ContentBox>
    )
})

export default Tpl