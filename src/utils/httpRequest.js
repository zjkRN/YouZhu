
import Toast from 'react-native-root-toast';
import CookieManager from 'react-native-cookies';

import Loading from '../components/Loading';

const baseDomain = 'http://192.168.30.33';
const baseUrl = `${baseDomain}:7001/api`;

class HttpRequest {
	_getParam(data){
		return Object.entries(data).map(([key, value]) => {
			return `${key}=${value}`
		}).join('&');
	}

	get csrfToken(){
		console.log('this._csrfToken => ', this._csrfToken);
		if(this._csrfToken){
			return this._csrfToken;
		}
		this._csrfToken = CookieManager.get(baseDomain).then(res => {
			console.log('CookieManager => ', res);
			return res.csrfToken;
		});

		return this._csrfToken;
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
			},
			// credentials: 'include' // 带上cookie
		}).then(response => response.json())
		.then(res => {
			Loading.hide();

			if(res.code !== 'SUCCESS'){
				res.msg && Toast.show(res.msg);
			}
			return res;
		}).catch(err => {
			Loading.hide();
			console.error(err);
		});
	}

	post(path, data){
		let url = `${baseUrl}${path}`;
		Loading.show();
		let jsonData = JSON.stringify(data);
		return fetch(url, {
			method:'POST',
			headers: {
				Accept: '*/*',
				'Content-Type': 'application/json',
				// 'x-csrf-token': "this.csrfToken"
			},
			body: JSON.stringify(data),
			// credentials: 'include' // 带上cookie
		}).then(response => response.json())
			.then(res => {
				Loading.hide();
				console.log('post res => ', res)
				if(res.code != "SUCCESS"){
					res.msg && Toast.show(res.msg);
				}
				return res;
			}).catch(err => {
				console.log('post error => ', err)
				Loading.hide();
				console.error(err);
			})
	}
}

module.exports = new HttpRequest();