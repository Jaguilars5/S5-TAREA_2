const { RegularClient, VipClient } = require("../client/client");

class CrudClients {
	constructor() {
		this.clients = [];
	}

	createClient(firstName, lastName, dni, typeClient, card) {
		let newClient;
		switch (typeClient) {
			case "Regular":
				newClient = new RegularClient(firstName, lastName, dni, card);
				break;
			case "Vip":
				newClient = new VipClient(firstName, lastName, dni);
				break;
			default:
				throw new Error("Tipo de cliente no válido");
		}
		this.clients.push(newClient.getJson());
		return this.clients;
	}

	deleteClient(dni) {
		this.clients = this.clients.filter((client) => client.dni !== dni);
	}

	getClient() {
		return this.clients;
	}

	updateClient(firstName, lastName, dni, typeClient, card) {
		// Buscar al cliente por DNI
		const index = this.clients.findIndex((client) => client.dni === dni);

		if (index !== -1) {
			// Si el cliente existe, actualizar sus valores
			switch (typeClient) {
				case "Regular":
					this.clients[index] = new RegularClient(firstName, lastName, dni, card).getJson();
					break;
				case "Vip":
					this.clients[index] = new VipClient(firstName, lastName, dni).getJson();
					break;
				default:
					throw new Error("Tipo de cliente no válido");
			}
			return this.clients;
		} else {
			// Si el cliente no existe, lanzar un error o manejarlo de alguna otra manera
			throw new Error("Cliente no encontrado");
		}
	}
}

module.exports = CrudClients;
