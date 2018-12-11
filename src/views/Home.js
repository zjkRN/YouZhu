'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Dimensions
} from 'react-native';

import Swiper from 'react-native-swiper';

const { width, height } = Dimensions.get('window');

class Home extends Component {
	static navigationOptions =  {
	  title:'首页',
	};
  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.banner}>
        	<Swiper 
            dot={<View style={styles.slideDot} />}
            activeDot={<View style={[styles.slideDot,{backgroundColor:'blue'}]} />}
            paginationStyle={{bottom:10, left: null, right: 10}}
            autoplay loop>
            <View style={styles.slide}>
              <Text>{width}</Text>
            </View>
            <View style={[styles.slide, { backgroundColor:'#ccc'}]}>
              <Text>slider 2</Text>
            </View>
            <View style={[styles.slide, { backgroundColor:'red'}]}>
              <Text>slider 3</Text>
            </View>
          </Swiper>
        </View>
        <View style={styles.notice}>
          <Text>公告</Text><Text>公告公告公告公告公告公告公告公告</Text>
        </View>
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
    zIndex:1,
  },
  slide:{
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
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
  notice:{
    height:50,
    backgroundColor:'#fff',
    paddingVertical:5,
    paddingHorizontal:25,
    shadowColor:'rgba(0, 0, 0, 0.05)',
    shadowOffset:{ width: 0, height: 2 },
    shadowOpacity:0.05,
    elevation:4,
    zIndex:0
  },
  hot:{
    height:60,
  },
});


export default Home;