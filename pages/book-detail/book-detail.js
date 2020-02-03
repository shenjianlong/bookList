// pages/book-detail/book-detail.js
import BookModel from "../../models/book";
import LikeModel from "../../models/like";

const bookModel = new BookModel();
const likeModel = new LikeModel();
Page({
	data: {
		comments: [],
		book: {},
		likeStatus: false,
		likeCount: 0,
		posting: false
	},
	onLoad: function (options) {
		wx["showLoading"]();
		const bid = options["bid"];
		const detail = bookModel.getDetail(bid);
		const comments = bookModel.getComments(bid);
		const likeStatus = bookModel.getLikeStatus(bid);
		Promise.all([detail, comments, likeStatus]).then(res => {
			this.setData({
				book: res[0],
				comments: res[1].comments,
				likeStatus: res[2]["like_status"],
				likeCount: res[2]["fav_nums"]
			});
			wx["hideLoading"]();
		});
	},
	onLike(event) {
		const like_or_cancel = event.detail.behavior;
		likeModel.like(like_or_cancel, this.data.book.id, 400);
	},
	onFakePost() {
		this.setData({
			posting: true
		});
	},
	onCancel() {
		this.setData({
			posting: false
		});
	},
	onPost(event) {
		const comment = event.detail.text || event.detail.value;
		if (!comment) {
			return;
		}
		if (comment.length > 12) {
			wx.showToast({
				title: "短评最多12个字",
				icon: "none"
			});
			return;
		}
		bookModel.postComment(this.data.book.id, comment).then(res => {
			wx.showToast({
				title: "+1",
				icon: "none"
			});
			this.data.comments.unshift({
				content: comment,
				nums: 1
			});
			this.setData({
				comments: this.data.comments,
				posting: false
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