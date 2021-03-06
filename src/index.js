import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CalcCard from './Calc';
import * as serviceWorker from './serviceWorker';
import { library } from '@fortawesome/fontawesome-svg-core'; //fontawesomeのコアファイル
import { fas} from '@fortawesome/free-solid-svg-icons'; //fontawesomeのsolidアイコンのインポート
import { far } from '@fortawesome/free-regular-svg-icons'; //fontawesomeのregularアイコンのインポート

library.add(fas, far); //他のコンポーネントから簡単に呼び出せるようにするための登録処理？

ReactDOM.render(<CalcCard />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
