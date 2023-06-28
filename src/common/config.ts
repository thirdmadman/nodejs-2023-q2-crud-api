import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

export const PORT = process.env.PORT || '8000';
export const HOST = process.env.HOST || 'localhost';
export const NODE_ENV = process.env.NODE_ENV || 'production';
export const API_PREFIX = process.env.API_PREFIX || '/api/';
