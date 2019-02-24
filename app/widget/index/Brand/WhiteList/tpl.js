
import ThatMain from '../../../HOC/That';
import ContentBox from '../../../components/Layout'
import Copyright from "../../../components/Copyright";
import { AddIcon } from '../../../components/Component';
import TagInput from '../../../components/TagInput/main';
import { Breadcrumb, Tabs, Form, Input, Button, Select, Alert, Table,message, Pagination, Icon, Modal,Tooltip } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
const Search = Input.Search;
const TabPane = Tabs.TabPane;

const TYPELIST = [{
    name: '淘宝天猫',
    type: 'TB'
}, {
    name: '1688网',
    type: '1688'
}, {
    name: '闲鱼',
    type: 'XY'
}, {
    name: '拼多多',
    type: 'PDD'
}, {
    name: '京东商城',
    type: 'JD'
}, {
    name: '苏宁易购',
    type: 'SN'
}, {
    name: '当当网',
    type: 'DD'
}, {
    name: '唯品会',
    type: 'WP'
}]
/////////
const Tpl = ThatMain((that) => {
    let { pageNo, pageSize, totalNum, checkAll, platform, title, selectedRowKeys, dataList } = that.state;
    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys) => that.onTableCheckChange(selectedRowKeys),
    };

    return (
        <ContentBox
            breadcrumbList={['维权服务', '维权白名单']}
            linkList={['', '']}
        >
        <div className='WhiteList'>
            {/* <div className='Breadcrumb'>
                <Breadcrumb>
                    <Breadcrumb.Item>维权服务</Breadcrumb.Item>
                    <Breadcrumb.Item>维权白名单</Breadcrumb.Item>
                </Breadcrumb>
            </div> */}
            <div className='content'>
                <Tabs style={{ display: 'flex', flexDirection: 'column' }} activeKey={platform} onChange={that.changeTabs}>
                    {
                        TYPELIST.map((item, index) => {
                            return (
                                <TabPane key={index} tab={item.name} key={item.type}>
                                    <div className='list-box'>
                                        <div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <div>
                                                    <Button className='btn1-main btn_f' onClick={() => that.onAddBoxFrom(true)} style={{ marginRight: '10px',color:'#fff' }} ><AddIcon style={{paddingRight:'8px'}} />新增</Button>
                                                    <Button className="btn1-sub" onClick={() => that.allStopStart()} style={{ marginRight: '10px' }} >批量删除</Button>
                                                </div>
                                                <Search
                                                    placeholder="请输入"
                                                    value={title}
                                                    onSearch={that.onSearch}
                                                    onChange={that.searchChange}
                                                    style={{ width: 250 }}
                                                />
                                            </div>
                                            <div style={{ padding: '10px 0px' }}>
                                                <Alert message={<div>共 <a>{totalNum}</a> 项，已选择 <a>{checkAll ? totalNum : selectedRowKeys.length}</a> 项 <a onClick={() => that.checkAll(true)}>勾选全部</a>/<a onClick={() => that.checkAll(false)}>取消勾选</a></div>} type="info" showIcon />
                                            </div>

                                            <Table rowKey='id' pagination={false} rowSelection={rowSelection} columns={that.formatColumn()} dataSource={dataList} />
                                        </div>
                                        <div className='footer'>
                                            <div className='info'>
                                                {`共 ${totalNum} 条记录 `}
                                                &nbsp;&nbsp;
                                                {`第  ${pageNo}  / ${Math.ceil(totalNum / pageSize)} 页`}
                                            </div>
                                            <Pagination pageSize={pageSize} current={pageNo} total={totalNum} onChange={that.changePagination} onShowSizeChange={that.onPaginationSize} showSizeChanger showQuickJumper />
                                        </div>

                                    </div>
                                </TabPane>
                            )
                        })
                    }


                </Tabs>

            </div>
            <AddBoxFrom that={that} />
            {/* <Copyright clazzName='copyright' /> */}
        </div>
        </ContentBox>

    )
})

export default Tpl


const AddBoxFrom = Form.create()((props) => {

    const { getFieldDecorator, resetFields, validateFields,setFieldsValue } = props.form;
    const { state, onAddBoxFrom, onSubmit } = props.that;
    const addHandleSubmit = (e) => {
        e.preventDefault();
        validateFields((err, values) => {
            if (!err) {
                if(values.title.length>300){
                    message.error(
                        <span>每次最多添加300个！当前数量为<span>{values.title.length}</span></span>
                    )
                    return
                }
                onSubmit(values,resetFields);
            }
        });
    }
    
    const cancel = (e) => {
        e.preventDefault();
        resetFields();
        onAddBoxFrom(false)
    }
    

    return (
        <Modal
            maskClosable={false}
            wrapClassName='boxModal'
            title={'新增'}
            onCancel={cancel}
            visible={state.actionVisible}
            onOk={addHandleSubmit}
            className='YellowWhite'
        >
            <Form onSubmit={addHandleSubmit}>
                <FormItem
                    
                    label={<span> 
                       
                        {
                            state.platform == 'TB'||state.platform == '1688'||state.platform == 'XY'?
                            '旺旺名称':'店铺名称'
                        }
                    </span>}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                >
                    {getFieldDecorator('title', {
                        rules: [{ required: true, message: '请输入名称' }],
                    })(
                        <TagInput
                            className=''
                            style={{width: 376,height:300}}
                            placeholder={`请输入${state.platform == 'TB'||state.platform == '1688'||state.platform == 'XY'?'旺旺名称':'店铺名称'}名称,一行一个，可多个，最多300个.`}
                            maxText={64}
                        />
                        // <Select
                        //     mode="tags"
                        //     placeholder={`一行一个，可多个，最多300个.`}
                        //     style={{ width: '100%' }}
                        //     className='addclient'
                        //     maxTagCount={300}
                        //     onBlur={changeItem}
                        //     dropdownClassName='dropdownaddclient'
                        //     tokenSeparators={['    ']}
                        // >

                        // </Select>
                    )}
                </FormItem>
                
            </Form>
        </Modal>
    );
});
