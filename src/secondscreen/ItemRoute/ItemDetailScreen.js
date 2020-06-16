import React, {useState} from 'react';
import { Dimensions, ScrollView, ActivityIndicator, FlatList, View, TouchableOpacity, StyleSheet, Text, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SearchBar, Header, Image, Avatar } from 'react-native-elements';
import { Menu, MenuProvider, MenuOptions, MenuOption, MenuTrigger, renderers, } from 'react-native-popup-menu';
import {formatNumber,imgurl, cekItemonCart} from '../../helper/index'; 
import TouchableScale from 'react-native-touchable-scale';
const {height, width}= Dimensions.get('window'); 
import { pagingProducts, addToCart } from "../../../redux/actions/product";
import { connect } from 'react-redux';
import ItemPreviewCard from './ItemPreviewCard'; 

const ItemDetailScreen=(props)=> {
    const [products, setProducts] = useState(props.product.productData);
    const {navigate} = props.navigation;
    let item = props.route.params.item;
    const [carts, setCarts] = useState(props.product.cart);
    let itemOncartSts = cekItemonCart(carts, item); 
    const productsByCategory = products.filter((data)=> data.id !== item.id && new RegExp(item.id_category, "i").exec(data.id_category));
    let [loading, setLoading] = useState(false);

    const _handleAddtoCart =async(item)=> {
        if (item.stock > 0) {
            await setLoading(itemOncartSts);
            await props.dispatch(addToCart(item));
            await setLoading(itemOncartSts);
        }
       
    }

    return(
        <>
        <Header
            containerStyle={{backgroundColor:'#999', borderBottomWidth:0, height: 50, paddingBottom:16}}
            leftComponent={
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <Icon name="arrow-back" size={23} color='#FFF' style={{paddingLeft:10}} />
                </TouchableOpacity>
            } 
            centerComponent={<View><Text style={{color:'#FFF', fontWeight:'bold'}}>{item.name}</Text></View>} 
            rightComponent={
                <View style={{flexDirection:'row'}}>
                    <TouchableScale style={{backgroundColor:'#888', borderColor:'#888', borderWidth:1, borderRadius:16,padding:1}} onPress={()=>_handleAddtoCart(item)}>
                    {loading === true
                    ? ( <ActivityIndicator color='#FFF' size={20} style={{ padding:5 }} /> )
                    : ( <Icon name={item.stock > 0 ? "add-shopping-cart" : "remove-shopping-cart"} color={itemOncartSts ? "orange" : "#FFF"} size={20} style={{ padding:5 }} />)
                    }
                    </TouchableScale>
                <Menu>
                    <MenuTrigger>
                        <Icon name="more-vert" size={23} color='#FFF' style={{padding:5}}/>
                    </MenuTrigger>
                    <MenuOptions style={{padding:10, flexDirection:'column', justifyContent:'space-around'}}> 
                        <MenuOption onSelect={() => Alert.alert('show edit modal!')} style={{flexDirection:'row'}}>
                        <Icon name="edit" color='#666' size={23}/><Text>Edit</Text>
                        </MenuOption>  
                        <MenuOption onSelect={() => navigate('SecondScreen')} style={{flexDirection:'row'}}>
                        <Icon name="store" color='#666' size={23}/><Text>Store</Text>
                        </MenuOption>
                        <MenuOption onSelect={() => navigate('CustomComponent')} style={{flexDirection:'row'}}>
                        <Icon name="menu" color='#666' size={23}/><Text>Menu</Text>
                        </MenuOption>
                    </MenuOptions>
                </Menu>
                </View>
            }
        />
        <ScrollView>
        <View style={{ 
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'stretch',
        }}>
            <View style={{zIndex:10,marginTop:100,alignSelf:'flex-end', alignItems:'center',justifyContent: 'center', width: 200, height: 155, backgroundColor: 'transparent'}}>
                <Avatar    
                    size="xlarge"
                    title={item.name.charAt(0).toUpperCase()}
                    onPress={() => console.log("Works!")}
                    source={{uri:imgurl(item.image)}} 
                    containerStyle={{borderWidth:3,borderColor:'#999'}}
                    showAccessory={true}
                    accessory={{ name: 'mode-edit', type: 'material', color: '#fff', underlayColor: '#000' }}
                    onAccessoryPress
                    />
            </View> 
            <View style={{ top:0,position:'absolute', height: 200, width:width, backgroundColor: '#999', borderBottomWidth:3, borderColor:'#666'}}>
                <Image style={{height: 200, width: width}} source={{uri:imgurl(item.image)}} PlaceholderContent={<ActivityIndicator/>}/>    
            </View> 
        </View>
        <View style={{padding:10}}>
            <Text style={{color:'#666'}}>Description : {item.description.toUpperCase()}</Text>
        </View> 
        <View style={{marginBottom:10,marginHorizontal:10,borderWidth:1,borderColor:'#666',borderRadius:16,zIndex:100, flexDirection:'column', justifyContent:'space-between', paddingVertical:5, backgroundColor:'#FFF'}}>
            <View style={{alignSelf:'center', alignItems:'center',justifyContent: 'center',}}>
                <Text style={{ fontWeight:'bold',color:'#666'}}>{item.name.toUpperCase()}</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-around', paddingHorizontal:10, paddingVertical:10, borderTopWidth:0 }}>
                <View style={{minHeight:50, minWidth:60, backgroundColor:'purple', borderWidth:2, borderRadius:10, borderColor:'purple', margin:10,alignItems:'center', justifyContent:'center', flexDirection:'column', padding:5}}><Text style={{color:'#fff', fontWeight:'bold', fontSize:20}}>{formatNumber(item.price)}</Text><Text style={{color:'#fff'}}>Price</Text></View>
                <View style={{minHeight:50, minWidth:60, backgroundColor:'green', borderWidth:2, borderRadius:10, borderColor:'green', margin:10,alignItems:'center', justifyContent:'center', flexDirection:'column', padding:5}}><Text style={{color:'#fff', fontWeight:'bold', fontSize:20}}>{item.stock}</Text><Text style={{color:'#fff'}}>Tersedia</Text></View>
                <View style={{minHeight:50, minWidth:60, backgroundColor:'orange', borderWidth:2, borderRadius:10, borderColor:'orange', margin:10,alignItems:'center', justifyContent:'center', flexDirection:'column', padding:5}}>
                    <Icon name={item.id_category === 1 ? 'local-cafe' : 'restaurant-menu'} size={25} color='#fff'/>
                    <Text style={{color:'#fff'}}>Category</Text>
                </View>
            </View>
        </View>
        <View style={{marginBottom:10,marginHorizontal:10,borderWidth:1,borderColor:'#666',borderRadius:16,zIndex:100, flexDirection:'column', paddingVertical:5, backgroundColor:'#FFF'}}>
            <View style={{alignSelf:'center', alignItems:'center',justifyContent: 'center',}}>
                <Text style={{ fontWeight:'bold',color:'#666'}}>Item berdasarkan Category </Text>
            </View>
            <ScrollView horizontal>
            {/* <View style={{ flex:1 ,flexDirection:'row',alignItems:'flex-start', width:width, height:300}}> */}
            {productsByCategory.map(item => (
                    <View key={item.id} style={{ width:width/2, marginTop:25, padding:5}} >
                    <ItemPreviewCard item={item} props={props} />
                    </View>
                )
            )}
            {/* </View> */}
            </ScrollView>
        </View>
        </ScrollView>
    </>
    )
}

const ProductsByCategory = () => { 
}

const mapStateToProps = (state) =>{
    const { user, product } = state
    return { 
        user,
        product,
    }
  } 
  
  // export default FirstScreen;
export default connect(mapStateToProps)(ItemDetailScreen);
// export default ItemDetailScreen;