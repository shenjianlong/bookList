import KeywordModel from "../../models/keyword";
import BookModel from "../../models/book";
import paginationBev from "../behaviors/pagination";

const keywordModel = new KeywordModel();
const bookModel = new BookModel();
Component({
	behaviors: [paginationBev],
	properties: {
		more: {
			type: String,
			observer: "loadMore"
		}
	},
	data: {
		historyWords: [],
		hotSearch: [],
		searching: false,
		loading: false,
		word: ""
	},
	attached() {
		this.initSearch(keywordModel);
	},
	methods: {
		initSearch(keywordModel) {
			this.setData({
				historyWords: keywordModel.getHistory()
			});
			keywordModel.getHotSearch().then(res => {
				this.setData({
					hotSearch: res["hot"]
				});
			});
		},
		onCancel() {
			this.triggerEvent("cancel");
			this.initialize();
		},
		onDelete() {
			this._closeResult();
			this.initialize();
		},
		onConfirm(event) {
			this._isLoading(true);
			this._showResult();
			const word = event.detail.value || event.detail.text;
			this._setWord(word);
			bookModel.search(0, word).then(res => {
				this.setData({
					searchArray: res.books,
				});
				if (res.total === 0) {
					this.setData({
						noneResult: true
					});
				}
				this._isLoading(false);
				keywordModel.addToHistory(word);
			});
		},
		loadMore() {
			if (!this.data.word) {
				return;
			}
			if (this._isLocked()) {
				return;
			}
			if (this.hasMore()) {
				this._locked();
				bookModel.search(this.getCurrentStart(), this.data.word).then(res => {
					this.setMoreData(res.books);
					this.setTotal(res.total);
					this._unLocked();
				});
			}
		},
		_isLoading(Bool) {
			Bool ? wx["showLoading"]() : wx["hideLoading"]();
		},
		_showResult() {
			this.setData({
				searching: true
			});
		},
		_closeResult() {
			this.setData({
				searching: false
			});
		},
		_isLocked() {
			return this.data.loading;
		},
		_locked() {
			this.setData({
				loading: true
			});
		},
		_unLocked() {
			this.setData({
				loading: false
			});
		},
		_setWord(word) {
			this.setData({
				word
			});
		}
	}
});
