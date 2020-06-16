import React, {useState} from 'react';
import {Animated, ScrollView, View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Image, Header } from 'react-native-elements';
import { LineChart } from "react-native-chart-kit";
import ViewSlider from 'react-native-view-slider';
const { width, height } = Dimensions.get('window');
import AsyncStorage from '@react-native-community/async-storage';
import { getChartUser } from "../../redux/actions/chart";
import { logout } from '../../redux/actions/user';
import { wait, imgurl } from '../helper/index'; 
import { connect } from 'react-redux';
import ItemPreviewCard from '../secondscreen/ItemRoute/ItemPreviewCard';
import LinearGradient from 'react-native-linear-gradient';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import TouchableScale from 'react-native-touchable-scale';

const HEADER_HEIGHT = 60
const MAX_SCROLL_OFFSET = 100

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
  const [scrollY, setScrollY] =useState(new Animated.Value(0));

  const [labels, setLabels] = useState(["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli","Agustus","September","Oktober","November","Desember"]); 
  const [income, setIncome] = useState([
    Math.random() * 10,
    Math.random() * 10,
    Math.random() * 10,
    Math.random() * 10,
    Math.random() * 10,
    Math.random() * 10,
    Math.random() * 10,
    Math.random() * 10,
    Math.random() * 10,
    Math.random() * 10,
    Math.random() * 10,
    Math.random() * 10
  ]); 
  const datasets = [{ data: income }];
  wait(1000).then(()=>{
    setIncome(props.chart.chartData.income);
  });
    
  const [user, setUser] = useState(props.user.loginData[0]); 
  // console.log(user);
  
  const { navigate } = props.navigation;

  const _handleprofile =async()=>{
    await navigate('ProfileScreen', {item:user});
    await props.dispatch(getChartUser(user.id));

  }

  const translateDiffScroll = Animated.diffClamp(scrollY, 0, MAX_SCROLL_OFFSET).interpolate({
    inputRange: [0, MAX_SCROLL_OFFSET],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: 'clamp'  
  })

  return(
    <Animated.View style={{flex: 1, paddingTop:60}}> 
        <Animated.ScrollView
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { y: scrollY }
                }
              }
            ],
            { useNativeDriver: true } // <-- Add this
          )}
          contentContainerStyle={{flexWrap:'wrap',flexDirection:'row', paddingVertical:60}}
        > 
        <ScrollView>
        <View style={{flex:1, flexDirection:'column', alignItems: 'center',}} >
    
          <ViewSlider 
            renderSlides = {
            <>
            <View style={styles.viewBox}>
            <Image source={{uri: imgurl('http://100.24.31.79:8080/uploads/1584923913150-1582179247940-chickenkatsu.png')}} style={{height: 200, width}}/>
            </View>
            <View style={styles.viewBox}>
            <Image source={{uri: imgurl('http://100.24.31.79:8080/uploads/1584922979121-1582007229418-firdaus-roslan-pN769u0KHNA-unsplash.png')}} style={{height: 200, width}}/>
            </View>
            <View style={styles.viewBox}>
            <Image source={{uri: imgurl('http://100.24.31.79:8080/uploads/1584923846517-1582029645477-salmon.png')}} style={{height: 200, width}}/>
            </View>
            <View style={styles.viewBox}>
            <Image source={{uri: imgurl('http://100.24.31.79:8080/uploads/users/1585061599868-nida.png')}} style={{height: 200, width}}/>
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
            {props.chart.isFulfilled === true &&
              <LineChart
                data={{
                labels: labels,
                datasets: datasets
                }}
                width={Dimensions.get("window").width} // from react-native
                height={200}
                // yAxisLabel={"Rp"}
                chartConfig={{ 
                  backgroundColor: "white",
                  backgroundGradientFrom: "grey",
                  backgroundGradientTo: "grey",
                  decimalPlaces: 0, // optional, defaults to 2dp
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
            }
          </View> 
        </View>
        </ScrollView>
        </Animated.ScrollView>
        <Animated.View 
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0, 
            backgroundColor: '#1136F2', 
            transform: [{translateY: translateDiffScroll}] 
          }} 
        >
            <Header
            ViewComponent={LinearGradient} // Don't forget this!
            linearGradientProps={{
              colors: ['#fff','pink', 'orange', '#f44336'],
              start: { x: 0.5, y: 0.5 },
              end: { x: 1, y: 1 },
            }}
            placement="left"
            leftComponent={
              <TouchableOpacity
                onPress={() => {}}
                style={styles.containerBottomItem}
              > 
                <Image
                  source={require('../assets/food-and-restaurant.png')}
                  style={{ width: 50, height: 50 }} 
                />
              </TouchableOpacity>
            }
            statusBarProps={{ barStyle: 'light-content' }}
            barStyle="light-content" // or directly 
            centerComponent={ 
              { text: 'Point Of Sales', style: { color: 'grey', fontWeight:'bold', fontSize:18 } }
            }  
            centerContainerStyle={{flex:1}} 
            rightComponent={
              <View style={{
                alignItems: "flex-end",
                flexDirection: "row"
              }}>
              <TouchableOpacity onPress={()=>navigate('SearchScreen')}> 
                <View style={{minHeight:10, minWidth:60, borderWidth:0, borderRadius:10, borderColor:'grey',  alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
                  <Icon name={'search'} color='#fff' size={30} style={{paddingVertical:5}}/>
                </View> 
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>_handleprofile()}> 
                <View style={{minHeight:10, minWidth:60, borderWidth:0, borderRadius:10, borderColor:'grey', alignItems:'center', justifyContent:'center', flexDirection:'column', paddingVertical:5}}>
                  <Icon name='account-circle' size={30} color='#f1f1f1'/>
                </View>
              </TouchableOpacity>
              </View>
            }
            containerStyle={{
              height: HEADER_HEIGHT,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              paddingHorizontal: 20,
              paddingVertical:20
            }}
          /> 
          {/* </View> */}
          <View style={{
            height: HEADER_HEIGHT,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 40,
            backgroundColor:'#FFF'
          }}>
            {/* <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:10, paddingVertical:10, borderTopWidth:1, borderTopColor:'purple'}}> */}
      <TouchableOpacity onPress={() => navigate('CustomComponent',{user:props.user.loginData})}>
        <View style={{minHeight:10, minWidth:60, backgroundColor:'#fff', borderWidth:0, borderRadius:10, borderColor:'grey', margin:10,alignItems:'center', justifyContent:'center', flexDirection:'column', padding:5}}>
          <Icon name='menu' size={30} color='grey'/>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() =>navigate('UsersScreen')}>
        <View style={{minHeight:10, minWidth:60, backgroundColor:'#fff', borderWidth:0, borderRadius:10, borderColor:'grey', margin:10,alignItems:'center', justifyContent:'center', flexDirection:'column', padding:5}}>
          <Icon name='group' size={30} color='grey'/>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => _logout(props)}>
        <View style={{minHeight:10, minWidth:60, backgroundColor:'#fff', borderWidth:0, borderRadius:10, borderColor:'grey', margin:10,alignItems:'center', justifyContent:'center', flexDirection:'column', padding:5}}>
          <Icon name='exit-to-app' size={30} color='grey'/>
        </View>
      </TouchableOpacity>
    {/* </View> */}
          </View>
        </Animated.View>
      </Animated.View>
     
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