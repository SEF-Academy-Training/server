exports.generateSerialCode = async (model) => {
	let serialCode;
	do {
		const numericPart1 = Math.floor(Math.random() * 1000);
		const numericPart2 = Math.floor(Math.random() * 1000);
		let alphabeticPart = '';
		for (let i = 0; i < 3; i++) {
			alphabeticPart += String.fromCharCode(Math.floor(Math.random() * 26) + 65); // hexadecimal numbers from
		}

		serialCode = `${numericPart1}-${numericPart2 + alphabeticPart}`;

		const uniqueSerial = await model.findOne({ code: serialCode });
		if (uniqueSerial) {
			serialCode = null;
		}
	} while (!serialCode);

	return serialCode;
};
