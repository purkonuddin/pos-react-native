import React, {Component, Fragment} from 'react';
import { ActivityIndicator, Image, View,Text,TextInput, StyleSheet, Button, Dimensions, Alert, ScrollView} from 'react-native';
import { connect } from 'react-redux';
import TouchableScale from 'react-native-touchable-scale';
import { login } from '../redux/actions/user';
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
const imagedefault = require('./assets/food-and-restaurant.png'); //food-and-restaurant.png
import { OverlayLoading } from './helper/index';
 
class FirstScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      errMsg: this.props.user.errMsg,
      username: '',
      password: '',
    }; 
  }  

  toggleLoading = () => {
    this.setState({loading:!this.state.loading});
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
    await this.props.dispatch(login(this.state.username, this.state.password));
    await this.setState({loading:false});
  }

  componentDidMount(){
    this.toggleLoading();
    this.getData();
  }

  render() {   
    const {errMsg, isFulfilled, loginData} = this.props.user;  
    let userdata = Array.isArray(loginData); 
    
    if (isFulfilled === true && loginData.length > 0) {  
      this.props.navigation.navigate('SecondScreen');
    } 

    return (
      <SafeAreaView>
        <OverlayLoading visible={this.state.loading} onClose={()=>toggleLoading()} {...this.props}/> 
        <ScrollView>
          <View style={styles.container}>
            <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
              <Image source={imagedefault} style={{height: 100, width: 100, margin:10}}/>
              <Text style={{color:'grey', fontSize:30}}>Point Of Sales</Text>
            </View>

            <View>
    <Text>Login</Text> 
            </View> 

            <TextInput
              style={styles.input}
              onChangeText={text => this.setState({username: text})}
              autoFocus={this.state.username === '' ? true : false}
              value={this.state.username}
              placeholder="user Id"
            />
            <TextInput
              style={styles.input}
              onChangeText={text => this.setState({password: text})}
              value={this.state.password}
              placeholder="password"
              secureTextEntry
            /> 
              {errMsg !== '' && 
                (<View>
                  <Text style={{color:'grey', marginVertical:10}}>{errMsg}</Text>
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