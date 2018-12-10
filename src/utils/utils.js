
import moment from 'moment';

class Utils {

	static formatDate(value, format = 'YYYY-MM-DD hh:mm'){
		return moment(value).format(format);
	}
}

export default Utils;