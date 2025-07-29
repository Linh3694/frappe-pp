# Parent Portal Frontend

Frontend application cho Wellspring Parent Portal, được tách riêng thành ứng dụng độc lập.

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

#### Development (.env)

Tạo file `.env` trong thư mục root:

```bash
touch .env
```

Thêm các biến môi trường sau vào file `.env`:

```env
# Development Backend Configuration
VITE_FRAPPE_PATH=https://admin.sis.wellspring.edu.vn
VITE_SITE_NAME=admin.sis.wellspring.edu.vn

# Socket Configuration (optional)
VITE_SOCKET_PORT=9001

# Base Configuration cho standalone app
VITE_BASE_NAME=/
VITE_ASSET_URL=
VITE_VERSION=1.0.1

# External APIs
VITE_PROVINCES_VN_API=https://provinces.open-api.vn/api
```

#### Production (.env.production)

Tạo file `.env.production` cho production build:

```env
# Production Configuration cho Standalone Parent Portal
VITE_FRAPPE_PATH=https://admin.sis.wellspring.edu.vn
VITE_SITE_NAME=admin.sis.wellspring.edu.vn

# Socket Configuration
VITE_SOCKET_PORT=9001

# Base Configuration cho standalone app
VITE_BASE_NAME=/
VITE_ASSET_URL=
VITE_VERSION=1.0.1

# External APIs
VITE_PROVINCES_VN_API=https://provinces.open-api.vn/api
```

**Quan trọng:** Ứng dụng bây giờ chạy độc lập trên domain `parentportal.wellspring.edu.vn` và proxy API calls về backend Frappe.

### 3. Development Server

```bash
yarn dev
```

Ứng dụng sẽ chạy tại `http://localhost:8080`

### 4. Production Build

```bash
yarn build
```

Files build sẽ được tạo trong thư mục `dist/`

## 🔧 Cấu Hình Backend

### CORS Configuration

Backend cần cấu hình CORS để accept requests từ standalone domain. Thêm vào `site_config.json`:

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

### Standalone Hosting (Khuyến nghị)

Ứng dụng bây giờ được thiết kế để chạy độc lập trên `parentportal.wellspring.edu.vn`:

1. **Build production files:**

```bash
yarn build
```

2. **Upload `dist/` folder** lên web server

3. **Cấu hình web server** để:
   - Serve `index.html` cho all routes (SPA routing)
   - Proxy API calls về backend Frappe

### Nginx Configuration Example

```nginx
server {
    listen 443 ssl;
    server_name parentportal.wellspring.edu.vn;

    # SSL configuration
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;

    root /path/to/dist;
    index index.html;

    # Handle client-side routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Proxy API calls to backend Frappe
    location ~ ^/(app|api|assets|files|private) {
        proxy_pass https://admin.sis.wellspring.edu.vn;
        proxy_set_header Host admin.sis.wellspring.edu.vn;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # CORS headers
        proxy_set_header Origin https://admin.sis.wellspring.edu.vn;
        proxy_set_header Referer https://admin.sis.wellspring.edu.vn/;

        # Cookie handling
        proxy_cookie_domain admin.sis.wellspring.edu.vn parentportal.wellspring.edu.vn;
        proxy_cookie_domain .admin.sis.wellspring.edu.vn .wellspring.edu.vn;
    }
}
```

### Docker Deployment (Optional)

Tạo `Dockerfile`:

```dockerfile
FROM nginx:alpine

# Copy built files
COPY dist/ /usr/share/nginx/html/

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

## 📝 Migration Notes

### Thay đổi từ nested Frappe app sang standalone:

- ✅ **Base path:** `/parent_portal/` → `/`
- ✅ **Build output:** `../parent_portal/public/parent_portal` → `dist/`
- ✅ **PWA start_url:** `/parent_portal/` → `/`
- ✅ **Domain:** Nested trong Frappe → `parentportal.wellspring.edu.vn`
- ✅ **Assets:** Được serve từ root thay vì nested path

### Cần cấu hình:

1. **DNS:** Point `parentportal.wellspring.edu.vn` tới server
2. **SSL Certificate:** Cho domain mới
3. **Nginx/Apache:** Proxy configuration
4. **Backend CORS:** Allow new domain

## 🔧 Troubleshooting

### Lỗi 404 trên assets

- Đảm bảo `base: '/'` trong `vite.config.ts`
- Kiểm tra web server serve static files đúng

### CORS Errors

- Cấu hình backend allow `parentportal.wellspring.edu.vn`
- Kiểm tra proxy headers trong nginx

### Cookie Issues

- Đảm bảo cookie domain được rewrite đúng
- Kiểm tra SameSite và Secure flags
