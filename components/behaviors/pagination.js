const paginationBev = Behavior({
	data: {
		searchArray: [],
		total: 21,
		noneResult: false
	},
	methods: {
		setMoreData(searchArray) {
			const tempArray = this.data.searchArray.concat(searchArray);
			this.setData({
				searchArray: tempArray
			});
		},
		getCurrentStart() {
			return this.data.searchArray.length;
		},
		setTotal(total) {
			this.data.total = total;
		},
		hasMore() {
			return this.data.searchArray.length <= this.data.total;
		},
		initialize() {
			this.setData({
				searchArray: [],
				total: 0,
				noneResult: false,
				word: "",
			});
			wx["hideLoading"]();
		}
	}
});
export default paginationBev;