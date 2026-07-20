import type { Request, Response, NextFunction } from "express";

import { supabase } from "../config/supabase.js";

import { AppError } from "../utils/AppError.js";

export async function authenticate(
	req: Request,
	_res: Response,
	next: NextFunction
) {
	const authorization = req.headers.authorization;

	if (!authorization) {
		throw new AppError("Token não informado.", 401);
	}

	const token = authorization.replace("Bearer ", "");

	const {
		data: { user },
		error,
	} = await supabase.auth.getUser(token);

	if (error || !user) {
		throw new AppError("Token inválido.", 401);
	}

	req.user = user;

	next();
}