export default (name,style={width:'20px',height:'20px'})=>{
    let data = {
        "TB":'../../../../img/platform/taobao.svg',
        "TM":'../../../../img/platform/tall.svg',
        "JD":'../../../../img/platform/jd.svg',
        "SN":'../../../../img/platform/suning.svg',
        "GM":'../../../../img/platform/gome.svg',
        "PDD":'../../../../img/platform/pinduoduo.svg',
        "AMAZON":'../../../../img/platform/a.svg',
        "WPH":'../../../../img/platform/weipinhui.svg' ,
        "1688":'../../../../img/platform/1688.svg',
        "SMT":'../../../../img/platform/sumaitong.svg',
    }
    return data[name]
}

