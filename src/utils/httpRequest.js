
import Toast from 'react-native-root-toast';
import Loading from '../components/Loading';

const baseUrl = 'http://192.168.30.33:7001';

class HttpRequest {
	_getParam(data){
		return Object.entries(data).map(([key, value]) => {
			return `${key}=${value}`
		}).join('&');
	}

	get(path, param){
		let url = `${baseUrl}${path}`;
		if(param){
			url.append(`?${_getParam(param)}`);
		}
		Loading.show();
		return fetch(url, {
			method:'GET',
			headers:{
				Accept:'*/*',
				'Content-Type':'application/json',
			}
		}).then(response => response.json())
		.then(res => {
			Loading.hide();
			if(res.code !== 'SUCCESS'){
				res.msg && Toast.show(res.msg);
				return null;
			}
			return res.data;
		}).catch(err => {
			Loading.hide();
			console.error(err);
		});
	}

	post(path, data){
		let url = `${baseUrl}${path}`;

		Loading.show();
		return fetch(url, {
			method:'POST',
			headers: {
				Accept: '*/*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data),
		}).then(response => response.json())
			.then(res => {
				if(res.code != "SUCCESS"){
					res.msg && Toast.show(res.msg);
					return null;
				}
				return res.data;
			}).catch(err => {
				Loading.hide();
				console.error(err);
			})
	}
}

module.exports = new HttpRequest();