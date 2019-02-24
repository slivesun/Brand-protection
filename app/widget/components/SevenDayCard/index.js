import moment from 'moment'
import { Divider, Icon, Button } from 'antd'

import './index.less'

const WEEKS_TEXT = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']

class SevenDayCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isShowMoreBtns: false
    }
  }
  handleShowMoreClick = () => {
    this.setState({
      isShowMoreBtns: !this.state.isShowMoreBtns
    })
  }
  render() {
    const { isShowMoreBtns } = this.state
    const { 
      sevenDayNums = [], 
      currentDate, 
      currentDateIndex, 
      shopBtnList = [], 
      currentShopBtnIndex 
    } = this.props.infos
    const shopCount = shopBtnList.reduce((a, b) => a + b.act_count, 0)
    return (
      <div className="sevenday-card-wrapper">
        <section className="items">
          {
            sevenDayNums.length === 0 ? 
            null : 
            sevenDayNums.map((value, index) => {
              const dateObj = moment(value.my_date)
              return (
                <div 
                  className={`item ${currentDateIndex === index ? 'active' : ''}`}
                  onClick={() => {this.props.dateClick({index, date: dateObj.format('YYYY-MM-DD')})}}
                  key={value.my_date}
                >
                  <div className="date">
                    <span>
                      {WEEKS_TEXT[dateObj.day()]}
                      &nbsp;&nbsp;
                      {
                        currentDate === moment().format('YYYY-MM-DD') && index === 0 ? 
                        <p className="today">今日</p> : 
                        null
                      }
                    </span>
                    <span>{dateObj.format('DD')}</span>
                  </div>
                  <p className="text">{index === 0 ? '进行中' : '已审核'}活动（{value.all_count || 0}）</p>
                  {
                    // currentDate === moment().format('YYYY-MM-DD') && index === 0 ? 
                    // <p className="today">今日</p> : 
                    // null
                  }
                </div>
              )
            })
          }
        </section>
        <div className="shop-btns">
          <div className="head">
            <h3 style={{fontSize:'16px',color:'#333'}}>活动店铺（{shopBtnList.length||0}）</h3>
            <span onClick={this.handleShowMoreClick} >{isShowMoreBtns?'收起':'展开'}更多<Icon type={isShowMoreBtns?'up':'down'} /></span>
          </div>
          <Divider style={{margin:'10px 0'}} />
          {
            isShowMoreBtns ? 
            <section className="btns">
              <Button 
                type={currentShopBtnIndex === 0 ? 'primary' : ''}
                onClick={() => {this.props.shopBtnClick({index: 0})}}
              >
                全部（{shopCount}）
              </Button>
              {
                shopBtnList.length === 0 ? 
                null : 
                shopBtnList.map((value, index) => (
                  <Button 
                    type={currentShopBtnIndex === (index+1) ? 'primary' : ''}
                    onClick={() => {this.props.shopBtnClick({index: index+1, shop_id: value.shop_id})}}
                    className="btn"
                    key={value.shop_name}
                  >
                    {`${value.shop_name}（${value.act_count}）`}
                  </Button>
                ))
              }
            </section> : 
            null
          }
        </div>
      </div>
    )
  }
}

export default SevenDayCard