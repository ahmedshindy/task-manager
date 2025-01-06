# Task Manager Application

## Overview
A full-stack task management application built with Laravel and Next.js, featuring real-time updates and responsive design.

## Tech Stack
- Backend: Laravel 11
- Frontend: Next.js 14
- Database: MySQL
- Styling: Tailwind CSS

## Implementation Approach

### Backend Architecture
1. **API Layer**
    - RESTful endpoints with Laravel resource controllers
    - Request validation and sanitization
    - API response standardization

2. **Database Design**
    - Tasks table with fields: id, title, description, status, created_at, updated_at
    - Status options: pending, in-progress, completed
    - Users table for authentication
    
3. **API Endpoints**
   - GET /api/tasks - List all tasks
   - GET /api/tasks/{id} - Get single task
   - POST /api/tasks - Create task
   - PUT /api/tasks/{id} - Update task
   - DELETE /api/tasks/{id} - Delete task

### Frontend Structure
1. **Core Features**
    - Responsive layout with Tailwind CSS
    - Task listing with sorting capabilities
    - Search functionality
    - Status management with visual indicators

2. **Components**
    - TaskList: Main task display component
    - SearchBar: Task search functionality
    - Sortable table headers
    - Status dropdown with color coding
    - Completed tasks with strikethrough

## Setup Instructions

### Prerequisites
- PHP 8.2+
- Node.js 18+
- MySQL 8.0+
- Composer

### Backend Setup
```bash
# Clone repository
git clone [repository-url]
cd task-manager

# Install dependencies
composer install

# Configure environment
cp .env.example .env
php artisan key:generate

# Setup database
php artisan migrate
php artisan db:seed

# Start server
php artisan serve
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

## Testing
```bash
# Backend tests
php artisan test

# Frontend tests
npm run test
```

## License
[MIT license](https://opensource.org/licenses/MIT)