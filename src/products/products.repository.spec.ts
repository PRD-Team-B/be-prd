import { Test, TestingModule } from '@nestjs/testing';
import { ProductsRepository } from './products.repository';
import { PrismaService } from '../../prisma/prisma.service';
import { ProductsRepositoryItf } from './products.repository.interface';
import { Prisma } from '@prisma/client';
import { handlePrismaError } from '../global/utils/prisma.error.util';
import { DatabaseException } from '../global/exception/database-exception';

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

    test('should return averageRating when rating exists', async () => {
        prismaMock.$transaction.mockResolvedValue([
            mockProduct,
            { _avg: { ratings: 4.4 }}
        ]);

        const result = await repository.getProduct(1);

        expect(result?.averageRating).toBe(4.4);
    });

    test('should return 0 when avg rating is null', async () => {
        prismaMock.$transaction.mockResolvedValue([
            mockProduct,
            { _avg: { ratings: null }}
        ]);

        const result = await repository.getProduct(1);

        expect(result?.averageRating).toBe(0);
    });

    test('test getProduct return null', async () => {
        prismaMock.$transaction.mockResolvedValue([undefined, undefined]);

        const result = await repository.getProduct(12);

        expect(prismaMock.$transaction).toHaveBeenCalled();
        expect(result).toEqual(null)

        expect(prismaMock.$transaction).toHaveBeenCalledWith([undefined, undefined])
    });

    test('should throw DatabaseException for P2025', async () => {
        const prismaErrorP2025 = {
            code: 'P2025',
            message: 'Record not found',
            clientVersion: '1',
            meta: {},
            __proto__: Prisma.PrismaClientKnownRequestError.prototype,
        };

        prismaMock.$transaction.mockRejectedValue(prismaErrorP2025);
        await expect(repository.getProduct(99)).rejects.toThrow(new DatabaseException('data in database not found'));
    });

    test('should throw generic known request error', async () => {
        const prismaError = {
            code: 'P1002',
            message: 'Timeout reached',
            clientVersion: '1',
            meta: {},
            __proto__: Prisma.PrismaClientKnownRequestError.prototype,
        };

        prismaMock.$transaction.mockRejectedValue(prismaError);
        await expect(repository.getProduct(1)).rejects.toThrow(new DatabaseException('Database error: P1002 - Timeout reached'));
    });

    test('should throw initialization error', async () => {
        const initError = {
        message: 'Connection failed',
        __proto__: Prisma.PrismaClientInitializationError.prototype
        };

        prismaMock.$transaction.mockRejectedValue(initError);
        await expect(repository.getProduct(1)).rejects.toThrow(new DatabaseException('Database connection failed: Connection failed'));
    });

    test('should throw validation error', async () => {
        const validationError = {
        message: 'Invalid query',
        __proto__: Prisma.PrismaClientValidationError.prototype
        };

        prismaMock.$transaction.mockRejectedValue(validationError);
        await expect(repository.getProduct(1)).rejects.toThrow(new DatabaseException('Invalid database query: Invalid query'));
    });

    test('handlePrismaError for Postgres native error', async () => {
        const pgError = { code: '42P01', message: 'table does not exist' };

        prismaMock.$transaction.mockRejectedValue(pgError);
        await expect(repository.getProduct(1)).rejects.toThrow(/Postgres error: 42P01/);
    });
});
