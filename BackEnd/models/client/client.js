class Client {
    constructor(first_name="Consumidor", last_name="Final", dni="9999999999") {
        this.first_name = first_name;
        this.last_name = last_name;
        this._dni = dni;
    }

    get dni() {
        return this._dni;
    }

    set dni(value) {
        // Setter para asignar un nuevo valor al número de identificación del cliente, con validación de longitud
        if (value.length === 10 || value.length === 13) {
            this._dni = value;
        } else {
            this._dni = "9999999999"; // Retorna el valor predeterminado si la longitud no es válida
        }
    }

    fullName() {
        return this.first_name + " " + this.last_name;
    }
}

class RegularClient extends Client {
    constructor(first_name="Cliente", last_name="Final", dni="9999999999", card=false) {
        super(first_name, last_name, dni); // Llama al constructor de la clase padre
        this._discount = card ? 0.10 : 0; // Descuento del cliente regular
    }

    get discount() {
        return this._discount;
    }

    getJson() {
        return {
            "dni": this.dni,
            "nombre": this.first_name,
            "apellido": this.last_name,
            "valor": this.discount
        };
    }
}

class VipClient extends Client {
    constructor(first_name="Consumidor", last_name="Final", dni="9999999999") {
        super(first_name, last_name, dni); // Llama al constructor de la clase padre
        this._limit = 10000; // Límite de crédito del cliente VIP
        this._discount = 1.00;
    }

    get limit() {
        // Getter para obtener el valor del límite de crédito del cliente VIP
        return this._limit;
    }

    get discount() {
        // Getter para obtener el valor del descuento del cliente minorista
        return this._discount;
    }

    getJson() {
        // Método para imprimir los detalles del cliente VIP en la consola
        return {
            "dni": this.dni,
            "nombre": this.first_name,
            "apellido": this.last_name,
            "valor": this.discount
        };
    }
}
module.exports = { RegularClient, VipClient };