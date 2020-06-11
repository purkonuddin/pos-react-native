import React, {Component, Fragment} from 'react';
import { ActivityIndicator, TouchableOpacity, Image, View,Text,TextInput, StyleSheet, Button, Dimensions, Alert, ScrollView} from 'react-native';
import { connect } from 'react-redux';
import TouchableScale from 'react-native-touchable-scale';
import { login } from '../redux/actions/user';
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
const imagedefault = require('./assets/food-and-restaurant.png'); //food-and-restaurant.png
import { OverlayLoading } from './helper/index'; 
import Axios from "react-native-axios";
import { REACT_APP_URL_STRING } from 'react-native-dotenv';

class FirstScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email:'',
      id:null,
      authStep:0,
      loading:false,
      errMsg: this.props.user.errMsg,
      username: '',
      password: '',
    }; 
  }  

  sendemail = async (id, email) =>{ 
    if (id !== '' && email != '') { 
        const res = await Axios.post(`${REACT_APP_URL_STRING}email/lupa_password?id=${id}&email=${email}`);
        let result = await res.data; 
        console.log(result);
        
        Alert.alert( 
          `Sending email: Code ${result.code}`,
          `Message: ${result.message}`,
          [
            {text: 'Ok', onPress: async() => {
              console.log('Ok Pressed');
              }
            }
          ],
          { cancelable: true }
        );
    }
  }

  handlesend = () => {
    this.sendemail(this.state.id, this.state.email);
  }

  toggleLoading = () => {
    this.setState({loading:false});
  };

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('USER')
      if(value !== null) {
        let resultParsed = JSON.parse(value); 
        await this.props.dispatch(login(resultParsed.id, resultParsed.password));
        await this.toggleLoading();
        await this.props.navigation.navigate('SecondScreen');
      }
    } catch(e) {
      console.log(e);
      await this.toggleLoading();
    }
  }

  login = async() =>{   
    await this.setState({loading:true});
    await this.props.dispatch(login(this.state.id, this.state.password));
    await this.setState({loading:false});
  }

  componentDidMount(){
    this.toggleLoading();
    this.getData();
  }

  render() {   
    const {errMsg, isFulfilled, loginData} = this.props.user;  
    let userdata = Array.isArray(loginData); 
    console.log(this.state.loading, loginData.length === 0);
    
    if (isFulfilled === true && loginData.length > 0) {  
      this.props.navigation.navigate('SecondScreen');
    } 

    return (
      <SafeAreaView>
        {/* <OverlayLoading visible={this.state.loading} onClose={()=>toggleLoading()} {...this.props}/>  */}
        <ScrollView>
          <View style={styles.container}>
            <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
              <Image source={imagedefault} style={{height: 100, width: 100, margin:10}}/>
              <Text style={{color:'grey', fontSize:30}}>Point Of Sales</Text>
            </View>
            { this.state.authStep == 1 ? (
                <View>
                  <TouchableOpacity onPress={()=> this.setState({authStep:0})} style={{borderBottomWidth:1, paddingVertical:5, marginBottom:10, borderBottomColor:'black'}}>
                    <Text style={{fontWeight:'bold'}}>... Cancel</Text>
                  </TouchableOpacity>
                  <Text style={{fontWeight:'bold', marginBottom:20}}>Lupa password</Text>
                  <Text>Email address :</Text>
                  <TextInput 
                    editable={true}
                    keyboardType={'email-address'}
                    placeholder={'enter your email address..'}
                    onChangeText={(text)=>this.setState({email:text})}
                    value={this.state.email}
                    style={{width:250, marginVertical:10, padding:5, borderWidth:1, borderColor:'green'}}
                  />
                  <Text>User ID :</Text>
                  <TextInput 
                    editable={true}
                    // secureTextEntry={true}
                    placeholder={'enter your Id..'}
                    onChangeText={(text)=>this.setState({id:text})}
                    value={this.state.id}
                    style={{width:250, marginVertical:10, padding:5, borderWidth:1, borderColor:'green'}}
                  />
                  <TouchableOpacity
                    style={{backgroundColor:'green', paddingVertical:10, paddingHorizontal:20, borderRadius:5}} 
                    onPress={()=>this.handlesend()}
                    >
                    <Text style={{color:'white'}}>Send</Text>
                  </TouchableOpacity>
                </View>
              ):(
                <>
                <View>
                <TouchableOpacity onPress={()=> this.setState({authStep:1})} style={{borderBottomWidth:1, paddingVertical:5, marginBottom:10, borderBottomColor:'black'}}>
                  <Text style={{fontWeight:'bold', color:'green'}}>Lupa password ? ...</Text>
                </TouchableOpacity>
                <Text style={{fontWeight:'bold'}}>Login</Text>
                <Text style={{ color:'grey'}}>Silahkan login untuk menggunakan aplikasi ini</Text> 
                </View> 
                
                <TextInput
                  editable={true}
                  // style={styles.input}
                  onChangeText={text => this.setState({id: text})}
                  autoFocus={this.state.id === null ? true : false}
                  value={this.state.id}
                  placeholder={"user Id"}
                  style={{width:250, marginVertical:10, padding:5, borderWidth:1, borderColor:'green'}}
                />
                <TextInput
                  editable={true}
                  // style={styles.input}
                  onChangeText={text => this.setState({password: text})}
                  value={this.state.password}
                  placeholder={"password"}
                  secureTextEntry
                  style={{width:250, marginVertical:10, padding:5, borderWidth:1, borderColor:'green'}}
                /> 
                  {errMsg !== '' && 
                    (<View>
                      <Text style={{fontWeight:'bold',color:'green', marginVertical:10}}>{errMsg}</Text>
                    </View>)
                  } 
                <View>
                <TouchableScale onPress={() => this.login()} style={{backgroundColor:'orange', borderWidth:2, borderColor:'orange', paddingVertical:10, paddingHorizontal:50, borderRadius:30}}>
                  <View style={{flexDirection:'row', alignItems:'center'}}>
                    {this.state.loading === true && loginData.length === 0 && 
                        <ActivityIndicator color='#FFF'/> 
                    }
                    <Text style={{color:'#FFF', paddingLeft:5}}>Login</Text>
                  </View>
                </TouchableScale> 
                </View> 
                </>
              )
            }
          </View>
        </ScrollView> 
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) =>{
  const { user } = state
  return { user }
} 

// export default FirstScreen;
export default connect(mapStateToProps)(FirstScreen);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    input: {
      height: 40,
      margin: 10,
      width: '70%',
      borderColor: 'gray',
      borderWidth: 1,
    },
  });