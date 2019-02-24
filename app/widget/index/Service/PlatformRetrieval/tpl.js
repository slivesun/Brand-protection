import './PlatformRetrieval.less'
import ThatMain from '../../../HOC/That';
import ContentBox from '../../../components/Layout'
import Copyright from "../../../components/Copyright";
import { Breadcrumb, Tooltip, Modal, Checkbox, Button, Input, Select, DatePicker, Form, Pagination, Table } from 'antd';
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

const Tpl = ThatMain((that) => {


    const { getFieldDecorator } = that.props.form;
    const styleX = {
        float: "left",
        marginLeft: "50px",
        color: "dodgerblue",
        cursor: "pointer",
        borderBottom: "2px solid dodgerblue"
    }
    const styleS = {
        color: "rgba(0, 0, 0, 0.65)",
        float: "left",
        marginLeft: "50px",
        cursor: "pointer",
        height: "25px",
        borderBottom: "2px solid #fff"
    }
    const plainOptions = [
        { label: '淘宝网', value: 'taobao' },
        { label: '天猫商城', value: 'tianmao' }
    ];
    return (
        <ContentBox
            breadcrumbList={['检索中心', '平台检索']}
            linkList={['', '']}
        >
        <div className='PlatformRetrieval'>
            {/* <div className="Breadcrumb">
                <Breadcrumb>
                    <Breadcrumb.Item>
                        检索中心
                            </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        平台检索
                            </Breadcrumb.Item>
                </Breadcrumb>
            </div> */}

            <div className='content'>
                <div className='contentTop'>
                    <div style={{margin:'o auto'}}>
                        <ul className="ULTop" style={{width:'875px',marginTop:'20px',height:'60px',position:'relative'}}>
                            <li style={{margin:'25px'}} style={that.state.styleSX == "淘宝天猫" ? styleX : styleS} onClick={() => that.styleSXbtn("淘宝天猫")}>淘宝天猫</li>
                            <li style={that.state.styleSX == "1688网" ? styleX : styleS} onClick={() => that.styleSXbtn("1688网")}>1688网</li>
                            <li style={that.state.styleSX == "闲鱼" ? styleX : styleS} onClick={() => that.styleSXbtn("闲鱼")}>闲鱼</li>
                            <li style={that.state.styleSX == "拼多多" ? styleX : styleS} onClick={() => that.styleSXbtn("拼多多")}>拼多多</li>
                            <li style={that.state.styleSX == "京东商城" ? styleX : styleS} onClick={() => that.styleSXbtn("京东商城")}>京东商城</li>
                            <li style={that.state.styleSX == "苏宁易购" ? styleX : styleS} onClick={() => that.styleSXbtn("苏宁易购")}>苏宁易购</li>
                            <li style={that.state.styleSX == "当当网" ? styleX : styleS} onClick={() => that.styleSXbtn("当当网")}>当当网</li>
                            <li style={that.state.styleSX == "唯品会" ? styleX : styleS} onClick={() => that.styleSXbtn("唯品会")}>唯品会</li>
                            <div style={{ marginLeft: "235px", marginBottom: "20px",position:'absolute',top:'26px',left:'-80px',marginTop:'10px'}}>
                        {
                            that.state.styleSX == "淘宝天猫"
                                ? <CheckboxGroup options={plainOptions} defaultValue={that.state.TBTM} onChange={that.onChange} />
                                : null
                        }
                    </div>
                        </ul>
                    </div>
        
                    
                    <div style={{ textAlign: "center" }}>
                        <span className="Contentits" style={{marginTop:'17px'}}>
                            <Form onSubmit={that.ForgetSubmit} className="forget-form">
                                <div className="ContentDIV">
                                    <FormItem className="tops">
                                        {getFieldDecorator('DPandWW_name')(
                                            <Input className='user-name'
                                                placeholder="请输入关键词"
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

                </div>

                <div className='contentTop'>
                    <div className="footer">
                    <div className='info'>
                        {`共 ${that.state.totalNum} 条记录 `}
                        &nbsp;&nbsp;
                        {`第  ${that.state.pageNo}  / ${Math.ceil(that.state.totalNum / that.state.pageSize)} 页`}

                    </div>
                    <div style={{ margin: "20px" }}>
                        <a href={`/hcm/search/down_itemlist?type=${that.state.type}&title=${that.state.title}&pageSize=${that.state.pageSize}&pageNo=${that.state.pageNo}`}>
                            <Button>下载数据</Button>
                        </a>


                    </div>
                    </div>
                  
                    <div>
                        {
                            that.state.styleSX == "淘宝天猫"
                                ? <Table
                                    pagination={false}
                                    rowKey="id"
                                    scroll={{ x: (that.state.ProductInformation_list.length - 1) * 200 }}
                                    columns={that.state.ProductInformation_list}
                                    dataSource={that.state.data}
                                   
                                /> : that.state.styleSX == "京东商城" || that.state.styleSX == "苏宁易购" || that.state.styleSX == "当当网"
                                    ? <Table
                                        pagination={false}
                                        rowKey="id"
                                        scroll={{ x: (that.state.JD_list.length - 1) * 200 }}
                                        columns={that.state.JD_list}
                                        dataSource={that.state.data}
                                       
                                    /> : that.state.styleSX == "拼多多"
                                        ? <Table
                                            pagination={false}
                                            rowKey="id"
                                            scroll={{ x: (that.state.PDD_list.length - 1) * 200 }}
                                            columns={that.state.PDD_list}
                                            dataSource={that.state.data}
                                           
                                        /> : that.state.styleSX == "1688网"
                                            ? <Table
                                                pagination={false}
                                                rowKey="id"
                                                scroll={{ x: (that.state.OneSix_list.length - 1) * 200 }}
                                                columns={that.state.OneSix_list}
                                                dataSource={that.state.data}
                                               
                                            /> : that.state.styleSX == "唯品会"
                                                ? <Table
                                                    pagination={false}
                                                    rowKey="id"
                                                    scroll={{ x: (that.state.WPH_list.length - 1) * 200 }}
                                                    columns={that.state.WPH_list}
                                                    dataSource={that.state.data}
                                                   
                                                /> : that.state.styleSX == "闲鱼"
                                                    ? <Table
                                                        pagination={false}
                                                        rowKey="id"
                                                        scroll={{ x: (that.state.XY_list.length - 1) * 200 }}
                                                        columns={that.state.XY_list}
                                                        dataSource={that.state.data}
                                                       
                                                    /> : null
                        }

                    </div>
                    <div className="ProductInformationFooter">
                        <div className='footer'>
                                <div className='info'>
                                </div>
                            <Pagination pageSize={that.state.pageSize} current={that.state.pageNo} total={that.state.totalNum} onChange={that.changePagination} onShowSizeChange={that.onPaginationSize} showSizeChanger showQuickJumper />

                        </div>
                    </div>
                    <Modal
                        maskClosable={false}
                        visible={that.state.visible}
                        cancelText="取消"
                        okText="知道了"
                        okButtonProps
                        onOk={that.handleOk}
                        onCancel={that.handleCancels}
                    >


                        <h4>正在为你整理需要下载的数据，请稍后......</h4>
                        <p> 你可以关闭此弹窗，下载会在后台进行，最新进度可在“消息中心”中查看。
                       </p>

                    </Modal>
                </div>


            </div>
            {/* <Copyright clazzName='copyright' /> */}
        </div>
        </ContentBox>
    )
})

export default Tpl