import ReactDOM from "react-dom/client";
import "./index.css";
import { AppRouter } from "./Router/AppRouter";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<AppRouter />
	</BrowserRouter>
);
