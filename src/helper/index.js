import React, { Fragment} from 'react';
import { IP } from 'react-native-dotenv';
import { ActivityIndicator, View, Text } from 'react-native';
import Overlay from 'react-native-modal-overlay';
import AsyncStorage from '@react-native-community/async-storage';

export const imgurl =(url)=>{
    const ipv4_address = IP;
    const cekurl = new RegExp(ipv4_address, "i").test(url);
  
    if (!cekurl) { 
      let urlbaru = url.slice(0,url.indexOf(':')+3);  
      urlbaru = urlbaru.concat(ipv4_address);
      urlbaru = urlbaru.concat(url.slice(url.lastIndexOf(':')));
      return urlbaru;
    }
    return url;
} 

export const formatNumber = (num) => {
    return "Rp. " + num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  } 
    
export function wait(timeout){
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    })
}

export const cekItemonCart =(carts, item)=>{
    let itemOncartSts = false;
    const itemOncart=carts.filter((oncart) => new RegExp(item.id, "i").exec(oncart.id));
    if (Array.isArray(itemOncart) && itemOncart.length >= 1) {
      return itemOncartSts = new RegExp(itemOncart.id).test(item.id);
    }
}

export const countTotal =(data)=>{
    let total = 0;
    total= data.reduce(function(prev, cur) {
      return prev + cur.price * cur.qty;
    }, 0);
  
    return total;
}
/*
export const OverlayLoading =(props)=>{ 
    const {visible, onClose} = props;
    return(
      <Overlay 
          visible={visible} 
          onClose={onClose} 
        //   closeOnTouchOutside 
          animationType="zoomIn" 
          containerStyle={{backgroundColor: 'rgba(37, 8, 10, 0.78)'}}
          childrenWrapperStyle={{backgroundColor: 'transparent'}}
          animationDuration={500}>
            {
            (hideModal, overlayState) => (
              <Fragment>
                <View style={{flexDirection:'row'}}>
                <ActivityIndicator color={'#FFF'}/>
                <Text style={{color:'#FFF', paddingHorizontal:5}}>Loading...</Text>
                </View>
              </Fragment>
            )
            } 
        </Overlay>
    )
  }  
*/
export const getUser = async () => {
    try {
      const value = await AsyncStorage.getItem('USER')
      if(value !== null) {
        let resultParsed = JSON.parse(value); 
        return resultParsed;
      }
    } catch(e) {
      console.log(e); 
    }
  }