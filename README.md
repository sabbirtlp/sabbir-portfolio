# Sabbir Hossain | Full-Stack Portfolio & CMS

![Portfolio Header](https://raw.githubusercontent.com/sabbirtlp/sabbir-portfolio/main/public/icon.png)

A high-performance, premium developer portfolio built with the latest web technologies. This project features a custom-built **Content Management System (CMS)** for real-time portfolio management, integrated with MongoDB Atlas and Vercel Blob Storage.

---

## 🚀 The Tech Stack

This project leverages cutting-edge tools to deliver an immersive, butter-smooth user experience:

- **Framework**: [Next.js 16+](https://nextjs.org/) (App Router & Turbopack)
- **UI Library**: [React 19](https://react.dev/)
- **Animation Engine**: [GSAP](https://gsap.com/) & [Framer Motion](https://www.framer.com/motion/) for premium micro-interactions.
- **3D Graphics**: [Three.js](https://threejs.org/) & [React Three Fiber](https://r3f.docs.pmnd.rs/) for interactive orbit and particle systems.
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) with a custom high-end design system.
- **Database**: [MongoDB Atlas](https://www.mongodb.com/atlas) for persistent content management.
- **Asset Storage**: [Vercel Blob](https://vercel.com/storage/blob) for high-speed production image uploads.
- **Deployment**: [Vercel](https://vercel.com/) (Serverless Architecture).

---

## ✨ Key Features

- **Dynamic Case Studies**: Deep-dive project pages with immersive mockups and detailed project metrics.
- **Custom Admin Dashboard**: A secure, proprietary CMS to update "Hero" sections, "About Me" details, and "Case Studies" without touching the code.
- **Night Diamond Cursor**: A custom-engineered, angular cursor with high-performance spring physics.
- **Tech Spider System**: A dynamic, interactive particle web illustrating my technical ecosystem.
- **Glassmorphic UI**: Modern aesthetic with deep gradients, subtle noise overlays, and vibrant glow effects.

---

## 🧠 Technical Challenges & Solutions

### 1. High-Performance Animation at Scale
**Challenge**: Integrating complex Three.js particle systems and GSAP animations while maintaining a 60fps frame rate on mobile devices.
**Solution**: Implemented dynamic particle density scaling based on viewport width and utilized `requestAnimationFrame` optimizations. Leveraged `Framer Motion` for layout transitions to keep the main thread unblocked.

### 2. Serverless Content Management
**Challenge**: Building a functional CMS that works seamlessly on Vercel's read-only serverless environment.
**Solution**: Migrated from local JSON storage to a distributed MongoDB Atlas cluster. Implemented a robust API layer with automatic cache-busting and Vercel Blob integration for handling binary image data in a serverless context.

### 3. Responsive 3D Layouts
**Challenge**: Ensuring 3D elements like the "Orbit" and "Tech Stack" remain interactive and visually balanced across all device ratios.
**Solution**: Developed custom React hooks to manage responsive 3D stage scaling and used CSS Grid/Flex for seamless overlay integration.

---

## 🛠️ Setup & Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sabbirtlp/sabbir-portfolio.git
   cd sabbir-portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env.local` file and add the following:
   ```env
   MONGODB_URI=your_mongodb_uri
   BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=your_secure_password
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

---

## 📸 Dashboard Preview

![Admin Dashboard](file:///G:/My%20Portfolio%20Website%20using%20Next%20Js/admin_case_studies_tab_1776615291350.png)

---

Developed with ❤️ by [Sabbir Hossain](https://github.com/sabbirtlp)
