const ThatMain = (WrapperComponent) => {
    return class extends React.Component {
        
        render() {

            return <WrapperComponent {...this.props.that} />
        }
    }
}
export default ThatMain