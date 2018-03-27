import React from 'react'
import ReactDOM from 'react-dom'
import 'tachyons'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
