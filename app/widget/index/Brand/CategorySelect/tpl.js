
import ThatMain from '../../../HOC/That';
import { Select, Button } from 'antd';
const Option = Select.Option;
const Tpl = ThatMain((that) => {
    let { dataList } = that.state;
    return (
        <div className='CategorySelect'>
            <div className='content'>
                <h2>请选择公司所属行业类目</h2>
                <p>行业类目</p>
                <Select
                    showSearch
                    style={{ width: 300 }}
                    value={that.state.id}
                    onChange={(value, option) => that.chSelect(value, option)}
                    placeholder="请选择"
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    {
                        dataList.map((item, index) => {
                            return (
                                <Option key={index} value={item.id}>{item.dictName}</Option>
                            )
                        })
                    }
                </Select>
                <p className='button'>
                    <Button onClick={()=>that.onSubmit()}>确认</Button>
                </p>
            </div>

        </div>
    )
})
export default Tpl