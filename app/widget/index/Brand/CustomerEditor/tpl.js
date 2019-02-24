import './CustomerEditor.less'
import ThatMain from '../../../HOC/That';
import ContentBox from '../../../components/Layout';

// import Footer from "../../../components/Copyright"

import { Steps, Form, TreeNode, TreeSelect, Breadcrumb, Input, Select, Button, Timeline, DatePicker } from 'antd';
const Step = Steps.Step;
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;
const SHOW_PARENT = TreeSelect.SHOW_PARENT;
const ZIduan = {
    display: "",
    marginTop: "20px"
}
const children = [];
const childrenn = [];




const Tpl = ThatMain((that) => {
    const { getFieldDecorator } = that.props.form;
    const abcARRAy = []
    abcARRAy.push(that.state.Brrby)
    return (
        <ContentBox 
            breadcrumbList={['客户盘点', '客户信息', '编辑']}
            linkList={['', '1', '']}
            history={that.props.history}
        >
        <div className='CustomerEditor'>

            {/* <div className='Breadcrumb'>
                <Breadcrumb >
                    <Breadcrumb.Item>
                        客户盘点
                            </Breadcrumb.Item>
                    <Breadcrumb.Item>

                        <a href="/index.html#/ClientCheck">客户信息</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        编辑
                            </Breadcrumb.Item>
                </Breadcrumb>
            </div> */}
            <div className="CustomerEditorBOX">
                <Form onSubmit={that.ForgetSubmit} className="forget-form" style={{ marginLeft: "20px", width: "400px" }}>
                    <div className="FORMtit">
                        <div className={that.state.USERS} style={{ float: "right" }}>
                            <img src={that.state.IMGS} style={{float:"left",marginRight:"10px",marginTop:"7px"}} /> <b style={{lineHeight: "32px",float: "left"}}>{that.state.IMGStxt}</b> </div>
                    </div>
                    <div className="FORMtit"> <div className="FORMus">客户名称：</div>
                        {
                            that.state.apply_statuS == "APPLYING" ? <FormItem className="tops">
                                {getFieldDecorator('CustomerName', {
                                    initialValue: that.state.dealername || "",
                                })(
                                    <Input className='user-name'
                                        maxLength="50"
                                    />
                                    )}
                            </FormItem> : <FormItem className="tops">
                                    {getFieldDecorator('CustomerName', {
                                        initialValue: that.state.dealername || "",
                                    })(
                                        <Input className='user-name'
                                            maxLength="50"
                                            disabled
                                        />
                                        )}
                                </FormItem>
                        }
                    </div>

                    <div className="FORMtit"> <div className="FORMus">备注名称：</div>
                        <FormItem className="tops">
                            {getFieldDecorator('NameOfNote', {
                                initialValue: that.state.dutynumber || '',
                            })(
                                <Input className='user-name'
                                    maxLength="50"
                                />
                                )}
                        </FormItem>
                    </div>
                    {
                        that.state.treeData ? <div id="areaxb" className="FORMtit" style={{ position: "relative" }}> <div className="FORMus">直属上级：</div>
                            <FormItem className="tops" >
                                {getFieldDecorator('Subordinate', {
                                    initialValue: that.state.subordinate
                                })(



                                    <TreeSelect
                                        getPopupContainer={() => document.getElementById('areaxb')}
                                        style={{ width: 320 }}
                                        //value={that.state.value}
                                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                        treeData={that.state.treeData}
                                        placeholder="请选择部门人员"
                                        treeDefaultExpandAll
                                        onChange={that.onChangeSubor}
                                    />
                                    )}

                            </FormItem>

                        </div> : <div className="FORMtit"> <div className="FORMus">直属上级：</div><FormItem className="tops">请在账号管理中添加直属上级 </FormItem> </div>
                    }

                    <div className="FORMtit">
                        <div className="FORMus">授权期限：</div>
                        <FormItem className="tops">
                            {getFieldDecorator('approve_start', {
                                initialValue: that.state.approve_start ? [moment(that.state.approve_start), moment(that.state.approve_end)] : [moment(), moment()]
                            })(
                                <RangePicker className="user-name" style={{ display: "inline-block", width: "320px" }} onChange={that.onChange} />
                                )}
                        </FormItem>
                    </div>
                    <div className="FORMtit"> <div className="FORMus">授权编码：</div>
                        <FormItem className="tops">
                            {getFieldDecorator('authorize_num', {
                                initialValue: that.state.authorize_num || '',
                            })(
                                <Input className='user-name'
                                    maxLength="50"
                                />
                                )}
                        </FormItem>
                    </div>
                    <div className="FORMtit">
                        <div className="FORMus">审批日期：</div>
                        <FormItem className="tops">
                            {getFieldDecorator('approve_date', {
                                initialValue: that.state.approve_date ? moment(that.state.approve_date) : moment(),
                            })(
                                <DatePicker className="user-name" style={{ display: "inline-block", width: "320px" }} onChange={that.onChangeX} />

                                )}
                        </FormItem>
                    </div>
                    {/* <div className="FORMtit"> <div className="FORMus"  >申请人：</div>
                        <FormItem className="tops">
                            {getFieldDecorator('Applicant', {
                                initialValue: that.state.apply_person || '',
                            })(
                                <Input className='user-name'
                                />
                                )}
                        </FormItem>
                    </div>
                    <div className="FORMtit"> <div className="FORMus">授权内容：</div>
                        <FormItem className="tops">
                            {getFieldDecorator('AuthorizedContent', {
                                initialValue: that.state.apply_content || '',
                            })(
                                <textarea className="topsx" style={{ resize: "none" }} placeholder="请输入" />
                                )}
                        </FormItem>
                    </div> */}

                    {
                        that.state.Array ? <div>
                            {
                                that.state.Array.map((item, index) => {
                                    return <div key={index}>
                                        {
                                            abcARRAy ? <div>
                                                {
                                                    abcARRAy.map((im, ind) => {
                                                        return <div key={ind}>
                                                            {item.fieldtype == "TEXT" ?
                                                                <div className="FORMtit" style={{ marginTop: "10px" }}>
                                                                    <div className="FORMus">{item.fieldname}：</div>
                                                                    {/* <Input value={item.fieldvalue} onChange={e=>that.iptChange(e,item.fieldvalue)} className='user-name'/> */}

                                                                    <FormItem className="tops">
                                                                        {getFieldDecorator(item.fieldvalue, {
                                                                            initialValue: im[item.fieldvalue],
                                                                        })(
                                                                            <Input className='user-name' maxLength="50" placeholder={item.prompt ? item.prompt : "请输入内容"}
                                                                            />
                                                                            )}
                                                                    </FormItem>

                                                                </div>
                                                                : item.fieldtype == "MULTISELECT" ?
                                                                    <div id="areaxbn" className="FORMtit" style={{ marginTop: "20px", position: 'relative' }}>
                                                                        <div className="FORMus">{item.fieldname}：</div>
                                                                        {
                                                                            item.opotion.split(",") ?
                                                                                <FormItem className="tops">
                                                                                    {getFieldDecorator(item.fieldvalue, {
                                                                                        initialValue: im[item.fieldvalue],
                                                                                    })(
                                                                                        <Select
                                                                                            getPopupContainer={() => document.getElementById('areaxbn')}
                                                                                            mode="multiple"
                                                                                            style={{ width: '100%' }}
                                                                                            placeholder={item.prompt ? item.prompt : "请选择内容"}
                                                                                            onChange={that.handle}
                                                                                        >
                                                                                            {
                                                                                                item.opotion.split(",").map((v, i) => {
                                                                                                    return <Option key={i} value={v}>{v}</Option>
                                                                                                })
                                                                                            }
                                                                                        </Select>

                                                                                        )}
                                                                                </FormItem> : <FormItem className="tops">
                                                                                    {getFieldDecorator(item.fieldvalue, {
                                                                                        initialValue: im[item.fieldvalue],
                                                                                    })(<Select
                                                                                        getPopupContainer={() => document.getElementById('areaxbn')}
                                                                                        mode="multiple"
                                                                                        style={{ width: '100%' }}
                                                                                        placeholder={item.prompt ? item.prompt : "请选择内容"}
                                                                                        onChange={that.handle}
                                                                                    >
                                                                                        {children}
                                                                                    </Select>


                                                                                        )}
                                                                                </FormItem>
                                                                        }
                                                                    </div> : item.fieldtype == "Single" ?
                                                                        <div className="FORMtit" style={{ marginTop: "20px" }}>
                                                                            <div className="FORMus">{item.fieldname}：</div>
                                                                            {/* <Input value={item.fieldvalue} onChange={e=>that.iptChange(e,item.fieldvalue)} className='user-name'/> */}

                                                                            <FormItem className="tops">
                                                                                {getFieldDecorator(item.fieldvalue, {
                                                                                    initialValue: im[item.fieldvalue],//that.state.Brrby[item.prompt]
                                                                                })(
                                                                                    <textarea className='user-name' placeholder={item.prompt ? item.prompt : "请输入内容"} maxLength="100" style={{ width: "320px", height: "60px" }}
                                                                                    />
                                                                                    )}
                                                                            </FormItem>

                                                                        </div> : <div id="areax" className="FORMtit" style={{ marginTop: "20px", position: 'relative' }}>
                                                                            <div className="FORMus">{item.fieldname}：</div>
                                                                            {
                                                                                item.opotion.split(",") ? <FormItem className="tops"  >
                                                                                    {getFieldDecorator(item.fieldvalue, {
                                                                                        initialValue: im[item.fieldvalue],
                                                                                    })(
                                                                                        <Select
                                                                                            style={{ width: '100%' }}
                                                                                            placeholder={item.prompt ? item.prompt : "请选择内容"}
                                                                                            onChange={that.handle}
                                                                                            getPopupContainer={() => document.getElementById('areax')}
                                                                                        >
                                                                                            {
                                                                                                item.opotion.split(",").map((v, i) => {
                                                                                                    return <Option key={i} value={v}>{v}</Option>
                                                                                                })
                                                                                            }
                                                                                        </Select>
                                                                                        )}
                                                                                </FormItem> : <FormItem className="tops">
                                                                                        {getFieldDecorator(item.fieldvalue, {
                                                                                            initialValue: '请选择',
                                                                                        })(
                                                                                            <Select
                                                                                                getPopupContainer={() => document.getElementById('areax')}
                                                                                                style={{ width: '100%' }}
                                                                                                placeholder={item.prompt ? item.prompt : "请选择内容"}
                                                                                                onChange={that.handle}
                                                                                            >
                                                                                                {childrenn}
                                                                                            </Select>
                                                                                            )}
                                                                                    </FormItem>}

                                                                        </div>}
                                                        </div>
                                                    })

                                                }
                                            </div> : null
                                        }


                                    </div>

                                })
                            }</div> : null
                    }

                    <div className="FORMtit" style={{ marginTop: "20px", marginBottom: "20px" }}>
                        <Button className="btn2-main" htmlType="submit" onClick={() => that.SuccessBTN()}  style={{ marginLeft: 150 }}>确认</Button>
                        <Button className="ErrorBTN" onClick={() => that.ErrorBTN()} style={{ marginLeft: 10 }}>取消</Button>
                    </div>
                </Form>

            </div>

            {/* <Footer className='Copyright'></Footer> */}

        </div>
        </ContentBox>
    )
})
export default Tpl