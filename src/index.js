'use strict';

import React from 'react';
import SplashScreen from 'rn-splash-screen';

import RootNavigator from './route';
// import Guide from './views/Guide';

import {
	AsyncStorage,
  StatusBar,
} from 'react-native';

class App extends React.Component {
  constructor(props) {
    super(props);
  
    // this.state = {
    //   // showGuide: false
    // };
  }
  render() {
    return <RootNavigator />;
  }

  componentDidMount(){
    // this.openApp();
  	setTimeout(()=>{
      SplashScreen.hide();
  	}, 2000);

  }

  // openApp(){
  // 	AsyncStorage.getItem('isFirst', (err, flag) => {
  // 		if(!flag){ // flag
  //       AsyncStorage.setItem('isFirst', 'false');
  //       this.setState({
  //         showGuide: true
  //       });
  //       return;
  // 		}
  //     // 非首次打开
  //     console.log('不是首次打开');
  // 	});
  // }

  // _onGuideFinish(){
  //   AsyncStorage.setItem('isFirst', 'false');
  //   this.setState({
  //     showGuide: false
  //   });
  // }


}



export default App;