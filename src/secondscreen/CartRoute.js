import React, { useState, Fragment} from 'react';
import { Alert, ActivityIndicator, View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Image, ListItem } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient'; 
import TouchableScale from 'react-native-touchable-scale';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { clearCart, reduceCart, plusItemOnCart, reduceItemOnCart} from "../../redux/actions/product";
import { checkout, getCheckout } from "../../redux/actions/checkout"; 
import qs from "qs";
import AsyncStorage from '@react-native-community/async-storage';
import Overlay from 'react-native-modal-overlay';
import {wait, formatNumber, countTotal, imgurl} from '../helper/index'; 
import Axios from "react-native-axios";
import { REACT_APP_URL_STRING } from 'react-native-dotenv'; 
const imagedefault = require('../assets/food-and-restaurant.png');
import { connect } from "react-redux";

const OverlayComponent =(props)=>{  
  
  const {visible, onClose } = props;

  return(
    <Overlay 
        visible={visible} 
        onClose={onClose} 
        closeOnTouchOutside={false}
        animationType="zoomIn" 
        containerStyle={{backgroundColor: 'rgba(37, 8, 10, 0.78)'}}
        childrenWrapperStyle={{backgroundColor: '#FFF', borderRadius:16, borderWidth:3, borderColor:'#FFF'}}
        animationDuration={500}>
          {
          (hideModal, overlayState) => (
            <Fragment> 
                <View style={{alignSelf:'stretch'}}>
                  {!props.checkout.isFulfilled ? (<ActivityIndicator/>):null}
                  <Text style={{fontWeight:'bold'}}>Checkout</Text>
                  <Text style={{position:'absolute', top:3, right:3}} onPress={hideModal}>Close</Text>
                </View>
                
                {props.checkout.checkoutData.length === 0?(
                  <View>
                    <Icon name='shopping-basket' size={100} color='pink'/> 
                  </View>
                ):(
                  <>
                <View style={{flexDirection:'column', alignSelf:'stretch'}}>
                  <View style={{flexDirection:'column', alignContent:'stretch', paddingVertical:5}}>
                    <Image style={{height: 100, width: 100}} source={imagedefault} PlaceholderContent={<ActivityIndicator/>}/>    
                    <Text>User ID {props.checkout.checkoutData[0].user}</Text>
                    <Text>NoTrx #{props.checkout.checkoutData[0].no_transaction}</Text>
                    <Text>Items:</Text> 
                  </View>
                  {props.checkout.checkoutData.map((item, i)=>{
                    return(
                      <ListItem
                        key={i}
                        title={item.name.toUpperCase()}
                        subtitle={
                          <View style={{flexDirection:'row'}}>
                            <Text>{item.qty} x </Text>
                            <Text>{formatNumber(item.price)}</Text> 
                          </View>
                        }
                        rightElement={
                          <View style={{flexDirection:'row'}}> 
                            <Text>{formatNumber(item.sub_total)}</Text>
                          </View>
                        }
                        bottomDivider 
                      />
                      
                    )
                  })}
                </View>

                <View style={{flexDirection:'column', alignSelf:'flex-end', paddingVertical:5}}>
                  <Text style={{alignSelf:'flex-end'}}>Sub Total {formatNumber(countTotal(props.checkout.checkoutData))}</Text>
                  <Text style={{alignSelf:'flex-end'}}>PPN 10% {formatNumber(countTotal(props.checkout.checkoutData)*10/100)}</Text>
                  <Text style={{fontWeight:'bold', alignSelf:'flex-end', fontSize:30}}>Total {formatNumber(countTotal(props.checkout.checkoutData)+countTotal(props.checkout.checkoutData)*10/100)}</Text>
                </View> 
              
                </>   
              )}
            </Fragment>
          )
          } 
      </Overlay>
  )
}  

