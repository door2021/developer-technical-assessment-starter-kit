import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as PassportJwtStrategy, StrategyOptions } from 'passport-jwt';
import { JwtPayload } from './interfaces/jwt-payload.strategy';

@Injectable()
export class JwtStrategy extends PassportStrategy(PassportJwtStrategy) {
  constructor() {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET not set');
    }

    const opts: StrategyOptions = {
      jwtFromRequest: (req: unknown) => {
        if (typeof req !== 'object' || req === null) return null;
        const r = req as Record<string, unknown>;
        const headers = r.headers;
        if (typeof headers !== 'object' || headers === null) return null;
        const h = headers as Record<string, unknown>;
        const authHeader = h['authorization'] ?? h['Authorization'];
        if (authHeader == null) return null;
        if (Array.isArray(authHeader)) {
          if (authHeader.length === 0) return null;
          if (typeof authHeader[0] !== 'string') return null;
          const parts = authHeader[0].split(' ');
          if (parts.length === 2 && /^Bearer$/i.test(parts[0])) return parts[1];
          return null;
        }
        if (typeof authHeader !== 'string') return null;
        const parts = authHeader.split(' ');
        if (parts.length === 2 && /^Bearer$/i.test(parts[0])) return parts[1];
        return null;
      },
      ignoreExpiration: false,
      secretOrKey: secret,
    };

    super(opts as any);
  }

  validate(payload: JwtPayload) {
    return {
      userId: payload.sub,
      email: payload.email,
    };
  }
}
