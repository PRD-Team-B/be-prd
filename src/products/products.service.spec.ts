import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { ProductsServiceItf } from './products.service.interface';
import { ProductNotFoundException } from './exception/product-notFound-exception';

describe('ProductsService', () => {
  let service: ProductsServiceItf;

  const mockRepository = {
    getProduct: jest.fn()
  }

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
      providers: [
        ProductsService,
        { provide: 'ProductsRepositoryItf', useValue: mockRepository }
      ],
    }).compile();

    service = module.get<ProductsServiceItf>(ProductsService);
  });

  test('test getOneProduct return detail product', async() => {
    mockRepository.getProduct.mockResolvedValue(mockProduct);

    const result = await service.getOneProduct(1);
    
    expect(result).toEqual(mockProduct);

    expect(mockRepository.getProduct).toHaveBeenCalledWith(1)
  });

  test('test getOneProduct throw error', async () => {
    mockRepository.getProduct.mockResolvedValue(null);

    const result = service.getOneProduct(12);

    await expect(result).rejects.toThrow(ProductNotFoundException)

    expect(mockRepository.getProduct).toHaveBeenCalledWith(12)
  })
});
