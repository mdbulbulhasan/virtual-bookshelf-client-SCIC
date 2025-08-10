# Bookshelf – Your Personal Reading Tracker

Welcome to **Bookshelf**, a web app designed for book lovers who want to keep their reading organized, discover what others are reading, and track progress — all in one place.

 **Live Site:** [bookshelf-793eb.web.app](https://bookshelf-793eb.web.app)  

---

## What This Project Is About

Bookshelf lets you:
- Add books you've read, are reading, or want to read.
- Share your thoughts through reviews.
- Upvote books added by others (not your own).
- View reading stats with charts on your profile.

It’s a simple yet powerful way to bring your reading journey online and connect with a like-minded community.

---

## Tech Stack

**Frontend:**
- React (with React Router)
- Tailwind CSS + DaisyUI
- Firebase Authentication (Email/Password + Google)
- Framer Motion (animations)
- Recharts (for charts)
- Lottie React (for animations)
- SweetAlert2 (for alerts)

**Backend:**
- Node.js + Express.js
- MongoDB
- Firebase Admin SDK for verifying tokens
- JWT for route protection

---

## Key Features

### Authentication
- Email/password and Google login
- JWT-based token validation
- All sensitive operations (like Add Book, My Books, Profile) are protected

### Book Management
- Add books with details: title, author, category, pages, etc.
- Track reading status: Want-to-Read → Reading → Read
- Update/delete books (only if you’re the one who added them)

### Reviews & Upvotes
- Write one review per book (edit/delete your own)
- Upvote books (except your own) — helps surface popular titles

### User Profile Dashboard
- See your info and stats (how many books per category)
- Chart powered by Recharts

### Pages & Routing
- Home: Banner, featured categories, popular books, and more
- Bookshelf: Public listing with filters and search
- Book Details: Complete info, upvote, and review section
- Add Book / My Books / Profile: Private routes
- Auth Pages: Login and Register
- 404 + Loading states with animation

---

## Filter & Search

On the **Bookshelf page**, users can:
- Search books by title or author
- Filter books by reading status (Read, Reading, Want-to-Read)

---

## How to Run Locally

### Frontend (Client)
# Client Dependencies
- npm install 
- react 
- react-router
- tailwindcss 
- daisyui 
- firebase 
- framer-motion 
- recharts 
- lottie-react 
- sweetalert2
- npm run dev


