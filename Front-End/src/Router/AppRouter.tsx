import { Route, Routes } from "react-router-dom";
import { App } from "../Menu";
import { ClientRouter } from "../pages/client/Router/ClientRouter";
import { ProductRouter } from "../pages/products/Router/ProductRouter";

export const AppRouter = () => {
	return (
		<Routes>
			<Route
				path="/"
				element={<App />}
			/>
			<Route
				path="/client/*"
				element={<ClientRouter />}
			/>
			<Route
				path="/product/*"
				element={<ProductRouter />}
			/>
		</Routes>
	);
};
