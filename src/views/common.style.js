
import {
	StyleSheet,
} from 'react-native';

const colors = {
	black:'#262626',
	gray:'#888',
	lightGray:'#f3f3f3', // borderColor
	yellow:'#fbca04',
	white:'#fff',
	wxGreen:'#1AAD19',
}

const styles = StyleSheet.create({
  container:{
    marginTop:10,
    flex:1,
  },
  group:{
    marginTop:10,
    paddingHorizontal:15,
    backgroundColor:colors.white,
  },
  groupRow:{
    flexDirection:'row',
    paddingVertical:15,
    borderColor: colors.lightGray,
    borderBottomWidth:1,
  },
  groupTxt:{
    flex:1,
    color: colors.black,
    lineHeight:20,
    paddingHorizontal:10,
    fontSize:14,
  }
});



export {
	colors,
};

export default styles;