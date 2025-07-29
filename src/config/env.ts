const env = {
  BASE_NAME: import.meta.env.VITE_BASE_NAME || "/", // Root path cho standalone app
  ASSET_URL: import.meta.env.VITE_ASSET_URL || "",
  VERSION: import.meta.env.VITE_VERSION || "1.0.1",
  PROVINCES_VN_API: import.meta.env.VITE_PROVINCES_VN_API || "https://provinces.open-api.vn/api",
  FRAPPE_PATH: import.meta.env.VITE_FRAPPE_PATH || "https://admin.sis.wellspring.edu.vn",
  SITE_NAME: import.meta.env.VITE_SITE_NAME || "admin.sis.wellspring.edu.vn",
}
export default env