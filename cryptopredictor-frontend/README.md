# Crypto Predictor Frontend

A modern, responsive React-based frontend for the **Crypto Predictor** platform. This UI is built with **Vite**, **React 19**, **TailwindCSS**, and advanced charting libraries such as **ApexCharts**, **Chart.js**, and **tsparticles** for beautiful UI animations.

The frontend connects to the backend API and WebSocket server to provide:

* Real-time crypto candlestick charts
* Live market visualization
* Secure authentication
* Payment status UI
* Prediction dashboard
* Smooth animations and custom theme

---

## 🚀 Tech Stack

**Core Frameworks**

* React 19
* Vite
* TailwindCSS
* React Router

**Charts & Visualization**

* ApexCharts + React ApexCharts
* Chart.js (with financial chart support)
* Chart.js plugins (zooming, date adapter)
* tsparticles (background particle effects)

**UI Enhancements**

* lucide-react (icons)
* react-hot-toast (notifications)

---

## 📦 Project Structure

```
crypto-predictor-frontend/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── charts/
│   ├── styles/
│   └── App.jsx
├── index.html
├── tailwind.config.js
├── vite.config.js
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone Repository

```bash
git clone <your-frontend-repo-url>
cd crypto-predictor-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

The app will automatically open at:

```
http://localhost:3000
```

---

## 🛠️ Build for Production

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

## 🎨 TailwindCSS Configuration

Custom themes and animations have been added:

* Extended crypto-themed colors
* Chart load animations
* Gradient backgrounds
* Floating and shimmer effects

All configurations are located in:

```
tailwind.config.js
```

---

## 🔌 API & WebSocket Integration

The frontend communicates with the backend:

### **REST API**

* Signup / Login
* User status
* Payment verification status
* Fetch predictions
* Market prices

### **WebSocket**

Real-time candle updates from:

```
ws://localhost:8765
```

A subscription message example:

```json
{
  "action": "subscribe",
  "coin": "BTC",
  "interval": "4h"
}
```

---

## 📊 Features

* 🔐 User Authentication Flow
* 💳 Payment Status UI (Solana Devnet/Mainnet)
* 📈 Real-time Candle Chart Streaming
* 📉 Zoomable & Scrollable Charts
* 🎨 Beautiful UI with crypto-themed gradients
* 🧠 AI prediction view components
* 🌙 Dark mode optimized
* ⚡ Extremely fast dev environment via Vite

---

## 🔧 Configuration

### Update API Base URL

Inside your API service files, set the backend URL:

```js
export const API_BASE = "http://localhost:8000";
```

### Environment Variables (Optional)

If you plan to add environment configs:

```
VITE_API_URL=http://localhost:8000
```

Use in code:

```js
import.meta.env.VITE_API_URL
```

---

## 🧪 Testing

You can test the UI flows by:

* Registering a new user
* Logging in
* Watching charts update in real-time
* Verifying payment status after a Devnet transaction
* Requesting predictions

---

## 📁 Important Files

* `tailwind.config.js` — custom theme, colors, animations
* `vite.config.js` — development server config
* `package.json` — dependencies and scripts
* `src/components/*` — UI components
* `src/pages/*` — routed screens
* `src/charts/*` — chart components

---

## 💻 Scripts

```bash
npm run dev       # Start development
npm run build     # Production build
npm run preview   # Preview build
npm run lint      # Run ESLint
```

---

## 🚀 Production Optimization Tips

* Enable route-based code splitting
* Use React.lazy for heavy components
* Minify chart data payloads
* Use a CDN for static assets
* Enable Brotli/Gzip on the hosting provider

---

## 🌐 Deployment Options

* Netlify
* Vercel
* Cloudflare Pages
* GitHub Pages
* Render / DigitalOcean Apps

---

## 📘 License

This frontend is provided for educational or personal use. Commercial usage may require additional licensing.

---

## 🤝 Support

If you face issues:

* Check browser console logs
* Verify backend API is running
* Ensure WebSocket server is active
* Validate correct API URLs

You may also open an issue in the repository.
