// // src/pages/HistoryPage.jsx
// import React from 'react';
// import Layout from '../components/Layout/Layout';
// import PredictionHistory from '../components/Prediction/PredictionHistory';
// // import PerformanceMetrics from '../components/History/PerformanceMetrics';
// // import TradingInsights from '../components/History/TradingInsights';

// const HistoryPage = () => {
//   return (
//     <Layout>
//       <div className="min-h-screen bg-crypto-dark">
//         {/* Page Header */}
//         <div className="border-b border-crypto-border">
//           <div className="container mx-auto px-4 py-8">
//             <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
//               <div>
//                 <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">
//                   Prediction History
//                 </h1>
//                 <p className="text-gray-400">
//                   Track your AI prediction performance and trading insights
//                 </p>
//               </div>
              
//               <div className="flex items-center space-x-3">
//                 <button className="px-4 py-2 rounded-lg bg-crypto-darker border border-crypto-border hover:border-crypto-green transition-colors text-sm">
//                   Export CSV
//                 </button>
//                 <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-crypto-green to-emerald-500 hover:from-emerald-500 hover:to-crypto-green text-white font-medium transition-all duration-300 transform hover:scale-105 text-sm">
//                   New Prediction
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="container mx-auto px-4 py-8">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* Left Column - Performance Metrics */}
//             <div className="lg:col-span-1">
//               <div className="space-y-6">
//                 {/* Account Summary */}
//                 <div className="glass-effect rounded-xl p-6">
//                   <h2 className="text-xl font-bold mb-4 gradient-text">Account Summary</h2>
//                   <div className="space-y-4">
//                     <div className="flex items-center justify-between">
//                       <span className="text-gray-400">Total Predictions</span>
//                       <span className="font-bold text-xl">142</span>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <span className="text-gray-400">Success Rate</span>
//                       <span className="font-bold text-xl text-crypto-green">78.4%</span>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <span className="text-gray-400">Avg. Confidence</span>
//                       <span className="font-bold text-xl">84.2%</span>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <span className="text-gray-400">Total P&L</span>
//                       <span className="font-bold text-xl text-crypto-green">+$2,847.50</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Performance Metrics Component */}

//                 {/* Quick Stats */}
//                 <div className="glass-effect rounded-xl p-6">
//                   <h2 className="text-xl font-bold mb-4 gradient-text">Weekly Stats</h2>
//                   <div className="space-y-3">
//                     <div>
//                       <div className="flex justify-between text-sm mb-1">
//                         <span className="text-gray-400">This Week</span>
//                         <span className="text-crypto-green">+12.4%</span>
//                       </div>
//                       <div className="w-full bg-crypto-darker rounded-full h-2">
//                         <div className="bg-crypto-green h-2 rounded-full" style={{ width: '72%' }}></div>
//                       </div>
//                     </div>
//                     <div>
//                       <div className="flex justify-between text-sm mb-1">
//                         <span className="text-gray-400">Win Rate</span>
//                         <span className="text-crypto-green">82%</span>
//                       </div>
//                       <div className="w-full bg-crypto-darker rounded-full h-2">
//                         <div className="bg-crypto-green h-2 rounded-full" style={{ width: '82%' }}></div>
//                       </div>
//                     </div>
//                     <div>
//                       <div className="flex justify-between text-sm mb-1">
//                         <span className="text-gray-400">Avg. Hold Time</span>
//                         <span>3.2 days</span>
//                       </div>
//                       <div className="w-full bg-crypto-darker rounded-full h-2">
//                         <div className="bg-crypto-blue h-2 rounded-full" style={{ width: '64%' }}></div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Right Column - Prediction History & Insights */}
//             <div className="lg:col-span-2 space-y-8">
//               {/* Prediction History Component */}
//               <div className="glass-effect rounded-xl p-6">
//                 <PredictionHistory />
//               </div>

//               {/* Trading Insights Component */}

//             </div>
//           </div>

