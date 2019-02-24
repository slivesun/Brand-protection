
import ThatMain from '../../../HOC/That';
import SetTable from './SetTable';
// import Copyright from "../../../components/Copyright";
import ContentBox from '../../../components/Layout'
import { AddIcon } from '../../../components/Component';

import { Breadcrumb, Button, Select, Table, Progress, Input, Icon, Alert, Modal, Upload, Pagination } from 'antd';
const Option = Select.Option;
const Dragger = Upload.Dragger;

const Tpl = ThatMain((that) => {
    let { id,dataList, name, formatColumn,checkAll, selectedRowKeys, setTableVisible, brandName, productName, pageNo, pageSize, totalElements } = that.state;
    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys) => that.onTableCheckChange(selectedRowKeys),
    };
    const clearIconStyle = {
        width: '14px',
        height: '14px',
        opacity: 0.25,
        cursor: 'pointer'
    }
    const clearIcon = fieldName => (
        that.state[fieldName]&&that.state[fieldName].length?
        <Icon
            type="close-circle"
            onClick={()=>that.handleClearIconClick(fieldName)}
            style={clearIconStyle}
        />
        :null
    )
    return (
        <ContentBox
        title="活动详情" 
        breadcrumbList={['售价公示', name]}
        linkList={['1', '']}
        history={that.props.history}
        >
        <div className='productinfo'>
            {/* <div className='Breadcrumb'>
                <Breadcrumb>
                    
                    <Breadcrumb.Item>
                        <a href='/index.html#/PriceNotice'>售价公示</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>{name}</Breadcrumb.Item>
                </Breadcrumb>
            </div> */}
            <div className='search-box'>
                <div className='box'>
                    <div className='item-ipt'>
                        <span>品牌</span>
                        <Input placeholder="请输入" value={brandName} onChange={(e) => that.onChange(e, 'brandName')}  suffix={clearIcon('brandName')} style={{ width: 250 }} />
                    </div>
                    <div className='item-ipt'>
                        <span>品名</span>
                        <Input placeholder="请输入" value={productName} onChange={(e) => that.onChange(e, 'productName')}  suffix={clearIcon('productName')} style={{ width: 250 }} />
                    </div>
                </div>
                <Button className="btn6" onClick={()=>that.onSearch()}>查询</Button>
            </div>
            <div className='content'>
                <div className='button-box'>
                    <div className='action'>
                        <a href={`index.html#/ActionPriceInfo/${id}/${setTableVisible}/${name}/add`}>
                            <Button className="btn1-main" type="primary"><AddIcon style={{paddingRight:'8px'}} />新增</Button>
                        </a>
                        <Button className="btn1-sub" onClick={()=>that.rmAll()}>批量删除</Button>
                        <a href={`/hcm/hcmProduct/exportExcel?ClassifyId=${id}&brandName=${brandName}&productName=${productName}&istemplet=${0}`}>
                            <Button className="btn1-sub" >下载数据</Button>
                        </a>
                        <Button className="btn1-sub" onClick={() => that.onuploadVisible(true)}>批量导入</Button>
                        <a href={`/hcm/hcmProduct/exportExcel?ClassifyId=${id}&brandName=${brandName}&productName=${productName}&istemplet=${1}`}>
                            <Button className="btn1-sub" icon="download">导入模版下载</Button>
                        </a>
                    </div>
                    <div className='info'>
                        <a style={{ margin: '0' }} onClick={that.ProduHistory}>
                            <Button className="btn1-sub" >变更历史</Button>
                        </a>
                        <Icon onClick={() => that.onShowSetTable(true)} type="setting" />
                    </div>
                </div>
                <div>
                <Alert message={<div>共 <a>{totalElements}</a> 项，已选择 <a>{checkAll ? totalElements : selectedRowKeys.length}</a> 项 <a onClick={() => that.checkAll(true)}>勾选全部</a>/<a onClick={() => that.checkAll(false)}>取消勾选</a></div>} type="info" showIcon />
                </div>
                {
                    formatColumn.length ?
                        <React.Fragment>
                            <Table rowKey='id' pagination={false} scroll={ { x: (formatColumn.length-1) * 200 }} rowSelection={rowSelection} columns={formatColumn.sort((a,b)=>a.sort-b.sort)} dataSource={dataList} />
                            <div className='footer'>
                                <div className='info'>
                                    {`共 ${totalElements} 条记录 `}
                                    &nbsp;&nbsp;
                                    {`第  ${pageNo}  / ${Math.ceil(totalElements / pageSize)} 页`}
                                </div>
                                <Pagination pageSize={pageSize} current={pageNo} total={totalElements} onChange={that.changePagination} onShowSizeChange={that.onPaginationSize} showSizeChanger showQuickJumper />
                            </div>
                        </React.Fragment>
                    : null
                }

            </div>
            <SetTable onShow={(bl,type) => that.onShowSetTable(bl,type)} visible={setTableVisible} params={that.props.match.params} />
            {/* <Copyright clazzName='copyright' /> */}
            <UploadModal that={that} />
        </div>
        </ContentBox>
    )
})

export default Tpl







const UploadModal = ThatMain((that) => {
    const { uploading, uploadVisible, fileList, percent } = that.state;
    return (
        <Modal
            title="批量导入"
            visible={uploadVisible}
            maskClosable={false} 
            onCancel={() => that.onuploadVisible(false)}
            footer={[
                <Button key="back2" className="btn2-main upload-demo-start" type="primary" onClick={() => that.handleUpload()} disabled={fileList.length === 0} loading={uploading} >
                    {uploading ? '上传中' : '上传'}
                </Button>,
                <Button className="btn2-sub noneFloat" key="back" onClick={() => that.onuploadVisible(false)}>取消</Button>,
            ]}
        >

            <Dragger multiple={false} {...that.propsUpload()}>
                <p className="ant-upload-drag-icon">
                    {/* <Icon type="file-excel" /> */}
                    <img style={{paddingTop:20}} src='../../../img/upload_files.png'/>
                </p>
                <p className="ant-upload-text">点击这里选择文件上传</p>
                <p className="ant-upload-hint">支持扩展名：.xls .xlsx</p>


            </Dragger>
            {
                percent ?
                    <Progress percent={percent} />
                    : null
            }
        </Modal>
    )
})