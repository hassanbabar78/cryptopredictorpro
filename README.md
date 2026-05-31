# Crypto Predictor Pro — AI-Powered Cryptocurrency Prediction Platform

Crypto Predictor Pro is a full-stack cryptocurrency prediction platform that combines real-time market data streaming, AI-powered predictions, and Solana blockchain payment verification. It features a FastAPI REST API backend and a dedicated WebSocket server for live candlestick data delivery.

---

## Features

- **AI-Powered Predictions** — Gemini AI generates intelligent crypto forecasts
- **Real-Time WebSocket Streaming** — Live candlestick data for 8 major cryptocurrencies
- **Solana Payment Integration** — On-chain payment verification via Solana Devnet
- **Technical Analysis** — RSI, moving averages, and signal generation
- **MongoDB Storage** — Persistent user, payment, and prediction data
- **User Authentication** — Signup, login, and credit-based access system

---

## Project Structure

```
crypto-predictor/
├── main.py                  # FastAPI REST API server
├── websocket_server.py      # WebSocket server for real-time data
├── test.py                  # WebSocket client test
├── run.sh                   # Setup and run script
├── test_all.sh              # Full API test suite
├── requirements.txt         # Python dependencies
├── .env.example             # Environment variable template
└── .gitignore
```

---

## Prerequisites

- Python 3.8+
- MongoDB (local or MongoDB Atlas)
- Internet connection for API calls

---

## Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/hassanbabar78/cryptopredictorpro.git
cd crypto-predictor
```

### 2. Create Virtual Environment

```bash
python3 -m venv venv
source venv/bin/activate       # Linux/macOS
# OR
venv\Scripts\activate          # Windows
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables

Create a `.env` file based on `.env.example`:

```env
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/?appName=Cluster0
YOUR_WALLET=your_solana_wallet_address
GEMINI_KEY=your_gemini_api_key
SOLANA_RPC_URL=https://api.devnet.solana.com
```

---

## Running the Servers

Open **two terminals** and run both servers simultaneously.

**Terminal 1 — WebSocket Server:**
```bash
source venv/bin/activate
python websocket_server.py
```

Expected output:
```
Live Crypto WebSocket Server Starting...
WebSocket server started on ws://localhost:8765
Waiting for client connections...
```

**Terminal 2 — FastAPI Server:**
```bash
source venv/bin/activate
python main.py
```

Expected output:
```
CRYPTO PREDICTOR PRO - REAL SOLANA VERIFICATION
Payment Address: your_wallet_address
Solana Devnet RPC: https://api.devnet.solana.com
```

---

## API Endpoints

Base URL: `http://localhost:8000`

### Health Check
```
GET /health
```

### App Info
```
GET /
```

### User Management
```
POST /signup           # Create new user
POST /login            # Login user
GET  /user/{id}/status # Get user status
```

### Payment System
```
GET  /check-transaction/{tx_hash}  # Check Solana transaction
POST /verify-payment               # Verify and credit user
```

### Predictions
```
POST /predict                      # Get AI prediction for a coin
GET  /predictions/{user_id}        # Get prediction history
```

### Market Data
```
GET /prices/{coin}                 # Get coin price history
```

---

## WebSocket Server

**URL:** `ws://localhost:8765`

### Subscribe to Live Data
```json
{
  "action": "subscribe",
  "coin": "BTC",
  "interval": "4h"
}
```

### Supported Coins
| Ticker | Name |
|--------|------|
| BTC | Bitcoin |
| ETH | Ethereum |
| SOL | Solana |
| BNB | Binance Coin |
| XRP | Ripple |
| DOGE | Dogecoin |
| ADA | Cardano |
| MATIC | Polygon |

### Supported Intervals
- `4h` — 4 hours
- `1d` — 1 day
- `1w` — 1 week

---

## Payment System

1. User signs up and receives a unique user ID
2. User sends **1 SOL** to the configured wallet address
3. User submits their transaction hash via `/verify-payment`
4. System verifies the transaction on **Solana Devnet**
5. Upon successful verification → **50 credits** are added

---

## Testing

### Run Full Test Suite
```bash
chmod +x test_all.sh
./test_all.sh
```

### Test WebSocket Connection
```bash
python test.py
```

### Manual Health Check
```bash
curl http://localhost:8000/health
```

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| FastAPI | REST API framework |
| Uvicorn | ASGI server |
| Motor | Async MongoDB driver |
| MongoDB Atlas | Cloud database |
| WebSockets | Real-time data streaming |
| Solana RPC | Blockchain payment verification |
| Gemini AI | AI-powered predictions |
| Binance API | Live cryptocurrency data |
| Python-dotenv | Environment management |

---

## MongoDB Collections

| Collection | Purpose |
|------------|---------|
| `users` | User accounts and credits |
| `payments` | Payment records |
| `predictions` | Prediction history |
| `coin_history` | Price history |

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGODB_URL` | MongoDB Atlas connection string |
| `YOUR_WALLET` | Solana wallet address for receiving payments |
| `GEMINI_KEY` | Google Gemini AI API key |
| `SOLANA_RPC_URL` | Solana RPC endpoint (Devnet/Mainnet) |

> Never commit `.env` files to version control. Use `.env.example` as a template.

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB connection failed | Check `MONGODB_URL` and whitelist your IP in Atlas |
| Solana RPC timeout | Check internet connection or try alternate RPC |
| WebSocket not connecting | Ensure port 8765 is free and server is running |
| Payment verification fails | Ensure using Solana Devnet and transaction has confirmations |

---

## Production Deployment

### Recommended Changes
- Switch `SOLANA_RPC_URL` to Solana **Mainnet**
- Enable HTTPS with SSL certificates
- Add API rate limiting
- Use a process manager like **PM2** or **systemd**
- Restrict CORS to your frontend domain

### Deployment Platforms
- **Backend:** Railway, Render, DigitalOcean, AWS, Heroku
- **Database:** MongoDB Atlas (M10+ for production)

---

## 📝 License

This project is for educational purposes. Commercial use may require additional licensing.