//           {/* Additional Sections */}
//           <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Best Performing Coins */}
//             <div className="glass-effect rounded-xl p-6">
//               <h2 className="text-xl font-bold mb-4 gradient-text">Best Performing Coins</h2>
//               <div className="space-y-4">
//                 {[
//                   { coin: 'BTC', predictions: 24, winRate: '92%', avgReturn: '+8.4%' },
//                   { coin: 'ETH', predictions: 18, winRate: '89%', avgReturn: '+7.2%' },
//                   { coin: 'SOL', predictions: 15, winRate: '86%', avgReturn: '+9.1%' },
//                   { coin: 'BNB', predictions: 12, winRate: '83%', avgReturn: '+6.8%' },
//                 ].map((item, index) => (
//                   <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-crypto-darker/50">
//                     <div className="flex items-center space-x-3">
//                       <div className="w-10 h-10 rounded-full bg-gradient-to-r from-crypto-green/20 to-crypto-blue/20 flex items-center justify-center">
//                         <span className="font-bold">{item.coin}</span>
//                       </div>
//                       <div>
//                         <div className="font-medium">{item.coin}</div>
//                         <div className="text-sm text-gray-400">{item.predictions} predictions</div>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <div className="text-crypto-green font-bold">{item.winRate} win rate</div>
//                       <div className="text-sm text-crypto-green">{item.avgReturn} avg return</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Recent Activity */}
//             <div className="glass-effect rounded-xl p-6">
//               <h2 className="text-xl font-bold mb-4 gradient-text">Recent Activity</h2>
//               <div className="space-y-4">
//                 {[
//                   { action: 'Prediction Made', details: 'BTC Buy Signal', time: '2 min ago', color: 'text-crypto-green' },
//                   { action: 'Prediction Closed', details: 'ETH Sell - Profit +$245', time: '1 hour ago', color: 'text-crypto-green' },
//                   { action: 'Alert Triggered', details: 'SOL Price Alert', time: '3 hours ago', color: 'text-crypto-blue' },
//                   { action: 'Analysis Updated', details: 'Market Trend Changed', time: '5 hours ago', color: 'text-crypto-teal' },
//                   { action: 'Prediction Made', details: 'BNB Hold Signal', time: 'Yesterday', color: 'text-yellow-400' },
//                 ].map((item, index) => (
//                   <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-crypto-darker/50 hover:bg-crypto-darker transition-colors">
//                     <div className={`w-2 h-2 rounded-full mt-2 ${item.color} bg-current`}></div>
//                     <div className="flex-1">
//                       <div className="flex justify-between">
//                         <div className="font-medium">{item.action}</div>
//                         <div className="text-sm text-gray-400">{item.time}</div>
//                       </div>
//                       <div className={`text-sm ${item.color}`}>{item.details}</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Banner */}
//         <div className="mt-8 border-t border-crypto-border">
//           <div className="container mx-auto px-4 py-6">
//             <div className="flex flex-col md:flex-row items-center justify-between gap-4">
//               <div>
//                 <h3 className="text-lg font-bold gradient-text">Ready to improve your predictions?</h3>
//                 <p className="text-gray-400 text-sm">Use our advanced AI tools for better trading decisions</p>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <button className="px-4 py-2 rounded-lg border border-crypto-border hover:border-crypto-green transition-colors">
//                   View Tutorial
//                 </button>
//                 <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-crypto-green to-emerald-500 hover:from-emerald-500 hover:to-crypto-green text-white font-medium transition-all duration-300 transform hover:scale-105">
//                   Upgrade Plan
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default HistoryPage;


import React from 'react';
import Layout from '../components/Layout/Layout';
import PredictionHistory from '../components/Prediction/PredictionHistory';

