import { Request } from "express";

export function authorization(
  request: Request,
  securityName: string,
  scopes?: string[]
) {
  return new Promise((resolve, reject) => {
    
  });
}