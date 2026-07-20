import type { Request, Response } from "express";

import * as profileService from "../services/profile.service.js";

export async function getMe(req: Request, res: Response) {
	const profile = await profileService.findById(req.user.id);

	res.json(profile);
}

export async function update(req: Request, res: Response) {
	const profile = await profileService.update(req.user.id, req.body);

	res.json(profile);
}