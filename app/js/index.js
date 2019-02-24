import App from '../widget/index/main.js';
import '../less/index.less';
import './common/boot';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
const store = configureStore();
import {LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';

ReactDom.render(
    <Provider store={store}>
        <LocaleProvider locale={zhCN}>
            <App />
        </LocaleProvider>
    </Provider>,
    document.getElementById('root')
)

