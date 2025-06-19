# Build & Run Guide for Task Manager

## Prerequisites
- PHP 8.2+
- Composer
- Node.js 18+
- npm
- MySQL 8+

## 1. Clone the Repository
```bash
git clone <repository-url>
cd task-manager
```

## 2. Backend Setup (Laravel)

### Install PHP Dependencies
```bash
composer install
```

### Create Environment File
```bash
cp .env.example .env
```

### Generate Application Key
```bash
php artisan key:generate
```

### Configure Database
Edit `.env` and set:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=task_manager
DB_USERNAME=taskuser
DB_PASSWORD=taskpass123
```

### Start MySQL and Create Database/User
```bash
sudo systemctl start mysql
sudo mysql -e "CREATE DATABASE IF NOT EXISTS task_manager; CREATE USER IF NOT EXISTS 'taskuser'@'localhost' IDENTIFIED BY 'taskpass123'; GRANT ALL PRIVILEGES ON task_manager.* TO 'taskuser'@'localhost'; FLUSH PRIVILEGES;"
```

### Run Migrations & Seeders
```bash
php artisan migrate
php artisan db:seed
```

### Start Laravel Server
```bash
php artisan serve --host=0.0.0.0 --port=8000
```

## 3. Frontend Setup (Next.js)

### Install Node Dependencies
```bash
cd frontend
npm install
```

### Configure Axios (if needed)
Edit `frontend/axios.js`:
```js
import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:8000/api",
});
export default instance;
```

### Start Next.js Dev Server
```bash
npm run dev
```

## 4. Access the App
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:8000/api/tasks](http://localhost:8000/api/tasks)

## 5. API Usage Examples
- Create a task:
  ```bash
  curl -X POST http://localhost:8000/api/tasks \
    -H "Content-Type: application/json" \
    -d '{"title":"My Task","description":"Details","status":"pending"}'
  ```
- Update a task:
  ```bash
  curl -X PUT http://localhost:8000/api/tasks/1 \
    -H "Content-Type: application/json" \
    -d '{"title":"Updated","description":"New desc","status":"completed"}'
  ```
- Delete a task:
  ```bash
  curl -X DELETE http://localhost:8000/api/tasks/1
  ``` 