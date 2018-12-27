
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
    paddingVertical:10,
    borderColor: colors.lightGray,
    borderBottomWidth:1,
  },
  groupContent:{
    flex:1,
    paddingHorizontal:10,
  },
  groupTitle:{
    color: colors.black,
    lineHeight:20,
    fontSize:14,
  },
  groupDesc:{
    color: colors.gray,
    lineHeight:20,
    fontSize:12,
  }
});



export {
	colors,
};

export default styles;