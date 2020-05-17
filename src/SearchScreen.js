import React from 'react';
import { Dimensions, ActivityIndicator, FlatList, View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import { SearchBar } from 'react-native-elements';
const {width, height} = Dimensions.get("window");
import Axios from "react-native-axios";
import { REACT_APP_URL_STRING } from 'react-native-dotenv';
import { connect } from "react-redux";
import RenderProducts from './secondscreen/ItemRoute/RenderProducts';
import {wait} from './helper/index';

function SearchScreen(props) {   
  
    const [refreshing, setRefreshing] = React.useState(false);
    const [result, setResult] = React.useState([]);
    const [itemname, setItemname] = React.useState('');
    let [loadig, setLoading] = React.useState(false);
    let [product, setProduct] = React.useState();

    const _headerComponent = () =>{
        return(
        <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-between', paddingHorizontal:10, paddingVertical:10}}>
          {loadig ? (
              <View>
                <ActivityIndicator size='small' color='grey' />
              </View>
            ):null}
        </View>
        );
    }

    const _keyExtractor = (item, index) => index.toString();

    const cari = async val =>{ 
        if (val !== '') {
            await setLoading(true);
            const res = await Axios.post(`${REACT_APP_URL_STRING}search?name=${val}`);
            let result = await res.data.result;
            await setProduct(result);
            await setLoading(false);
        }
    }

    const handleSearch = async(text)=>{ 
      await setItemname(text);
      await cari(itemname); 
    } 

    const {navigate} = props.navigation;

    const _handleRefresh = React.useCallback(async()=>{
      await setRefreshing(true);
      await cari(itemname); 
      wait(2000).then(()=> setRefreshing(false));
    },  [refreshing]);

    return(
      <>
      <View style={styles.mainContainer}>
          <View style={styles.headerContainer}> 
                <View style={styles.leftHeaderContainer}>
                  <TouchableOpacity  onPress={() => props.navigation.goBack()}>
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
                  placeholder="Cari nama item"
                  onChangeText={(text)=>{
                    handleSearch(text);
                  }}  
                  value={itemname}
                /> 
         </View>
       <View style={styles.contentContainer}>
          <FlatList 
            style={{flex:0.5}} 
            ListHeaderComponent={_headerComponent}
            stickyHeaderIndices={[0]} 
            data={product}
            keyExtractor={_keyExtractor}
            renderItem={({ item, index }) => (
              <RenderProducts item={item} props={props} {...props}/>
            )} 
            initialNumToRender={10} 
            onRefresh={_handleRefresh}
            refreshing={refreshing} 
            />  
        </View>
      </View>
      </>
    )
}
 
const mapStateToProps =(state)=>{
  // const { user, product, checkout } = state
  return{
    user: state.user, 
    product: state.product, 
    checkout: state.checkout,
  }
}
 
export default connect(mapStateToProps)(SearchScreen);

// export default CobaScreen;

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
  