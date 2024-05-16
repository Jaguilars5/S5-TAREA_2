import { ConsultProduct } from "../consultProduct"; // Importa componente de consulta de productos
import { CreateProduct } from "../createProduct"; // Importa componente de creación de productos
import { io, Socket } from "socket.io-client";
import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { UpdateProduct } from "../updateProduct"; // Importa componente de actualización de productos

const connectSocketServer = () => {
    const socket: Socket = io("http://localhost:8080", {
        transports: ["websocket"],
    });
    return socket;
};

export const ProductRouter = () => {
    const [socket] = useState(connectSocketServer());
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Escuchar eventos del servidor
        socket.on("consult-products", (data) => {
            // Actualizar el estado de los productos en el frontend
            setProducts(data);
            // Actualizar el Local Storage
            localStorage.setItem("products", JSON.stringify(data));
        });

        return () => {
            socket.off("consult-products");
        };
    }, [socket]);

    const createProduct = (
        description: string,
        price: number,
        stock: number
    ) => {
        socket.emit("create-product", { description, price, stock });
    };

    const consulProduct = () => {
        return products;
    };

    const deleteProduct = (id: string) => {
        socket.emit("delete-product", { id });
    };

    const updateProduct = (
        id: string,
        description: string,
        price: number,
        stock: number
    ) => {
        socket.emit("update-product", { id, description, price, stock });
    };

    return (
        <Routes>
            <Route
                path="create"
                element={<CreateProduct createProduct={createProduct} />}
            />
            <Route
                path="consult"
                element={
                    <ConsultProduct
                        consulProducts={consulProduct}
                        deleteProduct={deleteProduct}
                    />
                }
            />
            <Route
                path="update"
                element={<UpdateProduct updateProduct={updateProduct} />}
            />
            <Route
                path="*"
                element={<Navigate to="create" />}
            />
        </Routes>
    );
};
