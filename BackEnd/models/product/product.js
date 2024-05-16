class Product {
	static nextId = 1;

	constructor(id, description = "Ninguno", price = 0, stock = 0) {
		this._id = id;
		this.description = description;
		this.price = price;
		this._stock = stock;
	}

	get id() {
		return this._id;
	}

	get stock() {
		return this._stock;
	}

	set stock(value) {
		this._stock = value;
	}

	getJson() {
		return {
			id: this._id,
			description: this.description,
			price: this.price,
			stock: this._stock,
		};
	}
}

module.exports = Product;
