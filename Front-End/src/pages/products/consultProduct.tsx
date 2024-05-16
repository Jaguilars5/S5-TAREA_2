import { MdDelete, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

interface Product {
    id: string;
    description: string;
    price: number;
    stock: number;
}

interface ConsultProductProps {
    consulProducts: () => Product[]; // Define la función para consultar productos
    deleteProduct: (id: string) => void; // Define la función para eliminar productos
}

export const ConsultProduct: React.FC<ConsultProductProps> = ({ consulProducts, deleteProduct }) => {
    const products = consulProducts(); // Consulta los productos
    const navigate = useNavigate();

    // Maneja la eliminación de un producto
    const handleDelete = (id: string) => {
        swal({
            title: "¿Estás seguro?",
            text: "Una vez eliminado, no podrás recuperar este producto",
            icon: "warning",
            buttons: ["Cancelar", "Eliminar"],
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                deleteProduct(id);
                window.location.reload();
            }
        });
    };

    // Maneja la actualización de un producto
    const handleUpdate = ({ id, description, price, stock }: Product) => {
        swal({
            title: "¿Estás seguro?",
            text: "El producto se actualizará, y se perderá la información actual. ¿Desea continuar?",
            icon: "info",
            buttons: ["Cancelar", "Actualizar"],
            dangerMode: true,
        }).then((willUpdate) => {
            if (willUpdate) {
                navigate("/product/update", { state: { id, description, price, stock } });
                window.location.reload();
            }
        });
    };

    return (
        <div className="overflow-x-auto">
            <div className="min-w-screen min-h-screen bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
                <div className="w-full lg:w-5/6">
                    <div className="bg-white shadow-md rounded my-6">
                        <table className="min-w-max w-full table-auto">
                            <thead>
                                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    <th className="py-3 px-6 text-left">ID</th>
                                    <th className="py-3 px-6 text-left">Descripción</th>
                                    <th className="py-3 px-6 text-left">Precio</th>
                                    <th className="py-3 px-6 text-left">Stock</th>
                                    <th className="py-3 px-6 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                                {products.map((product, index) => (
                                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-3 px-6 text-left whitespace-nowrap">{product.id}</td>
                                        <td className="py-3 px-6 text-left">{product.description}</td>
                                        <td className="py-3 px-6 text-left">{product.price}</td>
                                        <td className="py-3 px-6 text-left">{product.stock}</td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex item-center justify-center space-x-3">
                                                <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                    <MdEdit
                                                        className="text-blue-500"
                                                        size={20}
                                                        onClick={() => handleUpdate(product)}
                                                    />
                                                </div>
                                                <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                    <MdDelete
                                                        className="text-red-500"
                                                        size={20}
                                                        onClick={() => handleDelete(product.id)}
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
