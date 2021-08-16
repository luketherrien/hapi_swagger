'use strict'

const Hapi = require('@hapi/hapi')

const start = async () => {
    const server = getServer()
    await server.start()
    console.log('Server started at http://localhost:3000')
}

const getServer = () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    })
    server.route({
        method: 'GET',
        path: '/',
        handler: (__request, __toolkit) => {
            return 'Hello World!'
        }
    })
    return server
}

process.on('unhandledRejection', (error) => {
    console.log(error)
    process.exit(1)
})

start()
