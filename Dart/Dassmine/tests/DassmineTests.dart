DassmineTests() {
	describe('Dassmine class', () {
		it("must not crash with no expectations", () { });

		void throwException() {
			throw new Exception();
		}

		describe('xdescribe and xit functions', () {
			it("must not execute passed function", () {
				xdescribe('testing...', throwException);
				xit('testing...', throwException);
			});
		});

		describe('describe and it', () {
			it('must capture exceptions and continue testing', () {
				describe('testing...', throwException);
				it('testing...', throwException);
			});
		});
	});
}