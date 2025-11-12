# API Documentation

## Overview

The Expense Manager API provides comprehensive endpoints for managing financial data across multiple domains.

## Base URL

```
https://api.expense-manager.com/v1
```

## Authentication

All API requests require authentication via JWT token:

```http
Authorization: Bearer <jwt_token>
```

## Domains

### Banking Domain

#### Banks
- `GET /banks` - Get all banks
- `POST /banks` - Create new bank
- `GET /banks/:id` - Get bank by ID
- `PUT /banks/:id` - Update bank
- `DELETE /banks/:id` - Delete bank

#### Bank Accounts
- `GET /bank-accounts` - Get all bank accounts
- `POST /bank-accounts` - Create new bank account
- `GET /bank-accounts/:id` - Get bank account by ID
- `PUT /bank-accounts/:id` - Update bank account
- `DELETE /bank-accounts/:id` - Delete bank account

#### Credit Cards
- `GET /credit-cards` - Get all credit cards
- `POST /credit-cards` - Create new credit card
- `GET /credit-cards/:id` - Get credit card by ID
- `PUT /credit-cards/:id` - Update credit card
- `DELETE /credit-cards/:id` - Delete credit card

#### EMIs
- `GET /emis` - Get all EMIs
- `POST /emis` - Create new EMI
- `GET /emis/:id` - Get EMI by ID
- `PUT /emis/:id` - Update EMI
- `DELETE /emis/:id` - Delete EMI

### Expenses Domain

#### Expenses
- `GET /expenses` - Get all expenses
- `POST /expenses` - Create new expense
- `GET /expenses/:id` - Get expense by ID
- `PUT /expenses/:id` - Update expense
- `DELETE /expenses/:id` - Delete expense
- `GET /expenses/filter` - Get filtered expenses

#### Categories
- `GET /categories` - Get all categories
- `POST /categories` - Create new category
- `GET /categories/:id` - Get category by ID
- `PUT /categories/:id` - Update category
- `DELETE /categories/:id` - Delete category

### Income Domain

#### Income Sources
- `GET /income-sources` - Get all income sources
- `POST /income-sources` - Create new income source
- `GET /income-sources/:id` - Get income source by ID
- `PUT /income-sources/:id` - Update income source
- `DELETE /income-sources/:id` - Delete income source

#### Income Records
- `GET /income` - Get all income records
- `POST /income` - Create new income record
- `GET /income/:id` - Get income record by ID
- `PUT /income/:id` - Update income record
- `DELETE /income/:id` - Delete income record

### Reports Domain

#### Financial Reports
- `GET /reports/expense-summary` - Get expense summary report
- `GET /reports/income-summary` - Get income summary report
- `GET /reports/category-breakdown` - Get category breakdown report
- `GET /reports/monthly-trend` - Get monthly trend report
- `GET /reports/custom` - Get custom report

### User Domain

#### User Management
- `GET /user/profile` - Get user profile
- `PUT /user/profile` - Update user profile
- `GET /user/preferences` - Get user preferences
- `PUT /user/preferences` - Update user preferences

## Request/Response Format

### Request Format
```json
{
  "data": {
    "field1": "value1",
    "field2": "value2"
  }
}
```

### Response Format
```json
{
  "data": {
    "id": "123",
    "field1": "value1",
    "field2": "value2",
    "createdAt": "2024-01-01T00:00:00Z"
  },
  "success": true,
  "message": "Operation completed successfully"
}
```

### Error Response Format
```json
{
  "success": false,
  "message": "Error description",
  "errors": {
    "field1": "Field-specific error message"
  }
}
```

## Pagination

For list endpoints, use query parameters:

```
GET /expenses?page=1&limit=10&sortBy=date&sortOrder=desc
```

Response includes pagination metadata:

```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

## Filtering

Use query parameters for filtering:

```
GET /expenses?startDate=2024-01-01&endDate=2024-01-31&categoryId=123&minAmount=100
```

## Rate Limiting

API requests are rate limited:
- 1000 requests per hour per user
- 100 requests per minute per user

Rate limit headers:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

## Error Codes

- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `429` - Rate Limit Exceeded
- `500` - Internal Server Error
