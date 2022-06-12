import { useState } from 'react'
import { DEFAULT_TEAM_TEXTBOX } from './Team'
import { socket, isConnected } from './Socket'
import { Styles } from './Style'
import { TouchableOpacity, Text, View } from 'react-native'
import lang from './Lang.json'

let _changeTeamTextBox = null

function Home()
{
    const [teamTextBox, changeTeamTextBox] = useState(DEFAULT_TEAM_TEXTBOX)

    _changeTeamTextBox = changeTeamTextBox

    function onPressButton()
    {
        if(isConnected())
        {
            socket.send('ai')
            changeTeamTextBox(DEFAULT_TEAM_TEXTBOX)
        }
    }

    return <View style={Styles.container}>
        {teamTextBox}
        <TouchableOpacity activeOpacity={0.6} onPress={onPressButton}>
            <View style={Styles.button}>
                <Text style={Styles.textButton}>{lang.AllowInput}</Text>
            </View>
        </TouchableOpacity>
    </View>
}

export { Home, _changeTeamTextBox }