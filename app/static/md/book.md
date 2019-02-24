https://github.com/renatorib/react-powerplug
功能强大的可插入组件

```
高阶组件
import React, { Component } from 'react';
import './App.css';

const PropsLogger = (WrapperComponent) => {
  return class extends Component {
    render() {
      return <WrapperComponent { ...this.props } />
    }
  }
}

const Hello = PropsLogger((props) => {
  return (
    <p>Hello { props.name }</p>
  )
})

class App extends Component {
  render() {
    return (
      <div className="App">
        <Hello name="rails365" />
      </div>
    );
  }
}

export default App;
```