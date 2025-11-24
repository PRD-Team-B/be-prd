# Product Management API

A RESTful API backend built with NestJS for managing products and reviews. This application provides endpoints to retrieve product details along with customer reviews and calculated average ratings.

## 🚀 Features

- **Product Management**: Retrieve product details with reviews
- **Review System**: View product reviews with ratings
- **Average Rating Calculation**: Automatically calculates average ratings from reviews
- **Request Logging**: Comprehensive logging middleware for all requests
- **Rate Limiting**: Built-in rate limiting (10 requests per minute per IP)
- **Input Validation**: Automatic request validation using class-validator
- **Response Transformation**: Standardized API response format
- **Database Transactions**: Ensures data consistency with Prisma transactions
- **CORS Support**: Configured for cross-origin requests

## 🛠️ Tech Stack

- **Framework**: [NestJS](https://nestjs.com/) 11.x
- **Language**: TypeScript 5.7
- **Database**: PostgreSQL
- **ORM**: Prisma 6.16
- **Package Manager**: pnpm
- **Validation**: class-validator, class-transformer
- **Testing**: Jest

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **pnpm** - Package manager - [Installation Guide](https://pnpm.io/installation)
- **PostgreSQL** (v12 or higher) - [Download](https://www.postgresql.org/download/)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd be-prd
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/database_name?schema=public"
   DIRECT_URL="postgresql://username:password@localhost:5432/database_name?schema=public"
   PORT=3000
   NODE_ENV=development
   ```
   
   Replace the placeholders with your actual PostgreSQL credentials:
   - `username`: Your PostgreSQL username
   - `password`: Your PostgreSQL password
   - `database_name`: Your database name
   - `localhost:5432`: Your PostgreSQL host and port (adjust if different)

4. **Set up the database**
   
   Generate Prisma Client:
   ```bash
   npx prisma generate
   ```
   
   Run database migrations:
   ```bash
   npx prisma migrate deploy
   ```
   
   Or for development (creates new migration if schema changed):
   ```bash
   npx prisma migrate dev
   ```

5. **Seed the database (Optional)**
   
   Populate the database with sample data:
   ```bash
   pnpm run seed
   ```
   
   This will create sample products with reviews for testing.

## 🏃 Running the Application

### Development Mode
```bash
pnpm run start:dev
```
Runs the app in watch mode with hot-reload enabled.

### Production Mode
```bash
# Build the application
pnpm run build

# Run the production build
pnpm run start:prod
```

### Standard Start
```bash
pnpm run start
```

The application will be available at `http://localhost:3000` (or the port specified in your `.env` file).

## 📚 API Endpoints

### Health Check
```
GET /health
```
Returns the health status of the application.

**Response:**
```json
{
  "message": "success",
  "data": "OK"
}
```

### Get Product by ID
```
GET /products/:id
```
Retrieves a product by its ID, including all reviews and the calculated average rating.

**Parameters:**
- `id` (number, required): Product ID

**Response:**
```json
{
  "message": "success",
  "data": {
    "id": 1,
    "title": "Kebaya",
    "photo": "https://example.com/image.jpg",
    "quantity": 10,
    "averageRating": 4.4,
    "created_at": "2022-08-01T08:10:00.000Z",
    "updated_at": "2022-08-01T08:10:00.000Z",
    "reviews": [
      {
        "id": 1,
        "products_id": 1,
        "name": "Sarah",
        "ratings": 5,
        "comments": "The lace quality is amazing!",
        "created_at": "2024-11-01T08:10:00.000Z"
      }
    ]
  }
}
```

**Error Responses:**
- `404 Not Found`: Product with the given ID does not exist
- `400 Bad Request`: Too many requests (rate limit exceeded)
- `500 Internal Server Error`: Server-side error

## 📁 Project Structure

```
be-prd/
├── prisma/
│   ├── migrations/          # Database migrations
│   ├── schema.prisma        # Prisma schema definition
│   ├── seed.ts              # Database seeding script
│   ├── prisma.module.ts     # Prisma module
│   └── prisma.service.ts    # Prisma service
├── src/
│   ├── global/
│   │   ├── interceptors/    # Response transformation interceptors
│   │   └── middlewares/     # Global middlewares (logger, rate-limit)
│   ├── products/
│   │   ├── dto/             # Data Transfer Objects
│   │   ├── products.controller.ts
│   │   ├── products.service.ts
│   │   ├── products.repository.ts
│   │   └── *.interface.ts   # TypeScript interfaces
│   ├── app.module.ts        # Root application module
│   ├── app.controller.ts    # Root controller
│   └── main.ts              # Application entry point
├── test/                    # E2E tests
├── package.json
└── README.md
```

## 🏗️ Architecture

The project follows a **layered architecture** pattern:

- **Controller Layer**: Handles HTTP requests and responses
- **Service Layer**: Contains business logic
- **Repository Layer**: Handles data access and database operations
- **Interface-based Design**: Uses TypeScript interfaces for dependency injection

### Key Design Patterns

- **Dependency Injection**: All services use NestJS DI with interface tokens
- **Repository Pattern**: Separates data access logic from business logic
- **DTO Pattern**: Uses Data Transfer Objects for request/response transformation
- **Middleware Pattern**: Global middlewares for cross-cutting concerns

## 🧪 Testing

### Run Unit Tests
```bash
pnpm run test
```

### Run Tests in Watch Mode
```bash
pnpm run test:watch
```

### Run E2E Tests
```bash
pnpm run test:e2e
```

### Generate Test Coverage
```bash
pnpm run test:cov
```

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm run build` | Compile TypeScript to JavaScript |
| `pnpm run start` | Start the application |
| `pnpm run start:dev` | Start in development mode with watch |
| `pnpm run start:debug` | Start in debug mode |
| `pnpm run start:prod` | Start production build |
| `pnpm run lint` | Run ESLint and fix issues |
| `pnpm run format` | Format code with Prettier |
| `pnpm run test` | Run unit tests |
| `pnpm run test:watch` | Run tests in watch mode |
| `pnpm run test:cov` | Run tests with coverage |
| `pnpm run test:e2e` | Run end-to-end tests |
| `pnpm run seed` | Seed the database with sample data |

## 🔒 Security Features

- **Rate Limiting**: 10 requests per minute per IP address
- **Input Validation**: Automatic validation of request data
- **CORS**: Configured for specific origins (`localhost:3000`, `localhost:8080`)
- **Error Handling**: Comprehensive error handling with proper HTTP status codes

## 🗄️ Database Schema

### Products Table
- `id` (Primary Key)
- `title` (VARCHAR 100)
- `photo` (TEXT)
- `description` (TEXT)
- `quantity` (INT)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Reviews Table
- `id` (Primary Key)
- `products_id` (Foreign Key → Products.id)
- `name` (VARCHAR 100)
- `ratings` (INT)
- `comments` (TEXT)
- `created_at` (TIMESTAMP)

## 🔍 Prisma Commands

```bash
# Generate Prisma Client
npx prisma generate

# Create a new migration
npx prisma migrate dev --name migration_name

# Apply migrations
npx prisma migrate deploy

# Open Prisma Studio (Database GUI)
npx prisma studio

# Reset database (⚠️ deletes all data)
npx prisma migrate reset
```

## 🐛 Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running: `pg_isready` or check your PostgreSQL service
- Check your `.env` file has correct `DATABASE_URL` and `DIRECT_URL`
- Ensure the database exists: `CREATE DATABASE database_name;`

### Port Already in Use
- Change the `PORT` in your `.env` file
- Or kill the process using the port (Windows: `netstat -ano | findstr :3000`)

### Prisma Client Not Generated
- Run `npx prisma generate` after schema changes
- Ensure `DATABASE_URL` is set correctly

## 📄 License

This project is private and unlicensed.

## 👥 Contributing

This is created by Salman Althof and Indra Nurfauzi as part of Team B.
