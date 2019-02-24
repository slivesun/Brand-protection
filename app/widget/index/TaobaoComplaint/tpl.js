import ThatMain from '../../HOC/That'
import ContentBox from '../../components/Layout'
import TEMPLATE_MAP from './template_map'

import { Select, Radio, Popover, Input, Upload, Button, Tag, Icon, Form } from 'antd'

const Option = Select.Option
const OptGroup = Select.OptGroup
const RadioGroup = Radio.Group
const FormItem = Form.Item

const PLATFORM = {
  tb: 'taobao',
  tm: 'tmall',
  tmhk: 'tmallhk'
}
const COMPLAINT_LINK_TYPE = {
  goods: 'item',
  shops: 'shop'
}

const Tpl = ThatMain(that => {
  const { 
    linkList,
    link_textarea_value,
    current_link_item,
    complaintAccount,
    complatinAccountList,
    knowledgeRightTypeList,
    knowledgeRightTypeDetailList,
    complaintPlatform,
    complaintLinkType,
    complaintReasonList,
    complaintReasonId,
    fileList,
    isVerifyLink,
    // showFileList,
  } = that.state

  const {
    getFieldDecorator
  } = that.props.form

  const errorLinkLength = linkList.filter(v => typeof(v) !== 'string').length
  const complaintReasonData = TEMPLATE_MAP[complaintReasonId]

  const single_link = (value, index) => {
    // if (value) {
      const val_is_string = typeof(value) === 'string'
      const val = val_is_string ? value : value.errorLink
      return (
        <div style={{position:'relative'}} key={index}>
          <Popover content={val} trigger="hover">
            <Input 
            value={val} 
            readOnly={current_link_item === index ? false : true}
            onBlur={that.handleLinkItemBlur}
            onChange={that.handleLinkItemChange.bind(that, index)}
            className={`link-item ${current_link_item===index?'':'link-item-readonly'} ${val_is_string?'':'error'}`}/>
          </Popover>
          {
            val_is_string ?
            null :
            <Icon type="exclamation-circle" className="link-icon error" />
          }
          <Icon className="link-icon edit" type="edit" onClick={that.handleLinkItemEdit.bind(that, index)} />
          <Icon className="link-icon close" type="close" onClick={that.handleLinkItemDelete.bind(that, index)} />
        </div>
      )
    // } else {
    //   return null
    // }
  }

  return (
    <ContentBox
      breadcrumbList={['淘宝发起投诉']}
      linkList={['']}
    >
      <div className="taobao-complaint-wrapper">
        <Form onSubmit={that.handleSubmit} layout="inline">
        <div className="account-change">
          
          <section className="account verticle-middle" style={{position:'relative'}}>
            <span className="label"><i>*</i>投诉账号</span>
            <FormItem>
            {
              getFieldDecorator('complaintAccount', {
                // initialValue: complaintAccount,
                rules: [
                  {required: true, message: '请选择投诉账号'}
                ]
              })(
                <Select 
                  // defaultValue={complaintAccount} 
                  getPopupContainer={trigger => trigger.parentNode}
                  style={{width: '320px'}} 
                  placeholder="请选择"
                  onChange={that.handleSelect.bind(that, 'complaintAccount')}>
                  <Option value="" disabled>请选择</Option>
                  {
                    complatinAccountList.map(v => <Option key={v.id} value={v.id}>{v.username}</Option>)
                  }
                </Select>
              )
            }
            </FormItem>
          </section>
          <section className="platform">
            <span className="label"><i>*</i>投诉平台</span>
            <RadioGroup defaultValue={complaintPlatform} onChange={that.handleRadioChange.bind(that, 'complaintPlatform')}>
              <Radio value={PLATFORM.tb}>淘宝网</Radio>
              <Radio value={PLATFORM.tm}>天猫商城</Radio>
              <Radio value={PLATFORM.tmhk}>天猫国际</Radio>
            </RadioGroup>
          </section>
        </div>
        <div className="form-content">
          <h3 className="title">投诉基础信息</h3>
          <section className="short-label verticle-middle" style={{position:'relative'}}>
            <span className="label"><i>*</i>知识产权</span>
            <FormItem>
            {
              getFieldDecorator('knowledgeRightType', {
                // initialValue: knowledgeRightType,
                rules: [
                  {required: true, message: '请选择知识产权信息'}
                ]
              })(
                <Select 
                  getPopupContainer={trigger => trigger.parentNode}
                  style={{width:'275px',marginRight:'10px'}} 
                  onChange={that.handleSelect.bind(that, 'knowledgeRightType')}
                >
                  {/* <Option disabled value=''>请选择</Option> */}
                  {
                    knowledgeRightTypeList.map(v => <Option key={v.id} value={v.id}>{v.text}</Option>)
                  }
                </Select>
              )
            }
            </FormItem>
            <FormItem>
            {
              getFieldDecorator('knowledgeRightTypeDetail', {
                // initialValue: !!knowledgeRight.b?knowledgeRight.b:'',
                rules: [
                  {required: true, message: '请选择知识产权信息'}
                ]
              })(
                <Select 
                  getPopupContainer={trigger => trigger.parentNode}
                  style={{width:'275px'}} 
                  // onChange={that.handleSelect}
                >
                  {
                    knowledgeRightTypeDetailList.map(v => <Option key={v.id} value={v.id}>{v.text}</Option>)
                  }
                </Select>
              )
            }
            </FormItem>
          </section>
          <section className="long-label">
            <span className="label">投诉链接类型</span>
            <RadioGroup defaultValue={complaintLinkType} onChange={that.handleRadioChange.bind(that, 'complaintLinkType')} >
              <Radio value={COMPLAINT_LINK_TYPE.goods}>商品</Radio>
              <Radio value={COMPLAINT_LINK_TYPE.shops}>店铺招牌、店铺公告等等</Radio>
            </RadioGroup>
          </section>
          <section className="short-label verticle-middle" style={{marginBottom:'20px',position:'relative'}}>
            <span className="label"><i>*</i>投诉理由</span>
            <FormItem>
              {
                complaintLinkType === COMPLAINT_LINK_TYPE.goods ?
                  getFieldDecorator('reason', {
                    // initialValue: complaintReasonId,
                    rules: [
                      {required:true, message:'请选择投诉理由'}
                    ]
                  })(
                    <Select 
                      onChange={that.handleSelect.bind(that, 'complaintReasonId')}
                      style={{width:'560px'}} 
                      getPopupContainer={trigger => trigger.parentNode}>
                      {
                        complaintReasonList.map(v => (
                          <OptGroup key={v.id} label={v.text}>
                            {
                              v.items.map(val => (<Option key={val.id} value={val.id}>{val.text}</Option>))
                            }
                          </OptGroup>
                        ))
                      }
                    </Select>
                  ) :
                  getFieldDecorator('reportComment', {
                    rules: [
                      {required:true, message:'请输入投诉理由'}
                    ]
                  })(
                    <Input.TextArea 
                      placeholder="请输入投诉理由，投诉理由不能超过1500个字符"
                      style={{width:'560px',verticalAlign:'text-top'}}
                      autosize={{minRows:6}}
                      ></Input.TextArea>
                  )
              }
            </FormItem>
            {
              !!complaintReasonData && complaintLinkType === COMPLAINT_LINK_TYPE.goods ?
              (
                !!complaintReasonData.desc ?
                <section className="text-description" style={{width:'560px',margin:'20px 80px'}}>
                  {/* <p>{complaintReasonData.desc}</p> */}
                  {complaintReasonData.desc}
                </section> :
                null
              ) :
              null
            }
          </section>
          <section className="short-label">
            <span className="label"><i>*</i>投诉链接</span>
            <span className="links">
                {
                  !!linkList.length ?
                  linkList.map((v, i) => single_link(v, i)) :
                  null
                }
              <Input.TextArea 
                onBlur={that.handleLinkBlur}
                onChange={that.handleLinkChange}
                placeholder="一条链接一行，最多300条" 
                className="textarea"
                value={link_textarea_value}
                autosize={{maxRows:300}}></Input.TextArea>
            </span>
            <div className="verify-link">
              <Button onClick={that.verifyLink.bind(that, undefined)}>验证链接</Button>
              {
                linkList.length && isVerifyLink ?
                (
                  !errorLinkLength ?
                  <span className="verify-result success">
                    <Icon className="icon" type="check-circle" />
                    所有链接验证通过
                  </span> :
                  <span className="verify-result fail">
                    <Icon className="icon" type="close-circle" />
                    {`存在 ${errorLinkLength} 条未验证通过链接`}
                  </span>
                ) :
                null
              }
            </div>
          </section>
          <h3 className="title">投诉举证材料</h3>
          {
            !!complaintReasonData && complaintLinkType === COMPLAINT_LINK_TYPE.goods ?
            (
              !!complaintReasonData.label ?
              <section className={`spectial-label ${complaintReasonData.label==='旺旺聊天举证号'?'wangwang':''}`}>
                <span className="label"><i>*</i>{complaintReasonData.label}</span>
                {
                  getFieldDecorator(complaintReasonData.field, {
                    rules: [
                      {required: true, message: `请输入${complaintReasonData.label}`}
                    ]
                  })(
                    <Input placeholder="请输入" autoComplete='off' style={{width:'560px'}} />
                  )
                }
              </section> :
              null
            ) :
            null 
          }

          {
            !!complaintReasonData && complaintLinkType === COMPLAINT_LINK_TYPE.goods ?
            (
              <section className="short-label">
                <span className="label"><i>*</i>理由说明</span>
                {
                  getFieldDecorator('reportComment', {
                    rules: [
                      { required: true, message: '请输入投诉理由' }
                    ]
                  })(
                    <Input.TextArea 
                      autosize={{maxRows:9,minRows:6}}
                      // placeholder={complaintReasonData.placeholder} 
                      placeholder="补充说明，您可以补充侵权理由 (最多1500字)"
                      style={{width:'560px',verticalAlign:'text-top'}}></Input.TextArea>
                  )
                }
              </section>
            ) :
            null
          }
          <section className="no-must-label">
            <span className="label">举证证明</span>
            <Upload 
              // action="/hcm/hcmWorkOrder/headImgUpload"
              fileList={fileList}
              action="/hcm/fileUpload"
              data={{id: complaintAccount}}
              disabled={fileList.length > 3}
              // beforeUpload={that.handleBeforeUpload}
              onChange={that.handleUploadChange}
              onRemove={that.handleRemoveFile}
              className="upload-style">
              <Button icon="upload" disabled={fileList.length > 3}>添加文件</Button>
            </Upload>
            <Tag 
              color="rgba(102,102,102,0.05)" 
              className="tag"
              style={{color:'#999',float:'left',fontSize:'14px',marginLeft:'9px'}}>
              支持zip/rar/jpg/png/bmp/pdf/doc/docx格式，每个5MB以内，最多4个文件
            </Tag>
          </section>
          {
            !!complaintReasonData && complaintReasonData.template ?
            <section className="template-refer">
              <span>举证模板参考</span>
              <div>
                <span>{complaintReasonData.template.text}</span>
                <a href={complaintReasonData.template.link} target="_blank">{complaintReasonData.template.linkText}</a>
              </div>
            </section> :
            null
          }
          <Button 
            size="large" 
            type="primary" 
            htmlType="submit"
            style={{backgroundColor:'#CFA972',borderColor:'#CFA972',margin:'50px 0 0 153px'}}>
            提交</Button>
        </div>
        </Form>
      </div>
    </ContentBox>
  )
})

export default Tpl