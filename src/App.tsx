import { Routes, Route } from "react-router";

import Layout from "./Layout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Announce from "./pages/Announce";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Search from "./pages/Search";

function App() {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/search" element={<Search />} />
				<Route path="/announce" element={<Announce />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/profile" element={<Profile />} />
			</Route>
		</Routes>
	);
}

export default App;
