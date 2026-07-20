import { createContext } from "react";

import type { AuthContextData } from "./auth.types";

export const AuthContext = createContext<AuthContextData | null>(null);
