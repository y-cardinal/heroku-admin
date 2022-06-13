import { useState } from 'react'
import { DEFAULT_TEAM_TEXTBOX } from './Team'
import { socket, isConnected } from './Socket'
import { Styles, WHITE_HEX } from './Style'
import { TouchableOpacity, Text, View, TextInput } from 'react-native'
import lang from './Lang.json'

let _changeTeamTextBox = null

function Home()
{
    const [teamTextBox, changeTeamTextBox] = useState(DEFAULT_TEAM_TEXTBOX)
    const [redScore, changeRedScore] = useState('0')
    const [blueScore, changeBlueScore] = useState('0')
    const [disabled, changeDisabled] = useState(true)

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
        <View style={Styles.container}>
            <Text style={Styles.text}>{lang.RedScore}</Text>
            <TextInput
                autoCapitalize='none'
                style={[Styles.textBox, Styles.text]}
                onChangeText={changeRedScore}
                value={redScore}
                autoCorrect={false}
                disabled={disabled}/>
            <Text style={Styles.text}>{lang.BlueScore}</Text>
            <TextInput
                autoCapitalize='none'
                style={[Styles.textBox, Styles.text]}
                onChangeText={changeBlueScore}
                value={blueScore}
                autoCorrect={false}
                disabled={disabled}/>
            <TouchableOpacity activeOpacity={0.6} onPress={() => changeDisabled(!disabled)}>
                <View style={Styles.button}>
                    <Text style={Styles.textButton}>{disabled ? lang.Unlock : lang.Lock}</Text>
                </View>
            </TouchableOpacity>
        </View>
    </View>
}

export { Home, _changeTeamTextBox }