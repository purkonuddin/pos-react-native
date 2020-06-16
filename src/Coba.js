import React, {Component} from 'react';
/*redux */
import { connect } from 'react-redux';
/*Components*/
import {Animated, View, StatusBar, Text, Image, Platform, Linking, TouchableOpacity} from 'react-native';
import MaterialAnimatedView from './component/MaterialAnimation';
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
/*utils*/
import styles from './style';
import {ThemeUtils, Color} from './utils';
import { imgurl } from './helper/index';   
/*Data*/
import coverImage from './assets/images/food-and-restaurant.png';
import profileImage from './assets/images/food-and-restaurant.png';

const ARTIST_NAME = 'Bob Marley';

class CobaScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        scrollY: new Animated.Value(0),
        products:this.props.product.pagingProduct.data
    };
  }

  //artist profile image position from left
  _getImageLeftPosition = () => {
    const {scrollY} = this.state;

    return scrollY.interpolate({
        inputRange: [0, 80, 140],
        outputRange: [ThemeUtils.relativeWidth(30), ThemeUtils.relativeWidth(38), ThemeUtils.relativeWidth(10)],
        extrapolate: 'clamp',
        // useNativeDriver: true
    });
  };

  //artist profile image position from top
  _getImageTopPosition = () => {
      const {scrollY} = this.state;

      return scrollY.interpolate({
          inputRange: [0, 140],
          outputRange: [ThemeUtils.relativeHeight(20), Platform.OS === 'ios' ? 8 : 10],
          extrapolate: 'clamp',
          // useNativeDriver: true
      });
  };

  //artist profile image width
  _getImageWidth = () => {
    const {scrollY} = this.state;

    return scrollY.interpolate({
        inputRange: [0, 140],
        outputRange: [ThemeUtils.relativeWidth(40), ThemeUtils.APPBAR_HEIGHT - 20],
        extrapolate: 'clamp',
        // useNativeDriver: true
    });
  };

  //artist profile image height
  _getImageHeight = () => {
    const {scrollY} = this.state;

    return scrollY.interpolate({
        inputRange: [0, 140],
        outputRange: [ThemeUtils.relativeWidth(40), ThemeUtils.APPBAR_HEIGHT - 20],
        extrapolate: 'clamp',
        // useNativeDriver: true
    });
  };

  renderArtistCard=(index, item)=>{
    return (
      <MaterialAnimatedView key={index.toString()} index={index}>
          <TouchableOpacity activeOpacity={0.8} style={styles.artistCardContainerStyle}
                            onPress={() => this.openLink(imgurl(item.image))}>
              <Image source={{uri: imgurl(item.image)}} style={styles.artistImage}/>
              <View style={styles.cardTextContainer}>
                  <Text numberOfLines={1} style={styles.songTitleStyle}>{item.name}</Text>
                  <Text numberOfLines={1}>{item.description}</Text>
              </View>
          </TouchableOpacity>
      </MaterialAnimatedView>
    )
  }

  openLink=(url)=>{
    Linking.canOpenURL(url)
    .then((supported) => {
        if (!supported) {
            console.log("Can't handle url: " + url);
        } else {
            return Linking.openURL(url);
        }
    })
    .catch((err) => console.error('An error occurred', err));
  }

  //For header image opacity
  _getHeaderImageOpacity = () => {
    const {scrollY} = this.state;

    return scrollY.interpolate({
        inputRange: [0, 140],
        outputRange: [1, 0],
        extrapolate: 'clamp',
        // useNativeDriver: true
    });
  };

  //For header background color from transparent to header color
  _getHeaderBackgroundColor = () => {
    const {scrollY} = this.state;

    return scrollY.interpolate({
        inputRange: [0, 140],
        outputRange: ['rgba(0,0,0,0.0)', Color.HEADER_COLOR],
        extrapolate: 'clamp',
        // useNativeDriver: true
    });
  };

  //header title opacity
  _getHeaderTitleOpacity = () => {
    const {scrollY} = this.state;

    return scrollY.interpolate({
        inputRange: [0, 20, 50],
        outputRange: [0, 0.5, 1],
        extrapolate: 'clamp',
        // useNativeDriver: true
    });
  };

  //artist name opacity
  _getNormalTitleOpacity = () => {
    const {scrollY} = this.state;

    return scrollY.interpolate({
        inputRange: [0, 20, 50],
        outputRange: [1, 0.5, 0],
        extrapolate: 'clamp',
        // useNativeDriver: true
    });

  };

  //Song list container position from top
  _getListViewTopPosition = () => {
    const {scrollY} = this.state;

    return scrollY.interpolate({
        inputRange: [0, 250],
        outputRange: [ThemeUtils.relativeWidth(100) - ThemeUtils.APPBAR_HEIGHT - 10, 0],
        extrapolate: 'clamp',
        // useNativeDriver: true
    });
  };

  render() {
    const normalTitleOpacity = this._getNormalTitleOpacity();
    const headerTitleOpacity = this._getHeaderTitleOpacity();
    const headerBackgroundColor = this._getHeaderBackgroundColor();
    const headerImageOpacity = this._getHeaderImageOpacity();
    const profileImageLeft = this._getImageLeftPosition();
    const profileImageTop = this._getImageTopPosition();
    const profileImageWidth = this._getImageWidth();
    const profileImageHeight = this._getImageHeight();
    const listViewTop = this._getListViewTopPosition();
    const {products} = this.state; 
    
    return(
      <Text>{'Coba Animated ...'}</Text>
      /*
      <Animated.View style={styles.container}>
        <StatusBar barStyle={'light-content'} backgroundColor={Color.STATUSBAR_COLOR}/>
          <Animated.Image
            style={[styles.headerImageStyle, {
                opacity: headerImageOpacity,

            }]}
            source={coverImage}
          />

          <Animated.View style={[styles.headerStyle, {
              backgroundColor: headerBackgroundColor,
          }]}>
            <View style={styles.headerLeftIcon}>
              <Icons name={"arrow-left"} size={25} color={Color.HEADER_BACK_ICON_COLOR}/>
            </View>

            <View style={styles.headerRightIcon}>
                <Icons name={"settings"} size={25} color={Color.HEADER_BACK_ICON_COLOR}/>
            </View>

            <Animated.Text
                style={[styles.headerTitle, {
                    opacity: headerTitleOpacity
                }]}>
                {ARTIST_NAME}
            </Animated.Text>
          </Animated.View>

          <Animated.Image
            style={
                [styles.profileImage, {
                borderRadius: (ThemeUtils.APPBAR_HEIGHT - 20) / 2,
                height: profileImageHeight,
                width: profileImageWidth,
                transform: [
                       {translateY: profileImageTop},
                       {translateX: profileImageLeft}
                    ]
                }]}
                source={profileImage}
          />

          <Animated.ScrollView
            overScrollMode={'never'}
            style={{zIndex: 10}}
            scrollEventThrottle={16}
            onScroll={Animated.event(
                [
                    {
                        nativeEvent: {contentOffset: {y: this.state.scrollY}}
                    }
                ],
                {useNativeDriver:true}
            )}>
          
            <Animated.Text style={[
              styles.profileTitle, {
                opacity: normalTitleOpacity,
              }
            ]}
            >
              {ARTIST_NAME}
            </Animated.Text>

            <Animated.Text style={[
              styles.songCountStyle, {
                opacity: normalTitleOpacity,
              }
            ]}>
              {`♬ ${products.length} songs`}
            </Animated.Text>

            <Animated.ScrollView style={{
              transform: [{
                translateY: listViewTop
              }],
            }}> 
              {products.map((item, index) => this.renderArtistCard(index, item))}
            </Animated.ScrollView>

          </Animated.ScrollView>
      </Animated.View>
      */
    );
  }
}

const mapStateToProps =(state)=>{
  const { user, product, checkout } = state
  return{ 
    product, user, checkout
  }
}
 
export default connect(mapStateToProps)(CobaScreen);