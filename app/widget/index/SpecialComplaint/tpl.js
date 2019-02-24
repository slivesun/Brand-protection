import './SpecialComplaint.less'
import ThatMain from '../../HOC/That';
import ContentBox from '../../components/Layout';
import { AddIcon } from '../../components/Component';
//import PicturesWall from '../../components/PicturesWall/PicturesWall';
import { Timeline ,Tabs, Steps, Input, Select, Button, DatePicker, Alert, Table, Pagination, Drawer, Modal, Row, Col, Upload, message, Icon } from 'antd';

const Tpl = ThatMain((that) => {
    return (
        <ContentBox
            title="维权服务"
            breadcrumbList={['维权服务', '特殊投诉处理']}
            linkList={['', '']}
            className="activity-review-wrapper"
        >
            <div className='specialComplaint'>
                <SpecialComplaint that={that} />
            </div>
        </ContentBox>

    )
})

const PicturesWall = ThatMain((that) => {
    let { previewVisible, previewImage, fileList } = that.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
        <div className="clearfix">
            <Upload
                name = 'file'
                action="/hcm/hcmWorkOrder/headImgUpload"
                listType="picture-card"
                fileList={fileList}
                onPreview={that.handlePreview}
                onChange={that.handleChange}
                beforeUpload = {(file)=>{
                    console.log(file)
                    const isLt10M = file.size / 1024 / 1024 < 10;
                    const type = 'image/jpeg image/jpg image/png';
                    const iStype = file.type.length ? type.indexOf(file.type) == -1 ? false : true :false;
                    if (!isLt10M) {
                        message.error('图片不能大于10MB!');
                    }
                    if (!iStype) {
                        message.error('支持图片格式jpeg，jpg，png。请重新选择');
                    }
                    return isLt10M&&iStype;
                }}
            >
            {fileList.length >= 9 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={that.handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
      </div>

    )
})


const SpecialComplaint = ThatMain((that) => {
    let {Identity,totalElements,historyList,upfileList,Remark,statusAll, checkAll,selectedRowKeys,shopname,status,shoplink,processing_times,id,Shopicon, platformData, endValue, endOpen, newPT,newSP,newSJ,querySJ,SCdata } = that.state;
    const btngroup = (
        <div className='content_Sbtn'>
            <Button className=' btn1-main' onClick={() => that.showModal()} style={{ marginRight: '10px', color: '#fff' }} ><AddIcon style={{ paddingRight: '8px' }} />新增</Button>
            <Button onClick={() => that.DeleteComplaint()} style={{ marginRight: '10px' }} >批量删除</Button>
            <Button onClick={() => that.allStopStart()} style={{ marginRight: '10px' }} >批量导入</Button>
            <Button onClick={() => that.allStopStart()} style={{ marginRight: '10px' }} >倒入模板下载</Button>
        </div>
    )
    //选项卡
    const TabPane = Tabs.TabPane;
    const Step = Steps.Step
    function callback(key) {
        console.log(key);
    }
    //Select下拉选择
    const Option = Select.Option;
    function handleChange(value) {
        console.log(value);
    }
    //日历
    const RangePicker = DatePicker.RangePicker;
    
    //内容列表
    const columns = [{
        title: '序号',
        dataIndex: 'onumber',
    }, {
        title: '商家名称',
        dataIndex: 'shopname',
        render: (text,e) =>{
            return <a href="javascript:;" onClick={()=>{that.showDrawer(e.id,e.shopname,e.status,e.shoplink,e.processing_times,e.platform)}}>{text}</a>
        } ,
    },{
        title: null,
        dataIndex: 'pticon',//平台图标
    },{
        title: null,
        dataIndex: 'ptchat',//聊天
    }, {
        title: '商品链接',
        dataIndex: 'shoplink',
    }, {
        title: '处理状态',
        dataIndex: 'status',
    }, {
        title: null,
        dataIndex: 'clockstatus', 
    },{
        title: '最后修改时间',
        dataIndex: 'updatetime', 
    }];
    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys) => {
            console.log(selectedRowKeys)
            that.onTableCheckChange(selectedRowKeys)
        },
    };
    
    //上传文件
    function upfilechange (info){
            let upfileList = info.fileList;
            console.log(info)
            if(this.upfile(info.file,false)){
                this.setState({ upfileList });
            }
    }
    function upfile (file,bl=true)  {
        let type = '.rar .zip .doc .docx .xls .xlsx .ppt .pptx .pdf .jpg .png';
        let filename = file.name;
        var index = filename.lastIndexOf(".");
        var ext = filename.substr(index+1);
        if(type.indexOf(ext)===-1){
            if(bl){
                message.error(`暂不支持${filename}文件格式`);
            }
            return false
        }
        return true
        
    }
    const props = {
        name: 'file',
        action: '/hcm/hcmWorkOrder/headUpload',
        headers: {
            authorization: 'authorization-text',
        },
        onChange: that.upfilechange,
        beforeUpload: that.upfile
        
    };
    //渲染商家平台下拉菜单
    let platformDatalist = platformData.map((e, i) => {
        return <Option key={i} value={e.dictCode}>{e.dictName}</Option>
    })
    //渲染投诉历史记录
    let HistoryList = historyList.map((e,i)=>{
        return <Timeline.Item key = {i}>
                    <div className='Latesttime'>2018-28-28 <span><img src="../../../img/icon/icon_operating_del.png" alt=""/></span></div>
                    <div className='lszt'>处理状态：邮件已恢复</div>
                    <div className = 'lsimg'>
                        <ul>
                            <li><img src="http://www.mongoing.com/wp-content/uploads/2017/07/qrcode.jpg" alt="" /></li>
                            <li><img src="http://www.mongoing.com/wp-content/uploads/2017/07/qrcode.jpg" alt="" /></li>
                            <li><img src="http://www.mongoing.com/wp-content/uploads/2017/07/qrcode.jpg" alt="" /></li>
                            <li><img src="http://www.mongoing.com/wp-content/uploads/2017/07/qrcode.jpg" alt="" /></li>
                        </ul>
                    </div>
                    <div className = 'lsbz'>备注:发的给分高的复合肥的</div>
                    <div className = 'lsfj'>附件：</div>
                </Timeline.Item>
    })
    return (
        <div className='content SpecialComplaint'>
            {/* 抽屉 */}
            <Drawer
                title={null}
                placement="right"
                closable={false}
                onClose={that.onClose}
                visible={that.state.Draweroff}
                className='SpecialComplaint_Drawer'
                closable={true}
            >
                <div className='D_title'>
                    <Row className='D_title_rowt'>
                        <Col span={9} className='D_title_row_c9'>
                            <h3>{shopname}<span><img src={Shopicon} style={{width:15,height:15,marginLeft:5}}/></span></h3>
                        </Col>
                        <Col span={15} className='D_title_row_c15'>
                            <p>当前状态：{statusAll[status]}</p>
                        </Col>
                    </Row>
                    <Row className='D_title_rowa'>
                        <Col span={17} className='D_title_row_c15' style={{}}>
                            <span style={{ float: 'left' }}>商品链接：</span><a href="javascript:;">{shoplink}</a>
                        </Col>
                        <Col span={4} className='D_title_row_c9' style={{ float: 'right' }}>
                            <p>第<span>(</span><span>{processing_times}</span>)<span></span>次处理</p>
                        </Col>
                    </Row>
                </div>
                <Tabs
                    defaultActiveKey="1"
                    onChange={that.Drawertabschange}
                    animated={false}
                    className='DrawerTabs'
                >
                    <TabPane tab="更改状态" key="1" className='newAHistory'>
                        <div className='newstate'>
                            <div className='newstate_left' >处理状态*</div>
                            <Select labelInValue defaultValue={{ key: status }} style={{ width: 120 }} onChange={that.newState}>
                                <Option value="0">邮件待发送</Option>
                                <Option value="1">邮件已发送</Option>
                                <Option value="2">邮件已驳回</Option>
                                <Option value="3">邮件已回复</Option>
                                <Option value="4">完结</Option>
                            </Select>
                        </div>
                        <div className='newstate'>
                            <div className='newstate_left'>下次跟进时间</div>
                            <DatePicker
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                                placeholder="Select Time"
                                onChange={that.nexttime}
                                onOk={that.onOk}
                            />
                        </div>
                        <div className='newstate'>
                            <div className='newstate_left' style={{lineHeight:'24px'}}>上传截图</div>
                            <PicturesWall  that={that} />
                        </div>
                        <div className='newstate'>
                            <div className='newstate_left' >上传附件</div>
                            <Upload 
                            {...props}
                            upfileList = {upfileList}
                            >
                                <Button>
                                    <Icon type="upload" />选择文件
                                </Button>
                            </Upload>
                        </div>
                        <div className='newstate'>
                            <p className='tips'>支持扩展名：xls.xlsx.ppt.rar.zip.doc.docx.pdf.文件不得超过100M。</p>

                        </div>
                        <div className='newstate'>
                            <div className='newstate_left' style={{lineHeight:'24px'}} >备注</div>
                            <textarea name="" id="" cols="63" rows="6" maxLength='200' value={Remark} onChange={that.remark}></textarea>
                        </div>
                        <div className='newstate'>
                            <div className='newbutton' >
                                <Button onClick={that.onClose} style={{ float: 'right' }}>取消</Button>
                                <Button onClick={that.newHistory} className='btn2-main' type="primary" style={{ float: 'right', marginRight: 20 }}>确定</Button>
                            </div>

                        </div>
                    </TabPane>
                    
                    <TabPane tab="历史记录" key="2" className='Historical'>
                        <Timeline>
                            <Timeline.Item>
                                <div className='Latesttime'>2018-28-28 <span><img src="../../../img/icon/icon_operating_del.png" alt=""/></span></div>
                                <div className='lszt'>处理状态：邮件已恢复</div>
                                <div className = 'lsimg'>
                                    <ul>
                                        <li><img src="http://www.mongoing.com/wp-content/uploads/2017/07/qrcode.jpg" alt="" /></li>
                                        <li><img src="http://www.mongoing.com/wp-content/uploads/2017/07/qrcode.jpg" alt="" /></li>
                                        <li><img src="http://www.mongoing.com/wp-content/uploads/2017/07/qrcode.jpg" alt="" /></li>
                                        <li><img src="http://www.mongoing.com/wp-content/uploads/2017/07/qrcode.jpg" alt="" /></li>
                                    </ul>
                                </div>
                                <div className = 'lsbz'>备注:发的给分高的复合肥的</div>
                                <div className = 'lsfj'>附件：</div>
                            </Timeline.Item>
                            {HistoryList}
                        </Timeline>
                    </TabPane>
                </Tabs>
            </Drawer>
            {/* 新增弹窗 */}
            <Modal
                title="新增"
                visible={that.state.NewComplaint}
                onOk={that.Newcomplaints}
                onCancel={that.Closecomplaints}
                className='newC'
                destroyOnClose={true}
            >
                <div className='new_pss'>
                    <div style={{ width: '70px', float: 'left' }}><span >平台：</span></div>

                    <Select labelInValue defaultValue={{ key: '请选择' }} style={{ width: 120 }} onChange={that.newAchange}>
                        <Option value="请选择">请选择</Option>
                        {platformDatalist}
                    </Select>
                </div>
                <div className='new_pss'>
                    <div style={{ width: '70px', float: 'left' }}><span >商家名称：</span></div>
                    <Input placeholder="请输入" value={newSJ} onChange={that.newsj} style={{ width: '300px' }} maxLength='24'/>
                </div>
                <div className='new_pss'>
                    <div style={{ width: '70px', float: 'left' }}><span >商品链接：</span></div>
                    <Input placeholder="请输入" value={newSP} onChange={that.newsp} style={{ width: '300px' }} maxLength='200'/>
                </div>
            </Modal>
            <Tabs defaultActiveKey="1"
                animated={false}
                onChange={callback}
            >
                <TabPane tab="邮件处理" key="1">
                    <div className='search_row' style={{ height: '74px', padding: '23px 24px 0px 24px' }}>
                        <div className='ser_row'>
                            商家名称
                            <Input placeholder="请输入" value={querySJ} onChange={that.querysj} className='sj' maxLength='24'/>
                        </div>
                        <div className='ser_row' >
                            处理状态
                            <Select  labelInValue defaultValue={{ key: '请选择' }} style={{ width: 120 }} onChange={that.queryzt}>
                                <Option value="请选择">请选择</Option>
                                <Option value="邮件待发送">邮件待发送</Option>
                                <Option value="邮件已发送">邮件已发送</Option>
                                <Option value="邮件已驳回">邮件已驳回</Option>
                                <Option value="邮件已回复">邮件已回复</Option>
                                <Option value="完结">完结</Option>

                            </Select>
                        </div>
                        <div className='ser_row' style={{ display: 'flex' }}>
                            <div style={{ width: '86px', fontSize: '14px', float: 'left', lineHeight: '34px' }}>最后修改时间</div>
                            <RangePicker
                                ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
                                onChange={that.selecttime}
                            />
                        </div>
                    </div>
                    <div className='search_row' style={{ height: '52px', padding: '0 24px' }}>
                        <div className='ser_row'>
                            商家平台
                            <Select labelInValue defaultValue={{ key: '请选择' }} style={{ width: 120 }} onChange={that.querypt}>
                                <Option value="请选择">请选择</Option>
                                {platformDatalist}
                            </Select>
                        </div>
                        <div className='ser_btn'>
                            <Button type="primary" onClick={that.querycontent} ghost>查询</Button>
                        </div>
                    </div>
                    <div style={{ height: '20px', width: '100%' }}>此处为留痕</div>
                    <div className='content_S' >


                        {Identity == 'KEFU'?btngroup:null}
                        {Identity == 'KEFU'?<div >
                        <Alert message={<div>共 <a>{totalElements}</a> 项，已选择 <a>{selectedRowKeys.length == 0 ? 0 :checkAll == true ? totalElements :selectedRowKeys.length}</a> 项 <a onClick={() => that.DelecheckAll(true)}>勾选全部</a>/<a onClick={() => that.cancelcheckAll(false)}>取消勾选</a></div>} type="info" showIcon />
                    </div>:null}

                        

                        {/* columns内容title SCdata数据内容 */}
                        <Table pagination={false} rowSelection={rowSelection} columns={columns} dataSource={SCdata} />
                        
                        
                        <div className='footer'>
                            <div className='info'>
                                
                            </div>
                            <Pagination total={totalElements} showSizeChanger showQuickJumper onChange = {that.changePagination} onShowSizeChange={that.onPaginationSize}/>

                        </div>
                    </div>
                </TabPane>
                <TabPane tab="购买鉴定" key="2">
                    购买鉴定
                </TabPane>
                <TabPane tab="通知处理" key="3">通知处理</TabPane>
                <TabPane tab="直接举报" key="4">直接举报</TabPane>

            </Tabs>


        </div>
    )
})



export default Tpl