const CartRoute = (props) => { 
  
    const [checkoutIsFulfilled, setCheckoutIsFulfilled] = React.useState(props.checkout.isFulfilled); 
    const itemoncart = props.product.cart.length;
    const [cart, setCart] = React.useState(props.product.cart);
    const [prosesCheckout, setProsesCheckout] = useState(false);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    
    toggleOverlay = () => {
      setVisible(!visible);
    }; 

    toggleLoading = () => {
      setProsesCheckout(!prosesCheckout);
    };

    const getDataUser = async () => {
      try {
        const value = await AsyncStorage.getItem('USER');
        if(value !== null) {
          let resultParsed = JSON.parse(value);
          return resultParsed.id;
        }
      } catch(e) {
        console.log(e);
        
      }
    }

    const submitCart = async (props) => { 
      const carts = props.product.cart; 
      if (carts.length !== 0) {
          const idUser = await getDataUser();
          const number = idUser+Date.now();

          for (let i = 0; i < carts.length; i++) {
              const bodyFormData = qs.stringify({
                  id_user : idUser,
                  no_transaction: number,
                  id_product: carts[i].id,
                  qty: carts[i].qty
              });
              await Axios.post(
                `${REACT_APP_URL_STRING}order/order/${idUser}/${number}`, bodyFormData, {
                  headers: {
                    "content-type": "application/x-www-form-urlencoded;charset=utf-8",
                    "x-access-token": 'localStorage.usertoken'
                  }
                }
              ) 
          }
          wait(2000).then(async()=> {
            await toggleOverlay();
          });  
          await props.dispatch(getCheckout(number));
          await props.dispatch(clearCart());
          await setProsesCheckout(false); 
      }
    };  

    const _twoOptionAlertHandler=(props)=>{
      let countTotal = 0;
      countTotal = props.product.cart.reduce(function(prev, cur) {
        return prev + cur.price * cur.qty;
      }, 0); 

      Alert.alert( 
        'Checkout',  
        `Total belanja ${formatNumber(countTotal) },- \n \nLanjutkan transaksi ?`,
        [
          {text: 'Yes', onPress: async() => {
            await toggleLoading();
            await submitCart(props);
            }
          },
          {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
        ],
        { cancelable: false }
        //clicking out side of alert will not cancel
      );
    } 

  return(
    <>
      <OverlayComponent visible={visible} onClose={()=>toggleOverlay()} {...props}/> 
      
      {itemoncart === 0 && 
        <View style={styles.container}>
          <Icon name='shopping-basket' size={100} color='pink'/>
          <Text>Keranjang belanja kosong</Text>
          <Text>atau</Text>
          <Text>Klik menu <Icon name='done-all' size={20}/>checkout untuk melihat transaksi terakhir</Text>
        </View>
      } 
      <View> 
      <FlatList 
        ListHeaderComponent={()=>{
          let total = countTotal(props.product.cart); 
          return(
          <View style={{flex:1, flexDirection:'row', justifyContent:'space-between', paddingHorizontal:10, paddingVertical:10}}>
            <View><Text>item: {itemoncart}</Text></View>
            <View><Text>Total { formatNumber(total) },-</Text></View>
            <TouchableScale onPress={()=>itemoncart <= 0 ? toggleOverlay() : _twoOptionAlertHandler(props)}>
            <View style={{flexDirection:'row'}}>
              {
                prosesCheckout 
                ? ( <ActivityIndicator color='orange' size={20}/>)
                : ( <Icon name='done-all' color={itemoncart <= 0 || checkoutIsFulfilled === true ? 'grey':'green'} size={20}/>) 
              }
              <Text>checkout</Text>
            </View>
            </TouchableScale>
          </View>)}
        }
        data={cart}
        keyExtractor={(item, index) => index.toString()}
        renderItem={carts=>{
          const item = carts.item;
          
          return(
            <>
            <ListItem
            title={item.name} 
            leftAvatar={{ source: {uri:imgurl(item.image)}}}
            Component={TouchableScale}
            friction={90} //
            tension={60} // These props are passed to the parent component (here TouchableScale)
            activeScale={0.95} //
            linearGradientProps={{
                    colors: ['transparent', '#FFF', 'pink'],
                    start: { x: 0.5, y: 0.5 },
                    end: { x: 1, y: 1 }
            }}
            ViewComponent={LinearGradient} // Only if no expo
            onLongPress={item=>console.log(item)}
            // bottomDivider
            topDivider
            containerStyle={{marginHorizontal:10, borderRadius:5, borderWidth:1}}
            subtitle={
              <View style={{flex:1, flexDirection:'row', justifyContent:'space-between', paddingHorizontal:10, paddingVertical:10}}>
                <View>
                  <Menu>
                    <MenuTrigger style={styles.menuTrigger} > 
                      <Text style={{borderWidth:1, borderColor:'grey', borderRadius:5, padding:5, color:'grey'}}>{item.qty} x</Text>
                    </MenuTrigger>
                    <MenuOptions>
                      <MenuOption text='Add/Reduce Item' disabled/>
                      <View style={{flex:1, flexDirection:'row', justifyContent:'space-between', paddingHorizontal:10, paddingVertical:10}}>
                        <TouchableScale style={{ borderColor:'grey', borderWidth:1, borderRadius:5, paddingHorizontal:5, paddingVertical:5}} onPress={()=>props.dispatch(reduceItemOnCart(item.id))}><Icon name='remove' size={30} color='red'></Icon></TouchableScale>
                        <Text style={{ paddingTop:10}}>{item.qty}</Text>
                        <TouchableScale style={{ borderColor:'grey', borderWidth:1, borderRadius:5, paddingHorizontal:5, paddingVertical:5}} onPress={()=>props.dispatch(plusItemOnCart(item.id))}><Icon name='add' size={30} color='green'></Icon></TouchableScale>
                      </View> 
                    </MenuOptions>
                  </Menu>
                </View>
                <View><Text>@{formatNumber(item.price)}</Text></View>
                <View><Text>{formatNumber(item.qty*item.price)}</Text></View>
              </View>
            }
            subtitleStyle={{backgroundColor:'pink'}}
            // badge={{ value: 'x', textStyle: { color: '#fff' }, containerStyle: { marginTop: -20 } }}
            rightElement={
              <TouchableScale onPress={()=>props.dispatch(reduceCart(item.id))}>
                <Icon name='clear' size={20} color='#fff'/>
              </TouchableScale>
            }
          /> 
          </>
          )
        }}
      /> 
      </View>
    </> 
  )
};

// export default CartRoute;
const mapStateToProps =(state)=>{
  // const { user, product, checkout } = state
  return{
    user: state.user, 
    product: state.product, 
    checkout: state.checkout,
  }
}
 
export default connect(mapStateToProps)(CartRoute);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      },
});