'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';

import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Platform,
  TouchableOpacity,
} from 'react-native';

const IS_IOS = Platform.OS === 'ios';
const { width:screenW, height: screenH } = Dimensions.get('window');
const borderRadius = 8;

const colors = {
	black: '#1a1917',
  gray: '#888888',
}

class SliderItem extends Component {

	static propTypes = {
		data: PropTypes.object.isRequired,
		itemWidth: PropTypes.number,
		parallax: PropTypes.bool,
		parallaxProps: PropTypes.object,
	};

	static defaultProps = {
	  itemWidth: screenW,
	  itemHeight: screenH,
	};

	get image(){
		const { data,  parallax, parallaxProps } = this.props;

		return (IS_IOS && parallax) ? (
			<ParallaxImage
        source={{ uri: data.image.uri }}
        containerStyle={styles.imageContainer}
        style={styles.image}
        parallaxFactor={0.35}
        showSpinner={true} // 显示图片loading图案
        spinnerColor='rgba(0, 0, 0, 0.25)'
        {...parallaxProps}
      /> 
		) : (
			<Image
        source={{ uri: data.image.uri }}
        style={styles.image}
      />
		)
	}

  

  render() {
  	const {itemWidth, itemHeight} = this.props;
  	const shadowH = Math.round((screenW - itemWidth) / 2);
    return (
      <TouchableOpacity
      	activeOpacity={1} 
      	style={[styles.itemContainer,{width: itemWidth, height: itemHeight}]}
      	onPress={() => { alert('Slider Item Clicked');}}
      >
      	<View style={[styles.shadow,{left:shadowH, right:shadowH}]} />
      	<View style={styles.imageContainer}>
          { this.image }
      	</View>
      	<View>
      		<Text>Title</Text>
      	</View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
	itemContainer:{
		// width: itemW,
		// height:containerH,
		paddingHorizontal:10, // swiper item 相对 item的位置 决定前后再张图展示展示多少
		// paddingBottom:18,
	},
	shadow:{ // 设置slider 的投影 ios有效：通过在图片下面添加一个色块，给色块加shadow 实现
		position: 'absolute',
    top: 0,
    // left: itemMarginH,
    // right: itemMarginH,
    bottom: 20,
    borderRadius: borderRadius,
    backgroundColor:colors.black,
    shadowColor: colors.black,
    shadowOpacity: 0.85,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
	},
	imageContainer:{
		flex: 1,
		backgroundColor:'red',
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    borderTopLeftRadius: borderRadius, // ios 有效 android无效
    borderTopRightRadius: borderRadius, 
	},
	image:{
		...StyleSheet.absoluteFillObject, // Android 下显示图片，ios 无效
    resizeMode: 'cover',
    borderRadius:borderRadius, // ios 无效  android有效
	},

});


export default SliderItem;