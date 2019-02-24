
import ThatMain from '../../HOC/That';
import {Timeline,Button,Breadcrumb,Avatar,Card,Row, Col} from 'antd';
import Copyright from "../../components/Copyright";
const Tpl = ThatMain((that) => {
    let {dataList,userList} = that.state;
    const user = {
        bjw2264:'#55a0f8',
        lijing:'#72c77c',
        常德闯:'#66c8ca',
    }
    if(dataList.length){
        return (
            <div className='commits'>
                <div className='Breadcrumb'>
                    <h3>GitLab {` <HCM_WEB> `} 提交记录</h3>
                </div>
                
                <div className='content'>
                    <Timeline>
                        {
                            dataList.map((item,index)=>{
                                return(
                                    <Timeline.Item dot={<Avatar  style={{ backgroundColor: user[item.author_name] }} size="large">{item.author_name}</Avatar>}  key={index}>
                                        
                                        <Card
                                            style={{ margin:'0 0 40px 20px' }}
                                            type="inner"
                                            title={<p>No:{index+1  }<span style={{marginLeft:'20px'}}>标题：{item.title}</span></p>}
                                            extra={moment(item.committed_date).format('YYYY年MM月DD日 HH:mm:ss')}
                                        >
                                             <Row>
                                                <Col span={24}>提交人：{item.author_name}</Col>
                                            </Row>
                                            <Row>
                                                <Col span={12}>short_id：<a target='_blank' href={`http://n1a6884762.iok.la/chang/HCM_WEB/commit/${item.short_id}`}>{item.short_id}</a></Col>
                                                <Col span={12}>邮箱：{item.author_email}</Col>
                                            </Row>
                                            <Row>
                                                <Col span={12}>id：{item.id}</Col>
                                                <Col span={12}>parent_ids：{item.parent_ids[0]}</Col>
                                            </Row>
                                        </Card>
                                    </Timeline.Item>
                                )
                            })
                        }
                    </Timeline>
                    {
                        that.state.show ? 
                            <div style={{textAlign:'center'}}>
                                <Button type="primary" loading={that.state.loading} onClick={that.loading}>加载更多</Button>
                            </div>
                        :null

                    }
                    
                </div>
                <Copyright clazzName='copyright' />
            </div>
        )
    }else{
        return null
    }
    
})

export default Tpl