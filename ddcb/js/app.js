(function($, owner) {
	/**
	 * 用户登录
	 **/
	owner.login = function(loginInfo, callback) {
		callback = callback || $.noop;
		loginInfo = loginInfo || {};
		loginInfo.account = loginInfo.account || '';
		loginInfo.password = loginInfo.password || '';
		if (loginInfo.account.length < 5) {
			return callback('账号最短为 5 个字符');
		}
		if (loginInfo.password.length < 6) {
			return callback('密码最短为 6 个字符');
		}
		var users = JSON.parse(localStorage.getItem('$users') || '[]');
		var authed = users.some(function(user) {
			return loginInfo.account == user.account && loginInfo.password == user.password;
		});
		if (authed) {
			return owner.createState(loginInfo.account, callback);
		} else {
			return callback('用户名或密码错误');
		}
	};

	owner.createState = function(name, callback) {
		var state = owner.getState();
		state.account = name;
		state.token = "token123456789";
		owner.setState(state);
		return callback();
	};

	/**
	 * 新用户注册
	 **/
	owner.reg = function(regInfo, callback) {
		callback = callback || $.noop;
		regInfo = regInfo || {};
		regInfo.account = regInfo.account || '';
		regInfo.password = regInfo.password || '';
		if (regInfo.account.length < 5) {
			return callback('用户名最短需要 5 个字符');
		}
		if (regInfo.password.length < 6) {
			return callback('密码最短需要 6 个字符');
		}
		if (!checkEmail(regInfo.email)) {
			return callback('邮箱地址不合法');
		}
		var users = JSON.parse(localStorage.getItem('$users') || '[]');
		users.push(regInfo);
		localStorage.setItem('$users', JSON.stringify(users));
		return callback();
	};

	/**
	 * 获取当前状态
	 **/
	owner.getState = function() {
		var stateText = localStorage.getItem('$state') || "{}";
		return JSON.parse(stateText);
	};

	/**
	 * 设置当前状态
	 **/
	owner.setState = function(state) {
		state = state || {};
		localStorage.setItem('$state', JSON.stringify(state));
		//var settings = owner.getSettings();
		//settings.gestures = '';
		//owner.setSettings(settings);
	};

	var checkEmail = function(email) {
		email = email || '';
		return (email.length > 3 && email.indexOf('@') > -1);
	};

	/**
	 * 找回密码
	 **/
	owner.forgetPassword = function(email, callback) {
		callback = callback || $.noop;
		if (!checkEmail(email)) {
			return callback('邮箱地址不合法');
		}
		return callback(null, '新的随机密码已经发送到您的邮箱，请查收邮件。');
	};

	/**
	 * 获取应用本地配置
	 **/
	owner.setSettings = function(settings) {
		settings = settings || {};
		localStorage.setItem('$settings', JSON.stringify(settings));
	}

	/**
	 * 设置应用本地配置
	 **/
	owner.getSettings = function() {
		var settingsText = localStorage.getItem('$settings') || "{}";
		return JSON.parse(settingsText);
	}

	owner.check = {
		isEmpty: function(obj) {
			if (obj == null || obj == undefined || ("" + obj) == "") {
				return true;
			}
			return false;
		},
		isPhone: function(str) {
			var regu = /^(((\(\d{2,3}\))|(\d{3}\-))?1[0-9]\d{9})?$/;
			return regu.test(str);
		},
		isInteger: function(str) {
			var regu = /^[0-9]*[1-9][0-9]*$/;
			return regu.test(str);
		},
		isNumber: function(str) {
			var regu = /^[0-9][0-9]*$/;
			return regu.test(str);
		},
		isMoney: function(str) {
			var regu = /^[0-9]*(\.[0-9]{1,2})?$/;
			return regu.test(str);
		},
		isMobile: function(str) {
			var regu = /^(13[4-9]|15[0-2]|15[7-9]|18(7|8|2|3|4)|147)\d{8}$/;
			return regu.test(str);
		},
		isMobilePrefix: function(str) {
			var regu = /^(13[4-9]|15[0-2]|15[7-9]|18(7|8|2|3|4)|147)/;
			return regu.test(str);
		},
		isTelecom: function(str) {
			var regu = /^(133|153|180|181|189)\d{8}$/;
			return regu.test(str);
		},
		isTelecomPrefix: function(str) {
			var regu = /^(133|153|180|181|189)/;
			return regu.test(str);
		},
		isUnicom: function(str) {
			var regu = /^(13[0-2]|15(5|6)|185|186|145)\d{8}$/;
			return regu.test(str);
		},
		isUnicomPrefix: function(str) {
			var regu = /^(13[0-2]|15(5|6)|185|186|145)/;
			return regu.test(str);
		},
		isChineseName: function(str) {
			var temp = JK.convert.trim(str);
			//如果是中文，且名称是2~4位，则为正式的名称
			if (("" + temp).length > 1 && ("" + temp).length < 5 && JK.check.isChinese(temp)) {
				return true;
			}
			return false;
		},
		isChinese: function(str) {
			var temp = JK.convert.trim(str);
			if (JK.check.isEmpty(temp)) return false;
			for (var i = 0; i < temp.length; i++) {
				var tempChar = temp[i];
				if (escape(tempChar).indexOf("%u") < 0) return false;
			}
			return true;
		},
		isIdNum: function(card) {
			// 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
			var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
			return reg.test(card);
		}
	}
}(mui, window.app = {}));