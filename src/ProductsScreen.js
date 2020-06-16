import React from 'react';
import { Image, Animated, StyleSheet,TouchableOpacity, View, Text, ScrollView, Dimensions, RefreshControl, Button }from 'react-native';
import { Header } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import { connect } from 'react-redux';
import ItemPreviewCard from './secondscreen/ItemRoute/ItemPreviewCard';
const {height, width}= Dimensions.get('window'); 
import RenderProducts from './secondscreen/ItemRoute/RenderProducts';
import { pagingProducts } from '../redux/actions/product';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
const HEADER_HEIGHT = 60
const MAX_SCROLL_OFFSET = 100

const  ProductsScreen = (props) => { 
  const [page, setPage] = React.useState(1);
  const per = 5;

  const [hasNextPages, setHasNextPages] = React.useState(props.product.pagingProduct.hasNextPages);
  const [next_page, setNext_page] = React.useState(hasNextPages ? props.product.pagingProduct.next_page : 1);
  
  // animasi library
  const [scrollY, setScrollY] =React.useState(new Animated.Value(0));

  const headerTranslate = scrollY.interpolate({
    inputRange: [0, MAX_SCROLL_OFFSET],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: 'clamp',  // clamp so translateY can’t go beyond MAX_SCROLL_OFFSET
  })

  const headerHeight = scrollY.interpolate({
      inputRange: [0, MAX_SCROLL_OFFSET],
      outputRange: [2 * HEADER_HEIGHT, HEADER_HEIGHT],
      extrapolate: 'clamp',
      useNativeDriver: true
  })

  const translateDiffScroll = Animated.diffClamp(scrollY, 0, MAX_SCROLL_OFFSET).interpolate({
      inputRange: [0, MAX_SCROLL_OFFSET],
      outputRange: [0, -HEADER_HEIGHT],
      extrapolate: 'clamp'  
  })
 
  let [products, setProducts] = React.useState(props.product.productData);
  const { navigate } = props.navigation;
  const [refreshing, setRefreshing] = React.useState(false);
  const [isRejected, setIsRejected] = React.useState(props.product.isRejected);
  
  const _handleRefresh=React.useCallback(async()=>{
    await setRefreshing(isRejected);
    await props.dispatch(pagingProducts(page, per));   
  },  [refreshing]);

  const _handleLoadMore = async() => { 
    if (props.product.pagingProduct.hasNextPages === true) {   
      await props.dispatch(pagingProducts(next_page, per));  
    }else{
      await console.log('end of fields',hasNextPages, page, next_page); 
    }
  }; 
  // console.log(props.user.loginData);
  
  return(
    // paddingTop: headerHeight
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
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={_handleRefresh}
            />
          }
          contentContainerStyle={{flexWrap:'wrap',flexDirection:'row', paddingVertical:60}}
          
          > 
          <>
            {
              props.product.productData.map((item, index) => (
                <View key={index} style={{ width:width*50/100, marginTop:25, padding:5}} >
                <ItemPreviewCard item={item} props={props} {...props}/>
                </View>
              ))
            } 
            <>
            {props.product.pagingProduct.hasNextPages === true && (
            <View 
              style={{ 
                position: 'relative', 
                width: width, 
                height:100, 
                paddingVertical: 20, 
                borderTopWidth: 0, 
                marginTop: 10, 
                marginBottom: 10, 
                borderColor: 'pink',
                alignItems:'center', 
              }} 
            > 
              <TouchableScale onPress={()=>_handleLoadMore()}>  
                <Text>Tap to loading more...!</Text> 
              </TouchableScale> 
            </View> 
            )}
            </>
          </>
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
                  source={require('./assets/food-and-restaurant.png')}
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
                <View> 
                  <Icon name={'search'} color='#fff' size={30} style={{paddingVertical:5}}/>
                </View>
              </TouchableOpacity>
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
            justifyContent: 'flex-start',
            paddingHorizontal: 20,
            backgroundColor:'#ed788b'
          }}>
            <View style={styles.tabContainer}>
            <TouchableOpacity onPress={() => navigate('CustomComponent', {user:props.user.loginData})} style={styles.title} >
              <Icon style={styles.title} name="menu"/> 
            </TouchableOpacity>
            </View>
            <View style={styles.line} />
            <View style={styles.tabContainer}>
            <Icon style={styles.title}  name='local-grocery-store'/>
            <Text style={{position:'absolute', color: 'orange', right:59, top:21, fontSize:10, fontWeight:'bold'}}>{props.product.cart.length}</Text>
            </View>
            <View style={styles.line} />
            <View style={styles.tabContainer}>
            <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.title} >
              <Icon style={{color:'#fff'}} name={'view-module'} size={30}/>
            </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </Animated.View>
  )
}

const mapStateToProps =(state)=>{
  const { user, product, checkout } = state
  return{ 
    product, user, checkout
  }
}
 
export default connect(mapStateToProps)(ProductsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1136F2'
  },
  headerContainer: {
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    backgroundColor:'#ed788b'
  },
  listContainer: {
    marginBottom: 5,
    marginTop: 0
  },
  tabContainer: {
    flex: 1,
    paddingVertical: 20
  },
  iconContainer: {
    alignSelf: 'center'
  },
  line: {
    borderLeftWidth: 1.5,
    borderColor: '#FFF',
    marginVertical: 18
  },
  icon: {
    color: '#FFF',
    fontSize: 18
  },
  title: {
    color: '#FFF',
    fontSize: 25,
    flex: 1,
    alignSelf: 'center'
  }
})