export default (name,style={width:'20px',height:'20px'})=>{
    let data = {
        "TB":<img style={style} src='../../../../img/platform/taobao.svg'/>,
        "TM":<img style={style} src='../../../../img/platform/tall.svg'/>,
        "JD":<img style={style} src='../../../../img/platform/jd.svg'/>,
        "SN":<img style={style} src='../../../../img/platform/suning.svg'/>,
        "GM":<img style={style} src='../../../../img/platform/gome.svg'/>,
        "PDD":<img style={style} src='../../../../img/platform/pinduoduo.svg'/>,
        "AMAZON":<img style={style} src='../../../../img/platform/a.svg'/>,
        "WPH":<img style={style} src='../../../../img/platform/weipinhui.svg' />,
        "1688":<img style={style} src='../../../../img/platform/1688.svg'/>,
        "SMT":<img style={style} src='../../../../img/platform/sumaitong.svg'/>,
    }
    return data[name]
}

