import { ConsultClient } from "../consultClient";
import { CreateClient } from "../createClient";
import { io, Socket } from "socket.io-client";
import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { UpdateClient } from "../updateClient";

const connectSocketServer = () => {
	const socket: Socket = io("http://localhost:8080", {
		transports: ["websocket"],
	});
	return socket;
};

export const ClientRouter = () => {
	const [socket] = useState(connectSocketServer());
	const [clients, setClients] = useState([]);

	useEffect(() => {
		// Escuchar eventos del servidor
		socket.on("consult-clients", (data) => {
			// Actualizar el estado de los clientes en el frontend
			setClients(data);
			// Actualizar el Local Storage
			localStorage.setItem("client", JSON.stringify(data));
		});

		return () => {
			socket.off("consult-clients");
		};
	}, [socket]);

	const createClient = (
		firstName: string,
		lastName: string,
		typeClient: string,
		dni: string,
		card: boolean
	) => {
		socket.emit("create-client", { firstName, lastName, dni, typeClient, card });
	};

	const consulClient = () => {
		return clients;
	};

	const deleteClient = (dni: string) => {
		socket.emit("delete-client", { dni });
	};

	const updateClient = (
		firstName: string,
		lastName: string,
		typeClient: string,
		dni: string,
		card: boolean
	) => {
		socket.emit("update-client", { firstName, lastName, dni, typeClient, card });
	};

	return (
		<Routes>
			<Route
				path="create"
				element={<CreateClient createClient={createClient} />}
			/>
			<Route
				path="consult"
				element={
					<ConsultClient
						consulClients={consulClient}
						deleteClient={deleteClient}
					/>
				}
			/>
			<Route
				path="update"
				element={<UpdateClient updateClient={updateClient} />}
			/>
			<Route
				path="*"
				element={<Navigate to="create" />}
			/>
		</Routes>
	);
};
