export const validateCedula = (cedula: string): boolean => {
	if (cedula.length !== 10 || !/^\d+$/.test(cedula)) {
		return false;
	}

	const coeficientes: number[] = [2, 1, 2, 1, 2, 1, 2, 1, 2];
	let suma = 0;

	for (let i = 0; i < 9; i++) {
		let digito = parseInt(cedula[i]) * coeficientes[i];
		if (digito > 9) {
			digito -= 9;
		}
		suma += digito;
	}

	let total = suma % 10;
	if (total !== 0) {
		total = 10 - total;
	}

	// Verifica si el dígito de control es igual al último dígito del DNI
	return total === parseInt(cedula[9]);
};