'use strict';

import React, { Component } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Carousel, { Pagination, ParallaxImage } from 'react-native-snap-carousel';
import Toast from 'react-native-root-toast';

import {
  StyleSheet,
  View,ScrollView,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
  StatusBar,
  BackHandler,
} from 'react-native';

import commonStyles, { colors } from '../common.style';
// import {Loading} from '../../components/Loading';
import HttpRequest from '../../utils/httpRequest';


const { width:screenW, height: screenH } = Dimensions.get('window');
const bannerH = screenW*35/75;

const hotShadowX = 35;
const hotWidth = screenW - 70; // box 水平margin + 20 间隔
const hotHeight = hotWidth * 1.5;  

const borderRadius = 8;
const IS_IOS = Platform.OS === 'ios';

class Index extends Component {
	static navigationOptions =  {
	  title:'首页',
	};
  constructor(props) {
    super(props);
  
    this.state = {
      banners:[
        {id:1, name:'banner1', image_url:'https://i.imgur.com/MABUbpDl.jpg', link:'http://www.58.com'}, 
      ],
      bannerIndex: 0,
      messages:[
        {id:1, content:'公告1'}, 
      ],
      hotProducts:[
        {id:1, title:'product title 1', image:{width:100, height:300, uri:'https://i.imgur.com/UYiroysl.jpg'}},
      ],
      hotIndex:0,
      buttonItems:[
        { id:1, label:'收藏', icon:'staro', color:colors.white, handle: 'onStar'},
        { id:2, label:'微信好友', icon:'wechat', color:colors.white, handle:'onShareFriend' },
        { id:3, label:'朋友圈', icon:'sharealt', color:colors.white, handle:'onShareMoment' },
        { id:4, label:'复制', icon:'copy1', color:colors.white, handle: 'onCopy'},
      ]
    };
  }
  render() {
    const { banners, bannerIndex, messages, hotProducts, hotIndex} = this.state;
    const { navigation } = this.props;
    return (
      <ScrollView style={styles.wrapper}>
        <StatusBar 
          barStyle={'light-content'} 
          backgroundColor={colors.black}/>
        <View style={styles.banner}>
          <Carousel
            ref={(c) => this._bannerCarousel = c }
            data={banners}
            renderItem={this._renderBanner}
            sliderWidth={screenW}
            itemWidth={screenW}
            autoplay={true}
            loop={true}
            inactiveSlideOpacity={1}
            inactiveSlideScale={1}
            onSnapToItem={(index) => this.setState({ bannerIndex: index }) }
          />
          <Pagination
            dotsLength={banners.length}
            activeDotIndex={bannerIndex}
            containerStyle={styles.paginationContainer}
            dotColor={'rgba(255, 255, 255, 0.92)'}
            dotStyle={styles.paginationDot}
            inactiveDotColor={colors.black}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            carouselRef={this._bannerCarousel}
            tappableDots={!!this._bannerCarousel}
          />
        </View>

        <View style={[styles.box, {flexDirection:'row', height:45}]}>
          <Carousel
            ref={(c) => this._msgCarousel = c }
            data={messages}
            renderItem={this._renderMsg}
            sliderWidth={screenW - 30}
            sliderHeight={44}
            itemHeight={44}
            itemWidth={screenW - 30}
            vertical={true}
            activeSlideOffset={0}
            autoplay={true}
            loop={true}
            autoplayDelay={500}
            autoplayInterval={3000}
          />
          <AntDesign 
            style={styles.icon} 
            name="right" 
            onPress={() => navigation.navigate('Message')}
            color={colors.gray} />
        </View>

        <View style={styles.box}>
          <View style={styles.boxHeader}>
            <Text style={styles.boxTitle}>热门推荐</Text>
            <TouchableOpacity
              activeOpacity={1}
              onPress={()=> this.props.navigation.navigate('ProList')}>
              <Text style={styles.more}>
                更多<AntDesign name='right'  />
              </Text>
            </TouchableOpacity>
          </View>
          <Carousel
            ref={c => this._hostRef = c}
            data={hotProducts}
            renderItem={this._renderHotItem}
            sliderWidth={hotWidth}
            itemWidth={hotWidth}
            hasParallaxImages={true}
            firstItem={1}
            inactiveSlideScale={0.94}
            inactiveSlideOpacity={0.7}
            inactiveSlideShift={20} 
            containerCustomStyle={styles.hotSlider}
            contentContainerCustomStyle={styles.hostSliderContent}
            loop={true}
            loopClonesPerSide={2}
            autoplay={false}
            onSnapToItem={(index) => this.setState({ hotIndex: index }) }
          />
          
        </View>

        <View style={[styles.box, {display:'none'}]}>
          <Text style={styles.boxTitle}>热门推荐</Text>
          <View style={styles.boxContent}>
            <View style={styles.boxItem}>
              <Text>item1 </Text>
            </View>
            <View style={styles.boxItem}>
              <Text>item1 </Text>
            </View>
            <View style={styles.boxItem}>
              <Text>item3 </Text>
            </View>
            <View style={styles.boxItem}>
              <Text>item4 </Text>
            </View>
          </View>
        </View>

      </ScrollView>
    );
  }

