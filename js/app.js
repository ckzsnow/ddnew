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

	owner.data = {
        industry:[{"id":1,"name":"金融","icon":"images/industry/jinrong.png","createTime":1444277145000},{"id":2,"name":"咨询","icon":"images/industry/zixun.png","createTime":1444277147000},{"id":3,"name":"法律","icon":"images/industry/falv.png","createTime":1444277150000},{"id":4,"name":"财务","icon":"images/industry/caiwu.png","createTime":1444277153000},{"id":5,"name":"互联网","icon":"images/industry/hulianwang.png","createTime":1444277155000},{"id":6,"name":"教育","icon":"images/industry/jiaoyu.png","createTime":1444277158000},{"id":7,"name":"IT","icon":"images/industry/it.png","createTime":1444277161000},{"id":8,"name":"地产","icon":"images/industry/dichan.png","createTime":1444277163000},{"id":9,"name":"医疗健康","icon":"images/industry/yiliaojiankang.png","createTime":1444277165000},{"id":10,"name":"医疗健康","icon":"images/industry/yiliaojiankang.png","createTime":1444277165000}],
        field:{"1":[{"id":1,"industryId":1,"name":"投资银行","icon":"images/field/touziyinhang.png","createTime":1444277202000},{"id":2,"industryId":1,"name":"商业银行","icon":"images/field/shangyeyinhang.png","createTime":1444277286000},{"id":3,"industryId":1,"name":"基金","icon":"images/field/jijin.png","createTime":1444277289000},{"id":4,"industryId":1,"name":"保险","icon":"images/field/baoxian.png","createTime":1444277292000},{"id":5,"industryId":1,"name":"证券","icon":"images/field/zhengquan.png","createTime":1444277295000},{"id":6,"industryId":1,"name":"担保","icon":"images/field/danbao.png","createTime":1444277297000},{"id":7,"industryId":1,"name":"信托","icon":"images/field/xintuo.png","createTime":1444277300000},{"id":8,"industryId":1,"name":"财务顾问","icon":"images/field/caiwuguwen.png","createTime":1444277302000},{"id":9,"industryId":1,"name":"典当","icon":"images/field/diandang.png","createTime":1444277305000},{"id":10,"industryId":1,"name":"期货","icon":"images/field/qihuo.png","createTime":1444277307000}],"2":[{"id":11,"industryId":2,"name":"管理咨询","icon":"images/field/guanlizixun.png","createTime":1444277813000},{"id":12,"industryId":2,"name":"市场调查","icon":"images/field/shichangdiaocha.png","createTime":1444277815000},{"id":13,"industryId":2,"name":"人力资源","icon":"images/field/renliziyuan.png","createTime":1444277817000},{"id":14,"industryId":2,"name":"营销服务","icon":"images/field/yingxiaofuwu.png","createTime":1444277820000},{"id":15,"industryId":2,"name":"IT服务","icon":"images/field/itfuwu.png","createTime":1444277822000},{"id":16,"industryId":2,"name":"工程咨询","icon":"images/field/gongchengzixun.png","createTime":1444277825000}],"3":[{"id":17,"industryId":3,"name":"法律","icon":"images/field/falv.png","createTime":1444277834000}],"4":[{"id":18,"industryId":4,"name":"公司财务","icon":"images/field/gongsicaiwu.png","createTime":1444277836000}],"5":[{"id":19,"industryId":5,"name":"社交","icon":"images/field/shejiao.png","createTime":1444277838000},{"id":20,"industryId":5,"name":"金融","icon":"images/field/jinrong.png","createTime":1444277841000},{"id":21,"industryId":5,"name":"电子商务","icon":"images/field/dianzishangwu.png","createTime":1444277843000},{"id":22,"industryId":5,"name":"医疗","icon":"images/field/yiliao.png","createTime":1444277845000},{"id":23,"industryId":5,"name":"广告","icon":"images/field/guanggao.png","createTime":1444277847000},{"id":24,"industryId":5,"name":"影音娱乐","icon":"images/field/yingyinyule.png","createTime":1444277849000},{"id":25,"industryId":5,"name":"传媒","icon":"images/field/chuanmei.png","createTime":1444277854000},{"id":26,"industryId":5,"name":"智能硬件","icon":"images/field/zhinengyingjian.png","createTime":1444277856000},{"id":27,"industryId":5,"name":"企业服务","icon":"images/field/qiyefuwu.png","createTime":1444277862000},{"id":28,"industryId":5,"name":"教育","icon":"images/field/jiaoyu.png","createTime":1444277864000},{"id":29,"industryId":5,"name":"旅游","icon":"images/field/lvyou.png","createTime":1444277866000},{"id":30,"industryId":5,"name":"汽车","icon":"images/field/qiche.png","createTime":1444277868000},{"id":31,"industryId":5,"name":"游戏","icon":"images/field/youxi.png","createTime":1444277871000},{"id":32,"industryId":5,"name":"招聘","icon":"images/field/zhaopin.png","createTime":1444277875000},{"id":33,"industryId":5,"name":"大数据","icon":"images/field/dashuju.png","createTime":1444277877000},{"id":34,"industryId":5,"name":"餐饮","icon":"images/field/canyin.png","createTime":1444277880000},{"id":35,"industryId":5,"name":"O2O","icon":"images/field/o2o.png","createTime":1444277882000},{"id":36,"industryId":5,"name":"文化体育","icon":"images/field/wenhuatiyu.png","createTime":1444277884000},{"id":37,"industryId":5,"name":"信息技术","icon":"images/field/xinxijishu.png","createTime":1444277887000},{"id":38,"industryId":5,"name":"工具服务","icon":"images/field/gongjufuwu.png","createTime":1444277890000},{"id":39,"industryId":5,"name":"物流","icon":"images/field/wuliu.png","createTime":1444277894000}],"6":[{"id":40,"industryId":6,"name":"语言培训","icon":"images/field/yuyanpeixun.png","createTime":1444277896000},{"id":41,"industryId":6,"name":"职业培训","icon":"images/field/zhiyepeixun.png","createTime":1444277899000},{"id":42,"industryId":6,"name":"留学","icon":"images/field/liuxue.png","createTime":1444277901000},{"id":43,"industryId":6,"name":"中小学课程","icon":"images/field/zhongxiaoxuekecheng.png","createTime":1444277920000},{"id":44,"industryId":6,"name":"IT培训","icon":"images/field/itpeixun.png","createTime":1444277923000},{"id":45,"industryId":6,"name":"院校","icon":"images/field/yuanxiao.png","createTime":1444277927000}],"7":[{"id":46,"industryId":7,"name":"软件","icon":"images/field/ruanjian.png","createTime":1444277929000},{"id":47,"industryId":7,"name":"硬件","icon":"images/field/yingjian.png","createTime":1444277931000},{"id":48,"industryId":7,"name":"半导体/集成电路","icon":"images/field/bandaoti.png","createTime":1444277933000},{"id":49,"industryId":7,"name":"电子技术","icon":"images/field/dianzijishu.png","createTime":1444277935000},{"id":50,"industryId":7,"name":"通讯","icon":"images/field/tongxun.png","createTime":1444277938000}],"8":[{"id":51,"industryId":8,"name":"房地产","icon":"images/field/fangdichan.png","createTime":1444277940000},{"id":52,"industryId":8,"name":"建筑","icon":"images/field/jianzhu.png","createTime":1444277943000},{"id":53,"industryId":8,"name":"建材","icon":"images/field/jiancai.png","createTime":1444277958000},{"id":54,"industryId":8,"name":"物业","icon":"images/field/wuye.png","createTime":1444277960000}],"9":[{"id":55,"industryId":9,"name":"医疗","icon":"images/field/yiliao.png","createTime":1444277962000},{"id":56,"industryId":9,"name":"生物制药","icon":"images/field/shengwuzhiyao.png","createTime":1444277964000},{"id":57,"industryId":9,"name":"医疗设备","icon":"images/field/yiliaoshebei.png","createTime":1444277966000}]},
        stage:[{"id":1,"name":"求职面试","icon":"/appfile/icons/stage/","createTime":1444280451000},{"id":2,"name":"从业技能","icon":"/appfile/icons/stage/","createTime":1444280469000},{"id":4,"name":"创业","icon":"/appfile/icons/stage/","createTime":1444283396000},{"id":3,"name":"行业经验","icon":"/appfile/icons/stage/","createTime":1444283518000}],
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