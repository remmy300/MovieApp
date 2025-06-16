# 🎬 Movie App

A modern movie browsing app built with React, Tailwind CSS, and MUI. This project is a work in progress — I'm actively adding new features and improving performance with each update.


"Proper API filtering requires correct parameter formatting (using URLSearchParams), understanding endpoint-specific behaviors (like TMDB's dual country filters), and including all filter states in React Query's dependency array to trigger accurate refetches."

---

## 🔧 Tech Stack

- **React** – Front-end library
- **TanStack Query** – Efficient data fetching with pagination support
- **Tailwind CSS** – Utility-first styling
- **Material UI (MUI)** – Component library for responsive design
- **Lucide React** – Clean, customizable icons
- **React.lazy + Suspense** – Lazy-loaded components for performance
- **React.useCallback** – Memoized fetch functions for trailers
- **Intersection Observer** – Infinite scrolling mechanism

---

## 🚀 Features So Far

- 🔄 Infinite scrolling to load movies dynamically
- 🖼️ Lazy-loaded images for better performance
- 🎞️ Trailer fetching optimized with `useCallback`
- 🎨 Responsive design using Tailwind + MUI
- 🧩 Modular and reusable components
- 📱 Mobile-first layout with consistent styling
- 🎬 Fetches movies and TV shows by genre, type, and country
- 🔄 Dynamic filtering with responsive UI
- ⏳ **Debounced Search** to reduce unnecessary API calls

---

## 🧠 What I'm Learning

- Improving performance using lazy loading and memoization
- Handling paginated APIs with TanStack Query’s `fetchNextPage`
- Structuring scalable React apps with reusable UI components
- Combining Tailwind and MUI effectively for modern UI
- Managing UI state and side effects in React
- API Filtering**: Use `URLSearchParams` for robust URL construction, combine relevant parameters (e.g., TMDB's `with_origin_country` + `region`), and validate all filter inputs.  
- State Management**: Include all filter states in React Query's `queryKey` to auto-trigger refetches when filters change.  
- Debugging**: Log final API URLs to verify parameter correctness and handle empty/edge cases.

---

## 🛣️ Roadmap / In Progress

- ✅ Trailer modal with video player
- ⏳ Movie search by title
- ⏳ Genre filter and sorting
- ⏳ Dark mode toggle
- ⏳ Movie detail pages with cast and similar movie recommendations
- ⏳ User authentication and watchlist feature

---

## 🖥️ Getting Started

Clone the project and install dependencies:

```bash
git clone https://github.com/yourusername/movie-app.git
cd movie-app
npm install
npm run dev

```
