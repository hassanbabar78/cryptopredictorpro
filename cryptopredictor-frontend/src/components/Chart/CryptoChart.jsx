// import React, { useRef, useEffect } from 'react';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   TimeScale,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';
// import { Chart } from 'react-chartjs-2';
// import zoomPlugin from 'chartjs-plugin-zoom';
// import 'chartjs-adapter-date-fns';
// import { formatCandleTime } from '../../utils/formatters';

// // Register Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   TimeScale,
//   CandlestickController,
//   CandlestickElement,
//   Tooltip,
//   Legend,
//   zoomPlugin
// );

// const CryptoChart = ({ data, coin, interval, height = 500 }) => {
//   const chartRef = useRef(null);

//   useEffect(() => {
//     return () => {
//       if (chartRef.current) {
//         chartRef.current.destroy();
//       }
//     };
//   }, []);

//   if (!data?.candles || data.candles.length === 0) {
//     return (
//       <div className="h-[500px] flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 rounded-full bg-crypto-darker border border-crypto-border flex items-center justify-center mx-auto mb-4">
//             <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//             </svg>
//           </div>
//           <p className="text-gray-400">No chart data available</p>
//         </div>
//       </div>
//     );
//   }

//   const chartData = {
//     datasets: [
//       {
//         label: `${coin} Price`,
//         data: data.candles.map(candle => ({
//           x: candle.time,
//           o: candle.open,
//           h: candle.high,
//           l: candle.low,
//           c: candle.close,
//         })),
//         type: 'candlestick',
//         borderColor: 'transparent',
//         borderWidth: 1,
//         color: {
//           up: '#00ff88',
//           down: '#ff4d4d',
//           unchanged: '#9ca3af',
//         },
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     animation: {
//       duration: 0, // Disable animation for better performance
//     },
//     scales: {
//       x: {
//         type: 'time',
//         time: {
//           unit: interval === '4h' ? 'hour' : interval === '1d' ? 'day' : 'week',
//           displayFormats: {
//             hour: 'MMM d, HH:mm',
//             day: 'MMM d',
//             week: 'MMM d',
//           },
//         },
//         grid: {
//           color: 'rgba(255, 255, 255, 0.05)',
//         },
//         ticks: {
//           color: '#9ca3af',
//           maxRotation: 0,
//           autoSkip: true,
//           maxTicksLimit: 8,
//         },
//       },
//       y: {
//         position: 'right',
//         grid: {
//           color: 'rgba(255, 255, 255, 0.05)',
//         },
//         ticks: {
//           color: '#9ca3af',
//           callback: function(value) {
//             return '$' + value.toLocaleString();
//           },
//         },
//       },
//     },
//     plugins: {
//       legend: {
//         display: false,
//       },
//       tooltip: {
//         mode: 'index',
//         intersect: false,
//         backgroundColor: '#111827',
//         borderColor: '#374151',
//         borderWidth: 1,
//         titleColor: '#9ca3af',
//         bodyColor: '#ffffff',
//         padding: 12,
//         cornerRadius: 8,
//         callbacks: {
//           label: function(context) {
//             const point = context.raw;
//             return [
//               `Open: $${point.o.toFixed(2)}`,
//               `High: $${point.h.toFixed(2)}`,
//               `Low: $${point.l.toFixed(2)}`,
//               `Close: $${point.c.toFixed(2)}`,
//             ];
//           },
//           title: function(context) {
//             const point = context[0].raw;
//             return formatCandleTime(point.x, interval);
//           },
//         },
//       },
//       zoom: {
//         pan: {
//           enabled: true,
//           mode: 'x',
//           modifierKey: 'ctrl',
//         },
//         zoom: {
//           wheel: {
//             enabled: true,
//           },
//           pinch: {
//             enabled: true,
//           },
//           mode: 'x',
//         },
//       },
//     },
//     interaction: {
//       mode: 'index',
//       intersect: false,
//     },
//   };

//   // Calculate price change
//   const firstPrice = data.candles[0]?.close || 0;
//   const lastPrice = data.candles[data.candles.length - 1]?.close || 0;
//   const priceChange = lastPrice - firstPrice;
//   const priceChangePercent = firstPrice ? (priceChange / firstPrice) * 100 : 0;

//   return (
//     <div className="relative">
//       {/* Chart Header */}
//       <div className="flex items-center justify-between mb-4 p-4 bg-crypto-darker rounded-t-lg border-b border-crypto-border">
//         <div>
//           <div className="flex items-center space-x-3">
//             <div className={`w-3 h-3 rounded-full ${priceChange >= 0 ? 'bg-crypto-green' : 'bg-crypto-red'}`}></div>
//             <h3 className="text-xl font-bold">{coin}/USDT</h3>
//             <span className="text-sm text-gray-400">• {interval}</span>
//           </div>
//           <div className="flex items-center space-x-4 mt-2">
//             <div className="text-2xl font-bold">${lastPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
//             <div className={`px-2 py-1 rounded text-sm font-medium ${priceChange >= 0 ? 'bg-crypto-green/20 text-crypto-green' : 'bg-crypto-red/20 text-crypto-red'}`}>
//               {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)} ({priceChangePercent >= 0 ? '+' : ''}{priceChangePercent.toFixed(2)}%)
//             </div>
//           </div>
//         </div>
        
//         <div className="flex items-center space-x-2">
//           <div className="text-sm text-gray-400">
//             {data.candles.length} candles
//           </div>
//           <button
//             onClick={() => chartRef.current?.resetZoom()}
//             className="px-3 py-1 text-xs rounded border border-crypto-border hover:border-crypto-green transition-colors"
//           >
//             Reset Zoom
//           </button>
//         </div>
//       </div>

//       {/* Chart Container */}
//       <div style={{ height: `${height}px` }} className="relative">
//         <Chart
//           ref={chartRef}
//           type="candlestick"
//           data={chartData}
//           options={options}
//           plugins={[{
//             id: 'customChartBackground',
//             beforeDraw: (chart) => {
//               const ctx = chart.ctx;
//               const chartArea = chart.chartArea;
              
//               // Draw gradient background
//               const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
//               gradient.addColorStop(0, 'rgba(0, 255, 136, 0.05)');
//               gradient.addColorStop(0.5, 'transparent');
//               gradient.addColorStop(1, 'rgba(255, 77, 77, 0.05)');
              
//               ctx.save();
//               ctx.fillStyle = gradient;
//               ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
//               ctx.restore();
//             }
//           }]}
//         />
//       </div>

//       {/* Chart Footer */}
//       <div className="flex items-center justify-between p-4 bg-crypto-darker rounded-b-lg border-t border-crypto-border text-sm text-gray-400">
//         <div className="flex items-center space-x-4">
//           <div className="flex items-center space-x-2">
//             <div className="w-3 h-3 rounded-full bg-crypto-green"></div>
//             <span>Bullish: {data.candles.filter(c => c.close > c.open).length}</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <div className="w-3 h-3 rounded-full bg-crypto-red"></div>
//             <span>Bearish: {data.candles.filter(c => c.close < c.open).length}</span>
//           </div>
//         </div>
//         <div className="text-xs">
//           Drag to pan • Scroll to zoom • Ctrl + drag for precise zoom
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CryptoChart;

import React, { useRef, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';
import { Chart } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';
import 'chartjs-adapter-date-fns';
import { formatCandleTime } from '../../utils/formatters';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  CandlestickController,
  CandlestickElement,
  Tooltip,
  Legend,
  zoomPlugin
);

const CryptoChart = ({ data, coin, interval, height = 500 }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  if (!data?.candles || data.candles.length === 0) {
    return (
      <div className="h-[500px] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-crypto-darker border border-crypto-border flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <p className="text-gray-400">No chart data available</p>
        </div>
      </div>
    );
  }

  // Restrict to 500 candles
  const limitedCandles = data.candles.slice(-500);

  const chartData = {
    datasets: [
      {
        label: `${coin} Price`,
        data: limitedCandles.map(candle => ({
          x: candle.time,
          o: candle.open,
          h: candle.high,
          l: candle.low,
          c: candle.close,
        })),
        type: 'candlestick',
        borderColor: 'transparent',
        borderWidth: 1,
        color: {
          up: '#00ff88',
          down: '#ff4d4d',
          unchanged: '#9ca3af',
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 0,
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: interval === '4h' ? 'hour' : interval === '1d' ? 'day' : 'week',
          displayFormats: {
            hour: 'MMM d, HH:mm',
            day: 'MMM d',
            week: 'MMM d',
          },
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          color: '#9ca3af',
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 8,
        },
      },
      y: {
        position: 'right',
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          color: '#9ca3af',
          callback: function(value) {
            return '$' + value.toLocaleString();
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: '#111827',
        borderColor: '#374151',
        borderWidth: 1,
        titleColor: '#9ca3af',
        bodyColor: '#ffffff',
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: function(context) {
            const point = context.raw;
            return [
              `Open: $${point.o.toFixed(2)}`,
              `High: $${point.h.toFixed(2)}`,
              `Low: $${point.l.toFixed(2)}`,
              `Close: $${point.c.toFixed(2)}`,
            ];
          },
          title: function(context) {
            const point = context[0].raw;
            return formatCandleTime(point.x, interval);
          },
        },
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'x',
          modifierKey: 'ctrl',
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'x',
        },
      },
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
  };

  // Calculate price change from limited candles
  const firstPrice = limitedCandles[0]?.close || 0;
  const lastPrice = limitedCandles[limitedCandles.length - 1]?.close || 0;
  const priceChange = lastPrice - firstPrice;
  const priceChangePercent = firstPrice ? (priceChange / firstPrice) * 100 : 0;

  return (
    <div className="relative">
      {/* Chart Header */}
      <div className="flex items-center justify-between mb-4 p-4 bg-crypto-darker rounded-t-lg border-b border-crypto-border">
        <div>
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${priceChange >= 0 ? 'bg-crypto-green' : 'bg-crypto-red'}`}></div>
            <h3 className="text-xl font-bold">{coin}/USDT</h3>
            <span className="text-sm text-gray-400">• {interval}</span>
          </div>
          <div className="flex items-center space-x-4 mt-2">
            <div className="text-2xl font-bold">${lastPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            <div className={`px-2 py-1 rounded text-sm font-medium ${priceChange >= 0 ? 'bg-crypto-green/20 text-crypto-green' : 'bg-crypto-red/20 text-crypto-red'}`}>
              {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)} ({priceChangePercent >= 0 ? '+' : ''}{priceChangePercent.toFixed(2)}%)
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="text-sm text-gray-400">
            {limitedCandles.length} candles {/* Changed from data.candles.length */}
          </div>
          <button
            onClick={() => chartRef.current?.resetZoom()}
            className="px-3 py-1 text-xs rounded border border-crypto-border hover:border-crypto-green transition-colors"
          >
            Reset Zoom
          </button>
        </div>
      </div>

      {/* Chart Container */}
      <div style={{ height: `${height}px` }} className="relative">
        <Chart
          ref={chartRef}
          type="candlestick"
          data={chartData}
          options={options}
          plugins={[{
            id: 'customChartBackground',
            beforeDraw: (chart) => {
              const ctx = chart.ctx;
              const chartArea = chart.chartArea;
              
              // Changed to solid dark background like in the image
              ctx.save();
              ctx.fillStyle = '#0f172a'; // Dark blue-black background
              ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
              ctx.restore();
            }
          }]}
        />
      </div>

      {/* Chart Footer */}
      <div className="flex items-center justify-between p-4 bg-crypto-darker rounded-b-lg border-t border-crypto-border text-sm text-gray-400">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-crypto-green"></div>
            <span>Bullish: {limitedCandles.filter(c => c.close > c.open).length}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-crypto-red"></div>
            <span>Bearish: {limitedCandles.filter(c => c.close < c.open).length}</span>
          </div>
        </div>
        <div className="text-xs">
          Drag to pan • Scroll to zoom • Ctrl + drag for precise zoom
        </div>
      </div>
    </div>
  );
};

export default CryptoChart;