import type { Request, Response } from 'express'
import type { ICurrentUser } from '../interfaces/user/user.interface'

export interface GqlContext {
	res: Response
	req: Request & {
		user: ICurrentUser
	}
}

export interface GqlRequest extends Request {
	user: ICurrentUser
}
