import { FormInput } from "../../components";
import { useFormik } from "formik";

import { useLocation } from "react-router-dom";
import * as Yup from "yup";
import swal from "sweetalert";

interface UpdateProductProps {
	updateProduct: (id: string, description: string, price: number, stock: number) => void;
}

export const UpdateProduct: React.FC<UpdateProductProps> = ({ updateProduct }) => {
	const location = useLocation();
	const { id, description, price, stock } = location.state;
	const { values, handleChange, handleSubmit, errors } = useFormik({
		initialValues: {
			description,
			price: price.toString(),
			stock: stock.toString(),
		},
		onSubmit: async (values) => {
			const { description, price, stock } = values;

			if (!description || !price || !stock) {
				return;
			}

			updateProduct(id, description, Number(price), Number(stock));
			swal({
				text: "Producto actualizado",
				icon: "success",
			}).then(() => {
				window.location.reload();
			});
		},
		validationSchema: Yup.object({
			description: Yup.string().required("La descripción es obligatoria"),
			price: Yup.number()
				.required("El precio es obligatorio")
				.positive("El precio debe ser positivo"),
			stock: Yup.number()
				.required("El stock es obligatorio")
				.integer("El stock debe ser un número entero")
				.min(0, "El stock debe ser mayor o igual a cero"),
		}),
	});

	return (
		<div className="container mx-auto">
			<div className="flex justify-center px-6 my-12">
				<div className="w-full xl:w-3/4 lg:w-11/12 flex">
					<div className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"></div>
					<div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
						<h3 className="pt-4 text-2xl text-center">Actualizar Producto</h3>
						<form
							className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
							onSubmit={handleSubmit}>
							<div className="mb-4 md:flex md:justify-between">
								<FormInput
									name="description"
									type="text"
									placeholder="Descripción"
									className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
									label="Descripción"
									labelClassName="block mb-2 text-sm font-bold text-gray-700"
									onChange={handleChange}
									value={values.description}
								/>
								{errors.description && (
									<p className="text-red-500 text-xs italic">{errors.description}</p>
								)}
								<FormInput
									name="price"
									type="number"
									placeholder="Precio"
									className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
									label="Precio"
									labelClassName="block mb-2 text-sm font-bold text-gray-700"
									onChange={handleChange}
									value={values.price}
								/>
								{errors.price && <p className="text-red-500 text-xs italic">{errors.price}</p>}
								<FormInput
									name="stock"
									type="number"
									placeholder="Stock"
									className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
									label="Stock"
									labelClassName="block mb-2 text-sm font-bold text-gray-700"
									onChange={handleChange}
									value={values.stock}
								/>
								{errors.stock && <p className="text-red-500 text-xs italic">{errors.stock}</p>}
							</div>

							<div className="mb-6 text-center">
								<button
									className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
									type="submit">
									Actualizar Producto
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
