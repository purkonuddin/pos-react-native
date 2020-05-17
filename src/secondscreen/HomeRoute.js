import React, {Component, useState} from 'react';
import {ScrollView, ActivityIndicator, View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SearchBar, Header, Image, ListItem } from 'react-native-elements';
import { LineChart } from "react-native-chart-kit";
import ViewSlider from 'react-native-view-slider';
const { width, height } = Dimensions.get('window');

const HomeRoute = () => {
  const lebar = Dimensions.get("window").width;
  return(
      <ScrollView>
  <View style={{flex:1, flexDirection:'column', alignItems: 'center',}} >
    
    
    <ViewSlider 
        renderSlides = {
          <>
            <View style={styles.viewBox}>
              <Image source={{uri: 'http://100.24.31.79:8080/uploads/users/1585061599868-nida.png'}} style={{height: 200, width}}/>
            </View>
            <View style={styles.viewBox}>
            <Image source={{uri: 'http://100.24.31.79:8080/uploads/1584922979121-1582007229418-firdaus-roslan-pN769u0KHNA-unsplash.png'}} style={{height: 200, width}}/>
            </View>
            <View style={styles.viewBox}>
            <Image source={{uri: 'http://100.24.31.79:8080/uploads/1584923846517-1582029645477-salmon.png'}} style={{height: 200, width}}/>
            </View>
            <View style={styles.viewBox}>
            <Image source={{uri: 'http://100.24.31.79:8080/uploads/1584923913150-1582179247940-chickenkatsu.png'}} style={{height: 200, width}}/>
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
    <View><Text style={{paddingHorizontal:10, backgroundColor:'#FFF'}}>Category</Text></View>
    </View>
     <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:10, paddingVertical:10, borderTopWidth:1, borderTopColor:'purple'}}>
      <View style={{minHeight:50, minWidth:60, backgroundColor:'purple', borderWidth:2, borderRadius:10, borderColor:'purple', margin:10,alignItems:'center', justifyContent:'center', flexDirection:'column', padding:5}}><Icon name='restaurant-menu' size={50} color='#fff'/><Text style={{color:'#fff'}}>Food</Text></View>
      <View style={{minHeight:50, minWidth:60, backgroundColor:'green', borderWidth:2, borderRadius:10, borderColor:'green', margin:10,alignItems:'center', justifyContent:'center', flexDirection:'column', padding:5}}><Icon name='cake' size={50} color='#fff'/><Text style={{color:'#fff'}}>Cake</Text></View>
      <View style={{minHeight:50, minWidth:60, backgroundColor:'orange', borderWidth:2, borderRadius:10, borderColor:'orange', margin:10,alignItems:'center', justifyContent:'center', flexDirection:'column', padding:5}}><Icon name='local-cafe' size={50} color='#fff'/><Text style={{color:'#fff'}}>Cofee</Text></View>
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