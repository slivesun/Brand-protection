function DateWrapper(WrappedComponent) {
  return class extends React.Component {
    render() {
      const btnList = [
        {
          text: '最近7天',
          num: 7,
        },
        {
          text: '最近30天',
          num: 30,
        },
        {
          text: '最近90天',
          num: 90,
        },
        {
          text: '最近365天',
          num: 365,
        },
      ]
      const newProps = {}
      if (this.props.showAllFooterButton) {
        newProps.renderExtraFooter = () => (
          <React.Fragment>
            {
              btnList.map(v => (
                <span
                  key={v.num} 
                  style={{color:'#1890ff',cursor:'pointer',marginRight:'10px',}}
                  onClick={
                    () => {
                      this.props.onChange([moment().subtract(v.num, 'd'), moment()])
                      this.refs._picker.picker.setState({
                        open: false
                      })
                    }
                  }
                >
                  {v.text}
                </span>
              ))
            }
          </React.Fragment>
        )
      }
      return <WrappedComponent ref="_picker" {...this.props} {...newProps} />
    }
  }
}

export default DateWrapper