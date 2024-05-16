import { FormCheckbox, FormInput, FormSelect } from "../../components";
import { useFormik } from "formik";
import { useState } from "react";
import { validateCedula } from "../helpers/validarCedula";
import * as Yup from "yup";
import swal from "sweetalert";

interface CreateClientProps {
	createClient: (
		firstName: string,
		lastName: string,
		typeClient: string,
		dni: string,
		card: boolean
	) => void;
}

interface Client {
	dni: string;
	nombre: string;
	valor: number;
}
export const CreateClient: React.FC<CreateClientProps> = ({ createClient }) => {
	const [cardChecked, setCardChecked] = useState(false);
	const { values, handleChange, handleSubmit, errors } = useFormik({
		initialValues: {
			firstName: "",
			lastName: "",
			typeClient: "",
			dni: "",
		},
		onSubmit: async (values) => {
			const { firstName, lastName, dni, typeClient } = values;

			if (!validateCedula(dni)) {
				swal({ text: "El formato del DNI es incorrecto.", icon: "warning" });
				return;
			}

			const existingClient = localStorage.getItem("client");
			if (existingClient) {
				const parsedClients = JSON.parse(existingClient);
				const isDuplicate = parsedClients.some((client: Client) => client.dni === dni);
				if (isDuplicate) {
					swal({
						text: "Ya existe un cliente registrado con ese número de cédula",
						icon: "warning",
					});
					return;
				}
			}

			createClient(firstName, lastName, typeClient, dni, cardChecked);
			swal({
				text: "Cliente Registrado exitosamente",
				icon: "success",
			}).then(() => {
				window.location.reload();
			});
		},
		validationSchema: Yup.object({
			firstName: Yup.string().required("El nombre es obligatorio"),
			lastName: Yup.string().required("El apellido es obligatorio"),
			dni: Yup.string().required("La cédula es obligatoria"),
			typeClient: Yup.string().required("El tipo de cliente es obligatorio"),
		}),
	});

	const handleCardChange = () => {
		setCardChecked(!cardChecked);
	};

	return (
		<div className="container mx-auto">
			<div className="flex justify-center px-6 my-12">
				<div className="w-full xl:w-3/4 lg:w-11/12 flex">
					<div className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"></div>
					<div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
						<h3 className="pt-4 text-2xl text-center">Crear Cliente</h3>
						<form
							className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
							onSubmit={handleSubmit}>
							<div className="mb-4 md:flex md:justify-between">
								<FormInput
									name="firstName"
									type="text"
									placeholder="Nombre"
									className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
									label="Nombre"
									labelClassName="block mb-2 text-sm font-bold text-gray-700"
									onChange={handleChange}
									value={values.firstName}
								/>
								{errors.firstName && (
									<p className="text-red-500 text-xs italic">{errors.firstName}</p>
								)}
								<FormInput
									name="lastName"
									type="text"
									placeholder="Apellido"
									className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
									label="Apellido"
									labelClassName="block mb-2 text-sm font-bold text-gray-700"
									onChange={handleChange}
									value={values.lastName}
								/>
								{errors.lastName && (
									<p className="text-red-500 text-xs italic">{errors.lastName}</p>
								)}
							</div>
							<FormInput
								name="dni"
								type="tel"
								placeholder="Cedula"
								className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
								label="Cedula"
								labelClassName="block mb-2 text-sm font-bold text-gray-700"
								onChange={handleChange}
								value={values.dni}
							/>
							{errors.dni && <p className="text-red-500 text-xs italic">{errors.dni}</p>}
							<FormSelect
								name="typeClient"
								placeholder="Selecciona el tipo de cliente"
								className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
								label="Tipo Cliente"
								labelClassName="block mb-2 text-sm font-bold text-gray-700"
								onChange={handleChange}
								value={values.typeClient}
								options={["Regular", "Vip"]}
							/>
							{errors.typeClient && (
								<p className="text-red-500 text-xs italic">{errors.typeClient}</p>
							)}
							{values.typeClient === "Regular" && (
								<div className="mb-4 flex space-x-4">
									<FormCheckbox
										className=""
										label="Añadir tarjeta"
										labelClassName="block mb-2 text-sm font-bold text-gray-700"
										name="card"
										onChange={handleCardChange}
										checked={cardChecked}
									/>
								</div>
							)}

							<div className="mb-6 text-center">
								<button
									className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
									type="submit">
									Crear Cliente
								</button>
							</div>
							<hr className="mb-6 border-t" />
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
