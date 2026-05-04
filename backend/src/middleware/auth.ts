import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    res.status(401).json({ error: 'No token provided' });
    return;
  }

  // Extrair o token removendo 'Bearer ' se presente
  const token = authHeader.startsWith('Bearer ') ? authHeader.split('Bearer ')[1] : authHeader;

  // 1. Verificar se é o token estático (para leads do site público)
  if (token === process.env.API_TOKEN) {
    return next();
  }

  // 2. Tentar verificar como Firebase ID Token
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    (req as any).user = decodedToken;
    next();
  } catch (error) {
    console.error('Error verifying Firebase ID token:', error);
    res.status(401).json({ error: 'Unauthorized' });
  }
};
