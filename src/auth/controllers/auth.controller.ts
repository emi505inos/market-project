import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { Operadores } from 'src/operadores/entities/operadores.entities';
import { AuthService } from '../services/auth.services.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req: Request) {
    const operador = req.user as Operadores;
    return this.authService.generateJWT(operador);
  }
}