  _renderBanner = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={{flex:1}}
        onPress={() => this._onBannerClick(item)}>
          <Image 
          source={{uri:item.image_url}} 
          style={{flex:1}} 
          resizeMode='contain' />
      </TouchableOpacity>
    );
  }

  _renderMsg = ({item, index}) => {
    return (
      <View style={{flexDirection:'row'}} key={`entry-${index}`} numberOfLines={1}>
        <AntDesign style={styles.icon} name="sound"/>
        <Text style={styles.message}>{item.content}</Text>
      </View>
    );
  }

  _renderHotItem = ({item, index}, parallaxProps) => {
    return (
      <TouchableOpacity
        activeOpacity={1} 
        style={styles.itemContainer}
        onPress={() => { alert('Slider Item Clicked');}}
      >
        <View style={styles.hotShadow} />
        <View style={styles.imageContainer}>
          { IS_IOS ? (
            <ParallaxImage
              source={{ uri: item.image.uri }}
              containerStyle={styles.imageContainer}
              style={styles.image}
              parallaxFactor={0.35}
              showSpinner={true} // 显示图片loading图案
              spinnerColor='rgba(0, 0, 0, 0.25)'
              {...parallaxProps}
            /> 
          ) :(
            <Image
              source={{ uri: item.image.uri }}
              style={styles.image}
            />
          )}
          <View style={styles.hotDescContainer}>
            <Text style={styles.hotDesc} numberOfLines={2}>{item.content}</Text>
            <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
            { this.state.buttonItems.map((btn, btnIndex) => (
                <AntDesign.Button 
                  key={btn.id}
                  name={ btn.icon} 
                  size={20} 
                  style={{paddingVertical:2}}
                  color={ btn.color}
                  onPress={() => this[btn.handle](item)}
                  underlayColor="transparent"
                  backgroundColor="transparent"/>
            ))}
            </View>
          </View>
        </View>
        
      </TouchableOpacity>
    );
  }

  _onBannerClick = (banner) => {
    if(!banner.link){
      return;
    }
    this.props.navigation.navigate('AdPage',{ url: banner.link });
  }

  componentDidMount(){
    this.loadData();
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);

  }

  componentWillUnmount(){
    this.backHandler.remove();
  }

  onBackAndroid = () => {
    const { navigation } = this.props;

    if(this.props.navigation.isFocused()) {
      if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) { 
        //最近2秒内按过back键，可以退出应用。
        return false; 
       } 
       this.lastBackPressed = Date.now(); 
       Toast.show('再按一次退出应用'); 
       return true;   
    }
  }

  loadData(){
    HttpRequest.get('/home').then(res => {
      if(res.code !== 'SUCCESS'){
        return;
      }
      this.setState({
        banners:res.data.banners,
        messages:res.data.messages,
        hotProducts:res.data.products
      });
    });
  }
}



const styles = StyleSheet.create({
  wrapper:{
    flex: 1,
  },
  banner:{
    height: bannerH,
    backgroundColor:colors.lightGray,
  },
  slide:{
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  paginationContainer: {
    paddingTop:0,
    paddingBottom:8,
    marginTop:-16,
  },
  paginationDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginHorizontal: 8
  },
  box:{
    backgroundColor:colors.white,
    paddingVertical:10,
    paddingHorizontal:25,
    marginBottom:15,
    overflow:'hidden',
  },
  more:{
    color: colors.gray,
    paddingLeft:30,
    fontSize:12,
  },
  boxHeader:{
    flexDirection:'row',
    height:25,
    alignItems:'center',
  },
  boxTitle:{
    flex:1,
    fontSize:16,
    color:colors.black,
    fontWeight: 'bold',
  },
  // boxContent:{
  //   flexDirection:'row',
  //   flexWrap:'wrap',
  //   justifyContent:'space-between',
  // },
  // boxItem:{
  //   backgroundColor:'#ea6f5a',
  //   width: screenW/2-35,
  //   height:50,
  //   marginVertical:10,
  //   justifyContent:'center',
  //   alignItems:'center',
  //   borderRadius:10,
  // },
  icon:{
    fontSize:14,
    lineHeight:25,
  },
  message:{
    flex:1,
    fontSize:14,
    lineHeight:25,
    marginHorizontal:10,
  },
  hotSlider: {
    marginTop: 15,
    overflow: 'visible',
  },
  hostSliderContent:{
    marginLeft:10, 
  },
  itemContainer:{
    width: hotWidth,
    height: hotHeight,
    paddingHorizontal:10, // 设置slider item 相对 item的位置 决定前后再张图展示展示多少
    paddingBottom:18,
  },
  hotShadow:{ // 设置slider 的投影 ios有效：通过在图片下面添加一个色块，给色块加shadow 实现
    position: 'absolute',
    top: 0,
    left: hotShadowX,
    right: hotShadowX,
    bottom: 20,
    borderRadius: borderRadius,
    backgroundColor:colors.lightGray,
    shadowColor: colors.black,
    shadowOpacity: 0.85,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
  },
  hotDescContainer:{
    position:'absolute',
    bottom:0,
    left:0,
    right:0,
    height:75,
    backgroundColor:'rgba(0,0,0,0.5)',
    paddingVertical: 5,
    paddingHorizontal:10
  },
  hotDesc:{
    color: colors.white,
    fontSize:12,
    lineHeight:20,
    height:40,
  },
  imageContainer:{
    flex: 1,
    // backgroundColor:'red',
    overflow:'hidden',
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    borderRadius: IS_IOS ? 0 : borderRadius,
    borderTopLeftRadius: borderRadius, // ios 有效 android无效
    borderTopRightRadius: borderRadius, 
  },
  image:{
    ...StyleSheet.absoluteFillObject, // Android 下显示图片，ios 无效
    resizeMode: 'cover',
    borderRadius:borderRadius, // ios 无效  android有效
  },

});


export default Index;