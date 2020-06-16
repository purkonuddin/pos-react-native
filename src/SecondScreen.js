// @observer
import React, {Component} from 'react';
import {StatusBar, Text, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SearchBar } from 'react-native-elements';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { connect } from "react-redux";
import { pagingProducts } from "../redux/actions/product";
import { getCharts } from "../redux/actions/chart";
import { getUsers} from "../redux/actions/user";
import ItemsRoute from './secondscreen/ItemRoute'; 
import HomeRoute from './secondscreen/HomeRoute';
import CartRoute from './secondscreen/CartRoute';

class SecondScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      index: 0,
      routes:[
        { key: 'home', title: 'Home'},
        { key: 'items', title: 'Items' },
        { key: 'cart', title: 'Cart' },
      ],
      data: '',
      searchbar: false,
      search: '',
      username: '',
      password: '',
    };
  } 

  updateSearch = search => {
    this.setState({ search });
  };

  search = () => {
    const { search } = this.state;
    return(
      <SearchBar
                fontColor="#fff"
                iconColor="#fff"
                shadowColor="#fff"
                cancelIconColor="#fff"
                backgroundColor="#fff"
                // showLoading={true}
                lightTheme={true} 
                containerStyle={{
                  backgroundColor: 'orange',
                  justifyContent: 'space-around',
                  width:'140%',
                  borderColor:'#fff',  
                  position:'absolute',
                  left:-60,
                  top:-34, 
                }}
                placeholder="Search here"
                onChangeText={this.updateSearch}  
                value={search} 
                />
    );
  }

  getProduct = async (page, per) => {
    await this.props.dispatch(pagingProducts(page, 5));
  }; 

  getUser = async () => {
    await this.props.dispatch(getUsers());
  }; 
  
  getChart = async () => {
    await this.props.dispatch(getCharts());
  }; 

  componentDidMount(){
    const {page} = this.state.page;
    this.getProduct(page,10); 
    this.getUser(); 
    this.getChart();
    // this.getchartuser();
  }

  render() {  
    
    const renderScene = SceneMap({
      home: () => <HomeRoute {...this.props}/>,
      items: () => <ItemsRoute {...this.props}/>,
      cart: () => <CartRoute {...this.props}/>,
    });

    const handleIndexChange = index => {
      this.setState({ index })
    };

    const getTabBarIcon = (props) => {
      const {route, focused} = props
      if (route.key === 'home') {
        return <Icon name='store' size={30} color={focused ? '#666' : '#fff'}/>
      } else if(route.key === 'items') {
        return <Icon name='view-list' size={30} color={focused ? '#666' : '#fff'}/>
      } else {
        return (
          <>
            <Icon name='local-grocery-store' size={30} color={focused ? '#666' : '#fff'}/>
            <Text style={{position:'absolute', color:focused ? '#fff' : 'orange', right:9, top:2, fontSize:12, fontWeight:'bold'}}>{this.props.product.cart.length}</Text>
          </>
        )
      }
    }
    
    return ( 
      <>
        <StatusBar barStyle={'light-content'} backgroundColor={'#f44336'}/>
          <TabView
            containerStyle={{backgroundColor:'#FFF'}}
            navigationState={this.state}
            style={{backgroundColor:'#fff'}}
            renderScene={renderScene}
            onIndexChange={index => handleIndexChange(index)}
            initialLayout={{height: 100, width: Dimensions.get('window').width}}
            renderTabBar={props =>
              <TabBar
                  {...props}
                  indicatorStyle={{backgroundColor: 'red'}}
                  renderIcon={
                      props => getTabBarIcon(props)
                  }
                  tabStyle={{backgroundColor: "#f44336"}} 
                  labelStyle={styles.noLabel}
              />
            }
            tabBarPosition={'bottom'}
          /> 
      </>
    );
  }
}

const mapStateToProps =(state)=>{
  const { user, product, checkout, chart } = state
  return{
    user,
    product,
    checkout,
    chart
  }
}
 
export default connect(mapStateToProps)(SecondScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  buttonView: {
  flexDirection: 'row'
  },
  headerStyle: {
  flex: 1,
  height: 30, 
  backgroundColor: 'pink',
  justifyContent: 'flex-start',
  alignItems: 'center',
  },
  titleStyle: {
  color: 'white'
  },
  menutop: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'pink',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  menubar: { 
  },
  rightHeaderContainer: {
    alignItems: "flex-end",
    flexDirection: "row"
 },
 scene: {
  flex: 1,
},
scene: {
  flex: 1,
},
noLabel: {
  display: 'none',
  height: 0
},
bubble: {
  backgroundColor: 'lime',
  paddingHorizontal: 18,
  paddingVertical: 12,
  borderRadius: 10
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
itemContainer: {
  flex: 1,
  alignItems: "flex-start"
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
callIconContainer: {
  flex: 1,
  alignItems: "flex-end"
},
initStyle: {
  borderRadius: 3,
  width: 100,
  height: 80, 
}, 
});