import { FormInput } from "../../components"; 
import { useFormik } from "formik"; 
import * as Yup from "yup"; 
import swal from "sweetalert"; 

interface CreateProductProps {
    createProduct: (
        description: string,
        price: number,
        stock: number
    ) => void; // Define el tipo de la función para crear productos
}

export const CreateProduct: React.FC<CreateProductProps> = ({ createProduct }) => {
    const { values, handleChange, handleSubmit, errors } = useFormik({
        initialValues: {
            description: "",
            price: "",
            stock: "",
        },
        onSubmit: async (values) => {
            const { description, price, stock } = values;

            // Validación de los campos del formulario
            if (!description || !price || !stock) {
                swal({ text: "Todos los campos son obligatorios.", icon: "warning" });
                return;
            }

            // Llama a la función para crear el producto
            createProduct(description, Number(price), Number(stock));
            // Muestra un mensaje de éxito
            swal({
                text: "Producto creado exitosamente",
                icon: "success",
            }).then(() => {
                window.location.reload();
            });
        },
        validationSchema: Yup.object({
            description: Yup.string().required("La descripción es obligatoria"),
            price: Yup.number().required("El precio es obligatorio"),
            stock: Yup.number().required("El stock es obligatorio"),
        }),
    });

    return (
        <div className="container mx-auto">
            <div className="flex justify-center px-6 my-12">
                <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                    <div className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"></div>
                    <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
                        <h3 className="pt-4 text-2xl text-center">Crear Producto</h3>
                        <form
                            className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
                            onSubmit={handleSubmit}
                        >
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
                            {errors.price && (
                                <p className="text-red-500 text-xs italic">{errors.price}</p>
                            )}
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
                            {errors.stock && (
                                <p className="text-red-500 text-xs italic">{errors.stock}</p>
                            )}

                            <div className="mb-6 text-center">
                                <button
                                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Crear Producto
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
