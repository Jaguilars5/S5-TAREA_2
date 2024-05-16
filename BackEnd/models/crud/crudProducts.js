const Product = require("../product/product");

class CrudProducts {
	constructor() {
		this.products = [];
	}

	createProduct(description, price, stock) {
		const newProduct = new Product(Product.nextId++, description, price, stock);
		this.products.push(newProduct.getJson());
		return this.products;
	}

	deleteProduct(id) {
		this.products = this.products.filter((product) => product.id !== id);
	}

	getAllProducts() {
		return this.products;
	}

	updateProduct(id, description, price, stock) {
		const index = this.products.findIndex((product) => product.id === id);

		if (index !== -1) {
			this.products[index] = new Product(id, description, price, stock).getJson();
			return this.products;
		} else {
			throw new Error("Producto no encontrado");
		}
	}
}

module.exports = CrudProducts;
