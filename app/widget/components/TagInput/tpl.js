import { Popover, Icon,Input } from 'antd';
import './taginput.less';
import ThatMain from '../../HOC/That';

const Tpl = ThatMain((that) => {
    // console.log(that.props)
    let {
        style,
        className,
        placeholder,
        autoFocus=true,
        maxText
    } = that.props;

    let {
        inputValue,
        values,
        targetItem
    } = that.state;
    return (
        <div onClick={(e)=>that.onFocusInput(e)} style={style} className={`tag-input ${className}`}>
            <ul className='tag-list-box'>
            {   
                values.map((item,index)=>
                    <Popover content={item} key={index} trigger="hover">
                        <li className='item'>
                            {
                                index == targetItem.index ? 
                                <Input 
                                    autoFocus 
                                    size="small" 
                                    suffix={
                                        <Icon 
                                            type="check" 
                                            onClick={(e)=>that.subItem()}  
                                        />
                                    }
                                    maxLength={maxText}
                                    onKeyDown={(e)=>{
                                        if(e.keyCode==13){
                                            that.subItem()
                                        }
                                    }}
                                    value={targetItem.value.trim()} 
                                    onChange={(e)=>that.targetValue(e)} 
                                    onBlur={(e)=>that.subItem()}
                                    placeholder="请输入" 
                                />
                                :
                                <React.Fragment>
                                    <p className='text'>{item}</p>
                                    <span className='action'>
                                        <Icon className="link-icon edit" type="edit"  onClick={()=>that.editItem(item,index)} />
                                        <Icon className="link-icon close" type="close" onClick={()=>that.rmItem(index)} />
                                    </span>
                                </React.Fragment>   

                            }
                            
                            
                        </li>
                    </Popover>
                )
            }
            </ul>

           
            <textarea 
                autoFocus={autoFocus} 
                ref={that.tag_input_textarea} 
                style={{height:inputValue.split('\n').length*30}}
                value={inputValue}
                placeholder={placeholder}
                onChange = {(e)=>that.changeValue(e)}
                onKeyDown={(e)=>that.keyDownValue(e)}
                onBlur = {(e)=>that.onBlurValue(e)}
                className='input' 
            />
        </div>
    )
})
export default Tpl