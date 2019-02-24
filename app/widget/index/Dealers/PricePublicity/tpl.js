import './PricePublicity.less'
import ThatMain from '../../../HOC/That'
// import Footer from "../../../components/Copyright"
import ContentBox from '../../../components/Layout'

import { Form, Input, Button, Icon, Breadcrumb } from 'antd';

const Tpl = ThatMain((that) => {

    const FormItem = Form.Item;
    let { PricePublicity_list } = that.state;
    const { getFieldDecorator,getFieldValue } = that.props.form;
    const SubmitStyles = that.state.SubmitStyle ? "none" : "inline-block"
    const SubmitStyle = {
        display: SubmitStyles
    }
    const clearIconStyle = {
        width: '14px',
        height: '14px',
        opacity: 0.25,
        cursor: 'pointer'
    }

    return (
        <ContentBox
            breadcrumbList={['售价公示']}
            linkList={['']}
            history={that.props.history}
        >
            <div className='PricePublicity'>
                {/* <div className="InformationNav">
                <Breadcrumb>
                    <Breadcrumb.Item>售价公示</Breadcrumb.Item>
                </Breadcrumb>
            </div> */}
                <div className="PricePublicityBOX">
                    <div className="PricePublicitytit">

                        <div className="DIV">
                            <span>分类名称:</span>

                        <Form onSubmit={that.ForgetSubmit} style={{ display: "inline-block" }}>
                            <FormItem style={{ display: "inline-block" }}>
                                {getFieldDecorator('FieldName', {
                                    initialValue: that.state.productClassifyName
                                })(
                                    <Input type="text" suffix={!!getFieldValue("FieldName") ? <Icon
                                        type="close-circle"
                                        onClick={() => that.handleClearIconClick()}
                                        style={clearIconStyle}
                                    />:null} placeholder="请输入" />

                                    )}
                                </FormItem>

                                <Button htmlType="submit" className="btn6" style={{ display: "inline-block", marginLeft: "10px" ,position:"absolute",right:"10px"}} >查询</Button>
                            </Form>
                        </div>
                    </div>
                    <div className="PricePublicityTXT">
                        {
                            PricePublicity_list.length ? <div>
                                <ul>
                                    {
                                        PricePublicity_list.map((username, index) => {
                                            return <li key={index}>
                                                <span className="TionTop">
                                                    <span className="TionLeft">
                                                        {
                                                            username.productClassifyName ?
                                                                <span>{username.productClassifyName.slice(0, 1)}</span> : <span></span>
                                                        }
                                                    </span>
                                                    <span className="TionRight">
                                                        {
                                                            username.readid == 0 ? <h4 id={username.id} tit={username.productClassifyName} onClick={that.bmids}>{username.productClassifyName} <div className='redo'></div> </h4>
                                                                : <h5 id={username.id} tit={username.productClassifyName} onClick={that.bmids}>{username.productClassifyName}</h5>
                                                        }
                                                    </span>
                                                </span>
                                                {/* <span  className="TionBom">查看详情</span> */}
                                            </li>
                                        })

                                    }
                                </ul>

                                <ul className="ulbutton">
                                    {
                                        PricePublicity_list.length > 0
                                            ? that.state.count < that.state.page_info.pageSize ? null
                                                : that.state.count > that.state.page_info.pageSize ? <Button style={SubmitStyle} onClick={that.onLoading} className='loadings-button'>加载更多...</Button> : null
                                            : "45"

                                    }


                                </ul></div>
                                : <p style={{ width: '100%', lineHeight: "100px" }} className='text-center'>暂无数据</p>
                        }
                    </div>
                </div>
                {/* <Footer className='Copyright'></Footer> */}

            </div>
        </ContentBox>
    )
})
export default Tpl