import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { GifSearch } from './components/gif-search/gif-search'

import './styles.css'

const Root: React.FC = () => {
    if (process.env.REACT_APP_SEARCH_URL) {
        return <GifSearch searchBasePath={process.env.REACT_APP_SEARCH_URL} />
    }
    throw new Error(`missing env var "REACT_APP_SEARCH_URL"`)
}

ReactDOM.render(<Root />, document.getElementById('react-app'))