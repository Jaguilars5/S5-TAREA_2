import { MdDelete, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

interface Client {
	dni: string;
	nombre: string;
	valor: number;
	apellido: string;
}

interface ConsultClientProps {
	consulClients: () => Client[];
	deleteClient: (dni: string) => void;
}

export const ConsultClient: React.FC<ConsultClientProps> = ({ consulClients, deleteClient }) => {
	const clients = consulClients();


	const navigate = useNavigate();
	const handleDelete = (dni: string) => {
		swal({
			title: "¿Estás seguro?",
			text: "Una vez eliminado, no podrás recuperar este cliente",
			icon: "warning",
			buttons: ["Cancelar", "Eliminar"],
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				deleteClient(dni);
				window.location.reload();
			}
		});
	};

	const handleUpdate = ({
		dni,
		nombre,
		apellido,
		valor,
	}: {
		dni: string;
		nombre: string;
		apellido: string;
		valor: number;
	}) => {
		swal({
			title: "¿Estás seguro?",
			text: "El cliente se actualizará, y se perderá la información actual. ¿Desea continuar?",
			icon: "info",
			buttons: ["Cancelar", "Actualizar"],
			dangerMode: true,
		}).then((willUpdate) => {
			if (willUpdate) {
				navigate("/client/update", { state: { dni, nombre, apellido, valor } });
				window.location.reload();
			}
		});
	};

	return (
		<div className="overflow-x-auto">
			<div className="min-w-screen min-h-screen bg-gray-100 flex items-center justify-center  font-sans overflow-hidden">
				<div className="w-full lg:w-5/6">
					<div className="bg-white shadow-md rounded my-6">
						<table className="min-w-max w-full table-auto">
							<thead>
								<tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
									<th className="py-3 px-6 text-left">DNI</th>
									<th className="py-3 px-6 text-left">Nombre</th>
									<th className="py-3 px-6 text-left">Valor</th>
									<th className="py-3 px-6 text-center">Acciones</th>
								</tr>
							</thead>
							<tbody className="text-gray-600 text-sm font-light">
								{clients.map((client, index) => (
									<tr
										key={index}
										className="border-b border-gray-200 hover:bg-gray-100">
										<td className="py-3 px-6 text-left whitespace-nowrap">{client.dni}</td>
										<td className="py-3 px-6 text-left">{client.nombre}</td>
										<td className="py-3 px-6 text-left">{client.valor}</td>
										<td className="py-3 px-6 text-center">
											<div className="flex item-center justify-center space-x-3">
												<div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
													<MdEdit
														className="text-blue-500"
														size={20}
														onClick={() =>
															handleUpdate({
																dni: client.dni,
																nombre: client.nombre,
																apellido: client.apellido,
																valor: client.valor,
															})
														}
													/>
												</div>
												<div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
													<MdDelete
														className="text-red-500"
														size={20}
														onClick={() => handleDelete(client.dni)}
													/>
												</div>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};
