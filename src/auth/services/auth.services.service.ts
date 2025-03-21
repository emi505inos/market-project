import { Injectable } from '@nestjs/common';
import { OperadorService } from 'src/operadores/services/operador.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Operadores } from 'src/operadores/entities/operadores.entities';
import { PayloadToken } from '../models/token.models';

@Injectable()
export class AuthService {
  constructor(
    private operatorService: OperadorService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const operador = await this.operatorService.findByEmail(email);
    if (operador && (await bcrypt.compare(password, operador.password))) {
      const { ...rta } = operador.toJSON();
      return rta;
    }
    return null;
  }
  generateJWT(operador: Operadores) {
    const payload: PayloadToken = { role: operador.role, sub: operador.id };
    return {
      access_token: this.jwtService.sign(payload),
      operador,
    };
  }
}
