import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service.js';
import { LoginDto } from './dto/login.dto.js';
import { RegisterDto } from './dto/register.dto.js';
import { RefreshTokenDto } from './dto/refresh-token.dto.js';
import { User } from '../users/entities/user.entity.js';

type AuthenticatedUser = Pick<
  User,
  'id' | 'email' | 'name' | 'role' | 'isActive'
>;

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const user = await this.usersService.create(registerDto);
    const tokens = await this.generateTokens(user);
    await this.storeRefreshToken(user.id, tokens.refreshToken);

    return {
      user: this.sanitizeUser(user),
      ...tokens,
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    const tokens = await this.generateTokens(user);
    await this.storeRefreshToken(user.id, tokens.refreshToken);

    return {
      user: this.sanitizeUser(user),
      ...tokens,
    };
  }

  async refresh(refreshTokenDto: RefreshTokenDto) {
    try {
      const payload = await this.jwtService.verifyAsync<{
        sub: string;
        email: string;
      }>(refreshTokenDto.refreshToken, {
        secret: this.getRefreshTokenSecret(),
      });

      const user = await this.usersService.findOne(payload.sub);
      if (!user.refresh_token_hash) {
        throw new UnauthorizedException('Refresh token is not valid');
      }

      const refreshTokenMatch = await bcrypt.compare(
        refreshTokenDto.refreshToken,
        user.refresh_token_hash,
      );
      if (!refreshTokenMatch) {
        throw new UnauthorizedException('Refresh token is not valid');
      }

      const tokens = await this.generateTokens(user);
      await this.storeRefreshToken(user.id, tokens.refreshToken);

      return {
        user: this.sanitizeUser(user),
        ...tokens,
      };
    } catch {
      throw new UnauthorizedException('Refresh token is not valid');
    }
  }

  async logout(userId: string) {
    await this.usersService.setRefreshTokenHash(userId, null);
    return { message: 'Logged out successfully' };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    if (!user || !user.isActive) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  private async generateTokens(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.getAccessTokenSecret(),
        expiresIn: this.getAccessTokenExpiresIn(),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.getRefreshTokenSecret(),
        expiresIn: this.getRefreshTokenExpiresIn(),
      }),
    ]);

    return { accessToken, refreshToken };
  }

  private async storeRefreshToken(userId: string, refreshToken: string) {
    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);
    await this.usersService.setRefreshTokenHash(userId, refreshTokenHash);
  }

  private sanitizeUser(user: User): AuthenticatedUser {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      isActive: user.isActive,
    };
  }

  private getAccessTokenSecret(): string {
    return (
      this.configService.get<string>('JWT_ACCESS_SECRET') ?? 'access-secret'
    );
  }

  private getRefreshTokenSecret(): string {
    return (
      this.configService.get<string>('JWT_REFRESH_SECRET') ?? 'refresh-secret'
    );
  }

  private getAccessTokenExpiresIn(): number {
    const configuredValue = Number(
      this.configService.get<string>('JWT_ACCESS_EXPIRES_IN_SECONDS'),
    );
    return Number.isFinite(configuredValue) && configuredValue > 0
      ? configuredValue
      : 900;
  }

  private getRefreshTokenExpiresIn(): number {
    const configuredValue = Number(
      this.configService.get<string>('JWT_REFRESH_EXPIRES_IN_SECONDS'),
    );
    return Number.isFinite(configuredValue) && configuredValue > 0
      ? configuredValue
      : 604800;
  }
}
