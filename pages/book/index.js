import BookModel from "../../models/book";
import {random} from "../../util/common";

const bookModel = new BookModel();
Page({
	data: {
		books: [],
		searching: false,
		more: ""
	},
	onLoad: function (options) {
		const hotList = bookModel.getHotList();
		hotList.then(res => {
			this.setData({
				books: res
			});
		});
	},
	onSearching() {
		this.setData({
			searching: true
		});
	},
	onCancel() {
		this.setData({
			searching: false
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
		this.setData({
			more: random(16)
		});
	},
	onShareAppMessage: function () {
	}
});