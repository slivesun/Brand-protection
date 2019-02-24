import ThatMain from '../../../HOC/That'
import ContentBox from '../../../components/Layout'
import Copyright from '../../../components/Copyright'
import { Breadcrumb, Button, Icon, Card, Select, Row, Col, Input, DatePicker, Cascader, InputNumber } from 'antd'
import moment from 'moment'

const Item = Breadcrumb.Item
const Option = Select.Option
const RangePicker = DatePicker.RangePicker
const TextArea = Input.TextArea

const ShopWrapper = ThatMain(that => {
  const { shopList } = that.props
  const { shop_id, campaign_name, start_time, end_time, campaign_desc } = that.state
  return (
    <Card className="shop-wrapper">
      <Row className="row">
        <Col span={24}>
          <label><span className="red">*&nbsp;</span>申请店铺：
          <Select 
            value={shop_id} 
            placeholder="请选择" 
            style={{width: '440px'}} 
            getPopupContainer={trigger => trigger.parentNode}
            onChange={that.handleSwitchShopChange}>
            <Option value="" disabled>请选择</Option>
            {
              shopList.map(v => <Option value={v.id} key={v.id}>{v.shop_name}（{v.platform_name}）</Option>)
            }
          </Select>
          </label>
        </Col>
      </Row>
      <Row className="row">
        <Col span={24}>
          <label><span className="red">*&nbsp;</span>活动主题：
          <Input 
            placeholder="请输入" 
            value={campaign_name}
            style={{width: '440px'}} 
            onChange={(e) => that.handleInputChange({flag: true, key: 'campaign_name', event: e})} 
          />
          </label>
        </Col>
      </Row>
      <Row className="row">
        <Col span={24} id="timeSelect">
          <label><span className="red">*&nbsp;</span>活动时间：
          <RangePicker
            defaultValue={[moment(), moment()]}
            getCalendarContainer={trigger => document.getElementById('timeSelect')}
            // showTime={{ minuteStep: 30, defaultValue: [moment('12:00', 'HH:mm'), moment('12:30', 'HH:mm')] }}
            disabledDate={current => current && current < moment().subtract(1, 'd').endOf('day')}
            showTime={{minuteStep: 30}}
            value={[moment(start_time), moment(end_time)]}
            format='YYYY-MM-DD HH:mm'
            placeholder={['请选择', '请选择']}
            style={{width: '440px'}}
            onChange={that.handleSwitchDateChange}
          />
          </label>
        </Col>
      </Row>
      <Row className="row" style={{marginLeft:"10px"}}>
        <Col span={24}>
          <label>活动说明：
          <TextArea 
            autosize={{minRows: 2, maxRows: 6}} 
            placeholder="请输入" 
            value={campaign_desc}
            style={{width: '440px'}} 
            onChange={(e) => {that.handleInputChange({flag: true, key: 'campaign_desc', event: e})}}
          />
          </label>
        </Col>
      </Row>
    </Card>
  )
})

