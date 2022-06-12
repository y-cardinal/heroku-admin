import { useState } from 'react'
import { BLUE_TEAM_TEXTBOX, RED_TEAM_TEXTBOX, TEAM_ID_BLUE, TEAM_ID_RED } from './Team'
import { socket, isConnected, setSocket, setSocketToNull } from './Socket'
import { Styles, WHITE_HEX } from './Style'
import { TouchableOpacity, Text, View, TextInput } from 'react-native'
import { isUri } from 'valid-url'
import { _changeTeamTextBox } from './Home'
import { TextBox } from './TextBox'
import lang from './Lang.json'

function Connect()
{
    const [url, changeURL] = useState(location.origin.replace(/^http/, 'ws'))
    const [status, changeStatus] = useState(`${lang.Waiting} ...`)

    function onPressButton()
    {
        if(isUri(url) === undefined)
        {
            changeStatus(`${lang.IncorrectURL}`)
            return
        }

        if(isConnected())
            socket.close()

        setSocket(new WebSocket(url))

        socket.addEventListener('open', function()
        {
            // c = client
            socket.send('a')

            changeStatus(lang.Connected)
        })

        socket.addEventListener('close', function()
        {
            setSocketToNull()
            changeStatus(lang.Disconnected)
        })

        socket.addEventListener('error', function()
        {
            setSocketToNull()
            changeStatus(lang.Error)
        })

        socket.addEventListener('message', function(event)
        {
            if(event.data === `${TEAM_ID_RED}`)
                _changeTeamTextBox(RED_TEAM_TEXTBOX)
            else if(event.data === `${TEAM_ID_BLUE}`)
            _changeTeamTextBox(BLUE_TEAM_TEXTBOX)
        })

        changeStatus(`${lang.Connecting} ...`)
    }

    return <View style={Styles.container}>
        <TextBox color={WHITE_HEX} text={status}/>
        <TextInput
            autoCapitalize='none'
            style={[Styles.textBox, Styles.text]}
            placeholder={lang.WebSocketURL}
            onChangeText={changeURL}
            value={url}
            autoCorrect={false}
            placeholderTextColor={WHITE_HEX}/>
        <TouchableOpacity activeOpacity={0.6} onPress={onPressButton}>
            <View style={Styles.button}>
                <Text style={Styles.textButton}>{lang.Connect}</Text>
            </View>
        </TouchableOpacity>
    </View>
}

export { Connect }