'use strict';

import React, { Component } from 'react';
import Carousel, { getInputRangeFromIndexes, Pagination } from 'react-native-snap-carousel';
import SplashScreen from 'rn-splash-screen';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
const { width, height } = Dimensions.get('window');

class Guide extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	slideIndex:0,
	  	slideList:[
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
    const { slideList, slideIndex } = this.state;
    return (
    	<View style={{flex:1}}>
	      <Carousel
	        ref={(c) => { this._carousel = c; }}
	        data={slideList}
	        renderItem={this._renderItem}
	        sliderWidth={width}
	        itemWidth={width}
	        slideStyle={{ width: width }}
	        inactiveSlideOpacity={1}
	        inactiveSlideScale={1}
	        onSnapToItem={(index) => this.setState({slideIndex: index}) }
	      />
      	<Pagination
          dotsLength={slideList.length}
          activeDotIndex={slideIndex}
          containerStyle={styles.paginationContainer}
          dotColor={'rgba(255, 255, 255, 0.92)'}
          dotStyle={styles.paginationDot}
          inactiveDotColor='#1a1917'
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          carouselRef={this._carousel}
          tappableDots={!!this._carousel}
        />
        {	(slideIndex === (slideList.length -1)) ? 
        		<TouchableOpacity
		        	activeOpacity={1} 
		          onPress={() => this._onStartClick()}
		        	style={styles.btnStart}>
		        	<Text style={styles.start}>马上开启</Text>
		        </TouchableOpacity>
        : false }
        
      </View>
 		); 
	}

	componentWillMount(){
    AsyncStorage.getItem('isFirst').then(flag => {
      if(!flag){ // flag
        AsyncStorage.setItem('isFirst', 'false');
        return;
      }
      // 非首次打开, 直接跳转首页
      this.props.navigation.replace('BottomTab');
    });
	}


	_onStartClick(){
		this.props.navigation.replace('BottomTab');
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
  },
  btnStart:{
  	position:'absolute',
  	bottom: 100,
  	width:150,
  	left: (width-150)/2,
  	backgroundColor:'gray',
  	borderRadius: 8,
  	padding: 10,
  },
  start:{
  	fontSize:16,
  	color:'#fff',
  	lineHeight: 25,
  	textAlign:'center',
  }
});


export default Guide;