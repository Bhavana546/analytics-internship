# 📊 Analytics Internship Project — Full Stack Deployment

A complete **Document Analytics Dashboard** built for internship challenge — combining **Next.js frontend**, **Node.js + Prisma API backend**, and a **PostgreSQL database**, all fully deployed on **Render Cloud**.

---

## 🌐 Live Project Links

| Component | Description | Live URL |
|------------|--------------|-----------|
| 🖥️ **Frontend (Next.js)** | Deployed web dashboard | 🔗 [https://analytics-web-pi9h.onrender.com](https://analytics-web-pi9h.onrender.com) |
| ⚙️ **Backend (API Service)** | Node.js + Prisma REST API | 🔗 [https://analytics-api-uuvc.onrender.com](https://analytics-api-uuvc.onrender.com) |
| 🗄️ **Database (PostgreSQL)** | Hosted Render Database | 🔗 [Render Database Dashboard](https://dashboard.render.com) *(Private access)* |
| 📂 **GitHub Repository** | Source code & monorepo | 🔗 [https://github.com/Bhavana546/analytics-internship](https://github.com/Bhavana546/analytics-internship) |

---

## 🚀 Project Overview

The **Analytics Dashboard** visualizes document data and provides insights on file statistics, organization usage, and performance metrics.  
Data is served via a secure **REST API** built with Prisma ORM and PostgreSQL.

### ✨ Key Features

- 📑 Document analytics with charts and metrics  
- 📈 File type distribution pie chart  
- 🏢 Organization-based document statistics  
- 💾 PostgreSQL database integration  
- 🔗 Render-based multi-service deployment  
- 🧩 Environment variable configuration for secure API integration  
- ⚡ Built using **monorepo structure** with `apps/api` and `apps/web`

---

## 🧠 Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | Next.js 14 (React 19), TypeScript, Tailwind CSS, Recharts |
| Backend | Node.js, Express.js, Prisma ORM |
| Database | PostgreSQL (Render Cloud DB) |
| Deployment | Render (Web + API + DB Services) |
| Data Visualization | Recharts |
| Package Management | PNPM + Turborepo |
| Version Control | Git + GitHub |

---

## 🏗️ Project Architecture

```

analytics-internship/
├── apps/
│   ├── api/          → Backend (Express + Prisma)
│   └── web/          → Frontend (Next.js + Tailwind)
├── packages/         → Shared configs (if any)
├── prisma/           → Prisma schema + migrations
├── .env              → Root environment (local)
└── README.md         → This documentation

````

---

## ⚙️ Environment Variables

### API Service (`apps/api/.env`)
```env
DATABASE_URL=postgresql://analytics_db_lx6a_user:***@dpg-d491m9m3jp1c73crgr50-a.oregon-postgres.render.com/analytics_db_lx6a
OPENAI_API_KEY=your_openai_key_here
PORT=4000
VANNA_API_BASE_URL=https://api.vanna.ai
````

### Web Service (`apps/web/.env.local`)

```env
NEXT_PUBLIC_API_BASE=https://analytics-api-uuvc.onrender.com
NEXT_PUBLIC_APP_URL=https://analytics-web-pi9h.onrender.com
```

---

## 🧪 API Endpoints

| Endpoint         | Method | Description                    |
| ---------------- | ------ | ------------------------------ |
| `/_health`        | GET    | Health check                   |
| `/stats`         | GET    | Returns summary metrics        |
| `/recent`        | GET    | Fetches recent document data   |
| `/documents`     | GET    | Lists all documents            |
| `/documents/:id` | GET    | Returns document details by ID |

🔗 Example: [https://analytics-api-uuvc.onrender.com/stats](https://analytics-api-uuvc.onrender.com/stats)

---

## 🧰 Local Development Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Bhavana546/analytics-internship.git
cd analytics-internship
```

### 2️⃣ Install Dependencies

```bash
pnpm install
```

### 3️⃣ Setup Database

```bash
cd apps/api
pnpm exec prisma migrate dev --name init
pnpm exec prisma db seed
```

### 4️⃣ Run the Backend

```bash
pnpm --filter api dev
```

### 5️⃣ Run the Frontend

```bash
pnpm --filter web dev
```

Open in browser → [http://localhost:3000](http://localhost:3000)

---

## ☁️ Render Deployment Summary

| Service             | Type        | Branch | Build Command | Start Command | Root Directory |
| ------------------- | ----------- | ------ | ------------- | ------------- | -------------- |
| `analytics-api`     | Web Service | main   | `pnpm build`  | `pnpm start`  | `apps/api`     |
| `analytics-web`     | Web Service | main   | `pnpm build`  | `pnpm start`  | `apps/web`     |
| `analytics-db-lx6a` | PostgreSQL  | -      | -             | -             | -              |

---

## 🧾 Dashboard Previews

| View             | Screenshot                                    |
| ---------------- | --------------------------------------------- |
| Dashboard Loaded | ![Dashboard]
<img width="1919" height="973" alt="Screenshot 2025-11-11 094324" src="https://github.com/user-attachments/assets/76e1279a-6554-41d4-8c01-bbbcd0d58fc4" />
<img width="1919" height="974" alt="Screenshot 2025-11-11 094342" src="https://github.com/user-attachments/assets/bd89941b-393f-4533-bdb7-b9fb1f33b02a" />
<img width="1919" height="958" alt="Screenshot 2025-11-10 212122" src="https://github.com/user-attachments/assets/e7b29f7e-e903-4085-a295-97c2ff0e26eb" />|


| API Stats JSON   | ![API Stats]
<img width="1919" height="1012" alt="Screenshot 2025-11-11 085117" src="https://github.com/user-attachments/assets/8ff10b8d-3e28-4e9a-8e00-1ac574490e44" />
<img width="1908" height="1011" alt="Screenshot 2025-11-11 085134" src="https://github.com/user-attachments/assets/fc855252-aeed-4328-b54c-4e2b68902a98" />
<img width="1919" height="1009" alt="Screenshot 2025-11-11 085151" src="https://github.com/user-attachments/assets/e2746971-16e4-4bb1-8706-4e6b8e5d1ba5" />
<img width="1914" height="1017" alt="Screenshot 2025-11-11 085205" src="https://github.com/user-attachments/assets/06a5a252-93bc-4fd3-b228-0c07c62d5215" />|


---
---

## 📂 Deliverables Summary

| Deliverable | Description | Link |
|--------------|-------------|------|
| 💻 GitHub Repository | Full monorepo (frontend + backend) | [View Repo](https://github.com/Bhavana546/analytics-internship) |
| 🌐 Frontend (Next.js) | Deployed UI on Render | [https://analytics-web-pi9h.onrender.com](https://analytics-web-pi9h.onrender.com) |
| ⚙️ Backend API | Node.js + Prisma service | [https://analytics-api-uuvc.onrender.com](https://analytics-api-uuvc.onrender.com) |
| 🗄️ Database | Render PostgreSQL | Private |
| 🧠 Chat with Data (Vanna AI) | Future-ready AI extension | Planned |
| 🎥 Demo Video | Dashboard walkthrough |  


https://github.com/user-attachments/assets/e3399894-3cfe-46ea-bde8-390d251a2d31



## 👩‍💻 Author

**Bhavana Kolluri**
🎓 B.Tech CSE (AI & DS) Student
💡 Passionate about AI, data, and software engineering
🔗 [GitHub Profile](https://github.com/Bhavana546)

---

## 🏁 Status

✅ **Deployed successfully on Render**
✅ **Frontend ↔ Backend connected**
✅ **Database seeded with 50+ sample documents**
✅ **Ready for demo or submission**

---

### ⭐ If you found this project interesting, give it a star on GitHub!

```


