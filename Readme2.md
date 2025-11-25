# Real Estate Platform – Full-Stack Technical Assessment

This repository contains my submission for the Oman Housing Bank SAOC Developer Technical Assessment.  
The project implements a full-stack, containerized real-estate platform using:

- **Frontend:** React + TypeScript + Vite + Redux Toolkit + TailwindCSS  
- **Backend:** NestJS + TypeScript + PostgreSQL + JWT Authentication  
- **Database:** PostgreSQL with indexing, full-text search, and 1000+ seeded records  
- **Environment:** VS Code Dev Container + Docker

---

## 🚀 Features Implemented

### ✅ **1. Dev Environment & Project Setup**
- Forked and cloned starter repo into personal GitHub.
- Fully working **VS Code Dev Container** setup.
- Docker-based environment including **Node + PostgreSQL**.
- Seeded PostgreSQL database with:
  - `properties` (1000+)  
  - `users`  
  - `agent_contacts`  
- Proper indexing:
  - B-Tree index on views  
  - Full-text search index  

---

### ✅ **2. Backend (NestJS)**
#### ✔ Authentication
- `POST /auth/register` – with password hashing  
- `POST /auth/login` – JWT access token  
- JWT Strategy + Auth Guard  
- Protected routes support  

#### ✔ Listings API
- `GET /listings/popular` – optimized unified query  
- `GET /property/:id` – property details endpoint  

#### ✔ Agent Contact
- Protected endpoint:
  - `POST /agent-contact`
  - Stores user → property contact requests  

#### ✔ Database Integration
- TypeORM with full entity structure  
- Seeding script (SQL + Node)  

#### ✔ Testing
- Jest configured  
- Unit tests partially implemented  
- **>80% coverage pending** (see “Remaining Work”)

---

### ✅ **3. Frontend (React + TS + Vite)**
#### ✔ Global State
- Redux Toolkit:
  - `authSlice`
  - `propertiesSlice`
  - `searchSlice`
- Typed hooks for selectors & dispatch.

#### ✔ Pages
- Landing Page (Home)
- Login Page
- Register Page
- Property Details Page

#### ✔ Components
- Navbar  
- Hero Section  
- Search Bar  
- Property Card  
- Property Grid  
- Image Carousel  
- Loading handling  
- Responsive layout  

#### ✔ Search
- Keyword search hitting backend endpoint
- Fully typed search state

#### ✔ UI / UX
- Clean TailwindCSS styling
- Fully responsive (mobile → desktop)

---

## 📌 Remaining Work (Not Fully Completed)
### ❗ **Frontend**
- Some UI polish and animations  
- Improve mobile menu/navigation  
- Add toast notifications for actions  

### ❗ **Backend**
- Expand Jest tests to reach **80%+ coverage**  
- Add pagination for listings (bonus requirement optional)  

### ❗ **Bonus (Optional Features)**
Not implemented due to time:
- Redis caching  
- Data visualization chart  
- Infinite scroll  
- Design system / theme switcher  

---

## 🧪 Running the Project

### 🔧 **Prerequisites**
You must have installed:
- VS Code
- Dev Containers extension
- Docker Desktop

### ▶️ **Steps**
1. **Open project in VS Code**
2. Press **Ctrl+Shift+P** → “Dev Containers: Reopen in Container”
3. Wait for Docker to build environment

---

## 🗄️ Backend (NestJS)

### Install dependencies
```bash
cd Projects/backend
npm install
