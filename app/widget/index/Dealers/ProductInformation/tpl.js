import './ProductInformation.less'
import ThatMain from '../../../HOC/That';
import ContentBox from '../../../components/Layout';
import { Table, Input, Button,Icon, Pagination,Breadcrumb, Form } from 'antd';
const Tpl = ThatMain((that) => {

    const FormItem = Form.Item;
    const { getFieldDecorator,getFieldValue } = that.props.form;
    document.getElementsByClassName("ant-btn-primary").style = "submit"
    const clearIconStyle = {
        width: '14px',
        height: '14px',
        opacity: 0.25,
        cursor: 'pointer'
    }
    return (
        <ContentBox 
        breadcrumbList={['售价公示',that.state.tit]}
        linkList={['1', '']}
        history={that.props.history}
        >
        <div className='ProductInformation'>
            {/* <div className="InformationNav">
                <Breadcrumb>
                    <Breadcrumb.Item><a href="/index.html#/PricePublicity">售价公示</a></Breadcrumb.Item>
                    <Breadcrumb.Item>{that.state.tit}</Breadcrumb.Item>
                </Breadcrumb>
            </div> */}
            <div className="ProductInformationBOX">
                <div className="ProductInformationHeader">
                    <Form onSubmit={that.ForgetSubmit} className="forget-form" style={{width:"100%", height:"40px",display: "inline-block",height: "40px" }}>
                        <div className="FORMtit" style={{position: "relative",height: "40px"}}> <div className="FORMus" style={{ width: "auto",height: "60px", float: "left", lineHeight: "40px",marginLeft:"30px" }}>品牌：</div>
                            <FormItem className="tops"
                                style={{
                                    width: "150px",
                                    height: "60px",
                                    float: "left", borderRadius: "2px"
                                }}>
                                {getFieldDecorator('brandName')(
                                    <Input className='user-name'
                                        placeholder="请输入"
                                        suffix={!!getFieldValue("brandName") ? <Icon
                                        type="close-circle"
                                        onClick={() => that.handleClearIconClicks()}
                                        style={clearIconStyle}
                                    />:null}
                                    />
                                )}
                            </FormItem>
                            <div className="FORMus" style={{ width: "auto", height: "60px", float: "left", lineHeight: "40px",marginLeft:"30px" }}>品名：</div>
                            <FormItem className="tops"
                                style={{
                                    width: "150px",
                                    height: "60px",
                                    float: "left", borderRadius: "2px"
                                }}>
                                {getFieldDecorator('productName')(
                                    <Input className='user-name'
                                        placeholder="请输入"
                                        suffix={!!getFieldValue("productName") ? <Icon
                                        type="close-circle"
                                        onClick={() => that.handleClearIconClick()}
                                        style={clearIconStyle}
                                    />:null}
                                    />
                                )}
                            </FormItem>
                            <FormItem style={{ float: "left",right: "10px",top: "5px", position: "absolute" }}>
                                <Button  className="btn6" htmlType="submit">查询</Button>
                            </FormItem>
                        </div>
                    </Form>
                </div>
                <div className="ProductInformationBody">
                    <Table
                        pagination={false}
                        rowKey="id"
                        scroll={ { x: (that.state.ProductInformation_list.length-1)*200}} 
                        columns={that.state.ProductInformation_list}
                        dataSource={that.state.data}
                        loading={that.state.loading}
                        onChange={that.handleTableChange}
                    />

                </div>
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

            {/* <Footer className='Copyright'></Footer> */}

        </div>
        </ContentBox>
    )
})
export default Tpl