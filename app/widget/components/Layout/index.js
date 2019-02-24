import Copyright from '../Copyright'
import { Breadcrumb } from 'antd'

import './index.less'

const RightBox = props => {
  return (
    <div className={`layout-wrapper ${props.className || ''}`}>
      <div className="header-wrapper">
        <Breadcrumb className="breadcrumb">
          {
            props.breadcrumbList.map((v, i) => {
              if (props.linkList[i] === '') {
                return <Breadcrumb.Item key={v}>{v}</Breadcrumb.Item>
              }
              return (
                <Breadcrumb.Item 
                  href="javascript:;" 
                  key={v}>
                  <span onClick={() => {props.history.go(-props.linkList[i])}}>{v}</span>
                </Breadcrumb.Item>
              )
            })
          }
        </Breadcrumb>
        {/* <h1 className="title">{props.title}</h1> */}
      </div>
      <div className="layout-content">{ props.children }</div>
      <div className="copyright">
        <Copyright />
      </div>
    </div>
  )
}

RightBox.defaultProps = {
  title: '标题',
  breadcrumbList: [],
  linkList: []
}

export default RightBox