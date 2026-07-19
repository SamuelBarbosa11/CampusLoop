import { Routes, Route } from "react-router";

import Layout from "./Layout";

import ProtectedRoute from "./components/navegation/ProtectedRoute";

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Announce from "./pages/Announce";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Search from "./pages/Search";

function App() {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route path="/" element={<Home />} />

				<Route path="/auth" element={<Auth />} />

				<Route path="/search" element={<Search />} />

				<Route
					path="/announce"
					element={
						<ProtectedRoute>
							<Announce />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/dashboard"
					element={
						<ProtectedRoute>
							<Dashboard />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/profile"
					element={
						<ProtectedRoute>
							<Profile />
						</ProtectedRoute>
					}
				/>
			</Route>
		</Routes>
	);
}

export default App;