const HistoryPage = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-crypto-dark">
        {/* Page Header */}
        <div className="border-b border-crypto-border">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  Prediction History
                </h1>
                <p className="text-gray-400">
                  Track your AI prediction performance and trading insights
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <button className="px-4 py-2 rounded-lg bg-crypto-darker border border-crypto-border hover:border-crypto-green transition-colors text-sm">
                  Export CSV
                </button>
                <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-crypto-green to-emerald-500 hover:from-emerald-500 hover:to-crypto-green text-white font-medium transition-all duration-300 transform hover:scale-105 text-sm">
                  New Prediction
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Performance Metrics */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {/* Account Summary */}
                <div className="glass-effect rounded-xl p-6">
                  <h2 className="text-xl font-bold mb-4 gradient-text">Account Summary</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Total Predictions</span>
                      <span className="font-bold text-xl">--</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Success Rate</span>
                      <span className="font-bold text-xl text-crypto-green">--%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Avg. Confidence</span>
                      <span className="font-bold text-xl">--%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Total P&L</span>
                      <span className="font-bold text-xl text-crypto-green">--</span>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="glass-effect rounded-xl p-6">
                  <h2 className="text-xl font-bold mb-4 gradient-text">Weekly Stats</h2>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">This Week</span>
                        <span className="text-crypto-green">--%</span>
                      </div>
                      <div className="w-full bg-crypto-darker rounded-full h-2">
                        <div className="bg-crypto-green h-2 rounded-full" style={{ width: '0%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Win Rate</span>
                        <span className="text-crypto-green">--%</span>
                      </div>
                      <div className="w-full bg-crypto-darker rounded-full h-2">
                        <div className="bg-crypto-green h-2 rounded-full" style={{ width: '0%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Avg. Hold Time</span>
                        <span>-- days</span>
                      </div>
                      <div className="w-full bg-crypto-darker rounded-full h-2">
                        <div className="bg-crypto-blue h-2 rounded-full" style={{ width: '0%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Prediction History & Insights */}
            <div className="lg:col-span-2 space-y-8">
              {/* Prediction History Component */}
              <div className="glass-effect rounded-xl p-6">
                <PredictionHistory />
              </div>

              {/* Trading Insights Component */}

            </div>
          </div>

          {/* Additional Sections */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Best Performing Coins */}
            <div className="glass-effect rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4 gradient-text">Best Performing Coins</h2>
              <div className="space-y-4">
                {[
                  { coin: 'BTC', predictions: '--', winRate: '--%', avgReturn: '--%' },
                  { coin: 'ETH', predictions: '--', winRate: '--%', avgReturn: '--%' },
                  { coin: 'SOL', predictions: '--', winRate: '--%', avgReturn: '--%' },
                  { coin: 'BNB', predictions: '--', winRate: '--%', avgReturn: '--%' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-crypto-darker/50">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-crypto-green/20 to-crypto-blue/20 flex items-center justify-center">
                        <span className="font-bold">{item.coin}</span>
                      </div>
                      <div>
                        <div className="font-medium">{item.coin}</div>
                        <div className="text-sm text-gray-400">{item.predictions} predictions</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-crypto-green font-bold">{item.winRate} win rate</div>
                      <div className="text-sm text-crypto-green">{item.avgReturn} avg return</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="glass-effect rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4 gradient-text">Recent Activity</h2>
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-crypto-darker/50 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-400">No recent activity to display</p>
                <p className="text-gray-500 text-sm mt-2">Make predictions to see activity here</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-8 border-t border-crypto-border">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold gradient-text">Ready to improve your predictions?</h3>
                <p className="text-gray-400 text-sm">Use our advanced AI tools for better trading decisions</p>
              </div>
              <div className="flex items-center space-x-3">
                <button className="px-4 py-2 rounded-lg border border-crypto-border hover:border-crypto-green transition-colors">
                  View Tutorial
                </button>
                <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-crypto-green to-emerald-500 hover:from-emerald-500 hover:to-crypto-green text-white font-medium transition-all duration-300 transform hover:scale-105">
                  Upgrade Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HistoryPage;


