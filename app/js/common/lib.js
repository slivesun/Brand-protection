
export default {
    onVisibilityChange(fn1, fn2) {
        var hiddenProperty = 'hidden' in document ? 'hidden' :
            'webkitHidden' in document ? 'webkitHidden' :
                'mozHidden' in document ? 'mozHidden' :
                    null;
        var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
        var onVisibilityChange = function () {
            if (!document[hiddenProperty]) {
                console.log('页面非激活' + new Date());
            }
            if (document[hiddenProperty]) {
                console.log('页面激活' + new Date())
            }
        }
        document.addEventListener(visibilityChangeEvent, onVisibilityChange);
    },
    //银行卡号格式化
    formatAccount(number) {
        number = number.replace(/[\s]/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");
        return number;
    },
    formatThousandMoney(money, currencyText) {
        if (isNaN(money))
            return '';
        currencyText = currencyText || '';
        if ($.isNumeric(money) === false || money == 0) {
            return '0.00';
        } else {
            money = +money;
        }
        money = money.toFixed(2);
        if (money == 0) {
            return '0.00';
        } else {
            return (currencyText + ' ' + (money + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,'));
        }
    },
    encryption(s=''){
        let str = `${s}`;
        return str.replace(/(\d{3})\d*([0-9a-zA-Z]{4})/,"$1****$2"); 
    },
    browser: {
        versions: function () {
            var u = navigator.userAgent, app = navigator.appVersion;
            var isInApp = u.indexOf('Ourydc.Yuebaobao') > -1;
            var locAppVersion = '';
            if (isInApp) {
                var infoArr = u.match(/Ourydc.Yuebaobao.*/);
                if (infoArr.length > 0) {
                    var info = infoArr[0];
                    locAppVersion = info.substr(info.indexOf("/") + 1);
                }
            }

            return {
                trident: u.indexOf('Trident') > -1, //IE�ں�
                presto: u.indexOf('Presto') > -1, //opera�ں�
                webKit: u.indexOf('AppleWebKit') > -1, //ƻ�����ȸ��ں�
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//����ں�
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //�Ƿ�Ϊ�ƶ��ն�
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios�ն�
                android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android�ն�
                iPhone: u.indexOf('iPhone') > -1, //�Ƿ�ΪiPhone����QQHD�����
                iPad: u.indexOf('iPad') > -1, //�Ƿ�iPad
                webApp: u.indexOf('Safari') == -1, //�Ƿ�webӦ�ó���û��ͷ����ײ�
                weixin: u.indexOf('MicroMessenger') > -1, //�Ƿ�΢��
                weibo: (u.match(/WeiBo/i) == "WeiBo") || (u.match(/Weibo/i) == "Weibo") || (u.match(/weibo/i) == "weibo"),
                qq: (u.match(/qq/i) == "qq") || (u.match(/QQ/i) == "QQ"),  //�Ƿ�QQ
                qqBrower: (u.indexOf("Mobile MQQBrowser") == -1) && (u.indexOf("MQQBrowser") != -1),
                isInApp: u.indexOf('Ourydc.Yuebaobao') > -1,
                locAppVersion: locAppVersion

            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    },

    /**
     * 验证账号格式
     */
    checkAccount(name) {
        var patt = /^[a-zA-Z](\w|\s+){5,15}$/;
        return patt.test(this.trim(name ? name : ''))
    },

/**
     * 对接人
     */
    Reg(str = '') {
        var patt =  /^[^\u4e00-\u9fa5]{5,31}$/;
        return patt.test(this.trim(str ? str : ''))
    },
    
   
    /**
     * 验证密码格式
     */
    checkPassword(password = '') {
        var patt = /^.{6,16}$/;
        return patt.test(this.trim(password ? password : ''))
    },
    /**
     * 去除左右空格
     */
    trim(s) {
        s = `${s}`;
        return s.replace(/(^\s*)|(\s*$)/g, "");
    },

    /**
      * 获取对应名称的cookie
      * @param name cookie的名称
      * @returns {null} 不存在时，返回null
      */
    getCookie(name) {
        var arr;
        var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    },


    required(s) {

        let str = this.trim(s ? s : '')
        if (str && str.length) {
            return true
        } else {
            return false
        }
    },

    legnthCheck(s='',type='INPUT'){
        let str = this.trim(s? s : '')
        return str.length<this.LENGTH[type]
    },

    LENGTH: {
        URL:500,
        TEXTAREA:200,
        INPUT:50
    },

    /**
     * 获取URL中的参数
     * @param name
     * @returns {string}
     */
    getQueryString(name) {
        var reg = new RegExp("(^|&|[?])" + name + "=([^&]*)(&|$)")
        var r = window.location.href.substr(1).match(reg)
        var newName = (r != null ? r[2] : "")
        return newName
    },


    /**
     * 获取str中的参数
     * @param name
     * @returns {string}
     */
    getParamString(str, name) {
        var reg = new RegExp("(^|&|[?])" + name + "=([^&]*)(&|$)")
        var r = str.substr(1).match(reg)
        var newName = (r != null ? r[2] : "")
        return newName
    },
    Trim(str) { //去除空格
        return str.replace(/(^\s*)|(\s*$)/g, "");
    },

    /**
     * 获取设备名称
     * @returns {string}
     */
    deviceCheck() {
        var device = "";
        if (browser.versions.mobile) {
            if (browser.versions.android) {
                device = "android";
            } else if (browser.versions.ios) {
                device = "ios";
            } else {
                device = "mobile";
            }
        } else {
            device = "web";
        }
        return device;
    }
}