'use strict';

import React, { Component } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  FlatList,
} from 'react-native';

import commonStyles, { colors } from '../common.style';

class List extends Component {
	static navigationOptions =  {
    title:'友助推荐',
  };
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	searchValue:'',
	  	dataItems:[
	  		{id:1, desc:'test desc 1', image:{width:100, height:300, uri:'http://g.hiphotos.baidu.com/image/pic/item/024f78f0f736afc3cf9d3fdebe19ebc4b64512f3.jpg'}},
	  		{id:2, desc:'test desc 2', image:{width:100, height:300, uri:'http://a.hiphotos.baidu.com/image/pic/item/d439b6003af33a87112d6dadcb5c10385243b5c1.jpg'}},
	  		{id:3, desc:'test desc 3', image:{width:100, height:300, uri:'http://d.hiphotos.baidu.com/image/pic/item/2934349b033b5bb512407b473bd3d539b700bcf0.jpg'}},
	  	],
	  	buttonItems:[
	  		{ id:1, label:'收藏', icon:'staro', color:'#333', handle: 'onStar'},
	  		{ id:2, label:'微信好友', icon:'wechat', color:'#1AAD19', handle:'onShareFriend' },
	  		{ id:3, label:'朋友圈', icon:'sharealt', color:'#333', handle:'onShareMoment' },
	  		{ id:4, label:'编辑', icon:'edit', color:'#333', handle: 'onEdit'},
	  	]
	  };
	}

  render() {
    return (
      <View style={commonStyles.container}>
      	<View style={styles.searchBox}>
      		<TextInput
      			style={styles.searchInput}
      			placeholder="请输入探索内容"
      			placeholderTextColor="#ccc"
      			onChangeText={(text)=>{ this.setState({searchValue: text })}}
      			value={this.state.searchValue}/>
      		<View style="styles.btnSearch">
      			<AntDesign.Button 
      				style={{marginLeft:10}} 
      				name="search1" 
      				onPress={()=> this.onSearch()}
      				size={15} 
      				color={colors.gray}
      				underlayColor="transparent"
              backgroundColor="transparent"/>
          </View>
      	</View>
      	<FlatList
          style={styles.list}
          data={this.state.dataItems}
          renderItem={({item, index}) => this.renderItem(item, index)}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }

  renderItem(item, index){
  	return (
  		<View style={styles.listItem}>
  			<Image
  				style={styles.itemImg}
  				source={{uri:item.image.uri}}
  			/>
  			<View style={styles.itemContent}>
  				<View style={{flex:1}}>
	  				<Text style={styles.itemTitle}>标题标题标题</Text>
	  				<Text style={styles.itemDesc}>出发地：北京     目的地：北京</Text>
	  				<Text style={styles.itemDesc}>时间：2018-12-12</Text>
	  			</View>
	  			<View style={{flexDirection:'row'}}>
	  				{	this.state.buttonItems.map((btn, btnIndex) => (
	  					<View style={{flex:1}} key={btn.id}>
		  					<AntDesign.Button 
			  					name={(btn.id === 1 && item.isStar) ? 'star' : btn.icon} 
			  					size={20} 
			  					color={(btn.id === 1 && item.isStar) ? '#fbca04' : btn.color}
			  					onPress={() => this[btn.handle](item)}
			  					underlayColor="transparent"
		              backgroundColor="transparent"/>
		  				</View>
	  				))}
	  			</View>
  			</View>
  		</View>
  	);
  }

  onSearch(){
  	const {searchValue} = this.state;
  	if(!searchValue){
  		return;
  	}

  	alert(this.state.searchValue);
  }

  onStar(item){
  	item.isStar = !item.isStar;
		console.log(item, this.state.dataItems);  	
  	this.setState({dataItems:Object.assign([], this.state.dataItems)});
  }

  onShareFriend(item){
  	alert('onShareFriend')
  }

  onShareMoment(item){
  	alert('onShareMoment')
  }

  onEdit(item){
  	alert('onEdit')
  }
}

const styles = StyleSheet.create({
	searchBox:{
    flexDirection:'row',
    marginHorizontal:15,
    borderColor:'#f0f0f0',
    borderWidth:1,
    backgroundColor:'#fff',
    borderRadius:6,
	},
	searchInput:{
		height:30,
		borderColor:'transparent',
		borderWidth:0,
		flex:1,
		paddingHorizontal:10,
		paddingVertical:5,
		color:colors.gray,
	},
	btnSearch:{
		position:'absolute',
		top:0,
		right:15,
	},

	list:{
		marginTop:5,
	},
	listItem:{
		backgroundColor:'#fff',
		flexDirection:'row',
		paddingHorizontal:15,
		paddingVertical:10,
		marginTop:10,
	},
	itemImg:{
		width:130,
		height:160,
		borderRadius:6,
	},
	itemContent:{
		flex:1,
		paddingLeft:20,
	},
	itemTitle:{
		fontWeight:'bold', 
		fontSize:20, 
		lineHeight:25
	},
	itemDesc:{
		fontSize:14,
		lineHeight:25, 
		color: colors.gray
	}
});


export default List;