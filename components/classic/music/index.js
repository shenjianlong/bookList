import behavior from "../classic-beh.js";

const mMgr = wx.getBackgroundAudioManager();
Component({
	behaviors: [behavior],
	properties: {
		src: String
	},
	attached() {
		this._recoverStatus();
		this._monitorSwitch();
	},
	data: {
		playing: false,
		pauseSrc: "images/player@pause.png",
		playSrc: "images/player@play.png"
	},
	methods: {
		onPlay() {
			if (!this.data.playing) {
				this.setData({
					playing: true
				});
				mMgr.title = "粥可温";
				mMgr.src = this.properties.src;
			} else {
				this.setData({
					playing: true
				});
				mMgr.pause();
			}
		},
		_recoverStatus() {
			if (mMgr.paused) {
				this.setData({
					playing: false
				});
				return;
			}
			if (mMgr.src === this.properties.src) {
				this.setData({
					playing: true
				});
			}
		},
		_monitorSwitch() {
			mMgr.onPlay(() => {
					this._recoverStatus();
				}
			);
			mMgr.onPause(() => {
					this._recoverStatus();
				}
			);
			mMgr.onStop(() => {
					this._recoverStatus();
				}
			);
			mMgr.onEnded(() => {
					this._recoverStatus();
				}
			);
		}
	},
});
