
import moment from 'moment';

class Utils {

	static formatDate(value, format = 'YYYY-MM-DD hh:mm'){
		if(!value){
			return '';
		}
		return moment(value).format(format);
	}
}

export default Utils;