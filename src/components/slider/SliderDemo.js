'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Carousel, { Pagination, ParallaxImage } from 'react-native-snap-carousel';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  Dimensions,
} from 'react-native';

import SwiperItem from './SwiperItem';
import { scrollInterpolators, animatedStyles } from './animations';

const colors = {
	black: '#1a1917',
	gray:'#999',
}
const { width:screenW, height: screenH } = Dimensions.get('window');
const swiperW = screenW - 70;
const swiperH = screenH / 2;

const IS_IOS = Platform.OS === 'ios';
class SliderDemo extends Component {

	constructor(props) {
	  super(props);
	
	  this.state = {
      dataList:[
        {id:1, title:'product title 1', image:{width:100, height:300, uri:'https://i.imgur.com/UYiroysl.jpg'}},
        {id:2, title:'product title 2', image:{width:100, height:300, uri:'https://i.imgur.com/UPrs1EWl.jpg'}},
        {id:3, title:'product title 3', image:{width:100, height:300, uri:'https://i.imgur.com/MABUbpDl.jpg'}},
        {id:4, title:'product title 4', image:{width:100, height:300, uri:'https://i.imgur.com/UYiroysl.jpg'}},
        {id:5, title:'product title 5', image:{width:100, height:300, uri:'https://i.imgur.com/UPrs1EWl.jpg'}},
        {id:6, title:'product title 6', image:{width:100, height:300, uri:'https://i.imgur.com/MABUbpDl.jpg'}},
      ],
      dataIndex:0,
	  };
	}

	defaultSwiper(){
		const {dataList, dataIndex } = this.state;
		return (
				<Carousel
          ref={c => this._carouselRef = c}
          data={dataList}
          renderItem={this._renderItem}
          sliderWidth={swiperW}
          itemWidth={swiperW}
          hasParallaxImages={true}
          firstItem={1}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
          inactiveSlideShift={20} // 前后slider 向下偏移量
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.swiperContentContainer}
          loop={true}
          loopClonesPerSide={2}
          autoplay={true}
          autoplayDelay={500}
          autoplayInterval={3000}
          onSnapToItem={(index) => this.setState({ dataIndex: index }) }
        />
		);
	}

	momentumSwiper(){
    const {dataList, dataIndex } = this.state;
		
		return (
			<Carousel
        data={dataList}
        renderItem={this._renderItem}
        sliderWidth={swiperW}
        itemWidth={swiperW}
        inactiveSlideScale={0.95}
        inactiveSlideOpacity={1}
        containerCustomStyle={styles.slider}
        contentContainerCustomStyle={styles.swiperContentContainer}
        enableMomentum={true}
        activeSlideAlignment={'start'}
        activeAnimationType={'spring'}
        activeAnimationOptions={{
            friction: 4,
            tension: 40
        }}
      />
		);
	}

	customSwiper(index){
    const {dataList, dataIndex } = this.state;
    
    // Do not render examples on Android; because of the zIndex bug, they won't work as is
		return (
			<Carousel
        data={ dataList }
        renderItem={this._renderItem}
        sliderWidth={swiperW}
        itemWidth={swiperW}
        containerCustomStyle={styles.slider}
        contentContainerCustomStyle={styles.sliderContentContainer}
        scrollInterpolator={scrollInterpolators[`scrollInterpolator${index}`]}
        slideInterpolatedStyle={animatedStyles[`animatedStyles${index}`]}
        useScrollView={true}
      />
		);
	}

	layoutSwiper(type){
		const { dataList, dataIndex } = this.state;
		return (
        <Carousel
          data={dataList}
          renderItem={this._renderItem}
          sliderWidth={swiperW}
          itemWidth={swiperW}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          layout={type}
          loop={true}
        />
		);
	}

	_renderItem = ({item, index}, parallaxProps) => {
		return IS_IOS ? (
      <SwiperItem 
      	data={item} 
      	itemWidth={swiperW} 
      	itemHeight={swiperH} 
      	parallax={true} 
      	parallaxProps={parallaxProps}/>
    ) : false;
	}


  render() {
    const swiper = this.defaultSwiper();
    // const swiper = this.momentumSwiper();
    // const swiper = this.layoutSwiper('stack');
    // const swiper = this.layoutSwiper('tinder');
    // const swiper = this.customSwiper(4);//1-4个效果

    return (
    	<View style={styles.slider}>
      { swiper }
      { this.pagination }
      </View>
    );
  }
}

const styles = StyleSheet.create({
	slider: {
    marginTop: 15,
    overflow: 'visible' // for custom animations
  },
  swiperContentContainer:{
  	marginLeft:10, // swiper item 相对 swiper 的位置
  },
});


export default SliderDemo;