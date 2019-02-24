import './MessageCenter.less'
import ThatMain from '../../../HOC/That';
import ContentBox from '../../../components/Layout'
import Footer from "../../../components/Copyright"

import { Table, Button, DatePicker, Pagination, Breadcrumb } from 'antd';
const { RangePicker } = DatePicker;
const json = {
    ClientCheck: {
        name: '客户信息',
        type: 'ClientCheck',
        path: '/index.html#/ChangeHistory'
    },
    PricePublicity: {
        name: '泸州老窖',
        type: 'PricePublicity',
        path: '/index.html#/ProductInformation'
    }
}
const arr = []
for (let key in json) {
    if (window.location.hash.substring(2).indexOf(key) > -1) {
        console.log(json[key])
        arr.push(json[key])

    }
}


const Tpl = ThatMain((that) => {
    const { loadings,loading, selectedRowKeys } = that.state;
    const rowSelection = {
        selectedRowKeys,
        onChange: that.onSelectChange,
    }
    return (
        <ContentBox
            breadcrumbList={['个人中心', '消息中心']}
            linkList={['', '']}
        >
        <div className='MessageCenter'>
            {/* <div className='Breadcrumb'>
                <Breadcrumb>
                    <Breadcrumb.Item>
                                个人中心
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>消息中心</Breadcrumb.Item>
                </Breadcrumb>

            </div> */}
            <div className="ChangeHistoryBOX">
                <div className="ChangeBody">

                    <div style={{ marginBottom: "16px", marginTop: "10px",marginBottom:"10px" }}>
                        <Button
                            onClick={that.start}
                            loading={loading}
                        >标为已读</Button>
                        <Button
                           style={{marginLeft:"10px"}}
                            onClick={that.startError}
                            loading={loadings}
                        >批量删除</Button>

                    </div>
                    {/* <div className="changetit">
                        <span style={{ marginLeft: 8 }}>
                             共<span>{selectedRowKeys.length}</span> 项，已选择<span> {selectedRowKeys.length}</span>  项 <span><a>勾选全部</a>/<a>取消全部</a></span> 
                        </span>

                    </div> */}

                    <Table pagination={false}
                        rowKey='id'
                        rowSelection={rowSelection}
                        columns={that.state.MessageCenter_list}
                        dataSource={that.state.data} />

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