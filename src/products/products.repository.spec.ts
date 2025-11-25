import { Test, TestingModule } from '@nestjs/testing';
import { ProductsRepository } from './products.repository';
import { PrismaService } from '../../prisma/prisma.service';
import { ProductsRepositoryItf } from './products.repository.interface';

describe('ProductsRepository - getProduct()', () => {
    let repository: ProductsRepositoryItf;
    let prismaMock: any;

    const mockProduct = {
        id: 1,
        title: "Kebaya",
        photo: "https://res.cloudinary.com/dgquproum/image/upload/v1763630448/kebaya-akad_fykjea.jpg",
        quantity: 10,
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

    const mockAvg = {
        _avg: { ratings: 4.4 }
    };

    beforeEach(async () => {
        prismaMock = {
            products: {
                findUnique: jest.fn(),
            },
            reviews: {
                aggregate: jest.fn(),
            },
            $transaction: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
        providers: [
            ProductsRepository,
            { provide: PrismaService, useValue: prismaMock },
        ],
        }).compile();

        repository = module.get<ProductsRepositoryItf>(ProductsRepository);
    });

    afterEach(() => jest.clearAllMocks());

    test('test getProduct return detail product', async () => {
        prismaMock.$transaction.mockResolvedValue([
            mockProduct,
            mockAvg
        ]);

        const result = await repository.getProduct(1);

        expect(prismaMock.$transaction).toHaveBeenCalled();
        expect(result).toEqual({
            ...mockProduct,
            averageRating: 4.4
        });

        expect(prismaMock.$transaction).toHaveBeenCalledWith([
            prismaMock.products.findUnique({
                where: { id: 1 },
                include: { reviews: true }
            }),
            prismaMock.reviews.aggregate({
                _avg: { ratings: true },
                where: { products_id: 1 }
            })
        ]);
    });

    test('test getProduct return null', async () => {
        prismaMock.$transaction.mockResolvedValue([undefined, undefined]);

        const result = await repository.getProduct(12);

        expect(prismaMock.$transaction).toHaveBeenCalled();
        expect(result).toEqual(null)

        expect(prismaMock.$transaction).toHaveBeenCalledWith([undefined, undefined])
    })
});
