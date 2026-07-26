import { Routes, Route } from "react-router";
import { Suspense, lazy } from "react";

import Layout from "./Layout";

import ProtectedRoute from "./components/navegation/ProtectedRoute";

const Home = lazy(() => import("./pages/Home"));
const Auth = lazy(() => import("./pages/Auth"));
const Search = lazy(() => import("./pages/Search"));
const Announce = lazy(() => import("./pages/Announce"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));

import Spinner from "./components/smalls/Spinner";

function App() {
	return (
		<Suspense
			fallback={
				<div className="flex h-screen justify-center items-center">
					<Spinner />
				</div>
			}
		>
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

					<Route
						path="/profile/:id"
						element={
							<ProtectedRoute>
								<Profile />
							</ProtectedRoute>
						}
					/>
				</Route>
			</Routes>
		</Suspense>
	);
}

export default App;
