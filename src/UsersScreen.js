import React, {useState} from 'react';
import { RefreshControl, SafeAreaView, Dimensions, ActivityIndicator, FlatList, View, Image, TouchableOpacity, StyleSheet, Text, ListView, AppRegistry } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { ListItem, Header, Avatar, SearchBar } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import { Axios } from 'react-native-axios';
import {connect} from 'react-redux';
import {getUsers} from '../redux/actions/user';
const {width, height} = Dimensions.get("window");
import { imgurl } from './helper/index'; 

const UserListItem=({ item, props })=>{ 
  return(
     <View style = {styles.listItemContainer}>
              <View style= {styles.iconContainer}>
                <Image source={{uri:imgurl(item.image)}} style={styles.initStyle} resizeMode='contain' />
              </View>
              <View style = {styles.callerDetailsContainer}>
                <View style={styles.callerDetailsContainerWrap}>
                  <View style={styles.nameContainer}>
                    <Text>{item.name}</Text>
                  </View>
                  <View style={styles.callIconContainer}>
                    <Menu>
                      <MenuTrigger style={styles.menuTrigger} >
                        <Icon name="more-horiz" color='green' size={23} style={{padding:5}}/>
                      </MenuTrigger>
                      <MenuOptions style={{padding:10, flexDirection:'column', justifyContent:'space-around'}}>
                        <MenuOption onSelect={() => props.navigation.navigate('ProfileScreen', {item})} style={{flexDirection:'row'}}>
                          <Icon name="account-box" color='green' size={23}/><Text>detail</Text>
                        </MenuOption> 
                      </MenuOptions>
                    </Menu>
                  </View>
                </View>
              </View> 
            </View>
           
  )
}

function UsersScreen(props) { 
  const [user, setUser] = useState(props.user.usersData.result);
  const [isFulfilled, setIsFulfilled] = useState(props.user.isFulfilled);
  const [isRejected, setIsRejected] = useState(props.user.isRejected);
  const [refreshing, setRefreshing] = React.useState(false);

    const _handleRefresh = async() => { 
      await props.dispatch(getUsers());
    };
  
    const _headerComponent = () =>{
        return(
        <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-between', paddingHorizontal:10, paddingVertical:10}}>
          {!isFulfilled ? (
              <View>
                <ActivityIndicator size='small' color='orange' />
              </View>
            ):null}
        </View>
        );
    }

    const _keyExtractor = (item, index) => index.toString();
    const handleSearch = ()=>{
      console.log(txtuser);
    }
    const [search, setSearch] = useState(false);
    const [txtuser, setTxtuser] = useState();
    const {navigate} = props.navigation;

    const onRefresh = React.useCallback(async()=>{
      await setRefreshing(isRejected);
      await props.dispatch(getUsers());
  
      // wait(2000).then(()=> setRefreshing(false));
    },  [refreshing]);

    return(
      <>
      <View style={styles.mainContainer}>
          <View style={styles.headerContainer}>
            {search === true ? (
              <>
                <View style={styles.leftHeaderContainer}>
                  <TouchableOpacity  onPress={() => setSearch(!search)}>
                    <Icon name="arrow-back" color='#fff' size={23} style={{paddingLeft:10}} />
                  </TouchableOpacity>
                </View>
                <SearchBar 
                  lightTheme={true} 
                  containerStyle={{
                    backgroundColor: 'transparent',
                    justifyContent: 'space-around',
                    width:width*90/100,   
                  }}
                  placeholder="cari user ..."
                  onChangeText={handleSearch}  
                  value={txtuser}
                />
              </>
          ):(
           <>
            <View style={styles.leftHeaderContainer}>
              <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <Icon name="arrow-back" color='#fff' size={23} style={{paddingLeft:10}} />
              </TouchableOpacity>
              <Text style={styles.logoText}>Users</Text>
            </View> 
            <View style={styles.rightHeaderContainer}>
              <TouchableOpacity onPress={() => setSearch(!search)} >
                  <Icon name="search" color='#fff' size={23} style={{padding:5}} />
              </TouchableOpacity>
              <Menu>
                <MenuTrigger style={styles.menuTrigger} >
                  <Icon name="more-vert" color='#fff' size={23} style={{padding:5}}/>
                </MenuTrigger>
                <MenuOptions style={{padding:10, flexDirection:'column', justifyContent:'space-around'}}>
                  <MenuOption onSelect={() => alert(`Delete`)} style={{flexDirection:'row'}}>
                    <Icon name="add" color='green' size={23}/><Text>Add User</Text>
                  </MenuOption>
                  <MenuOption onSelect={() => navigate('SecondScreen')} style={{flexDirection:'row'}}>
                    <Icon name="multiline-chart" size={23}/><Text>Progress Chart</Text>
                  </MenuOption>
                  <MenuOption onSelect={() => navigate('SecondScreen')} style={{flexDirection:'row'}}>
                    <Icon name="home" size={23}/><Text>Home</Text>
                  </MenuOption>
                </MenuOptions>
              </Menu>
            </View>
            </>
          )}
         </View>
       <View style={styles.contentContainer}>
       { isRejected === true ? (
            <SaveAreaView style={styles.container}>
              <ScrollView contentContainerStyle={styles.scrollView} refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }> 
              <View style={{alignItems:'center', justifyContent:'center', }}>
                <Text style={{color:'grey', paddingTop:15}}>Request failed with status code {props.user.ajaxError.status}</Text>
                <Text style={{color:'grey', paddingBottom:15}}>Pull down to see refreshControl indicator</Text>
              </View>
              </ScrollView>
            </SaveAreaView>
          )
          : (
          <FlatList 
            style={{flex:0.5}} 
            ListHeaderComponent={_headerComponent}
            stickyHeaderIndices={[0]} 
            data={user}
            keyExtractor={_keyExtractor}
            renderItem={({ item }) => (
              <UserListItem item={item} props={props}/> 
            )} 
            initialNumToRender={10}
            // ListFooterComponent={_renderFooter}
            onRefresh={_handleRefresh}
            refreshing={refreshing}
            // ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          )
        }
        </View>
      </View>
      </>
    )
}

const mapStateToProps =(state)=>{
    const { user, product, checkout } = state
    return{
      user
    }
  } 

export default connect(mapStateToProps)(UsersScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  mainContainer: {
     flex: 1,
     backgroundColor: '#FFF',
     height: 24
  },
  headerContainer: {
     flex: 1,
     flexDirection: "row",
     justifyContent: "space-between",
     backgroundColor: "#f44336",
     alignItems:"center",
     paddingRight: 5
  },
  leftHeaderContainer: {
     alignItems: "flex-start",
     flexDirection: "row"
  },
  rightHeaderContainer: {
     alignItems: "flex-end",
     flexDirection: "row"
  },
  contentContainer: {
     flex: 6,
  },
  logoText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    alignItems: "flex-start",
    marginLeft: 10
  },
  listItemContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 10
  },
  iconContainer: {
    flex: 1,
    alignItems: "flex-start"
  },
  callerDetailsContainer: {
    flex: 4,
    justifyContent: "center",
    borderBottomColor: "rgba(92,94,94,0.5)",
    borderBottomWidth: 0.5 //0.25
  },
  callerDetailsContainerWrap: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row"
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
    borderRadius: 30,
    width: 60,
    height: 60
  },
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5
  },
  ratingImage: {
    height: 19.21,
    width: 100
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey'
  }
 });
  