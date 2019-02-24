import { Button } from 'antd';
class NoMatch extends React.Component {
    constructor(props) {
        super(props)
    }
    componentWillMount() {
        // if(localStorage.logintype == 'ADMIN'||localStorage.logintype == 'KEFU'){
        //     window.location = "/user.html#/loginu";
        // }else{
        //     window.location = "/user.html#/loginc";
        // }
        // window.localStorage.clear()
    }
    GoIndex=()=>{
        window.location.href="/index.html#/"
    } 
    render() {
        return <div style={{margin:'60px 0 0 60px '}}>
            <span style={{display:"inline-block",width:"50%",position:"relative",height:"100%",float:"left",textAlign:"center"}}>
                <img src="../../img/404_03.jpg" alt=""/>
            </span>
            <span style={{display:"inline-block",height:"100%",width:"50%",lineHeight:"40px",marginTop:"169px"}}>
                <h1 style={{color:"#656565",fontSize:"40px"}}>404</h1>
                <p style={{color:"#bdbdbd",fontSize:"16px"}}>抱歉，您访问的页面不存在</p>
                <Button style={{background:"#bca571",color:"#fff"}} onClick={this.GoIndex}>返回首页</Button>
            </span>
        </div>
    }
}
export default NoMatch