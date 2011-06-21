describe("TextField component", function() { }, true);
describe("CheckBox component", function() {
	var check,
		container,
		css = new CheckBox.Css(),
		texts = new CheckBox.Texts();
	css.checked = 'ischecked';
	css.unchecked = 'notchecked';
	texts.checked = 'V';
	texts.unchecked = 'X';

	function createCheckBox() {
		container = Dom.create('div');
		check = new CheckBox();
		check.setContainer(container);
		check.setCss(css);
		check.setTexts(texts);
	}
	beforeEach(createCheckBox);

	describe("On render", function() {
		it("should set its state depending its value", function() {
			createCheckBox();
			check.setValue(true);
			check.render();
			var body= check.getBody();
			expect(body.firstChild.className).toBe(css.checked);
			expect(body.firstChild.innerHTML).toBe(texts.checked);

			createCheckBox();
			check.setValue(false);
			check.render();
			body= check.getBody();
			expect(body.firstChild.className).toBe(css.unchecked);
			expect(body.firstChild.innerHTML).toBe(texts.unchecked);
		});
	});
});