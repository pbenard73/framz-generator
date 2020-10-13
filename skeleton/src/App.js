import React from "react"
import Hoc from "./hocs/Hoc"
import { Store } from "reactizy"
import mainReduxer from "./reduxers/main"
import Home from './pages/Home'

import "./styles/App.scss"

const App = props => {
    return (
        <Store reduxers={[mainReduxer]}>
		<Home />
        </Store>
    )
}

export default App
