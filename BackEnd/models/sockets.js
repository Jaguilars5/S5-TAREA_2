const CrudClients = require("./crud/crudClients");
const  CrudProducts  = require("./crud/crudProducts"); // Importa el CRUD de productos

class Sockets {
    constructor(io) {
        this.io = io;
        this.crudClients = new CrudClients();
        this.crudProducts = new CrudProducts(); // Instancia el CRUD de productos

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on("connection", (socket) => {
            // Emitir al cliente conectado los clientes actuales
            socket.emit("consult-clients", this.crudClients.getClient());
            // Emitir al cliente conectado los productos actuales
            socket.emit("consult-products", this.crudProducts.getAllProducts());

            socket.on("create-client", (data) => {
                const { firstName, lastName, dni, card, typeClient } = data;
                this.crudClients.createClient(firstName, lastName, dni, typeClient, card);
            });

            socket.on("delete-client", (data) => {
                const { dni } = data;
                this.crudClients.deleteClient(dni);
            });

            socket.on("update-client", (data) => {
                const { firstName, lastName, dni, card, typeClient } = data;
                this.crudClients.updateClient(firstName, lastName, dni, typeClient, card);
            });

            // Eventos para productos
            socket.on("create-product", (data) => {
                const { description, price, stock } = data;
                this.crudProducts.createProduct(description, price, stock);
            });

            socket.on("delete-product", (data) => {
                const { id } = data;
                this.crudProducts.deleteProduct(id);
            });

            socket.on("update-product", (data) => {
                const { id, description, price, stock } = data;
                this.crudProducts.updateProduct(id, description, price, stock);
            });
        });
    }
}

module.exports = Sockets;
