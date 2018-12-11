'use strict';

import React, { Component } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {
  StyleSheet,
  View,
  Text,
  Dimensions
} from 'react-native';

import Swiper from 'react-native-swiper';

import Carousel from 'react-native-snap-carousel';

const { width, height } = Dimensions.get('window');

class Home extends Component {
	static navigationOptions =  {
	  title:'首页',
	};
  constructor(props) {
    super(props);
  
    this.state = {
      noticeData:[{id:1, name:'公告1'}, {id:2, name:'公告2'}]
    };
  }
  render() {
    const shadowOpt = {
      width:width,
      height:50,
      color:"#ccc",
      border:4,
      radius:0,
      opacity:0.1,
      x:0,
      y:4,
    };
    return (
      <View style={styles.wrapper}>
        <View style={styles.banner}>
        	<Swiper 
            dot={<View style={styles.slideDot} />}
            activeDot={<View style={[styles.slideDot,{backgroundColor:'blue'}]} />}
            paginationStyle={{bottom:10, left: null, right: 10}}
            autoplayTimeout={3}
            autoplay loop>
            <View style={styles.slide}>
              <Text>{width}</Text>
            </View>
            <View style={styles.slide}>
              <Text>slider 2</Text>
            </View>
            <View style={styles.slide}>
              <Text>slider 3</Text>
            </View>
          </Swiper>
        </View>
        <View style={[styles.shadowBox,{height:40}]}>
          <Carousel
            ref={c => {
              this._slider1Ref = c;
            }}
            data={this.state.noticeData}
            renderItem={this._renderItem}
            sliderWidth={width - 30}
            sliderHeight={40}
            itemHeight={40}
            itemWidth={width - 30}
            vertical={true}
            activeSlideOffset={0}
            autoplay={true}
            loop={true}
            autoplayDelay={500}
            autoplayInterval={3000}
          />
          <AntDesign style={styles.icon} name="right" />
        </View>
        <View style={styles.shadowBox}>
          <Text>热门栏目</Text>
        </View>
      </View>
    );
  }

  _renderItem({ item, index }) {
    return (
      <View style={styles.notice} key={`entry-${index}`} numberOfLines={1}>
        <AntDesign style={styles.icon} name="sound"/>
        <Text style={styles.message}>{`银行卡尾号，${item.name}放款元`}</Text>
      </View>
    );
  }

}



const styles = StyleSheet.create({
  wrapper:{
    flex: 1,
  },
  banner:{
    height: width*30/75,
    backgroundColor:"#f9f9f9",
  },
  slide:{
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  slideDot:{
    backgroundColor: 'rgba(0,0,0,.3)', 
    width: 16, 
    height: 4, 
    borderRadius: 2, 
    marginLeft: 3, 
    marginRight: 3, 
    marginTop: 3, 
    marginBottom: 3,
  },
  shadowBox:{
    backgroundColor:'#fff',
    paddingVertical:10,
    paddingHorizontal:25,
    marginBottom:15,
    shadowColor:'#efefef',
    shadowOffset:{ width: 0, height: 5 },
    shadowOpacity:1,
    elevation:2,
    flexDirection:'row',
    overflow:'hidden',
  },
  notice:{
    flexDirection:'row',
  },
  icon:{
    fontSize:18,
    lineHeight:20,
  },
  message:{
    flex:1,
    fontSize:14,
    lineHeight:20,
    marginHorizontal:10,
  },
  hot:{
    height:60,
  },
});


export default Home;