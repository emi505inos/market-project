import { Test, TestingModule } from '@nestjs/testing';
import { OperadorController } from './operador.controller';

describe('OperadorController', () => {
  let controller: OperadorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OperadorController],
    }).compile();

    controller = module.get<OperadorController>(OperadorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
