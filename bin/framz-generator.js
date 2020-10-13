#!/usr/bin/env node

const inquirer = require("inquirer")
const fs = require("fs")
const ncp = require("ncp")
const packageSkeleton = require("./../skeleton/package")
const serverSkeleton = require("./../skeleton/server")

const makeError = e => {
    console.log(e)
    process.exit(0)
}

new (class Generator {
    run() {
        return new Promise((resolve, reject) => {
            this.askQuestions()
                .then(answers => {
                    this.createAppFolder(answers.name)
                        .then(() => {
                            this.copyFiles(answers)
                                .then(() => this.end(answers))
                                .catch(makeError)
                            //aerror("Cannot create Skeleton Files"))
                        })
                        .catch(makeError)
                })
                .catch(makeError)
        })
    }

    end(data) {
        console.info(`Framz Project "${data.name}" is create successfully.
Enter into app folder, and run 'npm install' to install dependancies.`)

        process.exit(0)
    }

    askQuestions() {
        return new Promise((resolve, reject) => {
            inquirer
                .prompt([
                    { type: "input", name: "name", message: `Application's name ?` },
                    {
                        type: "checkbox",
                        name: "custom",
                        choices: ["React Simple App", "Need Admin", "Need database"],
                        message: "Customize",
                    },
                ])
                .then(answers => resolve(answers))
                .catch(error => reject(error))
        })
    }

    createAppFolder(appName) {
        return new Promise((resolve, reject) => {
            fs.mkdir(appName, error => {
                if (error) {
                    return reject(error)
                }

                resolve()
            })
        })
    }

    copyFiles(givenData) {
        return new Promise((resolve, reject) => {
            let promises = []

            let data = {
                name: givenData.name.toLowerCase(),
                react: givenData.custom.indexOf("React Simple App") !== -1,
            }

            fs.writeFileSync(`${data.name}/package.json`, packageSkeleton(data))
            fs.copyFileSync(`${__dirname}/../skeleton/webpack.config.js`, `${data.name}/webpack.config.js`)
            fs.copyFileSync(`${__dirname}/../skeleton/jest.config.js`, `${data.name}/jest.config.js`)

            if (data.react === true) {
                promises.push(
                    new Promise((_resolve, _reject) => {
                        ncp(`${__dirname}/../skeleton/public`, `${data.name}/public`, error => {
                            if (error) {
                                return _reject(error)
                            }
                            _resolve()
                        })
                    })
                )
                promises.push(
                    new Promise((_resolve, _reject) => {
                        ncp(`${__dirname}/../skeleton/src`, `${data.name}/src`, error => {
                            if (error) {
                                return _reject(error)
                            }
                            _resolve()
                        })
                    })
                )
            }

            promises.push(
                new Promise((_resolve, _reject) => {
                    fs.mkdir(`${data.name}/server`, error => {
                        if (error) {
                            return _reject(error)
                        }

                        _resolve()
                    })
                })
            )

            Promise.all(promises)
                .then(() => {
                    fs.writeFileSync(`${data.name}/server/app.js`, serverSkeleton(data))

                    resolve()
                })
                .catch(error => reject(error))
        })
    }
})().run()
