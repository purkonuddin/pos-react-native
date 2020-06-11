import React, {Component, useState} from 'react';
import {ScrollView, ActivityIndicator, View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SearchBar, Header, Image, ListItem } from 'react-native-elements';
import { LineChart } from "react-native-chart-kit";
import ViewSlider from 'react-native-view-slider';
const { width, height } = Dimensions.get('window');
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/user';
import { REACT_APP_URL_STRING } from 'react-native-dotenv';
import Axios from 'react-native-axios'; 

const _logout =async(props)=>{
  let keys = ['USER', 'TOKEN'];
  try {
    // await AsyncStorage.removeItem('user')
    // await AsyncStorage.removeItem('token') 
    await AsyncStorage.multiRemove(keys);
    await props.dispatch(logout());
    await props.navigation.navigate('FirstScreen');
  } catch (err) {
    console.log(`The error is: ${err}`)
  }
} 

const HomeRoute = (props) => {
  console.log('@chart_charts: ', props.chart.chartData.charts.year);
  
  const [labels, setLabels] = useState(["Januari", "Februari", "Maret", "April", "Mei", "Juni"]); 
  const [datasets, setDatasets] = useState([100, 200, 0, 400, 70, 0]); 
  const [charts, setCharts] = useState(props.chart.chartData.charts.year); 
  const [user, setUser] = useState(props.user.loginData[0]); 
  
  const { navigate } = props.navigation;
  const lebar = Dimensions.get("window").width;
  return(
      <ScrollView>
  <View style={{flex:1, flexDirection:'column', alignItems: 'center',}} >
    
    
    <ViewSlider 
        renderSlides = {
          <>
            <View style={styles.viewBox}>
            <Image source={{uri: 'http://100.24.31.79:8080/uploads/1584923913150-1582179247940-chickenkatsu.png'}} style={{height: 200, width}}/>
            </View>
            <View style={styles.viewBox}>
            <Image source={{uri: 'http://100.24.31.79:8080/uploads/1584922979121-1582007229418-firdaus-roslan-pN769u0KHNA-unsplash.png'}} style={{height: 200, width}}/>
            </View>
            <View style={styles.viewBox}>
            <Image source={{uri: 'http://100.24.31.79:8080/uploads/1584923846517-1582029645477-salmon.png'}} style={{height: 200, width}}/>
            </View>
            <View style={styles.viewBox}>
            <Image source={{uri: 'http://100.24.31.79:8080/uploads/users/1585061599868-nida.png'}} style={{height: 200, width}}/>
            </View>
         </>
      }
      style={styles.slider}     //Main slider container style
      height = {200}    //Height of your slider
      slideCount = {4}    //How many views you are adding to slide
      dots = {true}     // Pagination dots visibility true for visibile 
      dotActiveColor = 'red'     //Pagination dot active color
      dotInactiveColor = 'gray'    // Pagination do inactive color
      dotsContainerStyle={styles.dotContainer}     // Container style of the pagination dots
      autoSlide = {false}    //The views will slide automatically
      slideInterval = {1000}    //In Miliseconds
     />
    <View style={{borderWidth:1,borderColor:'purple',borderRadius:16,zIndex:100, position:'relative', bottom:-12, flexDirection:'row', justifyContent:'space-between', paddingHorizontal:10, paddingVertical:5, backgroundColor:'#FFF'}}>
    <View><Text style={{paddingHorizontal:10, backgroundColor:'#FFF',fontWeight:'bold', color:'grey'}}>Category</Text></View>
    </View>
     <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:10, paddingVertical:10, borderTopWidth:1, borderTopColor:'purple'}}>
      <View style={{minHeight:50, minWidth:60, backgroundColor:'purple', borderWidth:2, borderRadius:10, borderColor:'purple', margin:10,alignItems:'center', justifyContent:'center', flexDirection:'column', padding:5}}><Icon name='restaurant-menu' size={50} color='#fff'/><Text style={{color:'#fff'}}>Food</Text></View>
      <View style={{minHeight:50, minWidth:60, backgroundColor:'green', borderWidth:2, borderRadius:10, borderColor:'green', margin:10,alignItems:'center', justifyContent:'center', flexDirection:'column', padding:5}}><Icon name='cake' size={50} color='#fff'/><Text style={{color:'#fff'}}>Cake</Text></View>
      <View style={{minHeight:50, minWidth:60, backgroundColor:'orange', borderWidth:2, borderRadius:10, borderColor:'orange', margin:10,alignItems:'center', justifyContent:'center', flexDirection:'column', padding:5}}><Icon name='local-cafe' size={50} color='#fff'/><Text style={{color:'#fff'}}>Cofee</Text></View>
     </View> 
     <View style={{borderWidth:1,borderColor:'purple',borderRadius:16,zIndex:100, position:'relative', flexDirection:'column', justifyContent:'space-between', paddingHorizontal:10, paddingVertical:5, backgroundColor:'#FFF'}}>
      <View style={{justifyContent:'center', justifyContent:'space-between'}}>
        <Text style={{paddingHorizontal:10, backgroundColor:'#F1F1F1',fontWeight:'bold', color:'grey'}}>Line Chart</Text>
      </View>
    
     <LineChart
        data={{
        labels: labels,
        datasets: [
            {
            data: datasets
            }
        ]
        }}
        width={Dimensions.get("window").width} // from react-native
        height={200}
        yAxisLabel={"Rp"}
        chartConfig={{ 
        backgroundColor: "white",
        backgroundGradientFrom: "grey",
        backgroundGradientTo: "grey",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `orange`,
        labelColor: (opacity = 1) => `orange`,
        style: {
            borderRadius: 1
        }
        }}
        bezier
        style={{
        marginVertical: 8,
        marginHorizontal:10,
        borderWidth:0.5,
        borderColor:'#fff',
        borderRadius: 1
        }}
    /> 
    </View>
    <View style={{borderWidth:1,borderColor:'purple',borderRadius:16,zIndex:100, position:'relative', bottom:-12, flexDirection:'row', justifyContent:'space-between', paddingHorizontal:10, paddingVertical:5, backgroundColor:'#F1F1F1'}}>
      <View>
        <Text style={{paddingHorizontal:10, backgroundColor:'#F1F1F1',fontWeight:'bold', color:'grey'}}>Menu</Text>
      </View>
    </View>
    <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:10, paddingVertical:10, borderTopWidth:1, borderTopColor:'purple'}}>
      <TouchableOpacity onPress={() => navigate('ProfileScreen', {item:user})}>
        <View style={{minHeight:50, minWidth:60, backgroundColor:'grey', borderWidth:2, borderRadius:10, borderColor:'grey', margin:10,alignItems:'center', justifyContent:'center', flexDirection:'column', padding:5}}><Icon name='account-circle' size={50} color='#fff'/><Text style={{color:'#fff'}}>Profile</Text></View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() =>navigate('UsersScreen')}>
        <View style={{minHeight:50, minWidth:60, backgroundColor:'grey', borderWidth:2, borderRadius:10, borderColor:'grey', margin:10,alignItems:'center', justifyContent:'center', flexDirection:'column', padding:5}}><Icon name='group' size={50} color='#fff'/><Text style={{color:'#fff'}}>Users</Text></View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => _logout(props)}>
        <View style={{minHeight:50, minWidth:60, backgroundColor:'grey', borderWidth:2, borderRadius:10, borderColor:'grey', margin:10,alignItems:'center', justifyContent:'center', flexDirection:'column', padding:5}}><Icon name='exit-to-app' size={50} color='#fff'/><Text style={{color:'#fff'}}>Sign Out</Text></View>
      </TouchableOpacity>
    </View>
    </View>
      
  </ScrollView>
)};

export default HomeRoute;

const styles = StyleSheet.create({
    viewBox: {
        paddingHorizontal: 20,
        justifyContent: 'center',
        width: width,
        padding: 5,
        alignItems: 'center',
        height: 80
      },
      slider: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
      },
      dotContainer: {
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: 15
      }
})