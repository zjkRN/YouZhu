'use strict';

import React, { Component } from 'react';
import Carousel, { getInputRangeFromIndexes, Pagination } from 'react-native-snap-carousel';

import {
  StyleSheet,
  View,
  Dimensions,
  Text,
} from 'react-native';
const { width, height } = Dimensions.get('window');

class Guide extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	activeSlide:0,
	  	data:[
	  		{id:1,name:'name1', bgColor:'red'}, 
	  		{id:2, name:'name2', bgColor:'blue'},
	  		{id:3, name:'name3', bgColor:'gray'},
	  		{id:4, name:'name4', bgColor:'#f2f2f2'},
	  		{id:5, name:'name5', bgColor:'#e3e3e3'},
	  		{id:6, name:'name6', bgColor:'orange'},
	  		{id:7, name:'name7', bgColor:'yellow'},
	  		{id:8, name:'name8', bgColor:'#ccc'},
	  	]
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
    const { data, activeSlide } = this.state;
    return (
    	<View style={{flex:1}}>
	      <Carousel
	        ref={(c) => { this._carousel = c; }}
	        data={this.state.data}
	        renderItem={this._renderItem}
	        sliderWidth={width}
	        itemWidth={width}
	        slideStyle={{ width: width }}
	        inactiveSlideOpacity={1}
	        inactiveSlideScale={1}
	        onSnapToItem={(index) => this.setState({ activeSlide: index }) }
	      />
      	<Pagination
          dotsLength={data.length}
          activeDotIndex={activeSlide}
          containerStyle={styles.paginationContainer}
          dotColor={'rgba(255, 255, 255, 0.92)'}
          dotStyle={styles.paginationDot}
          inactiveDotColor='#1a1917'
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          carouselRef={this._carousel}
          tappableDots={!!this._carousel}
        />
      </View>
 		); 
	}
}

const styles = StyleSheet.create({
	slide:{
		flex:1,
		justifyContent: 'center',
		alignItems:'center',
	},
	paginationContainer: {
      paddingBottom: 50,
      marginTop:-108,
  },
  paginationDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginHorizontal: 8
  }
});


export default Guide;