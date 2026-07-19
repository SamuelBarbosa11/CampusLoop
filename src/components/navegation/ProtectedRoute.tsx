import type { ReactNode } from "react";

import { Navigate } from "react-router";

import { useAuth } from "../../auth";

interface ProtectedRouteProps {
	children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
	const { isAuthenticated, loading } = useAuth();

	if (loading) {
		return null;
	}

	if (!isAuthenticated) {
		return <Navigate to="/auth" replace />;
	}

	return children;
}
