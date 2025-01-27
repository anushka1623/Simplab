import React from 'react'
import { View, Text ,Image,TouchableOpacity,StyleSheet} from 'react-native'
import left from './TeamAssets/leftarrow.png'
import down from './TeamAssets/down.png'
import DatePicker from '@react-native-community/datetimepicker'
import TimePickerAndroid from '@react-native-community/datetimepicker'
import Download from './TeamAssets/downloader.png'

export default function Dropdownelement(props) {
    const [Open, onChangeOpen] = React.useState(false);

    return (
        <View style={styles.container}> 

            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems: 'center'}}> 
            <Text style={{color:'#EFEFEF',fontSize:17,fontWeight:'500'}}>{props.name}</Text>
            <TouchableOpacity onPress={()=>onChangeOpen(!Open)}>
            {Open?
            <Image source={down} style={{height:20}}/>:
            <Image source={left} style={{height:20}}/>}</TouchableOpacity>

            </View>
           
            {Open?(<View><Text style={{color:'#AAAAAA',fontSize:14,marginTop:5}}>{props.emailid}</Text>

                <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:20}}>

                <Text style={{color:'#AAAAAA',fontSize:14,marginTop:5}}>Submitted : 7:55 pm 25/04</Text>

                <TouchableOpacity><Image source={Download}/></TouchableOpacity>
                </View>
            
            </View>):null}
           
        </View>
    )
}

const styles = StyleSheet.create({
    container:{ borderWidth: 1,
        borderColor: "#CDCDCD",
        borderRadius: 6,
        width:'90%',
        marginTop: 10,
        marginLeft:'5%',
    padding:10}
});