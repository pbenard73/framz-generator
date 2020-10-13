import React from "react"
import Hoc from "./../hocs/Hoc"

const App = props => {
    return (
            <div>
                <header className='App-header'>
                    <img src={"/logo.png"} className='App-logo' alt='logo' />
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>

                    <button onClick={() => props.setName(window.prompt("New Reduxer Name ?"))}>{props.name}</button>

                    <a
                        className='App-link'
                        href='https://pbenard73.github.io/reactizy'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        Learn Reactizy
                    </a>
                </header>
            </div>
    )
}

export default Hoc(["name"], ["setName"])(App)
