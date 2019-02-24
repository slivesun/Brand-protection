import './CustomerOverview.less';
import ThatMain from '../../../HOC/That';

import { Select,Button,Icon,Input } from 'antd';

import ChartTree from './ChartTree';
const Search = Input.Search;


const Tpl = ThatMain((that) => {
    console.log(that)
    return (
        <div className='CustomerOverview'>
            <Search
                placeholder="input search text"
                onSearch={value => that.ChartTree.current.inChart(value.toUpperCase())}
                style={{ width: 200 }}
            />
               <ChartTree ref={that.ChartTree} data={that.state.data}/>
                
        </div>
    )
})
export default Tpl

