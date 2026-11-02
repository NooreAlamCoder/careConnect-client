# 🤝 CareConnect - Social Development Events Platform

> **Live Website:** [https://careconnect-events.vercel.app](https://careconnect-events.vercel.app)  
> **Server Repository:** [https://github.com/your-username/careconnect-server](https://github.com/your-username/careconnect-server)  
> **Client Repository:** [https://github.com/your-username/careconnect-client](https://github.com/your-username/careconnect-client)

CareConnect is a community-driven event management platform where citizens, activists, and volunteers can organize, join, and track impactful social development and welfare events in their local neighborhoods.

---

## ✨ Key Features of the Platform

* **1. Comprehensive Event Hosting with Future-Date Validation:** Authenticated organizers can create community service initiatives (cleanup, donation, plantation, healthcare, education) with automatic date validation that prevents past dates.
* **2. One-Click Volunteer Participation:** Logged-in users can instantly sign up for upcoming events via the "Join Event" action, maintaining an organized chronological log of their volunteer commitments.
* **3. Real-Time Dynamic Filtering & Search:** The Upcoming Events catalog features instant category-based filtering and keyword search with responsive grid cards and equal-height layouts.
* **4. Protected Organizer Management (CRUD):** Organizers have full authority over their own events, with update modals and delete confirmation dialogues protected by secure JWT authentication.
* **5. Strict Theme Uniformity (Zero Theme Clashing):** Robust Light/Dark mode toggling driven by CSS variables and semantic design tokens, ensuring no rogue white blocks or unreadable text across any section or component.
* **6. Reload-Safe Session Guard:** Client-side architecture prevents unwanted logouts or false redirects to the login screen on page refreshes.

---

## 🛠️ Technology Stack

* **Frontend Framework:** Next.js (App Router)
* **Language:** TypeScript (Strict Mode, 100% type-safe, zero `any`)
* **Styling & Theming:** Tailwind CSS v4 with custom CSS semantic variables
* **Icons & Notifications:** Lucide React & React Hot Toast
* **Authentication:** JWT Token-based session management with reload persistence
* **Backend:** Express.js + Node.js + MongoDB

---

## 🚀 Running Locally

1. Clone the repository and enter the `client` directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup environment variables in `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.
