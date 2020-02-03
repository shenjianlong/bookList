Component({
	options: {
		multipleSlots: true,
	},
	externalClasses: ["tag-class"],
	properties: {
		text: String
	},
	data: {},
	methods: {
		onTap() {
			this.triggerEvent("tapping", {
				text: this.properties.text
			});
		}
	}
});