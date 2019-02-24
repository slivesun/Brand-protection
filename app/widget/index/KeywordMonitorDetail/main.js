import Tpl from './tpl'

import ajax from '../../../js/common/ajax';
class App extends React.Component {
  constructor(props) {
    super(props)
    const taobaocolumns = [{
      title: '序号',
      render: (content, record, index) => (
        <span key={index}>
          {index + 1}
        </span>
      )
    }, {
      title: '商品信息',
      render: (content, record, index) => (
        <span key={index}>
          <img style={{ width: "50px", float: "left" }} src={record.logopicurl} alt="" />
          <a href={record.itemlink} target="_blank" style={{ width: "150px", float: "left", marginLeft: "10px", overflow: "hidden" }}>{record.itemtitle}</a>
        </span>
      )
    }, {
      title: '店铺信息',
      render: (content, record, index) => (
        <span key={index}>
          {record.shopname}
        </span>
      )
    }, {
      title: '价格',
      render: (content, record, index) => (
        <span key={index}>
          ￥{record.itemprice}
        </span>
      )
    }, {
      title: '30天销量',
      render: (content, record, index) => (
        <span key={index}>
          {record.salevolume}
        </span>
      )
    }, {
      title: '优惠信息',
      render: (content, record, index) => (
        <span key={index}>
          {record.discount}
        </span>
      )
    }, {
      title: '发货地',
      render: (content, record, index) => (
        <span key={index}>
          {record.area}
        </span>
      )
    }, {
      title: '低价次数',
      render: (content, record, index) => (
        <span key={index}>
          {record.low_count}
          <a href={`/index.html#/monitorLowPriceScreenshot/${record.id}/${this.state.platform}`}>(低价截图)</a>
        </span>
      )
    }]
    const JDcolumns = [{
      title: '序号',
      render: (content, record, index) => (
        <span key={index}>
          {index + 1}
        </span>
      )
    }, {
      title: '商品信息',
      render: (content, record, index) => (
        <span key={index}>
          <img style={{ width: "50px", float: "left" }} src={record.logopicurl} alt="" />
          <a href={record.itemlink} target="_blank" style={{ width: "150px", float: "left", marginLeft: "10px", overflow: "hidden" }}>{record.itemtitle}</a>
        </span>
      )
    }, {
      title: '店铺名称',
      render: (content, record, index) => (
        <span key={index}>
          {record.shopname}
        </span>
      )
    }, {
      title: '价格',
      render: (content, record, index) => (
        <span key={index}>
          ￥{record.itemprice}
        </span>
      )
    }, {
      title: '评价数',
      render: (content, record, index) => (
        <span key={index}>
          {record.evaluate_num}
        </span>
      )
    }, {
      title: '优惠信息',
      render: (content, record, index) => (
        <span key={index}>
          {record.discount}
        </span>
      )
    }, {
      title: '低价次数',
      render: (content, record, index) => (
        <span key={index}>
          {record.low_count}
          <a href={`/index.html#/monitorLowPriceScreenshot/${record.id}/${this.state.platform}`}>(低价截图)</a>
        </span>
      )
    }]
    const PDDcolumns = [{
      title: '序号',
      render: (content, record, index) => (
        <span key={index}>
          {index + 1}
        </span>
      )
    }, {
      title: '商品信息',
      render: (content, record, index) => (
        <span key={index}>
          <img style={{ width: "50px", float: "left" }} src={record.logopicurl} alt="" />
          <a href={record.itemlink} target="_blank" style={{ width: "150px", float: "left", marginLeft: "10px", overflow: "hidden" }}>{record.itemtitle}</a>
        </span>
      )
    }, {
      title: '店铺名称',
      render: (content, record, index) => (
        <span key={index}>
          {record.shopname}
        </span>
      )
    }, {
      title: '拼单价',
      render: (content, record, index) => (
        <span key={index}>
          ￥{record.itemprice}
        </span>
      )
    }, {
      title: '已拼件数',
      render: (content, record, index) => (
        <span key={index}>
          {record.salevolume}
        </span>
      )
    }, {
      title: '评价数',
      render: (content, record, index) => (
        <span key={index}>
          {record.evaluate_num}
        </span>
      )
    }, {
      title: '低价次数',
      render: (content, record, index) => (
        <span key={index}>
          {record.low_count}
          <a href={`/index.html#/monitorLowPriceScreenshot/${record.id}/${this.state.platform}`}>(低价截图)</a>
        </span>
      )
    }]
    const BBcolumns = [{
      title: '序号',
      render: (content, record, index) => (
        <span key={index}>
          {index + 1}
        </span>
      )
    }, {
      title: '商品信息',
      render: (content, record, index) => (
        <span key={index}>
          <img style={{ width: "50px", float: "left" }} src={record.logopicurl} alt="" />
          <a href={record.itemlink} target="_blank" style={{ width: "150px", float: "left", marginLeft: "10px", overflow: "hidden" }}>{record.itemtitle}</a>
        </span>
      )
    }, {
      title: '公司名称',
      render: (content, record, index) => (
        <span key={index}>
          {record.shopname}
        </span>
      )
    }, {
      title: '价格',
      render: (content, record, index) => (
        <span key={index}>
          ￥{record.itemprice}
        </span>
      )
    }, {
      title: '30天成交数',
      render: (content, record, index) => (
        <span key={index}>
          {record.salevolume}
        </span>
      )
    }, {
      title: '发货地',
      render: (content, record, index) => (
        <span key={index}>
          {record.area}
        </span>
      )
    }, {
      title: '低价次数',
      render: (content, record, index) => (
        <span key={index}>
          {record.low_count}
          <a href={`/index.html#/monitorLowPriceScreenshot/${record.id}/${this.state.platform}`}>(低价截图)</a>
        </span>
      )
    }]
    const XYcolumns = [{
      title: '序号',
      render: (content, record, index) => (
        <span key={index}>
          {index + 1}
        </span>
      )
    }, {
      title: '商品信息',
      render: (content, record, index) => (
        <span key={index}>
          <img style={{ width: "50px", float: "left" }} src={record.logopicurl} alt="" />
          <a href={record.itemlink} target="_blank" style={{ width: "150px", float: "left", marginLeft: "10px", overflow: "hidden" }}>{record.itemtitle}</a>
        </span>
      )
    }, {
      title: '旺旺名称',
      render: (content, record, index) => (
        <span key={index}>
          {record.shopnick}
        </span>
      )
    }, {
      title: '价格',
      render: (content, record, index) => (
        <span key={index}>
          ￥{record.itemprice}
        </span>
      )
    }, {
      title: '所在地',
      render: (content, record, index) => (
        <span key={index}>
          {record.area}
        </span>
      )
    }, {
      title: '低价次数',
      render: (content, record, index) => (
        <span key={index}>
          {record.low_count}
          <a href={`/index.html#/monitorLowPriceScreenshot/${record.id}/${this.state.platform}`}>(低价截图)</a>
        </span>
      )
    }]
    const wphcolumns = [{
      title: '序号',
      render: (content, record, index) => (
        <span key={index}>
          {index + 1}
        </span>
      )
    }, {
      title: '商品信息',
      render: (content, record, index) => (
        <span key={index}>
          <img style={{ width: "50px", float: "left" }} src={record.logopicurl} alt="" />
          <a href={record.itemlink} target="_blank" style={{ width: "150px", float: "left", marginLeft: "10px", overflow: "hidden" }}>{record.itemtitle}</a>
        </span>
      )
    }, {
      title: '店铺名称',
      render: (content, record, index) => (
        <span key={index}>
          {record.shopname}
        </span>
      )
    }, {
      title: '价格',
      render: (content, record, index) => (
        <span key={index}>
          ￥{record.itemprice}
        </span>
      )
    }, {
      title: '原价',
      render: (content, record, index) => (
        <span key={index}>
          {record.original_price}
        </span>
      )
    }, {
      title: '折扣率',
      render: (content, record, index) => (
        <span key={index}>
          {record.rebate}
        </span>
      )
    }, {
      title: '优惠信息',
      render: (content, record, index) => (
        <span key={index}>
          {record.discount}
        </span>
      )
    }, {
      title: '低价次数',
      render: (content, record, index) => (
        <span key={index}>
          {record.low_count}
          <a href={`/index.html#/monitorLowPriceScreenshot/${record.id}/${this.state.platform}`}>(低价截图)</a>
        </span>
      )
    }]
    this.state = {
      pageSize: 10,
      pageNo: 1,
      totalNum: 0,
      loading: false,
      data: [],
      taobao_list: taobaocolumns,
      JD_list: JDcolumns,
      PDD_list: PDDcolumns,
      BB_list: BBcolumns,
      XY_list: XYcolumns,
      wph_list: wphcolumns,
      JKXX: "",
      TimeB: "",
      key_name: "",//（String—关键词）
      key_price: "",//（number—限价）
      key_range: "",//（String—监控范围）
      frequency: "",//（String—监控频次）
      key_times: "",//（String—监控时间）
      platform: "", //（String—平台）
      keyword_id: "",//String--关键词id）
      createtime: "",//String—创建时间）yyyy-MM-dd
      key_times: "",//String—监控时间）
      value: [],
      values: [],
      keytime: ""
    }
  }
  add0 = (m) => { return m < 10 ? '0' + m : m }
  format = (shijianchuo) => {
    //shijianchuo是整数，否则要parseInt转换
    var time = new Date(shijianchuo);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate() + 1;
    var h = time.getHours() + 1;
    var mm = time.getMinutes() + 1;
    var s = time.getSeconds() + 1;
    return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
  }
  functions = (time) => {
    var s = '';

    var hour = time.split(':')[0];
    var min = time.split(':')[1];

    s = Number(hour * 3600) + Number(min * 60)

    return s;
  };
  componentDidMount() {
   // console.log(this.props.match.params.platform)

    let d = new Date();
    let Time = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
   // let moment=moment(parseInt(this.props.match.params.platform)).format('YYYY-MM-DD HH:mm:ss')
    this.HeaderList(Time)

  }
  HeaderList = (Time) => {
     
    ajax.post('/hcm/keyword_monitor/obj', {
      id: this.props.match.params.id,//（number--关键词id）
      createtime: this.state.createtime ? this.state.createtime : moment(parseInt(this.props.match.params.platform)).format('YYYY-MM-DD HH:mm:ss')//（Date—创建时间）

    }).then(res => {

      console.log(res)
      if (res.data.status == 10000) {

        this.setState({
          key_name: res.data.data.key_name,//（String—关键词）
          key_price: res.data.data.key_price,//（number—限价）
          key_range: res.data.data.key_range,//（String—监控范围）
          frequency: res.data.data.frequency,//（String—监控频次）
          key_times: res.data.data.key_times,//（String—监控时间）
          platform: res.data.data.platform, //（String—平台）
          keyword_id: this.props.match.params.id,//String--关键词id）
          createtime: Time,
          loading:true,
          createtimes: moment(parseInt(this.props.match.params.platform)).format('YYYY-MM-DD HH:mm:ss'),
          value: res.data.data.key_times.split(",")
        }, () => {
          var min = [];
          var index = 0;
          const timeDate = new Date().getHours() + ":" + new Date().getMinutes()
          var v = []
          var a = []
          console.log(res.data.data.key_times.split(",").sort())
          res.data.data.key_times.split(",").sort().forEach((element, i) => {
            // a.push(this.functions(timeDate) - this.functions(res.data.data.key_times.split(",")[i]))

            if (this.functions(timeDate) < this.functions(res.data.data.key_times.split(",").sort()[i])) {
              console.log(1)
              v.push(this.functions(timeDate) - this.functions(res.data.data.key_times.split(",").sort()[i]))
              this.setState({
                values: res.data.data.key_times.split(",").sort()[v.indexOf(Math.max.apply([], v))],
                keytime: res.data.data.key_times.split(",").sort()[v.indexOf(Math.max.apply([], v))]
              },()=>{
                this.list(this.state.platform, this.state.keyword_id, this.state.createtime, this.state.keytime, this.state.pageNo, this.state.pageSize)

              })
            } else if (this.functions(timeDate) > this.functions(res.data.data.key_times.split(",").sort()[i])) {
              console.log(2)
              a.push(this.functions(timeDate) - this.functions(res.data.data.key_times.split(",").sort()[i]))
              this.setState({
                values: res.data.data.key_times.split(",").sort()[a.indexOf(Math.min.apply([], a))],
                keytime: res.data.data.key_times.split(",").sort()[a.indexOf(Math.min.apply([], a))]
              },()=>{
                this.list(this.state.platform, this.state.keyword_id, this.state.createtime, this.state.keytime, this.state.pageNo, this.state.pageSize)

              })

            } else {

            }
           
          },()=>{
            console.log(1)
          });
         

        })
      }

    })
  }
  dataFx = () => {
    window.location.href = "/index.html#/monitorDataAnalysis/" + this.props.match.params.id + "/" + this.props.match.params.platform
  }
  DLSju = () => {

    ajax.post('/hcm/keyword_monitor/downLoad', {
      platform: this.state.platform, //（String—平台）
      keyword_id: this.props.match.params.id,//String--关键词id）
      createtime: this.state.createtime,//String—创建时间）yyyy-MM-dd
      key_times: this.state.keytime,//String—监控时间）
    }).then((res) => {
      console.log(res)
      if (res.status == 200) {
        window.location.href = "/hcm/keyword_monitor/downLoad?keyword_id=" + this.props.match.params.id + "&createtime=" + moment(parseInt(this.props.match.params.platform)).format('YYYY-MM-DD HH:mm:ss') + "&key_times=" + this.state.keytime

      }
    })
  }
  onChangeTime = (time) => {
    console.log(time);
    this.setState({
      keytime: time,
      loading: true
    }, () => {
      this.list(this.state.platform, this.state.keyword_id, this.state.createtime, this.state.keytime, this.state.pageNo, this.state.pageSize)

    })
  }
  onmomentTime = (date, dateString) => {

    this.setState({
      key_name: "",//（String—关键词）
      key_price: "",//（number—限价）
      key_range: "",//（String—监控范围）
      frequency: "",//（String—监控频次）
      key_times: "",//（String—监控时间）
      platform: "", //（String—平台）
      keyword_id: "",//String--关键词id）
      key_times: "",//String—监控时间）
      value: [],
      values: [],
      keytime: "",
      loading: true,
      createtime: dateString + " 00:00:00"
    }, () => {
      console.log(this.state.createtime)
      this.HeaderList(dateString + " 00:00:00")
      // this.list(this.state.platform, this.state.keyword_id, this.state.createtime, this.state.keytime, this.state.pageNo, this.state.pageSize)

    })
  }
  list = (platform, keyword_id, createtime, key_times, pageNo, pageSize) => {

    ajax.post('/hcm/keyword_monitor/list', {
      platform: platform, //（String—平台）
      keyword_id: keyword_id,//String--关键词id）
      createtime: createtime,//String—创建时间）yyyy-MM-dd
      key_times: key_times,//String—监控时间）
      pageNo: pageNo,//
      pageSize: pageSize//

    }).then(res => {
      if (res.data.status == 10000) {
        this.setState({
          data: res.data.data.content,
          pageSize: res.data.data.pageSize,
          pageNo: res.data.data.pageNumber,
          totalNum: res.data.data.totalElements,
          loading: false,
        })
      } else {
        this.setState({
          loading: false,
        })
      }
      // console.log(res)
    }).catch((error) => {
      message.error(error.statusText);
      this.setState({
        loading: false,
      })
    });
  }
  goTo = (path) => {
    this.props.history.push(path)
  }
  changePagination = (a, b) => {
    this.setState({
      pageNo: a,
      pageSize: b,
      loading: true
    }, () => {
      this.list(this.state.platform, this.state.keyword_id, this.state.createtime, this.state.keytime, this.state.pageNo, this.state.pageSize)

    })
  }
  onPaginationSize = (a, b) => {
    this.setState({
      pageNo: a,
      pageSize: b,
      loading: true
    }, () => {
      this.list(this.state.platform, this.state.keyword_id, this.state.createtime, this.state.keytime, this.state.pageNo, this.state.pageSize)

    })
  }
  render() {
    return <Tpl that={this} />
  }
}

export default App