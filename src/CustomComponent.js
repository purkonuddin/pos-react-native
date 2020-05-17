import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
const imagedefault = require('./assets/food-and-restaurant.png'); //food-and-restaurant.png
import { connect } from 'react-redux';
import { logout } from '../redux/actions/user';
import Icon from 'react-native-vector-icons/MaterialIcons';

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

const CustomComponent =(props) => {  
    const [user, setUser] = useState(props.route.params.user[0]);
    
    const { navigate } = props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.containertopRow}>
          <Image
            style={styles.imageTopRow}
            source={imagedefault}
          />
        </View>
        <View style={styles.containerBottom}>
          <TouchableOpacity
            onPress={() => navigate('ProfileScreen', {item:user})}
            style={styles.containerBottomItem}
          >
            <View style={styles.button}>
            <Icon name="account-circle" size={23} color='purple' style={{paddingLeft:10}} />
            <Text style={styles.txtBottom}>Profile</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigate('SecondScreen')}
            style={styles.containerBottomItem}
          >
            <View style={styles.button}>
            <Icon name="store" size={23} color='purple' style={{paddingLeft:10}} />
            <Text style={styles.txtBottom}>Home Screen</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigate('CobaScreen')}
            style={styles.containerBottomItem}
          >
            <View style={styles.button}>
              <Icon name="not-interested" size={23} color='purple' style={{paddingLeft:10}} />
              <Text style={styles.txtBottom}>Coba Screen</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigate('UsersScreen')}
            style={styles.containerBottomItem}
          >
            <View style={styles.button}>
            <Icon name="group" size={23} color='purple' style={{paddingLeft:10}} />
            <Text style={styles.txtBottom}>Users Screen</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => _logout(props)}
            style={styles.containerBottomItem}
          >
            <View style={styles.button}>
              <Icon name="exit-to-app" size={23} color='purple' style={{paddingLeft:10}} />
              <Text style={styles.txtBottom}>Exit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    ); 
}
const mapStateToProps = (state) =>{
  const { user } = state
  return { user }
} 

// export default FirstScreen;
export default connect(mapStateToProps)(CustomComponent);

// export default CustomComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  containertopRow: {
    marginTop: 10,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: 'center'
  },
  txtBottom: {
    marginLeft: 10,
    color: 'purple',
    fontSize: 15,
    fontWeight: '100'
  },
  imageTopRow: {
    height: 80,
    width: 80,
    ...Platform.select({
      ios: {
        borderRadius: 80 / 2
      },
      android: {
        borderRadius: 80
      }
    })
  },
  icon: {
    height: 25,
    width: 25,
    marginRight: 10
  },
  button: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },

  containertopRowText: {
    flexDirection: 'column',
    marginLeft: 5
  },

  containerBottom: {
    backgroundColor: '#FFF'
  },
  containerBottomItem: {
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderBottomColor: 'purple',
    borderBottomWidth: 0.5
  }
});