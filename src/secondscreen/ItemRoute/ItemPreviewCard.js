import React from 'react';
import {Image, View, Text } from 'react-native';
import TouchableScale from 'react-native-touchable-scale'; 
import Icon from 'react-native-vector-icons/MaterialIcons';
import {cekItemonCart, imgurl, formatNumber} from '../../helper/index';   
 
const ItemPreviewCard = ({ item, props }) => {
    let [carts, setCarts] = React.useState(props.product.cart);
    let itemOncartSts = cekItemonCart(carts, item); 
    
    return (
        <TouchableScale onPress={()=>props.navigation.navigate('ItemDetailScreen', {item})}>
        <View style={{height: 160, width: '85%', left: '7.5%', justifyContent: 'space-around', }}>
            <View style={{flex: 1, alignItems: 'stretch'}}>
                {itemOncartSts &&
                    <Icon name={"check-circle"} color={'pink'} size={35} style={{ position:'absolute', right:25, zIndex:10 }} />
                }
                <Image source={{ uri: imgurl(item.image) }} resizeMode="contain" style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0}}/>
            </View>
            <View style={{height: '30%', backgroundColor: colors.pink, justifyContent: 'center'}}>
                <Text align="center" color={colors.white} style={{fontWeight:'bold',fontFamily: 'robotoRegular', fontSize: 16, color: colors.white, lineHeight: 24, textAlign: 'left', alignSelf: 'center'}}>
                {item.name}
                </Text>
            </View>
        </View> 
        </TouchableScale>
    );
  };

export default ItemPreviewCard;

const colors = {
    french_blue: '#3f51b5',
    deep_sky_blue: '#007aff',
    white: '#fff',
    black: '#000',
    veryLightPink: '#f2f2f2',
    pink: '#ed788b'
};
 