# 📚 Library Management System

![Project Screenshot](/screenshots/dashboard.png)  
*A modern library management solution built with Next.js, Supabase, and Tailwind CSS*

## ✨ Features

### Core Functionality
- **User Authentication**  
  🔐 Secure login with JWT & role-based access (Admin/Librarian/Member)  
  🔄 Password recovery flow with email verification  
  👤 Profile management  

### Book Management
- 📖 Add/Edit/Delete books with covers  
- 🔍 Advanced search (title, author, ISBN, genre)  
- 📊 Real-time availability tracking  

### Loan System
- 🏷️ Book borrowing/returning  
- 🔔 Automatic due date reminders  
- 💰 Late fine calculation  

### Admin Dashboard
- 📈 Analytics & reporting  
- 👥 User management  
- ⚙️ System configuration  

## 🛠️ Tech Stack

**Frontend**  
- Next.js 14 (App Router)  
- Tailwind CSS + Shadcn UI  
- React Query  

**Backend**  
- Supabase (PostgreSQL + Auth)  
- Node.js (API routes)  

**DevOps**  
- Vercel hosting  
- GitHub Actions CI/CD  

## 🚀 Getting Started

### Prerequisites
- Node.js
- Supabase account  
- SMTP email service (for notifications)

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/library-management-system.git

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
