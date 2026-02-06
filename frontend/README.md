# DevTinder Frontend

This is a Vite + React single-page app that talks to the existing DevTinder backend (port 6969) via cookie-authenticated APIs.

## Structure

```
frontend/
├── src/
│   ├── components/   # UI primitives (cards, navbar, layout helpers)
│   ├── context/      # Auth context fetching the `/profile/view` session
│   ├── pages/        # route-aligned screens (feed, requests, etc.)
│   └── services/     # API client and REST helpers
```

## Running locally

1. Install deps: `cd frontend && npm install`
2. Start backend (`npm run dev` inside `/backend` or whichever script you use)
3. Run `npm run dev` from `/frontend` and open http://localhost:5173.

The Vite dev server proxies `/api/*` to `http://localhost:6969/*` to avoid CORS. In production, set `VITE_API_BASE_URL` to your backend origin (e.g. `https://devtinder.yourdomain.com`).

## Pages mapped to backend APIs

| Page | Backend API | Notes |
|------|-------------|-------|
| Login | `POST /auth/signin` | Persists JWT cookie, then loads `/profile/view` |
| Signup | `POST /auth/signup` | Auto-logins afterward via `/auth/signin` |
| Feed | `GET /user/feed`, `POST /request/send/:status/:toUserId` | Ten profiles per page, interest/ignore actions |
| Requests | `GET /user/request/received`, `POST /request/review/:status/:requestId` | Accept/reject incoming |
| Connections | `GET /user/connections` | Shows accepted matches |
| Profile | `GET /profile/view` | Data mirrored from auth context |
| Edit Profile | `PATCH /profile/edit` | Updates name/gender/about/skills |
| Change Password | `PATCH /profile/forgetPassword` | Requires matching confirmation |
| Logout | `POST /auth/logout` | Clears auth cookie |

## Styling

Simple glassmorphism palette using CSS modules in `App.css` & `index.css`. Components reuse `.glass-panel`, `.card`, `.chip` etc. Adjust tokens there to rebrand quickly.
