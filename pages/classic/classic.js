import Classic from "../../models/classic.js";
import Like from "../../models/like.js";

const ClassicModel = new Classic();
const likeModel = new Like();
Page({
	data: {
		classic: {},
		latest: true,
		first: false,
		likeCount: 0,
		likeStatus: false
	},
	onLoad: function (options) {
		ClassicModel.getLatest((res) => {
			this.setData({
				classic: res,
				likeCount: res["fav_nums"],
				likeStatus: res["like_status"]
			});
		});
	},
	onLike(event) {
		let behavior = event.detail.behavior;
		likeModel.like(behavior, this.data.classic.id, this.data.classic.type);
	},
	onPrevious() {
		this._updateClassic("previous");
	},
	onNext() {
		this._updateClassic("next");
	},
	_updateClassic(nextOrPrevious) {
		let index = this.data.classic.index;
		ClassicModel.getClassic(index, nextOrPrevious, (res) => {
			this._getLikeStatus(res.id, res.type);
			this.setData({
				classic: res,
				latest: ClassicModel.isLatest(res.index),
				first: ClassicModel.isFirst(res.index)
			});
		});
	},
	_getLikeStatus(artID, category) {
		likeModel.getClassicLikeStatus(artID, category, (res) => {
			this.setData({
				likeCount: res["fav_nums"],
				likeStatus: res["like_status"]
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