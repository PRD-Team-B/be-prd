import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsServiceItf } from './products.service.interface';
import { CustomExceptionGen } from '../global/exception/exception.general';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsServiceItf;

  const mockService = {
    getOneProduct: jest.fn()
  }

  const mockCustomError = new CustomExceptionGen('Error Custom');
  const mockDefaultError = new Error('something wrong on our side');

  const mockProduct = {
      id: 1,
      title: "Kebaya",
      photo: "https://res.cloudinary.com/dgquproum/image/upload/v1763630448/kebaya-akad_fykjea.jpg",
      quantity: 10,
      avg: { ratings: 4.4 },
      created_at: "2022-08-01T08:10:00.000Z",
      updated_at: "2022-08-01T08:10:00.000Z",
      reviews: [
        { 
          id: 1,
          products_id: 1, 
          name: "Sarah", ratings: 5, 
          comments: "Bagus", 
          created_at: "2024-11-01T08:10:00.000Z" 
        },
        { 
          id: 2, 
          products_id: 1, 
          name: "Yodha",
          ratings: 5, 
          comments: "Mantap", 
          created_at: "2024-11-02T12:40:00.000Z" 
        },
      ]
    };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        ProductsController,
        { provide: 'ProductsServiceItf', useValue: mockService }
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsServiceItf>('ProductsServiceItf');
  });

  test('getProduct return product', async () => {
    mockService.getOneProduct.mockResolvedValue(mockProduct);

    const result = await controller.getProduct(1);
    
    expect(result).toEqual(mockProduct);
    expect(service.getOneProduct).toHaveBeenCalledWith(1)
  });

  test('getProduct catch custom error', async () => {
    mockService.getOneProduct.mockRejectedValue(mockCustomError);

    const result = controller.getProduct(12);
    expect(result).rejects.toThrow(CustomExceptionGen);
    expect(service.getOneProduct).toHaveBeenCalledWith(12)
  })
});
