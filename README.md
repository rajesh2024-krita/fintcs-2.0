
# Fintcs - Finance Management System

A comprehensive Finance Management System built with Angular 18 and ASP.NET Core Web API.

## Tech Stack

### Frontend
- Angular 18 (Standalone APIs)
- Tailwind CSS
- TypeScript
- RxJS

### Backend
- ASP.NET Core 8.0 Web API
- Entity Framework Core
- SQL Server
- JWT Authentication
- AutoMapper
- FluentValidation

## Features

- **Multi-Role Authentication**: Super Admin, Society Admin, User, Member
- **Society Management**: Create and manage multiple societies
- **User Management**: CRUD operations for users with role-based access
- **Member Management**: Complete member lifecycle management
- **Loan Management**: Loan processing and tracking
- **Monthly Demand Processing**: Financial calculations and reporting
- **Voucher Management**: Accounting voucher creation and management
- **Reports**: Various financial reports and analytics

## Quick Start

### Prerequisites
- Node.js (v18 or higher)
- .NET 8.0 SDK
- SQL Server (LocalDB or Express)

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd src
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The Angular app will be available at `http://localhost:4200`

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend/Fintcs.Api
```

2. Update the connection string in `appsettings.json` if needed:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=Fintcs;Trusted_Connection=true;TrustServerCertificate=true;"
  }
}
```

3. Apply database migrations:
```bash
dotnet ef database update
```

4. Run the API:
```bash
dotnet run
```

The API will be available at `http://localhost:5000`

### Default Login

- **Username**: admin
- **Password**: admin
- **Role**: Super Admin

## Project Structure

### Frontend (`src/`)
```
src/app/
  core/           # Auth service, guards, interceptors
  shared/         # Models, utilities, shared components
  features/       # Feature modules (auth, dashboard, societies, etc.)
    auth/
    dashboard/
    societies/
    users/
    members/
    loans/
    demand/
    vouchers/
    reports/
```

### Backend (`backend/Fintcs.Api/`)
```
backend/Fintcs.Api/
  Controllers/    # API controllers
  Services/       # Business logic
  Repositories/   # Data access layer
  Models/         # Entities and DTOs
    Entities/
    DTOs/
  Data/          # DbContext and migrations
  Mapping/       # AutoMapper profiles
```

## API Documentation

Once the backend is running, visit `http://localhost:5000/swagger` for interactive API documentation.

## Development

### Adding New Features

1. **Frontend**: Create feature modules under `src/app/features/`
2. **Backend**: Add controllers, services, and repositories following the existing pattern
3. **Database**: Use Entity Framework migrations for schema changes

### Running Tests

```bash
# Frontend tests
npm test

# Backend tests
dotnet test
```

## Deployment

The application is configured to run on Replit. The frontend runs on port 4200 and the backend on port 5000.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
