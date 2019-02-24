import ajax from '../../../../js/common/ajax';
import Copyright from "../../../components/Copyright";
import lib from '../../../../js/common/lib';
import { Input, Button, Breadcrumb, message, Icon } from 'antd';
// import {LoadingModal} from '../../../components/LoadingModal/LoadingModal'

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            dataList: [
                {
                    url: null,
                    price: null
                }
            ]
        }
    }
    componentDidMount() {

    }
    addItem = () => {
        let { dataList } = this.state;
        dataList.push({
            url: null,
            price: null
        })
        this.setState({ dataList })
    }
    rmItem = (index) => {

        let { dataList } = this.state;
        if (dataList.length == 1) {
            message.error('最少保留一条链接')
            return
        }
        dataList.splice(index, 1);
        this.setState({ dataList });
    }
    changeItem = (e, type, index) => {
        let { dataList } = this.state;
        if (type === 'price' && isNaN(+e.target.value)) {
            return
        }
        dataList[index][type] = e.target.value;
        dataList[index].editStatus = false;
        if (dataList[index].url && lib.getParamString(dataList[index].url, 'id').length) {
            if (dataList[index].price&& lib.legnthCheck(`${dataList[index].price}`,'INPUT')) {
                dataList[index].editStatus = true;
            }
        }
        if (dataList[index].checkStatus === true) {
            dataList[index].checkStatus = false;
        }
        this.setState({ dataList })
    }
    ckeckUrl = () => {
        let { dataList } = this.state;
        for (let i = 0; i < dataList.length; i++) {
            if (!dataList[i].editStatus) {
                
                let {price,url} = dataList[i];
                if(!url){
                    message.error(`第${i + 1}条链接地址不能为空`)
                    return
                }else if(!lib.getParamString(dataList[i].url, 'id').length){
                    message.error(`第${i + 1}条请输入正确的链接地址`)
                    return
                }else if(!lib.legnthCheck(dataList[i].url, 'URL')){
                    message.error(`第${i + 1}条请输入正确的链接地址`)
                    return
                }else if(!price){
                    message.error(`第${i + 1}条价格不能为空`)
                    return
                }else if(!lib.legnthCheck(`${price}`,'INPUT')){
                    message.error(`第${i + 1}条价格字符长度不允许超过50`)
                    return
                }  
            }
        }
        let arr = dataList.map((item, index) => lib.getParamString(item.url, 'id'));
        var nary = Object.assign([],arr);
        nary.sort()
        for (let i = 0; i < nary.length - 1; i++) {
            if (nary[i] == nary[i + 1]) {
                let start  = null;
                let end = null;
                for(let j = 0 ; j<arr.length ; j++){

                    if(arr[j] ===nary[i]){
                        if(start===null){
                            start = j+1
                        }else{
                            end = j+1
                        }
                    }
                }
                message.error(`第${start}条和第${end}条重复`)
                return
            }
        }
        LoadingModal({bl:true,text:'商品链接验证中,请耐心等候...'})
        ajax.post('/hcm/monitorLink/check', { itemIds: arr.join(',') })
            .then((response) => {
                LoadingModal({bl:false})
                if (response.data.status == '10000') {
                    let data = JSON.parse(response.data.data);
                    data.data.forEach((item, index) => {
                        if (item.WangWang.length && item.itemTitle.length && item.shopName.length) {
                            dataList[index].checkStatus = true;
                            dataList[index].WangWang = item.WangWang;
                            dataList[index].itemTitle = item.itemTitle;
                            dataList[index].shopName = item.shopName;
                            dataList[index].platform = item.isTmall == 'True' ? '天猫' :'淘宝' ;
                            message.success(`第${index + 1}条数据验证成功`)
                        } else {
                            dataList[index].checkStatus = false;
                            message.error(`第${index + 1}条数据验证失败，请检查`)
                        }
                    });
                    this.setState({ dataList })
                }

            }).catch((error) => {
                LoadingModal({bl:false})
                message.error(error.statusText);
            });

    }
    onSubmit = () => {
        let { dataList } = this.state;
        for (let i = 0; i < dataList.length; i++) {
            if (dataList[i].checkStatus === false) {
                message.error(`第${i + 1}条链接验证失败，请重新编辑后验证`)
                return
            } else if (dataList[i].checkStatus === undefined) {
                message.error(`第${i + 1}条链接未验证，请验证`)
                return
            }
        }

        let listCreate = []
        dataList.forEach((item, index) => {
            listCreate.push({
                itemid: lib.getParamString(item.url, 'id'),
                itemlink: `https://item.taobao.com/item.htm?id=${lib.getParamString(item.url,'id')}`,
                itemprice: item.price,
                itemtitle: item.itemTitle,
                shopname: item.shopName,
                shopnick: item.WangWang,
                platform: item.platform,
                status: '上架'
            })
        })
        ajax({
            method: 'post',
            url: '/hcm/monitorLink/Create',
            transformRequest: (data) => {
                return data
            },
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            data: JSON.stringify(listCreate)
        }).then((response) => {
            if (response.data.status == '10000') {
                message.success(response.data.message);
                window.location.href = '/index.html#/UrlMonitor';
            }else{
                if(response.data.data){
                    response.data.data.forEach(item=>message.error(response.data.message+item))
                }else{
                    message.error(response.data.message)
                }
                
            }

        }).catch((error) => {
            message.error(error.statusText);
        });
    }
    render() {
        let { dataList } = this.state;
        return (
            <div className='addmonitor'>
                <div className='Breadcrumb'>
                    <Breadcrumb>
                        
                        <Breadcrumb.Item>
                            <a href='/index.html#/UrlMonitor'>单链接监控</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            新增
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className='content'>
                    <h4>
                        设置监控链接
                    </h4>
                    <p className='p'><Icon type="sound" className='icon-sound' theme="outlined" />暂时仅支持淘宝网商品链接，链接越多，验证链接时间越长</p>
                    <div className='url-list'>
                        <span className='red tit'>链接地址：</span>
                        <div>
                            <ul className='items'>
                                {
                                    dataList.map((item, index) => {
                                        return (
                                            <li key={index} className='item'>
                                                <Input style={item.checkStatus === false ? { borderColor: 'red' } : item.checkStatus === true ? { borderColor: 'green' } : {}} onChange={(e) => this.changeItem(e, 'url', index)} value={item.url} placeholder='链接地址' className='url' />
                                                <span className='zw'>-</span>
                                                <Input onChange={(e) => this.changeItem(e, 'price', index)} value={item.price} placeholder='限价' className='num' />
                                                <Icon onClick={e => this.rmItem(index)} type="minus-square-o" />
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            <Button onClick={e => this.addItem()} className='addbut' type="dashed">+新增</Button>
                            <Button onClick={e => this.ckeckUrl()} style={{ marginTop: '20px' }} className='url-check'>验证链接</Button>
                            <div style={{ paddingTop: '20px' }}>
                                <Button className='btn2-main' onClick={e => this.onSubmit()} style={{ marginRight: '20px' }} type="primary">保存</Button>
                                <a href='/index.html#/UrlMonitor'>
                                    <Button>取消</Button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <Copyright clazzName='copyright' />

            </div>
        )
    }
}
export default App;