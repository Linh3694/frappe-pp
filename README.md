# Parent Portal Frontend

Frontend application cho Wellspring Parent Portal, được tách riêng từ Frappe app để deploy độc lập.

## 🚀 Cài Đặt và Chạy

### Yêu Cầu Hệ Thống

- Node.js 18+
- Yarn package manager
- Backend API server đang chạy

### 1. Cài Đặt Dependencies

```bash
yarn install
```

### 2. Cấu Hình Environment

Tạo file `.env` từ template:

```bash
cp .env.example .env
```

Cập nhật các biến môi trường trong `.env`:

```env
# URL của backend API server
VITE_BACKEND_URL=http://your-backend-server:8000

# Site name cho Frappe
VITE_SITE_NAME=your-site-name

# Socket port (optional)
VITE_SOCKET_PORT=9000

# Other configs
VITE_BASE_NAME=/
VITE_ASSET_URL=
VITE_VERSION=1.0.1
VITE_PROVINCES_VN_API=https://provinces.open-api.vn/api
```

### 3. Development Server

```bash
yarn dev
```

Ứng dụng sẽ chạy tại `http://localhost:3000`

### 4. Production Build

```bash
yarn build
```

Files build sẽ được tạo trong thư mục `dist/`

## 🔧 Cấu Hình Backend

### CORS Configuration

Backend cần cấu hình CORS để accept requests từ frontend domain. Thêm vào `site_config.json`:

```json
{
  "allow_cors": "*",
  "cors_headers": [
    "Authorization",
    "Content-Type",
    "X-Frappe-CSRF-Token",
    "X-Frappe-CMD"
  ]
}
```

### API Endpoints

Frontend sử dụng các API endpoints sau từ backend:

- `/api/method/*` - Frappe API methods
- `/api/resource/*` - REST API resources
- `/app/*` - App routes
- `/assets/*` - Static assets
- `/files/*` - File uploads/downloads

## 🏗️ Kiến Trúc

### Tech Stack

- **React 18** + TypeScript
- **Vite** - Build tool & dev server
- **TailwindCSS** - Styling
- **Radix UI** - Component library
- **frappe-react-sdk** - API integration

### Project Structure

```
src/
├── api/              # API hooks và services
├── app/              # Main app routes & pages
├── core/             # Core UI components
│   ├── ui/
│   │   ├── atoms/    # Basic components
│   │   ├── molecules/# Composed components
│   │   └── templates/# Page templates
│   └── locales/      # i18n translations
├── features/         # Feature-specific components
├── lib/              # Utility libraries
└── config/           # App configuration

```

## 🔗 API Integration

Frontend sử dụng `frappe-react-sdk` để tương tác với backend:

```typescript
import { useFrappeGetCall } from "frappe-react-sdk";

// Example API call
const { data, error, isLoading } = useFrappeGetCall(
  "parent_portal.api.sis_student.student.get_student_info",
  { student_id: "STU-001" }
);
```

## 🚀 Deployment

### Static Hosting

1. Build production files: `yarn build`
2. Upload `dist/` folder to static hosting service
3. Configure server để serve `index.html` cho all routes (SPA routing)

### Nginx Configuration Example

```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /path/to/dist;
    index index.html;

    # Handle client-side routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Proxy API calls to backend
    location /api/ {
        proxy_pass http://your-backend-server:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 📝 Notes

- Frontend hoàn toàn độc lập với backend Frappe app
- Có thể deploy trên domain/server khác với backend
- Tất cả API calls được proxy qua Vite dev server trong development
- Production cần cấu hình reverse proxy cho API calls
