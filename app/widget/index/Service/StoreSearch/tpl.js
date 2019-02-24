import './StoreSearch.less'
import ThatMain from '../../../HOC/That';
import ContentBox from '../../../components/Layout'
import Copyright from "../../../components/Copyright";
import { Breadcrumb, Tooltip, Button, Input, Select, DatePicker, Form, Pagination, Table } from 'antd';
const FormItem = Form.Item;
const Tpl = ThatMain((that) => {


    const { getFieldDecorator } = that.props.form;
    return (
        <ContentBox
            breadcrumbList={['检索中心', '店铺内检索']}
            linkList={['', '']}
        >
        <div className='StoreSearch'>
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
                    <div style={{ textAlign: "center", width: "100%", height: "80px", lineHeight: "40px" }}>
                        <span className="Contentit">淘宝天猫</span>
                        <span className="Contentits">
                            <Form onSubmit={that.ForgetSubmit} className="forget-form">
                                <div className="ContentDIV">
                                    <FormItem className="tops">
                                        {getFieldDecorator('DPandWW_name')(
                                            <Input className='user-name'
                                                placeholder="请输入店铺/旺旺名称"
                                            />
                                        )}
                                    </FormItem>
                                </div>
                                <div className="ContentDIVS">
                                    <FormItem className="tops">
                                        <Button type="primary" htmlType="submit">搜索</Button>
                                        
                                    </FormItem>

                                </div>
                            </Form>
                        </span>
                    </div>
                    <div>
                        <div className='footer'>
                            <div className='info'>
                                {`共 ${that.state.totalNum} 条记录 `}
                                &nbsp;&nbsp;
                        {`第  ${that.state.pageNo}  / ${Math.ceil(that.state.totalNum / that.state.pageSize)} 页`}

                            </div>
                            <Button type="primary" onClick={that.downLoad}>下载数据</Button>
                          
                            <Button type="primary"  style={{marginLeft:"10px"}}> <a href="/index.html#/DownloadProgress" style={{color:"#fff"}}>下载记录</a> </Button>
                        </div>

                    </div>
                    <Table
                        pagination={false}
                        rowKey="id"
                        scroll={{ x: (that.state.ProductInformation_list.length - 1) * 200 }}
                        columns={that.state.ProductInformation_list}
                        dataSource={that.state.data}
                    />
                    <div className="ProductInformationFooter">
                        <div className='footer'>
                            <div className='info'>
                            </div>
                            <Pagination pageSize={that.state.pageSize} pageSizeOptions={["10","20"]} current={that.state.pageNo} total={that.state.totalNum} onChange={that.changePagination} onShowSizeChange={that.onPaginationSize} showSizeChanger showQuickJumper />

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