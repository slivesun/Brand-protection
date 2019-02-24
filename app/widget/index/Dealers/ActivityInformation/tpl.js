import ThatMain from '../../../HOC/That';
import ContentBox from '../../../components/Layout'
import Copyright from "../../../components/Copyright";
import { Breadcrumb, Table } from 'antd';
// import Loading from '../../../components/Loading'

const Item = Breadcrumb.Item;


const columns = [
    {
        title: '提交时间',
        dataIndex: 'createtime',
        render: text => {
            const date = new Date(text)
            const year = date.getFullYear()
            const month = date.getMonth() + 1
            const day = date.getDate()
            const hour = date.getHours()
            const minute = date.getMinutes()
            const second = date.getSeconds()
            return `${year}-${(month+'').padStart(2, '0')}-${(day+'').padStart(2, '0')} ${hour}:${minute}:${second}`
        }
    },
    {
        title: '店铺名称',
        dataIndex: 'shop_name',
    },
    {
        title: '活动主题',
        dataIndex: 'campaign_name',
    },
    {
        title: '活动商品数',
        key: 'goodsNum',
        render: (text, record) => {
            return `${record.act_count} / ${record.pro_count}`
        }
    }
]

const WEEKS = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
const ACTIVITY_DATE_TYPE = {
    currentDay: 1,
    nextDay: 2
}

const Tpl = ThatMain(that => {
    const { sevenActivity } = that.props
    const { selectedIndex, selectedDate, activityObj } = that.state;
    const activityList = activityObj[selectedDate];
    return (
        <ContentBox
            breadcrumbList={['活动信息', '我的活动日程']}
            linkList={['', '']}
        >
        <div className='activity-wrapper'>
            {/* <section className="top-header">
                <Breadcrumb>
                    <Item>活动信息</Item>
                    <Item>我的活动日程</Item>
                </Breadcrumb>
            </section> */}
            <div className="content">
                <section className="date-card">
                    {
                        sevenActivity.map((val, idx) => {
                            const dateObj = new Date(val.my_date)
                            const week = WEEKS[dateObj.getDay()]
                            const day = dateObj.getDate() + ''
                            const dateString = `${dateObj.getFullYear()}-${String(dateObj.getMonth()+1).padStart(2, '0')}-${day.padStart(2, '0')}`
                            return (
                                <div 
                                    className={`card ${selectedIndex === idx ? 'activite' : ''}`}
                                    onClick={() => that.switchActivity(dateString, idx, idx === 0 ? ACTIVITY_DATE_TYPE.currentDay : ACTIVITY_DATE_TYPE.nextDay)}  
                                    key={val.my_date}  
                                >
                                    <div>
                                        <span>
                                            {week}
                                            &nbsp;&nbsp;
                                            {
                                                (selectedIndex === 0 && idx === 0) ? 
                                                <p className="today">今日</p> : 
                                                null
                                            }
                                        </span>
                                        <span>{day.padStart(2, '0')}</span>
                                    </div>
                                    <div>
                                        <p>{`${idx === 0 ? '进行中' : '已审核'}活动（${val.all_count}）`}</p>
                                        {
                                            // (selectedIndex === 0 && idx === 0) ? 
                                            // <p className="today">今日</p> : 
                                            // null
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                    {/* <div style={{textAlign:'center'}}>
                        <Loading />
                    </div> */}
                </section>
                {
                    activityList && activityList.map(v => {
                        let all_act_count = 0
                        let all_pro_count = 0
                        v.campaignList.forEach(val => {
                            all_act_count += val.act_count
                            all_pro_count += val.pro_count
                        })
                        return (
                            <section className="table-wrapper" key={v.brand_name}>
                                <h1 className="title">
                                    <span>品牌方：{v.brand_name}</span>
                                    <span>总计：{`${all_act_count} / ${all_pro_count}`}</span>
                                </h1>
                                <Table
                                    columns={columns}
                                    pagination={false}
                                    dataSource={v.campaignList}
                                    rowKey={record => record.id}
                                ></Table>
                            </section>
                        )
                    })
                }
            </div>
            {/* <div className="copyright">
                <Copyright />
            </div> */}
        </div>
        </ContentBox>
    )
})

export default Tpl