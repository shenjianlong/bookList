import BookModel from "../../models/book";

const bookModel = new BookModel();
Page({
	data: {
		userInfo: null,
		authorized: false,
		bookCount: 0
	},
	onLoad: function () {
		this.userAuthorized();
		this.getMyBookCount();
	},
	getUserInfo(event) {
		const {userInfo} = event.detail;
		if (!userInfo) {
			return;
		}
		this.setData({
			userInfo,
			authorized: true
		});
	},
	userAuthorized() {
		wx.getSetting({
			success: data => {
				if (data.authSetting["scope.userInfo"]) {
					wx.getUserInfo({
						success: data => {
							this.setData({
								authorized: true,
								userInfo: data.userInfo
							});
						}
					});
				}
			}
		});
	},
	getMyBookCount() {
		bookModel.getMyBookCount().then(res => {
			this.setData({
				bookCount: res.count
			});
		});
	},
	onReady: function () {
	},
	onShow: function () {
	},
	onHide: function () {
	},
	onUnload: function () {
	},
	onPullDownRefresh: function () {
	},
	onReachBottom: function () {
	},
	onShareAppMessage: function () {
	}
});