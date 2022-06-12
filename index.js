const webSocket = require('ws')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(express.static('react/web-build'))

const server = app.listen(port, function()
{
    const wss = new webSocket.Server({server})
    const enc = new TextDecoder("utf-8")

    let admins = []
    let clients = []

    wss.on('connection', function(socket)
    {
        socket.on('message', function(msg)
        {
            switch(enc.decode(msg))
            {
                case 'c':
                    clients.push(socket)
                    break

                case 'a':
                    admins.push(socket)
                    break

                case '0':
                    if(clients.includes(socket))
                    {
                        for(let admin of admins)
                            admin.send('0')
                    }

                    break

                case '1':
                    if(clients.includes(socket))
                    {
                        for(let admin of admins)
                            admin.send('1')
                    }

                    break

                case 'ai':
                    if(admins.includes(socket))
                    {
                        for(let client of clients)
                            client.send('ai')
                    }

                    break
            }
        })

        socket.on('close', function(socket)
        {
            clients = clients.filter((e) => e !== socket)
            admins = admins.filter((e) => e !== socket)
        })
    })

    console.log(`[server] running on port ${port}`)
})