'use strict';

import React, { PureComponent } from 'react';
import Carousel, { getInputRangeFromIndexes } from 'react-native-snap-carousel';
// import { scrollInterpolators, animatedStyles } from 'example/src/utils/animations';


import {
  StyleSheet,
  View,
  Dimensions,
  Text,
} from 'react-native';
const { width, height } = Dimensions.get('window');

class CarouselPage extends PureComponent {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	data:[{id:1,name:'name1', bgColor:'#333'}, {id:2, name:'name2', bgColor:'#d8d8d8'}]
	  };
	}

  _scrollInterpolator (index, carouselProps) {
        const range = [3, 2, 1, 0, -1];
        const inputRange = getInputRangeFromIndexes(range, index, carouselProps);
        const outputRange = range;

        return { inputRange, outputRange };
    }

    _animatedStyles (index, animatedValue, carouselProps) {
        const sizeRef = carouselProps.vertical ? carouselProps.itemHeight : carouselProps.itemWidth;
        const translateProp = carouselProps.vertical ? 'translateY' : 'translateX';

        return {
            zIndex: carouselProps.data.length - index,
            opacity: animatedValue.interpolate({
                inputRange: [2, 3],
                outputRange: [1, 0]
            }),
            transform: [{
                rotate: animatedValue.interpolate({
                    inputRange: [-1, 0, 1, 2, 3],
                    outputRange: ['-25deg', '0deg', '-3deg', '1.8deg', '0deg'],
                    extrapolate: 'clamp'
                })
            }, {
                [translateProp]: animatedValue.interpolate({
                    inputRange: [-1, 0, 1, 2, 3],
                    outputRange: [
                        -sizeRef * 0.5,
                        0,
                        -sizeRef, // centered
                        -sizeRef * 2, // centered
                        -sizeRef * 3 // centered
                    ],
                    extrapolate: 'clamp'
                })
            }]
        };
    }

	  _renderItem ({item, index}) {
	    return (
	      <View style={[styles.slide, {backgroundColor:item.bgColor}]}>
	          <Text style={styles.title}>{ item.name }</Text>
	      </View>
	  );
	  }

	  render () {
	    return (
	      <Carousel
	        ref={(c) => { this._carousel = c; }}
	        data={this.state.data}
	        renderItem={this._renderItem}
	        sliderWidth={width}
	        itemWidth={width}
            // scrollInterpolator={scrollInterpolators[`scrollInterpolator1`]}
            // slideInterpolatedStyle={animatedStyles[`animatedStyles1`]}
            useScrollView={true}
	      />
	 ); 
	}
}

const styles = StyleSheet.create({
	slide:{
		flex:1,
		justifyContent: 'center',
		alignItems:'center',
	}
});


export default CarouselPage;