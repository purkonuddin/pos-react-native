import React from 'react';
import {ScrollView, ActivityIndicator, View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Header, Image } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient'; 
import TouchableScale from 'react-native-touchable-scale';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { pagingProducts, addToCart } from "../../redux/actions/product";
const imagedefault = require('../assets/food-and-restaurant.png');
import ItemPreviewCard from './ItemRoute/ItemPreviewCard';
import RenderProducts from './ItemRoute/RenderProducts';
import { SafeAreaView } from 'react-native-safe-area-context';
const {height, width}= Dimensions.get('window'); 

const ItemsRoute = (props) => {  
  const [isRejected, setIsRejected] = React.useState(props.product.isRejected);
  const [hasNextPages, setHasNextPages] = React.useState(props.product.pagingProduct.hasNextPages);
  let [products, setProducts] = React.useState(props.product.productData);
  const [next_page, setNext_page] = React.useState(hasNextPages ? props.product.pagingProduct.next_page : 1);
  const [itemView, setItemView] = React.useState(false);  
  const [loadingMore, setLoadingMore] = React.useState(hasNextPages);
  const [page, setPage] = React.useState(1);
  const per = 5;
  const [refreshing, setRefreshing] = React.useState(false);
  const [viewmodule, setViewmodule] = React.useState(false);
  const _headerComponent = () =>{
    return(
      <View style={{ width:width, flexDirection: 'row', justifyContent:'space-between', paddingHorizontal:10, paddingVertical:10}}>
      <View>
        {!props.product.isFulfilled 
        ? ( <ActivityIndicator size='small' color='orange' />)
        : ( <Text>{props.product.productData.length} of {props.product.pagingProduct.total}</Text> )}
      </View>
      <View> 
        <TouchableOpacity onPress={() => navigate('ProductsScreen')} style={styles.containerBottomItem} >
          <Icon name={'view-module'} size={30}/>
        </TouchableOpacity>
      </View> 
    </View>
    );
  }

  const _keyExtractor = (item, index) => index.toString();
 
  const _fetchAllProducts = async() => { 
    await props.dispatch(pagingProducts(page, per));
    await setRefreshing(false); 
  }

  const _handleLoadMore = async() => { 
    if (hasNextPages===true) {  
      await setPage(next_page);  
      await props.dispatch(pagingProducts(next_page, per)); 
      await console.log('loadingMore...', next_page);
    }else{
      await console.log('end of fields', page, next_page); 
    }
  }; 
    
  const _renderFooter = () => {
    if (!loadingMore) return null;
    return (
          <View 
            style={{ 
              position: 'relative', 
              width: width, 
              height: height, 
              paddingVertical: 20, 
              borderTopWidth: 0, 
              marginTop: 10, 
              marginBottom: 10, 
              borderColor: 'pink',
              alignItems:'center', 
            }} 
          >
            <Text>Pull top to loading more ...</Text> 
          </View>
    );
  };

  const onRefresh = React.useCallback(async()=>{
    await setRefreshing(isRejected);
    await props.dispatch(pagingProducts(page, 5));
  },  [refreshing]);
  
  const {navigate} = props.navigation;

  return(
    <> 
      <Header
            ViewComponent={LinearGradient} // Don't forget this!
            linearGradientProps={{
              colors: ['#fff','pink', 'orange', '#f44336'],
              start: { x: 0.5, y: 0.5 },
              end: { x: 1, y: 1 },
            }}
            placement="left"
            leftComponent={
              <TouchableScale
                onPress={() => navigate('CustomComponent', {user:props.user.loginData})}
                style={styles.containerBottomItem}
              > 
                <Image
                  source={imagedefault}
                  style={{ width: 50, height: 50 }}
                  // PlaceholderContent={<ActivityIndicator/>}
                />
              </TouchableScale>
            }
            statusBarProps={{ barStyle: 'light-content' }}
            barStyle="light-content" // or directly 
            centerComponent={ 
              { text: 'Point Of Sales', style: { color: 'grey', fontWeight:'bold', fontSize:18 } }
            }  
            centerContainerStyle={{flex:1}} 
            rightComponent={
              <View style={styles.rightHeaderContainer}>
              <TouchableScale onPress={()=>navigate('SearchScreen')}> 
                <View> 
                  <Icon name={'search'} color='#fff' size={30} style={{paddingVertical:5}}/>
                </View>
              </TouchableScale>
              <TouchableOpacity> 
                <Menu>
                  <MenuTrigger style={styles.menuTrigger} > 
                    <Icon name="more-vert" color='#fff' size={30} style={{padding:5}}/>
                  </MenuTrigger>
                  <MenuOptions>
                    <MenuOption onSelect={() => navigate('UsersScreen')} style={{flexDirection:'row'}}>
                      <Icon name="people" color='#666' size={23}/><Text>Users</Text>
                      </MenuOption>
                      <MenuOption onSelect={() => navigate('CustomComponent',{user:props.user.loginData})} style={{flexDirection:'row'}}>
                      <Icon name="menu" color='#666' size={23}/><Text>Menu</Text>
                    </MenuOption>
                  </MenuOptions>
                </Menu>
              </TouchableOpacity>
              </View>
            }
            containerStyle={{ backgroundColor: '#FFF', justifyContent: 'space-around', height:70, marginTop:0, paddingTop:0, }}
        /> 
        { isRejected === true ? (
            <SafeAreaView style={styles.container}>
              <ScrollView contentContainerStyle={styles.scrollView} refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }> 
              <View style={{alignItems:'center', justifyContent:'center', }}>
                <Text style={{color:'grey', paddingTop:15}}>Request failed with status code {props.product.ajaxError.status}</Text>
                <Text style={{color:'grey', paddingBottom:15}}>Pull down to see refreshControl indicator</Text>
              </View>
            </ScrollView>
            </SafeAreaView>
          )
          : (
            <>
            {viewmodule ? (
              <SafeAreaView>
                <ScrollView 
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                  contentContainerStyle={{flexWrap:'wrap',flexDirection:'row', paddingTop:5,paddingBottom:200}}
                  >
                  {
                    products.map((item, index) => (
                      <View key={index} style={{ width:width*50/100, marginTop:25, padding:5}} >
                      <ItemPreviewCard item={item} props={props} {...props}/>
                      </View>
                    ))
                  }
                </ScrollView> 
              </SafeAreaView>
            ):(
            <FlatList 
            style={{flex:0.5}} 
            ListHeaderComponent={_headerComponent}
            stickyHeaderIndices={[0]} 
            data={products}
            keyExtractor={_keyExtractor} // string
            renderItem={({ item, index }) => (
              <RenderProducts item={item} index={index} props={props}/> 
            )}  
            onRefresh={onRefresh}
            refreshing={refreshing}
            ListFooterComponent={_renderFooter}
            onEndReached={_handleLoadMore}
            onEndReachedThreshold={1}
            initialNumToRender={5}
            />
            )
              
            }
            </>
          )
        }
       
    </>
  );  
};

export default ItemsRoute;

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