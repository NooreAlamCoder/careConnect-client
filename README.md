# 🤝 CareConnect - Social Development Events Platform

> **Live Website:** [https://care-connect-client-one.vercel.app](https://care-connect-client-one.vercel.app)
**Server Repository:** [https://github.com/NooreAlamCoder/careConnect-server](https://github.com/NooreAlamCoder/careConnect-server)

**CareConnect** is a modern, community-driven social development event management platform where citizens, activists, and volunteers can organize, discover, and participate in local social service initiatives (e.g. Winter Clothes Distribution, Tree Plantation, Cleanliness Drives, Educational Book Drives, Community Healthcare Camps).

---

## ✨ Key Features of the Platform

* **1. Dual-Input Event Hosting with Strict Future-Date Validation:** Authenticated organizers can host community welfare drives. The platform features an interactive image upload zone (drag-and-drop or device browse with client-side canvas compression) as well as an image URL fallback with live preview. A strict future-date boundary check prevents past-dated events from ever being created.
* **2. One-Click Volunteer Participation (Join Event):** Logged-in volunteers can join any upcoming initiative with instant status feedback. The system enforces duplicate-join prevention to ensure volunteers cannot register twice for the same event, and records every commitment chronologically.
* **3. Real-Time Dynamic Search & Category Filtering:** The Upcoming Events catalog (`/events`) offers instant category filtering (Cleanup, Plantation, Donation, Education, Healthcare, Other) and real-time debounce search, rendering equal-height responsive cards with category badges and location indicators.
* **4. Protected Organizer Management (Full CRUD):** Organizers have complete authority over their hosted events via the `/manage-events` dashboard. Includes prefilled edit modals with payload validation and secure deletion dialogs, strictly guarded by creator email verification and JWT authorization.
* **5. Streamlined Authentication with Better Auth & Google OAuth:** Integrated with Better Auth (MongoDB Adapter) and Google Social Sign-In alongside credentials login. The `/register` page features functional password visibility toggles (`Eye`/`EyeOff`), real-time dynamic requirement checklists (uppercase, lowercase, 6+ characters, number), and auto-generated personalized DiceBear avatars.
* **6. Strict Theme Uniformity (Zero Theme Clashing):** Persistent Light/Dark mode toggling driven by CSS variables and semantic design tokens, ensuring no rogue white blocks or unreadable text across any section, card, or modal.
* **7. Reload-Safe Session Guard & Loading Skeletons:** Client-side architecture prevents unwanted logouts or false redirects to the login screen on page refreshes. Pulsing skeleton loaders provide polished visual feedback during data fetching.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | Next.js 16.4.3 (App Router), React 19 |
| **Language** | TypeScript (Strict Mode, 100% type-safe, zero `any`) |
| **Styling & Design** | Tailwind CSS v4, Custom CSS Semantic Variables |
| **Icons & Feedback** | Lucide React, React Hot Toast |
| **Authentication** | Better Auth, MongoDB Adapter, Google OAuth 2.0, JWT Session Exchange |
| **Deployment** | Vercel (Production CI/CD) |

---

## 🚀 Running Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/NooreAlamCoder/careConnect-client.git
   cd careConnect-client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables in `.env.local`:**
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5050/api
   NEXT_PUBLIC_APP_URL=http://localhost:3001
   BETTER_AUTH_URL=http://localhost:3001
   BETTER_AUTH_SECRET=careconnect_better_auth_secret_key_2026_super_secure
   MONGODB_URI=your_mongodb_connection_uri
   DB_NAME=CareConnectDB
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   Open [http://localhost:3001](http://localhost:3001) to explore CareConnect.
