import React, {Fragment, useState} from 'react';
import { Button, SafeAreaView, Dimensions, ScrollView, ActivityIndicator, FlatList, View, TouchableOpacity, StyleSheet, Text, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SearchBar, Header, Image, Avatar } from 'react-native-elements';
import { Menu, MenuProvider, MenuOptions, MenuOption, MenuTrigger, renderers, } from 'react-native-popup-menu';
import { LineChart } from "react-native-chart-kit";
const imagedefault = require('./assets/food-and-restaurant.png');
const {height, width}= Dimensions.get('window');
import {imgurl} from './helper/index'; 
import Overlay from 'react-native-modal-overlay';
import ImagePicker from 'react-native-image-picker'; 
 
function ProfileScreen(props) { 
    const [item, setItem] = useState(props.route.params.item);
    const {navigate} = props.navigation;
    const [visible, setVisible] = useState(false); 
    const [photo, setPhoto] = useState(null); 
    
    toggleOverlay = () => {
      setVisible(!visible);
    }; 

    const handleTakePhoto = () => {
        toggleOverlay();
        let options = {
          title: 'Select Avatar',
          customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
          noData: true,
        }
        ImagePicker.launchCamera(options, response => {
          if (response.uri) {
            setPhoto(response);
          }
        })
      }
    
    const handleChoosePhoto = () => {
        toggleOverlay();
        let options = { 
            noData: true,
        }
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                setPhoto(response);
            }
        })
    } 

    const handleUploadPhoto = async() => {
        console.log(photo);
        
    }

    return(
        <>
        <Header
            containerStyle={{backgroundColor:'#999', borderBottomWidth:0, height: 50, paddingBottom:16}}
            leftComponent={
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <Icon name="arrow-back" size={23} color='#FFF' style={{paddingLeft:10}} />
                </TouchableOpacity>
            } 
            centerComponent={<View><Text style={{color:'#FFF', fontWeight:'bold'}}>{item.name}</Text></View>} 
            rightComponent={
                <Menu>
                    <MenuTrigger>
                        <Icon name="more-vert" size={23} color='#FFF' style={{padding:5}}/>
                    </MenuTrigger>
                    <MenuOptions style={{padding:10, flexDirection:'column', justifyContent:'space-around'}}> 
                        <MenuOption onSelect={() => Alert.alert('show edit modal!')} style={{flexDirection:'row'}}>
                        <Icon name="edit" color='#666' size={23}/><Text>Edit</Text>
                        </MenuOption>  
                        <MenuOption onSelect={() => navigate('SecondScreen')} style={{flexDirection:'row'}}>
                        <Icon name="store" color='#666' size={23}/><Text>Store</Text>
                        </MenuOption>
                        <MenuOption onSelect={() => navigate('CustomComponent')} style={{flexDirection:'row'}}>
                        <Icon name="menu" color='#666' size={23}/><Text>Menu</Text>
                        </MenuOption>
                    </MenuOptions>
                </Menu>
            }
        />
        <ScrollView>
        <View style={{ 
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'stretch',
        }}>
            <View style={{zIndex:10,marginTop:100,alignSelf:'center', alignItems:'center',justifyContent: 'center', width: 200, height: 155, backgroundColor: 'transparent'}}>
            {photo ? (
                <React.Fragment>
                    <Avatar   
                        rounded
                        size="xlarge"
                        title={photo.name} 
                        source={{uri:photo.uri}} 
                        containerStyle={{borderWidth:5,borderColor:'#FFF'}}
                        showAccessory={false}
                        accessory={{ name: 'mode-edit', type: 'material', color: '#fff', underlayColor: '#000' }}
                        onAccessoryPress
                        /> 
                    <View style={{flexDirection:'row', padding:10 }}>
                        <TouchableOpacity style={{padding:10}} onPress={()=>handleUploadPhoto()}><Text>Upload</Text></TouchableOpacity>
                        <TouchableOpacity style={{padding:10}} onPress={()=>setPhoto(null)}><Text>Cancel</Text></TouchableOpacity>
                    </View>
                </React.Fragment>
            ):(
                <React.Fragment>
                    <Avatar   
                        rounded
                        size="xlarge"
                        title={item.name.charAt(0).toUpperCase()}
                        source={{uri:imgurl(item.image)}} 
                        containerStyle={{borderWidth:5,borderColor:'#FFF'}}
                        />
                    <Avatar 
                        rounded 
                        icon={{ name: 'edit' }} 
                        containerStyle={{borderWidth:5,borderColor:'#FFF',position:'absolute', right:30, bottom:15}}
                        onPress={() => toggleOverlay()}
                        />
                </React.Fragment>
            )}
                {/* <OverlayEditBtn visible={visible} onClose={()=>toggleOverlay()} {...props}/>  */}
            </View>
            <View style={{padding:10,top:-20,position:'absolute',height: 200, width:width, backgroundColor: '#999', borderBottomWidth:5, borderColor:'#FFF'}}>
                <Image style={{height: 200, width: 200}} source={imagedefault} PlaceholderContent={<ActivityIndicator/>}/>    
            </View> 
        </View>
        <View style={{padding:10}}>
            <Text>{item.status.toUpperCase()}</Text>
        </View> 
        <View style={{marginBottom:10,marginHorizontal:10,borderWidth:1,borderColor:'#666',borderRadius:16,zIndex:100, flexDirection:'column', justifyContent:'space-between', paddingVertical:5, backgroundColor:'#FFF'}}>
            <View style={{alignSelf:'center', alignItems:'center',justifyContent: 'center',}}>
                <Text style={{ fontWeight:'bold',color:'#666'}}>Point Of Sales</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-around', paddingHorizontal:10, paddingVertical:10, borderTopWidth:0 }}>
                <View style={{minHeight:50, minWidth:60, backgroundColor:'purple', borderWidth:2, borderRadius:10, borderColor:'purple', margin:10,alignItems:'center', justifyContent:'center', flexDirection:'column', padding:5}}><Text style={{color:'#fff', fontWeight:'bold', fontSize:20}}>Rp.10.000</Text><Text style={{color:'#fff'}}>Today</Text></View>
                <View style={{minHeight:50, minWidth:60, backgroundColor:'green', borderWidth:2, borderRadius:10, borderColor:'green', margin:10,alignItems:'center', justifyContent:'center', flexDirection:'column', padding:5}}><Text style={{color:'#fff', fontWeight:'bold', fontSize:20}}>Rp.70.000</Text><Text style={{color:'#fff'}}>Week</Text></View>
                <View style={{minHeight:50, minWidth:60, backgroundColor:'orange', borderWidth:2, borderRadius:10, borderColor:'orange', margin:10,alignItems:'center', justifyContent:'center', flexDirection:'column', padding:5}}><Text style={{color:'#fff', fontWeight:'bold', fontSize:20}}>Rp.2.100.000</Text><Text style={{color:'#fff'}}>Month</Text></View>
            </View>
        </View>
        <View style={{marginBottom:10,marginHorizontal:10,borderWidth:1,borderColor:'#666',borderRadius:16,zIndex:100, flexDirection:'column', justifyContent:'space-between', paddingVertical:5, backgroundColor:'#FFF'}}>
            <View style={{alignSelf:'center', alignItems:'center',justifyContent: 'center',}}>
                <Text style={{ fontWeight:'bold',color:'#666'}}>Chart</Text>
            </View>
            <LineChart
                data={{
                labels: ["Januari", "Februari", "Maret", "April", "Mei", "Juni"],
                datasets: [
                    {
                    data: [
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100
                    ]
                    }
                ]
                }}
                width={Dimensions.get("window").width - 100} // from react-native
                height={200}
                yAxisLabel={"Rp"}
                chartConfig={{ 
                backgroundColor: "white",
                backgroundGradientFrom: "white",
                backgroundGradientTo: "white",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `purple`,
                labelColor: (opacity = 1) => `orange`,
                style: {
                    borderRadius: 16
                }
                }}
                bezier
                style={{
                marginVertical: 8,
                marginHorizontal:10,
                borderWidth:1,
                borderColor:'purple',
                borderRadius: 16
                }}
            />
        </View>
        </ScrollView>
        <Overlay 
                visible={visible} 
                onClose={()=>toggleOverlay()} 
                closeOnTouchOutside 
                animationType="zoomIn" 
                containerStyle={{backgroundColor: 'rgba(37, 8, 10, 0.78)'}}
                childrenWrapperStyle={{backgroundColor: '#FFF', borderRadius:16, borderWidth:3, borderColor:'#FFF'}}
                animationDuration={500}>
                {
                (hideModal, overlayState) => (
                    <Fragment> 
                        <View>
                        <Text style={{fontWeight:'bold'}}>Edit Profile Picture</Text> 
                        </View>
                        <View style={{flexDirection:'row', padding:10 }}>
                            <TouchableOpacity style={{padding:10}} onPress={()=>handleTakePhoto()}><Text>Take Picture</Text></TouchableOpacity>
                            <TouchableOpacity style={{padding:10}} onPress={()=>handleChoosePhoto()}><Text>Choose Image</Text></TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity onPress={hideModal}><Text>Cancel</Text></TouchableOpacity>
                        </View>
                    </Fragment>
                )}
            </Overlay>
    </>
    ) 
}

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E6FAFF'
    },
    containertopRow: {
      marginTop: 10,
      marginLeft: 10,
      justifyContent: "center",
      alignItems: 'center',
      borderWidth:3,
      borderColor:'#666'
    },
});