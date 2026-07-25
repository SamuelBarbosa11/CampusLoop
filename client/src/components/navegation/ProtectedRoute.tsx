import type { ReactNode } from "react";

import { Navigate } from "react-router";

import { useAuth } from "../../hooks/useAuth";

import Spinner from "../Smalls/Spinner";

interface ProtectedRouteProps {
	children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
	const { isAuthenticated, loading } = useAuth();

	if (loading) {
		return (
			<div className="min-h-screen flex flex-1 justify-center items-center">
				<Spinner />
			</div>
		);
	}

	if (!isAuthenticated) {
		return <Navigate to="/auth" replace />;
	}

	return children;
}
