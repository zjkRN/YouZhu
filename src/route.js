
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {
	createStackNavigator, 
	createAppContainer,
	createDrawerNavigator,
	createBottomTabNavigator,
	StackViewTransitionConfigs
} from 'react-navigation';

import {colors} from './views/common.style';

import Index from './views/home/Index';
import AdPage from './views/home/AdPage';

import ProList from './views/pro/List';
import ProDetail from './views/pro/Detail';

import Me from './views/me/Me';
import Message from './views/me/Message';
import MessageDetail from './views/me/MessageDetail';
import ShareRecord from './views/me/ShareRecord';
import About from './views/me/About';

import Guide from './views/Guide';


// 数组中的路由，可以自定义动画效果，这里我只改了登录
const IOS_MODAL_ROUTES = ['Login'];

const dynamicModalTransition = (transitionProps, prevTransitionProps) => {
  const isModal = IOS_MODAL_ROUTES.some(
    screenName =>
      screenName === transitionProps.scene.route.routeName ||
      (prevTransitionProps && screenName === prevTransitionProps.scene.route.routeName)
  )
  return StackViewTransitionConfigs.defaultTransitionConfig(
    transitionProps,
    prevTransitionProps,
    true
  );
};


const defaultNavigatorConfig = {
	headerLayoutPreset:'center',
	transitionConfig:dynamicModalTransition,
	defaultNavigationOptions:{
		headerStyle:{
      backgroundColor:'#262626',
    },
    headerTintColor: '#fff',
    headerTitleStyle:{
      fontWeight:'bold'
    }
	},
	cardStyle:{
		backgroundColor:'#f8f8f8'
	}
}




const PlanNavigator = createStackNavigator({
	PlanList: {
		screen: ProList,
		params:{ type:1 },
		navigationOptions:({navigation}) => ({
			title:'我的行程',
			headerBackTitle:null,
			headerRight:(
        <AntDesign.Button 
          name="plus" 
          size={30}
          underlayColor="transparent"
          backgroundColor="transparent"
          onPress={navigation.getParam('onBtnAddClick')}
          style={{paddingHorizontal:5}}/>
        )
		})
	},
	PlanDetail: ProDetail,
}, {
	...defaultNavigatorConfig,
	initialRouteName:'PlanList',
});

const MeNavigator = createStackNavigator({
	Me: {
		screen: Me,
		navigationOptions:{
			header:null,
			headerBackTitle:null,
		},
	},
	StarList:{
		screen: ProList,
		params:{
			type: 'star'
		},
		navigationOptions:{
			title:'我的收藏',
			headerBackTitle:null,
		},
	},
	PlanDetail: ProDetail,
	Message:{
		screen: Message,
		navigationOptions:{
			title:'我的消息',
			headerBackTitle:null,
		},
	},
	MessageDetail:MessageDetail,
	ShareRecord:{
		screen: ShareRecord,
		navigationOptions:{
			title: '分享记录',
		},
	},
	About:{
		screen: About,
		navigationOptions:{
			title: '关于我们'
		}
	}
},{
	...defaultNavigatorConfig,
	initialRouteName:'Me',
});

const ProductNavigator = createStackNavigator({
	ProList:{
		screen: ProList,
		params: { type:2 },
		navigationOptions:{
			title:'友助推荐',
			headerBackTitle:null,
		},
	},
	PlanDetail: ProDetail,
},{
	...defaultNavigatorConfig,
	initialRouteName:'ProList'
});

const HomeNavigator = createStackNavigator({
	Index: {
		screen: Index,
		navigationOptions:{
			header:null,
			headerBackTitle:null,
		}
	},
	AdPage: AdPage,
	Message: {
		screen: Message,
		navigationOptions:{
			title:'我的消息',
			headerBackTitle:null,
		},
	},
},{
	...defaultNavigatorConfig,
	initialRouteName:'Index',
});

const TabNavigator = createBottomTabNavigator({
		TabHome: {
			screen: HomeNavigator,
			navigationOptions:{ title: '首页'}
		},
		TabProduct: {
			screen: ProductNavigator,
			navigationOptions:{ title: '推荐'}
		},
		TabPlan: { 
			screen: PlanNavigator, 
			navigationOptions:{ title: '行程'}
		},
		TabMe: {
			screen: MeNavigator,
			navigationOptions:{ title: '我的' }
		}
	},{
		initialRouteName:'TabHome',
		// backBehavior:'none',
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch(routeName){
        	case 'TabHome':
        		iconName = 'home';
        		break;
        	case 'TabProduct':
        		iconName = 'find';
        		break;
        	case 'TabPlan':
        		iconName = 'rocket1';
        		break;
        	case 'TabMe':
        		iconName = 'user';
        		break;
        }
      	return  <AntDesign name={iconName} size={25} color={tintColor} />;
      },
    }),
    // tabBarComponent: TabBarBottom,
    // tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
    // animationEnabled: false,
    // swipeEnabled: false,
 });


const AppStactNavigator = createStackNavigator({
	Guide:{
		screen: Guide,
		navigationOptions:{
			header:null,
		}
	},
	BottomTab:{
		screen:TabNavigator,
		navigationOptions:{
			header:null,
		}
	}
},{
	...defaultNavigatorConfig,
	initialRouteName:'Guide',
})






export default createAppContainer(AppStactNavigator);