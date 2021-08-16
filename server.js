'use strict'

const Hapi = require('@hapi/hapi')
const Inert = require('@hapi/inert')
const Vision = require('@hapi/vision')
const Swagger = require('hapi-swagger')
const Pack = require('./package')

const start = async () => {
    const server = getServer()
    await server.register([
        Inert,
        Vision,
        {
            plugin: Swagger,
            options: getSwaggerOptions()
        }
    ])
    await server.start()
    console.log('Server started at http://localhost:3000')
    console.log('API Documentation served at http://localhost:3000/documentation')
}

const getServer = () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    })
    server.route({
        method: 'GET',
        options: {
            tags: [
                'api' // required by Swagger
            ]
        },
        path: '/',
        handler: (__request, __toolkit) => {
            return 'Hello World!'
        }
    })
    return server
}

const getSwaggerOptions = () => {
    return {
        info: {
            title: 'API Documentation',
            version: Pack.version
        }
    }
}

process.on('unhandledRejection', (error) => {
    console.log(error)
    process.exit(1)
})

start()
