
/**
 *
 *
 * @export
 * @description style:object,className:str
 * @class AddIcon 
 * @extends {React.Component}
 */
export class AddIcon extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {

    }
    render() {
        let {style,className} = this.props;
        return(
            <img className={className} style={style} src="../../../../img/icon/add2.png"/>
        )
        
    }
}
