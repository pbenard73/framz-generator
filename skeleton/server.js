module.exports = data => `import { App as Server } from "framz"
${data.react === true ? `import path from "path"
import fs from "fs"
import React from "react"
import ReactDOMServer from "react-dom/server"
import { StaticRouter } from "react-router-dom"
import App from "./../src/App"` : ''}

Server.setPort(4000)
    ${data.react === true ? `.addPublic("build")
    .get("*", (req, res) => {
        const app = ReactDOMServer.renderToString(
            <StaticRouter location={req.url}>
                <App />
            </StaticRouter>
        )
        fs.readFile("build/index", "utf8", (error, content) => {
            console.log(error, content)
            content = content.replace('<div id="root"></div>', \`<div id="root">$\{app}</div>\`)
            res.send(content)
        })
    })` : `.get('/', (req, res) => res.send('Welcome to FramZ'))`}
    .run()
`
