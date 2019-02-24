import ThatMain from '../../HOC/That'
import ContentBox from '../../components/Layout'

import { Icon, Card, Input, Cascader, Row, Col } from 'antd'

const Tpl = ThatMain(that => {

  const {
    reportList,
    alreadyReportList,
    complatinAccountList,
    platform,
  } = that.state

  const cardTitle = (value, index) => (
    <div className="card-title">
      <div>
      报表名称：<Input value={value.name} onChange={that.handleInputChange.bind(that, index)} style={{width:'440px'}} placeholder="请输入" />
      </div>
      <div className="operation">
        <span onClick={that.handleSaveReport.bind(that, value, index)}>保存</span>
        <span onClick={that.handleDeleteReport.bind(that, index)}>取消</span>
      </div>
    </div>
  )

  const alreadyCardTitle = (value, index) => (
    <div className="card-title">
      <div>
        报表名称：
        {
          value._isEdit ?
          <Input 
            value={value.report_name} 
            onChange={that.handleEditInputChange.bind(that, index)} 
            style={{width:'440px'}} placeholder="请输入" /> :
          value.report_name
        }
      </div>
      <div className="operation">
        {
          value._isEdit ?
          <span onClick={that.handleSaveReport.bind(that, value, index)}>提交</span> :
          <span onClick={that.handleEdit.bind(that, index, true)}>编辑</span>
        }
        {
          value._isEdit ?
          <span onClick={that.handleEdit.bind(that, index, false)}>取消</span>:
          <span onClick={that.handleDeleteAlreadyComplaintReport.bind(that, value.report_id)}>删除</span>
        }
      </div>
    </div>
  )

  return (
    <ContentBox 
      className="set-complaint-report-wrapper"
      linkList={['', 1, '']}
      history={that.props.history}
      breadcrumbList={['维权报表', `${platform==='taobao'?'淘宝':'1688'}维权报表`, '设置报表']}>
      <section className="add-report" onClick={that.handleAddReport}>
        <Icon type="plus" />
        <span>新增投诉报表</span>
      </section>
      <section className="main-wrapper">
        {
          reportList.map((val, idx) => (
            <Card title={cardTitle(val, idx)} key={val.id}>
              <Row>
                <Col span={2}>
                  <span>知识产权：</span>
                </Col>
                <Col span={22}>
                {
                  val.list.map((v, i) => (
                    <div key={v+i} className="knowledgeright-item">
                      <Cascader 
                        getPopupContainer={trigger => trigger.parentNode}
                        style={{width:'440px'}}
                        onChange={that.handleCascaderChange.bind(that, idx, i, 'add')}
                        value={v}
                        options={complatinAccountList} 
                        loadData={that.handleLoadData}
                        placeholder="请选择" />
                        &nbsp;&nbsp;&nbsp;
                      <Icon 
                        type="minus-circle" 
                        style={{cursor:'pointer'}} 
                        onClick={that.handleDeleteKnowledgeRight.bind(that, idx, i)} />
                    </div>
                  ))
                }
                <div className="add-knowledge-right" onClick={that.handleAddKnowledgeRight.bind(that, idx)}>
                  <Icon type="plus" />
                  <span>添加知识产权</span>
                </div>
                </Col>
              </Row>
            </Card>
          ))
        }

      </section>
      <section className="report-list">
      {
          alreadyReportList.map((val, idx) => (
            <Card title={alreadyCardTitle(val, idx)} key={val.report_id}>
              <Row>
                <Col span={2}>
                  <span>知识产权：</span>
                </Col>
                <Col span={22}>
                {
                  val.complaintModelList.map((v, i) => (
                    <div key={v.account_id+i} className="knowledgeright-item">
                      {
                        val._isEdit ?
                        <React.Fragment>
                          <Cascader 
                            getPopupContainer={trigger => trigger.parentNode}
                            style={{width:'440px'}}
                            onChange={that.handleCascaderChange.bind(that, idx, i, 'edit')}
                            defaultValue={[v.account_id, v.ipr_id]}
                            options={complatinAccountList} 
                            loadData={that.handleLoadData}
                            placeholder="请选择" />
                            &nbsp;&nbsp;&nbsp;
                          <Icon 
                            type="minus-circle" 
                            style={{cursor:'pointer'}} 
                            onClick={that.handleDeleteAlreadyKnowledge.bind(that, idx, i)} />
                        </React.Fragment> :
                        <p>{`${v.account_id} / ${v.ipr_name}`}</p>
                      }
                    </div>
                  ))
                }
                {
                  // val._isEdit ?
                  // <div className="add-knowledge-right" onClick={that.handleEditAddKnowledgeRight.bind(that, idx)}>
                  //   <Icon type="plus" />
                  //   <span>添加知识产权</span>
                  // </div> :
                  // null
                }
                </Col>
              </Row>
            </Card>
          ))
        }
      </section>
    </ContentBox>
  )
})

export default Tpl