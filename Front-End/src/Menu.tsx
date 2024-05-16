import { Link } from "react-router-dom";
import { FaUserPlus, FaUsers } from "react-icons/fa"; // Importa los iconos necesarios

export const App: React.FC = () => {
	return (
		<section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
			<div className="text-center pb-12">
				<h2 className="text-base font-bold text-indigo-600">Administra tus clientes</h2>
				<h1 className="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-gray-900">
					Explora tu base de clientes
				</h1>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<Link
					to={"/client/create"}
					className="w-full bg-slate-300 rounded-lg p-12 flex flex-col justify-center items-center">
					<div className="mb-8">
						<FaUserPlus className="text-5xl text-gray-700 mb-4" />
					</div>
					<div className="text-center">
						<p className="text-xl text-gray-700 font-bold mb-2">Crear Nuevo Cliente</p>
						<p className="text-base text-gray-400 font-normal">
							Agrega un nuevo cliente a tu lista
						</p>
					</div>
				</Link>
				<Link
					to={"/client/consult"}
					className="w-full bg-slate-300 rounded-lg p-12 flex flex-col justify-center items-center">
					<div className="mb-8">
						<FaUsers className="text-5xl text-gray-700 mb-4" />
					</div>
					<div className="text-center">
						<p className="text-xl text-gray-700 font-bold mb-2">Visualizar Clientes</p>
						<p className="text-base text-gray-400 font-normal">Explora tus clientes existentes</p>
					</div>
				</Link>
			</div>
		</section>
	);
};
