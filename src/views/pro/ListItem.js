'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {
  StyleSheet,
  View,
  Image,
  Text,
  DeviceEventEmitter,
} from 'react-native';

import { colors } from '../common.style';
import EventTypes from '../../config/eventTypes';


class ListItem extends Component {
	static propTypes = {
		item: PropTypes.object.isRequired,
		buttons: PropTypes.array.isRequired,
	};

	constructor(props) {
	  super(props);
	  this.state = {
	  	btnConf:{
	  		star: { label:'收藏', icon:'staro', color:'#333', handle: 'onStar'},
	  		wechat: { label:'微信好友', icon:'wechat', color:'#1AAD19', handle:'onShareFriend' },
	  		moment: { label:'朋友圈', icon:'sharealt', color:'#333', handle:'onShareMoment' },
	  		copy: { label:'复制', icon:'copy1', color:'#333', handle:'onCopy' },
	  		edit: { label:'编辑', icon:'edit', color:'#333', handle: 'onEdit'},
	  		delete: { label:'删除', icon:'delete', color:'#333', handle: 'onDelete'},
	  	}
	  };
	}

  render() {
  	const { btnConf } = this.state;
  	const { item, buttons } = this.props;
    return (
      <View style={styles.listItem}>
  			<Image
  				style={styles.itemImg}
  				source={{uri:item.image.uri}}
  			/>
  			<View style={styles.itemContent}>
  				<View style={{flex:1}}>
	  				<Text style={styles.itemTitle}>{item.title}</Text>
	  				<Text style={styles.itemDesc}>出发地：{item.from}     目的地：{item.to}</Text>
	  				<Text style={styles.itemDesc}>时间：{item.stime}</Text>
	  			</View>
	  			<View style={{flexDirection:'row'}}>
	  				{	buttons.map((btnKey, btnIndex) => {
	  					let btn = btnConf[btnKey];
	  					return (
		  					<View style={{flex:1}} key={btnKey}>
			  					<AntDesign.Button 
				  					name={(btnKey === 'star' && item.isStar) ? 'star' : btn.icon} 
				  					size={20} 
				  					iconStyle={{marginRight:5}}
				  					color={(btnKey === 'star' && item.isStar) ? colors.yellow : btn.color}
				  					onPress={() => this[btn.handle](item)}
				  					underlayColor="transparent"
			              backgroundColor="transparent"/>
			  				</View>
		  				)
	  				}
	  			)}
	  			</View>
  			</View>
  		</View>
    );
  }

  onStar(item){
  	item.isStar = !item.isStar;
  	DeviceEventEmitter.emit(EventTypes.EVENT_STAR, item);
  }

  onShareFriend(item){
  	alert('onShareFriend')
  }

  onShareMoment(item){
  	alert('onShareMoment')
  }
  
  onCopy(item){
  	this.props.navigation.navigate('PlanDetail', { item: item });
  }

  onEdit(item){
  	this.props.navigation.navigate('PlanDetail', { item: item });
  }

  onDelete(item){
  	
  }
}

const styles = StyleSheet.create({
	listItem:{
		backgroundColor:'#fff',
		flexDirection:'row',
		paddingHorizontal:15,
		paddingVertical:10,
		marginBottom:10,
	},
	itemImg:{
		width:110,
		height:150,
		borderRadius:6,
	},
	itemContent:{
		flex:1,
		paddingLeft:20,
	},
	itemTitle:{
		fontWeight:'bold', 
		fontSize:16, 
		lineHeight:25
	},
	itemDesc:{
		fontSize:12,
		lineHeight:25, 
		color: colors.gray
	}
});


export default ListItem;