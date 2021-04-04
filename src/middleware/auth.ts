import { validateJwt } from './../util/jwt';
import { Request, Response, NextFunction } from 'express'

export function auth(req: Request, res: Response, next: NextFunction) {
  try {
    let token = req.header('x-auth-token');
    if (!token)
      return res
        .status(401)
        .json({msg: 'No authentication token provided, auth denied'});
    
    // we  check if the user has provided a correct token
    const verified = validateJwt(token)
    if(!verified) return res
      .status(401)
      .json({msg: 'Token verification failed, auth denied'});

    // we add a new parameter to the request
    req.body._userId = verified.id
    next();
  } catch (err) {
    res.status(500).json({msg: 'Internal server error: ' + err.message});
  }
}