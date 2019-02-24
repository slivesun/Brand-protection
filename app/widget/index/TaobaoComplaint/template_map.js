const TEMPLATE_MAP = {
  'frontReason.trademark.fake.sfxzpj': {
    placeholder: '补充说明，您可以补充侵权理由',
    label: '判决书案号',
    text: "司法判决或行政裁决",
    field: 'verdictId',
    desc: (<React.Fragment>
      <h6>通过司法判决或者行政裁决确认为假货</h6>
      <p>该理由需提供人民法院出具的判定被投诉方商品为假冒商品的司法判决或行政机关（如市场监督管理部门等）出具的被投诉方商品为假冒商品的行政裁决文书</p>
    </React.Fragment>),
  },
  'frontReason.trademark.fake.gmjd': {
    placeholder: '补充说明，您可以补充侵权理由',
    label: '鉴定订单号',
    text: '购买鉴定',
    field: 'orderId',
    desc: (<React.Fragment>
      <h6>权利人通过购买并对实物进行鉴定认定假冒商品</h6>
      <p>该理由为权利人通过购买被投诉方的商品后对实物进行鉴定，出具盖章/签字的购买鉴定报告认定被投诉方商品为假冒商品。</p>
    </React.Fragment>),
    template: {
      text: '假货/盗版购买鉴定报告',
      linkText: '模板下载',
      link: 'http://download.taobaocdn.com/freedom/41266/word/IPRForm-TestBuyReport-zh.doc?spm=a2o2l.10374759.0.0.7458747bJ6lOrI&file=IPRForm-TestBuyReport-zh.doc',
    },
  },
  'frontReason.trademark.fake.wsc': {
    desc: '该理由为商品宣传为权利人品牌商品，但该商品的款式或者型号、样式实际并不存在。如权利人确有生产该款式或者型号、样式商品但认为卖家商品为假货，请通过真假对比或者购买鉴定等其他理由发起投诉。',
    placeholder: '补充说明，您可以补充侵权理由',
    text: '不存在此样式或型号',
    desc: (<React.Fragment>
      <h6>权利人从未在全球范围内生产也未授权他人生产该样式或型号的产品</h6>
      <p>
        该理由为商品宣传为权利人品牌商品，但该商品的款式或者型号、样式实际不存在或者权利人从未生产过。 如权利人有生产该款式或型号、样式商品但认为被投诉商品为假货的，该理由不适用，请通过真假对比或购买鉴定等其他理由发起投诉。
        <a href="https://ipp.alibabagroup.com/infoContent.htm?spm=a2o2l.10374759.0.0.7458747bJryoN7&skyWindowUrl=faq/complaint/ipp/trademark/Counterfeit-01-cn" target="_blank">点击此处查看案列解读</a>
      </p>
    </React.Fragment>),
  },
  'frontReason.trademark.fake.zjdb': {
    text: "真假对比",
    placeholder: '补充说明，您可以补充侵权理由',
    desc: (<React.Fragment>
      <h6>权利人从商品描述、产品图判断商家售假</h6>
      <p>
        该理由为权利人通过被投诉方的商品页面描述、产品图与权利人商品的对比，认定被投诉方的商品为假冒商品。对比建议以图片结合文字的方式指出具体区别。
        <a href="https://ipp.alibabagroup.com/infoContent.htm?spm=a2o2l.10374759.0.0.7458747b7oc57Q&skyWindowUrl=faq/complaint/ipp/trademark/Counterfeit-02-cn" target="_blank">点击此处查看案例解读</a>
      </p>
    </React.Fragment>),
  },
  'frontReason.trademark.fake.mxjh': {
    text: "明显假冒",
    placeholder: '补充说明，您可以补充侵权理由',
    desc: (<React.Fragment>
      <h6>商品页面有明显假冒词或描述</h6>
      <p>
        该理由为被投诉方在主图或者详情信息页中明显的假冒描述与自认。建议以截图的方式指出具体描述位置。
        <a href="https://ipp.alibabagroup.com/infoContent.htm?spm=a2o2l.10374759.0.0.7458747b8tYWJS&skyWindowUrl=faq/complaint/ipp/trademark/Counterfeit-03-cn" target="_blank">点击此处查看案例解读</a>
      </p>
    </React.Fragment>),
  },
  'frontReason.trademark.fake.wwzrsj': {
    text: "旺旺自认售假",
    placeholder: '补充说明，您可以补充侵权理由',
    label: '旺旺聊天举证号',
    field: 'wangwangProofId',
    desc: (<React.Fragment>
      <h6>卖家通过旺旺聊天承认销售假冒商品</h6>
      <p>该理由为权利人与被投诉方通过旺旺聊天的方式确认被投诉商品为假冒商品。需提供旺旺举证号进行核实。</p>
    </React.Fragment>),
    template: {
      text: '旺旺聊天举证号',
      linkText: '查看获取方式',
      link: 'http://service.taobao.com/support/seller/knowledge-13048162.htm?spm=a2o2l.10374759.0.0.7458747bJ6lOrI',
    },
  },
  'frontReason.trademark.fake.zdsbxx': {
    text: "遮挡商标信息",
    placeholder: '补充说明，您可以补充侵权理由',
    desc: (<React.Fragment>
      <h6>遮挡商标规避假货认定</h6>
      <p>该理由为被投诉方通过明显涂抹、遮挡等方式恶意遮挡商品实物上的权利人商标。需提供卖家明显遮挡商标的截图及权利人未遮挡商标的正品截图。</p>
    </React.Fragment>),
  },
  'frontReason.trademark.budang.sfxzpj': {
    placeholder: '补充说明，您可以补充侵权理由',
    label: '判决书案号',
    text: "司法判决或行政裁决",
    field: 'verdictId',
    desc: (<React.Fragment>
      <h6>通过司法判决或者行政裁决确认为假货</h6>
      <p>该理由需提供人民法院出具的判定被投诉方商品为假冒商品的司法判决或行政机关（如市场监督管理部门等）出具的被投诉方商品为假冒商品的行政裁决文书</p>
    </React.Fragment>),
  },
  'frontReason.trademark.budang.lysbgjz': {
    text: "滥用商标关键词",
    desc: '该理由为卖家在商品标题或产品描述中除自身品牌/商标外，还使用了权利人商标（不含商品本身使用权利人商标的情形，如认为是假货请通过假货类型下理由投诉，如认为是不当侵权请通过不当类型下的其他商标侵权投诉）。可用截图指明权利人商标和卖家自身品牌出现的具体位置。。',
    placeholder: '补充说明，您可以补充侵权理由',
    desc: (<React.Fragment>
      <h6>非权利人商品，但卖家在商品标题或产品描述中使用了权利人商标</h6>
      <p>
        该理由为卖家在商品标题或产品描述中除自身品牌/商标外，还使用了权利人商标（可截图或文字描述指明权利人商标和卖家自身品牌出现的具体位置）。如商品本身使用了权利人商标，请在假货或其他商标侵权下发起投诉。 请注意！若产品描述或商品实物上的文字或图形仅仅作为型号、质量、数量等元素进行使用，且未举证构成商标使用，平台无法判断为“滥用商标关键词”。
        <a href="https://ipp.alibabagroup.com/infoContent.htm?spm=a2o2l.10374759.0.0.7458747bxETNRO&skyWindowUrl=faq/complaint/ipp/trademark/Unfair-01-cn" target="_blank">点击此处查看案例解读</a>
      </p>
    </React.Fragment>),
  },
  'frontReason.trademark.budang.wsqzssb': {
    text: "在图片上不当展示商标标识",
    desc: '该理由为主图或者详情信息页（详情信息页建议能用截图指明）不当展示权利人商标标识，且展示的标识与权利人注册商标完全一致。',
    placeholder: '补充说明，您可以补充侵权理由',
    desc: (<React.Fragment>
      <h6>卖家在商品信息页面突出展示的标识与投诉方商标完全一致，但不包括为描述商品信息以常规方式使用商品名称的情形。</h6>
      <p>
        本理由不包括在产品本身或品牌描述中对商品品牌的描述。 若为产品本身的商标使用，请选择“假货”投诉理由发起投诉。
        <a href="https://ipp.alibabagroup.com/infoContent.htm?spm=a2o2l.10374759.0.0.7458747bJNQ4V8&skyWindowUrl=faq/complaint/ipp/trademark/Unfair-02-cn" target="_blank">点击此处查看案例解读</a>
      </p>
    </React.Fragment>),
  },
  'frontReason.trademark.budang.other': {
    text: "其他商标侵权",
    placeholder: '补充说明，您可以补充侵权理由',
    desc: (<React.Fragment>
      <h6>除上述理由以外的商标侵权</h6>
      <p>请提供被投诉方商品使用权利人商标的具体位置截图，并说明不当使用权利人商标的具体情况。 发布商品或信息不符合淘宝规则及要求的问题等，请进入阿里巴巴全网举报页面(地址：https://jubao.taobao.com/index.htm)进行举报。</p>
    </React.Fragment>),
  },
  'frontReason.copyright.fake.sfxzpj': {
    placeholder: '补充说明，您可以补充侵权理由',
    label: '判决书案号',
    text: "司法判决或行政裁决",
    field: 'verdictId',
    desc: (<React.Fragment>
      <h6>通过司法判决或者行政裁决确认为假货</h6>
      <p>该理由需提供人民法院出具的判定被投诉方商品为假冒商品的司法判决或行政机关（如市场监督管理部门等）出具的被投诉方商品为假冒商品的行政裁决文书</p>
    </React.Fragment>),
  },
  'frontReason.copyright.fake.gmjd': {
    placeholder: '补充说明，您可以补充侵权理由',
    label: '鉴定订单号',
    text: '购买鉴定',
    field: 'orderId',
    desc: (<React.Fragment>
      <h6>权利人通过购买并对实物进行鉴定认定假冒商品</h6>
      <p>该理由为权利人通过购买被投诉方的商品后对实物进行鉴定，出具盖章/签字的购买鉴定报告认定被投诉方商品为假冒商品。</p>
    </React.Fragment>),
    template: {
      text: '假货/盗版购买鉴定报告',
      linkText: '模板下载',
      link: 'http://download.taobaocdn.com/freedom/41266/word/IPRForm-TestBuyReport-zh.doc?spm=a2o2l.10374759.0.0.7458747b9Wtc5Q&file=IPRForm-TestBuyReport-zh.doc',
    },
  },
  'frontReason.copyright.fake.wsc': {
    text: "不存在此样式或型号",
    placeholder: '补充说明，您可以补充侵权理由',
    desc: (<React.Fragment>
      <h6>权利人从未在全球范围内生产也未授权他人生产该样式或型号的产品</h6>
      <p>该理由为商品宣传为权利人商品，但该作品的款式或者型号、样式实际不存在或者权利人从未生产/出版过。 如权利人有生产该款式或型号、样式商品但认为被投诉商品为盗版的，该理由不适用，请通过真假对比或购买鉴定等其他理由发起投诉。</p>
    </React.Fragment>),
  },
  'frontReason.copyright.fake.zjdb': {
    text: "真假对比",
    placeholder: '补充说明，您可以补充侵权理由',
    desc: (<React.Fragment>
      <h6>权利人从商品描述、产品图判断商家售假</h6>
      <p>
        该理由为权利人通过被投诉方的商品页面描述、产品图与权利人商品的对比，认定被投诉方的商品为盗版商品。对比建议以图片结合文字的方式指出具体区别。
        <a href="https://ipp.alibabagroup.com/infoContent.htm?spm=a2o2l.10374759.0.0.7458747b9Wtc5Q&skyWindowUrl=faq/complaint/ipp/copyright-Counterfeit-01-cn" target="_blank">点击此处查看案例解读</a>
      </p>
    </React.Fragment>),
  },
  'frontReason.copyright.fake.mxdb': {
    text: "明显盗版词",
    placeholder: '补充说明，您可以补充侵权理由',
    desc: (<React.Fragment>
      <h6>商品页面有明显盗版词或描述</h6>
      <p>
        该理由为被投诉方在主图或者详情信息页中明显的盗版描述与自认。建议以截图的方式指出具体描述位置。 
        <a href="https://ipp.alibabagroup.com/infoContent.htm?spm=a2o2l.10374759.0.0.7458747b9Wtc5Q&skyWindowUrl=faq/complaint/ipp/copyright-Counterfeit-02-cn" target="_blank">点击此处查看案例解读</a>
      </p>
    </React.Fragment>),
  },
  'frontReason.copyright.fake.wwzrsj': {
    text: "旺旺自认售假",
    placeholder: '补充说明，您可以补充侵权理由',
    label: '旺旺聊天举证号',
    field: 'wangwangProofId',
    desc: (<React.Fragment>
      <h6>卖家通过旺旺聊天承认销售假冒商品</h6>
      <p>该理由为权利人与被投诉方通过旺旺聊天的方式确认被投诉商品为假冒商品。需提供旺旺举证号进行核实。</p>
    </React.Fragment>),
    template: {
      text: '旺旺聊天举证号',
      linkText: '查看获取方式',
      link: 'http://service.taobao.com/support/seller/knowledge-13048162.htm?spm=a2o2l.10374759.0.0.7458747b9Wtc5Q',
    },
  },
  'frontReason.copyright.budang.sfxzpj': {
    placeholder: '补充说明，您可以补充侵权理由',
    label: '判决书案号',
    text: "司法判决或行政裁决",
    field: 'verdictId',
    desc: (<React.Fragment>
      <h6>通过司法判决或者行政裁决确认为假货</h6>
      <p>该理由需提供人民法院出具的判定被投诉方商品为假冒商品的司法判决或行政机关（如市场监督管理部门等）出具的被投诉方商品为假冒商品的行政裁决文书</p>
    </React.Fragment>),
  },
  'frontReason.copyright.budang.dt': {
    text: "盗用图片",
    placeholder: '补充说明，您可以补充侵权理由',
    desc: (<React.Fragment>
      <h6>卖家盗用权利人品牌官网或品牌旗舰店享有著作权的图片/视频</h6>
      <p>
        投诉盗用问题，请提供被侵权图片/视频在品牌官方网站的具体位置截图及URL链接地址，截图中需要包括官网链接地址信息。 提请您注意，贵方提交的附件内容会转给被投诉方知悉，故建议按示例提供投诉文件即可，不需要附加其他内容。
        <a href="https://ipp.alibabagroup.com/infoContent.htm?spm=a2o2l.10374759.0.0.7458747b9Wtc5Q&skyWindowUrl=faq/complaint/ipp/copyright-Counterfeit-03-cn" target="_blank">点击此处查看案例解读</a>
      </p>
    </React.Fragment>),
    template: {
      text: '盗图说明贵方若主张的知识产权是官网图片，官网作为知识产权的一种初步证明和展示形式，具有不确定性和不稳定性，为了避免信息的丢失和修改，同时有利于快速和有效处理您的投诉，烦请您在提交投诉时提供“被侵权图片的官网链接”的基础上，补充该信息在贵方官网上的截图（截图中需要同时包括官网网址和用以投诉的图片）或对您方官网链接中的用以投诉的图片进行公证或保全后提供，感谢您的理解与配合。',
      linkText: '示例下载',
      link: 'http://download.taobaocdn.com/freedom/40086/word/IPRForm-ExampleforCopyrightWebisite.docx?spm=a2o2l.10374759.0.0.7458747b9Wtc5Q&file=IPRForm-ExampleforCopyrightWebisite.docx',
    },
  },
  'frontReason.copyright.budang.wg': {
    text: "外挂产品",
    placeholder: '补充说明，您可以补充侵权理由',
    desc: (<React.Fragment>
      <h6>侵犯著作权的外挂产品</h6>
      <p>本理由是指破坏合法出版、他人享有著作权的游戏作品的技术保护措施，修改作品数据。</p>
    </React.Fragment>),
  },
  'frontReason.copyright.budang.zpqq': {
    text: "美术、文字作品侵权",
    placeholder: '补充说明，您可以补充侵权理由',
    desc: (<React.Fragment>
      <h6>非权利人商品，但卖家在商品或描述中使用了权利人美术、文字作品内容</h6>
      <p>
        请提供判断侵权商品非贵方生产或授权生产的判断依据，同时指出商品或信息中何处使用了贵方美术、文字等作品内容。
        <a href="https://ipp.alibabagroup.com/infoContent.htm?spm=a2o2l.10374759.0.0.7458747b9Wtc5Q&skyWindowUrl=faq/complaint/ipp/copyright-Counterfeit-04-cn" target="_blank">点击此处查看案例解读</a>
      </p>
    </React.Fragment>),
  },
  'frontReason.copyright.budang.other': {
    text: "其他著作权侵权",
    placeholder: '补充说明，您可以补充侵权理由',
    desc: (<React.Fragment>
      <h6>除上述理由以外的著作权侵权</h6>
      <p>该理由请提供被投诉方商品使用权利人著作权的具体位置截图，并说明不当使用权利人著作权的具体情况。</p>
    </React.Fragment>),
  },
  'frontReason.designPatent.budang.sfxzpj': {
    text: "有司法判决或行政裁决",
    placeholder: '补充说明，您可以补充侵权理由',
    desc: (<React.Fragment>
      <h6>通过司法判决或者行政裁决确认为专利侵权</h6>
      <p>该理由需提供人民法院出具的判定被投诉方商品为专利侵权商品的司法判决或行政机关（如专利管理部门等）出具的被投诉方商品为专利侵权商品的行政裁决文书。</p>
    </React.Fragment>),
    label: '判决书案号',
    field: 'verdictId',
  },
  'frontReason.designPatent.budang.wsfxzpj': {
    text: "无司法判决或行政裁决",
    placeholder: '补充说明，您可以补充侵权理由',
    desc: (<React.Fragment>
      <h6>非权利人商品，但涉嫌侵犯贵方外观设计专利权</h6>
    </React.Fragment>),
    template: {
      text: '外观专利侵权分析报告',
      linkText: '模板下载',
      link: 'http://download.taobaocdn.com/freedom/33662/word/IPRForm-DesignPatentInfringementAnalysisForm-zh.doc?spm=a2o2l.10374759.0.0.7458747b1QyIvI&file=IPRForm-DesignPatentInfringementAnalysisForm-zh.doc',
    },
  },
  'frontReason.other.bzdjz': {
    text: "不正当竞争",
    placeholder: '补充说明，您可以补充侵权理由',
    desc: (<React.Fragment>
      <h6>卖家发布的商品信息或所使用的其他信息构成对权利人的不正当竞争</h6>
    </React.Fragment>),
  },
  'frontReason.other.xjxc': {
    text: '虚假宣传',
    placeholder: '补充说明，您可以补充侵权理由',
    desc: (<React.Fragment>
      <h6>商品信息有与权利人相关的虚假宣传行为</h6>
    </React.Fragment>),
  },
  'frontReason.other.xxqqq': {
    text: '肖像权侵权',
    placeholder: '补充说明，您可以补充侵权理由',
    desc: (<React.Fragment>
      <h6>未经肖像权人许可，在商品或描述中使用了肖像权人的肖像</h6>
    </React.Fragment>),
  }
}

export default TEMPLATE_MAP