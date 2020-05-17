import React from 'react';
import {Image, ActivityIndicator, View, Text, StyleSheet} from 'react-native';
import TouchableScale from 'react-native-touchable-scale'; 
import Icon from 'react-native-vector-icons/MaterialIcons';
import {cekItemonCart, imgurl, formatNumber} from '../../helper/index';  
const imagedefault = require('../../assets/food-and-restaurant.png');
import { addToCart } from "../../../redux/actions/product";

const RenderProducts = ({ item, index, props }) => {  
    let [carts, setCarts] = React.useState(props.product.cart);
    let itemOncartSts = cekItemonCart(carts, item);  
    
    return(
          <View key={index}>
            <TouchableScale style = {styles.listItemContainer} onPress={()=>props.navigation.navigate('ItemDetailScreen', {item})}>
            <View style= {styles.iconContainer}>
              <Image 
                source={{uri:imgurl(item.image)}} 
                style={styles.initStyle} resizeMode='contain' 
                PlaceholderContent={  
                  <Image 
                    source={imagedefault} 
                    style={styles.initStyle} 
                    PlaceholderContent={ <ActivityIndicator />}
                  />
                }
              />
            </View>
            <View style = {styles.itemsDetailsContainer}>
              <View style={styles.itemsDetailsContainerWrap}>
                {itemOncartSts &&
                      <Icon name={"check-circle"} color={"#ed788b"} size={15} style={{ position:'absolute', right:1, top:1 }} />
                  }
                <View style={styles.nameContainer,{paddingLeft:8}}>
                  <Text>{item.name}</Text> 
                  <View>
                    <Text style={{ fontWeight:'400', color:'#666', fontSize:12 }}>{'categori : '}</Text>
                    <Icon name={item.id_category === 1 ? "restaurant" : "local-cafe"} size={15} color="#666" />
                  </View>
                  <View style={styles.dateContainer}>
                    <Icon name={item.stock > 0 ? "exposure-plus-1" : "exposure-zero"} size={15} color={item.stock > 0 ? "#075e54" : "#ed788b"} />
                    <Text style={{ fontWeight:'400', color:'#666', fontSize:12 }}>Stok tersedia</Text>
                  </View> 
                </View>
                <View style={styles.itemIconContainer, {position:'absolute', right:0}}>
                  <Text>{formatNumber(item.price)}</Text>
                  <TouchableScale style={styles.dateContainer} onPress={()=>props.dispatch(addToCart(item))}> 
                      <Icon name={item.stock > 0 ? "add-shopping-cart" : "remove-shopping-cart"} color={item.stock > 0 ? "#075e54" : "#ed788b"} size={23} style={{ padding:5 }} />
                      <Text style={{ fontWeight:'400', color:'#666', fontSize:12 }}>Add to Cart</Text> 
                  </TouchableScale>
                  
                </View>
              </View>
            </View> 
            </TouchableScale>
          </View>
  )};

export default RenderProducts;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    listItemContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderColor: "rgba(92,94,94,0.5)",
        // borderBottomColor: "rgba(92,94,94,0.5)",
        borderWidth: 0.5,
        // borderBottomWidth: 0.5, //0.25 
        borderRadius:5,
        marginBottom:5,
        marginHorizontal:5,
        backgroundColor:'#fff'
    },
    initStyle: {
        borderRadius: 3,
        width: 100,
        height: 80, 
    },
    itemsDetailsContainer: {
        padding:3,
        flex: 3,
        justifyContent: "center",
        // borderBottomColor: "rgba(92,94,94,0.5)",
        // borderBottomWidth: 0.5 //0.25
    },
    itemsDetailsContainerWrap: {
        flex: 1,
        alignItems: "center",
        flexDirection: "row", 
    },
    nameContainer: {
        alignItems: "flex-start",
        flex: 1
    },
    dateContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
      },
    rightHeaderContainer: {
        alignItems: "flex-end",
        flexDirection: "row"
    },
})