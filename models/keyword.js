import HTTP from "../util/http-p";

class KeywordModel extends HTTP {
	key = "q";
	maxLength = 10;
	
	getHistory() {
		const words = wx.getStorageSync(this.key);
		if (!words) {
			return [];
		}
		return words;
	}
	
	getHotSearch() {
		return this.request({
			url: "book/hot_keyword"
		});
	}
	
	addToHistory(keyword) {
		let words = this.getHistory();
		const has = words.includes(keyword);
		if (!has) {
			if (words.length >= this.maxLength) {
				words.pop();
			}
			words.unshift(keyword);
			wx.setStorageSync(this.key, words);
		}
	}
}

export default KeywordModel;