const Tpl = ThatMain(that => {
  const { productList, shopList } = that.props
  const { 
    addActivityProductList, 
    // selectHttp 
  } = that.state
  // 处理产品二级联动列表数据以符合要求
  const formatProductList = productList.length !== 0 ? 
                            productList.map(v => {
                              let obj = {
                                productName: v.productClassifyName
                              }
                              if (!v.children) {
                                obj.disabled = true
                              }
                              return Object.assign({}, v, {...obj})
                            }) : []
  const fotmItemStyle = {
    width: '300px'
  }
  // const selectBefore = ({selectHttp, index}) => (
  //   <Select defaultValue={selectHttp} style={{ width: 90 }} onChange={that.handleSelectBeforeChange.bind(that, index)}>
  //     <Option value="Http://">Http://</Option>
  //     <Option value="Https://">Https://</Option>
  //   </Select>
  // );
  const ProductWrapper = (val, index) => {
    return (
        <Card className="product-wrapper" key={index}>
          <div className="top"  id="proSelect">
            <label>
              <span className="red">*&nbsp;</span>产品信息：
              <Cascader
                options={formatProductList}
                getPopupContainer={trigger => document.getElementById('proSelect')}
                fieldNames={{label: 'productName', value: 'id' }}
                placeholder="请选择/请选择"
                style={{ minWidth: '300px' }}
                value={val.product_id || []}
                onChange={(value, selectOption) => {that.handleSwitchProductChange(index, value, selectOption)}}
                showSearch
              ></Cascader>
            </label>
            <span onClick={() => {that.handleDeleteProduct(index)}} >删除</span>
          </div>
          {
            Object.keys(val.prices_map).length !== 0 ? 
            <div className="middle">
              <Row className="row">
                {
                  Object.entries(val.prices_map).map(value => <Col key={value[0]} span={8}>{`${value[0]}：${value[1]}`}</Col>)
                }
              </Row>
            </div> : 
            (val.prices_map === '' ? null : <div style={{marginTop:'20px'}} >暂无参考价格</div>)
          }
          <div className="bottom">
            <Row className="row">
              <Col span={8} className="col">
                <label>
                  <span className="red">*&nbsp;</span>商品链接<br/>
                  <Input 
                    placeholder="请输入" 
                    value={val.product_url || ''} 
                    style={fotmItemStyle}
                    // addonBefore={selectBefore({selectHttp: val.selectHttp, index})}
                    onChange={e => that.handleInputChange({key: 'product_url', index, event: e})}
                  />
                </label>
              </Col>
              <Col span={8} className="col">
                <label>
                  <span className="red">*&nbsp;</span>申请标价<br/>
                  <InputNumber 
                    min={0}
                    placeholder="请输入" 
                    style={fotmItemStyle}
                    value={val.apply_price || ''}
                    onChange={(e) => {that.handleInputChange({key:'apply_price',event:e,index})}}
                  />
                </label>
              </Col>
              <Col span={8} className="col">
                <label>
                  <span className="red">*&nbsp;</span>实际成交价<br/>
                  <InputNumber
                    min={0}
                    placeholder="请输入" 
                    style={fotmItemStyle}
                    value={val.actual_price || ''}
                    onChange={(e) => {that.handleInputChange({key:'actual_price',event:e,index})}}
                  />
                </label>
              </Col>
            </Row>
            <Row className="row">
              <Col span={8} className="col">
                <label>
                  <span className="red">*&nbsp;</span>活动类型<br/>
                  <Input 
                    placeholder="请输入" 
                    style={fotmItemStyle}
                    value={val.campaign_type || ''}
                    onChange={(e) => {that.handleInputChange({key:'campaign_type',event:e,index})}}
                  />
                </label>
              </Col>
              <Col span={8} className="col">
                <label>
                  <span className="red">*&nbsp;</span>赠品情况<br/>
                  <Input 
                    placeholder="请输入" 
                    style={fotmItemStyle}
                    value={val.gift_situation || ''}
                    onChange={(e) => {that.handleInputChange({key:'gift_situation',event:e,index})}}
                  />
                </label>
              </Col>
              <Col span={8} className="col">
                <label>
                  <span className="red">*&nbsp;</span>玩法说明<br/>
                  <Input 
                    placeholder="请输入" 
                    style={fotmItemStyle}
                    value={val.play_content || ''}
                    onChange={(e) => {that.handleInputChange({key:'play_content',event:e,index})}}
                  />
                </label>
              </Col>
            </Row>
          </div>
        </Card>
    )
  }
  return (
    <ContentBox
      breadcrumbList={['活动信息', '活动申报']}
      linkList={['', '']}
    >
    <div className="activity-declaration-wrapper">
      {/* <section className="top-header">
        <Breadcrumb>
          <Item>活动信息</Item>
          <Item>活动申报</Item>
        </Breadcrumb>
      </section> */}
      <section className="content">
        <ShopWrapper that={that} />
        {
          addActivityProductList.length !== 0 ? addActivityProductList.map((v, i) => {return ProductWrapper(v, i)}) : null
        }
        {/* <ProductWrapper that={that} /> */}
        <div className="addNew" onClick={() => {that.handleAddClick(addActivityProductList.length)}}>
          <Icon type="plus" />&nbsp;
          <span>新增</span>
        </div>
        <div className="submit-wrapper">
          <Button 
            type="primary" 
            className="submit btn2-main" 
            onClick={that.handleSubmit}

            // disabled={addActivityProductList.length === 1}
          >
            提交
          </Button>
          <Button className='btn2-sub' onClick={that.handleClearForm}>取消</Button>
        </div>
      </section>
      {/* <div className="copyright">
        <Copyright />
      </div> */}
    </div>
    </ContentBox>
  )
})

export default Tpl