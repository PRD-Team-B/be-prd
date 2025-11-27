import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { IAppService } from './app.interface';

describe('AppController', () => {
  let appController: AppController;

  const mockAppService: IAppService = {
    getHealthCheck: jest.fn().mockResolvedValue('OK'),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        { provide: 'IAppService', useValue: mockAppService, },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  test('should return health check status', async () => {
    const result = await appController.getHello();

    expect(result).toBe('OK');
    expect(mockAppService.getHealthCheck).toHaveBeenCalled();
  });
});
