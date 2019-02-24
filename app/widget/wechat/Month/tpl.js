import ThatMain from '../../HOC/That';
import { Tabs } from 'rmc-tabs';

import DatePicker from 'rmc-date-picker'
import PopPicker from '../../../../node_modules/rmc-date-picker/lib/Popup';
import { Button, Input, Icon, Badge } from 'antd';
const ButtonGroup = Button.Group;
const Tpl = ThatMain((that) => {
    document.title = '维权报表'
    let { tabs, platform, statr_date, end_time, page,shopList } = that.state;
    const props = that.props;
    const datePicker = (
        <DatePicker
            maxDate={new Date()}
        />
    );
    let renderContent = tab => (
        <div className='tab-item'>
            <h5>
                <span>投诉链接情况概览</span>
            </h5>
            <div className='echarts'></div>
            <h5>
                <span>店铺被投次数排行</span>
            </h5>
            <ul className='shop-items'>
                {
                    shopList.length?
                    shopList.map((item, index) => {
                        let w = { backgroundColor: '#c1a569' };
                        let l = { backgroundColor: '#f0f2f5',color:'#333' };
                        return (
                            <li key={index} className='item'>
                                <div className='left'>
                                    <Badge style={index>2? l : w } count={index+1} />
                                </div>
                                <div className='right'>
                                    <h6>
                                        {item.entity_owner_name}
                                    </h6>
                                    <div>
                                        <span>
                                            被投诉：{item.all_count}次
                                        </span>
                                        <span>
                                            撤诉：{item.c_count}次
                                        </span>
                                    </div>
                                </div>
                            </li>
                        )
                    })
                    :
                    <li style={{textAlign:'center',listStyle:'none',paddingTop:'20px'}}>
                        暂无数据
                    </li>
                }


            </ul>
        </div>
    );




    return (
        <div className="month">
            <div className='but-box'>
                <ButtonGroup>
                    <Button className={platform == 'taobao' ? 'active' : null} onTouchStart={() => that.onActive('taobao')}>淘宝维权报表</Button>
                    <Button className={platform == '1688' ? 'active' : null} onTouchStart={() => that.onActive('1688')}>1688维权报表</Button>
                </ButtonGroup>
            </div>
            <div className='date-box'>
                <span className='title'>投诉时间：</span>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexGrow: '1' }}>
                    <div className='statr-time' style={{ width: '49%' }}>
                        <PopPicker
                            datePicker={datePicker}
                            transitionName="rmc-picker-popup-slide-fade"
                            maskTransitionName="rmc-picker-popup-fade"
                            date={statr_date}
                            okText='完成'
                            dismissText='取消'
                            onDismiss={that.onDismiss}
                            onChange={(date) => that.onChange(date, 'statr_date')}
                        >
                            <button className='statr-time-box' onClick={that.show}>
                                {moment(statr_date).format('YYYY-MM-DD')}
                                <Icon type="calendar" theme="outlined" />
                            </button>
                        </PopPicker>
                    </div>
                    <div className='end-time' style={{ width: '49%' }}>
                        <PopPicker
                            datePicker={datePicker}
                            transitionName="rmc-picker-popup-slide-fade"
                            maskTransitionName="rmc-picker-popup-fade"
                            date={end_time}
                            okText='完成'
                            dismissText='取消'
                            onDismiss={that.onDismiss}
                            onChange={(date) => that.onChange(date, 'end_time')}
                        >
                            <button className='statr-time-box' onClick={that.show}>
                                {moment(end_time).format('YYYY-MM-DD')}
                                <Icon type="calendar" theme="outlined" />
                            </button>
                        </PopPicker>
                    </div>
                </div>
            </div>

            <Tabs distanceToChangeTa={0.5}  page={page} onChange={(tab, index) => { that.onTabchange(index) }} tabs={tabs} renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} />}>
                {renderContent}
            </Tabs>


        </div>
    )

})
export default Tpl

