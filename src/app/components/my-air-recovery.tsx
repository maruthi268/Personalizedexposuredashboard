import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Moon, TrendingUp, TrendingDown, AlertCircle, Wind } from 'lucide-react';
import { Badge } from './ui/badge';

const sleepAirQuality = [
  { time: '22:00', co2: 450, pm25: 8 },
  { time: '23:00', co2: 520, pm25: 7 },
  { time: '00:00', co2: 580, pm25: 6 },
  { time: '01:00', co2: 640, pm25: 6 },
  { time: '02:00', co2: 680, pm25: 7 },
  { time: '03:00', co2: 720, pm25: 8 },
  { time: '04:00', co2: 680, pm25: 7 },
  { time: '05:00', co2: 620, pm25: 6 },
  { time: '06:00', co2: 540, pm25: 8 },
  { time: '07:00', co2: 480, pm25: 10 },
];

const weeklyRecovery = [
  { day: 'Mon', score: 78 },
  { day: 'Tue', score: 82 },
  { day: 'Wed', score: 85 },
  { day: 'Thu', score: 79 },
  { day: 'Fri', score: 74 },
  { day: 'Sat', score: 88 },
  { day: 'Sun', score: 92 },
];

const spikes = [
  { time: '02:15', type: 'PM2.5', value: 15, cause: 'Unknown disturbance' },
  { time: '05:30', type: 'CO₂', value: 820, cause: 'Door closed, poor ventilation' },
];

export function MyAirRecovery() {
  const recoveryScore = 87;
  const avgCO2 = 620;
  const spikeCount = 2;
  const recoveryTrend = 5; // percentage change from last week

  return (
    <div className="space-y-4 p-4">
      {/* Recovery Score */}
      <Card className="bg-gradient-to-br from-indigo-50 to-white border-2 border-indigo-100">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Moon className="w-5 h-5 text-indigo-600" />
            <CardTitle className="text-base">Sleep Air Quality</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-4xl font-bold text-indigo-600">{recoveryScore}</div>
              <p className="text-sm text-slate-500 mt-1">Recovery Score</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span className="font-medium">+{recoveryTrend}%</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">vs last week</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-white rounded-lg text-center">
              <p className="text-2xl font-bold">{avgCO2}</p>
              <p className="text-xs text-slate-500 mt-1">Avg CO₂ ppm</p>
              <Badge variant="secondary" className="mt-2 text-xs bg-green-100 text-green-700">
                Excellent
              </Badge>
            </div>
            <div className="p-3 bg-white rounded-lg text-center">
              <p className="text-2xl font-bold">{spikeCount}</p>
              <p className="text-xs text-slate-500 mt-1">Disturbances</p>
              <Badge variant="secondary" className="mt-2 text-xs bg-yellow-100 text-yellow-700">
                Fair
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CO₂ Stability During Sleep */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">CO₂ Stability</CardTitle>
          <p className="text-sm text-slate-500">Last night (10PM - 7AM)</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={sleepAirQuality}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="time" 
                stroke="#94a3b8"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#94a3b8"
                style={{ fontSize: '12px' }}
                domain={[400, 800]}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="co2" 
                stroke="#6366f1" 
                fill="#6366f1" 
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-start gap-2">
              <Wind className="w-4 h-4 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900">Good ventilation</p>
                <p className="text-xs text-blue-700 mt-1">
                  CO₂ peaked at 720 ppm around 3 AM, then decreased naturally
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* PM Spikes During Rest */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Sleep Disturbances</CardTitle>
        </CardHeader>
        <CardContent>
          {spikes.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <Moon className="w-12 h-12 mx-auto mb-2 text-slate-300" />
              <p className="text-sm">No disturbances detected</p>
            </div>
          ) : (
            <div className="space-y-3">
              {spikes.map((spike, idx) => (
                <div key={idx} className="p-3 bg-orange-50 border-2 border-orange-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{spike.type} spike</span>
                        <Badge variant="outline" className="text-orange-600 border-orange-300">
                          {spike.time}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 mt-1">{spike.cause}</p>
                      <p className="text-xs text-slate-500 mt-1">Peak: {spike.value}{spike.type === 'PM2.5' ? ' μg/m³' : ' ppm'}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recovery Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">7-Day Recovery Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={weeklyRecovery}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="day" 
                stroke="#94a3b8"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#94a3b8"
                style={{ fontSize: '12px' }}
                domain={[70, 100]}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#6366f1" 
                strokeWidth={3}
                dot={{ fill: '#6366f1', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="p-3 bg-slate-50 rounded-lg text-center">
              <p className="text-xl font-bold">92</p>
              <p className="text-xs text-slate-500 mt-1">Best (Sunday)</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg text-center">
              <p className="text-xl font-bold">82</p>
              <p className="text-xs text-slate-500 mt-1">Weekly avg</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="bg-gradient-to-br from-purple-50 to-white border-2 border-purple-100">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Moon className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h4 className="font-medium text-purple-900">Recovery Tips</h4>
              <ul className="text-sm text-purple-700 mt-2 space-y-1 list-disc list-inside">
                <li>Keep bedroom CO₂ below 600 ppm for optimal sleep</li>
                <li>Crack a window slightly to prevent CO₂ buildup</li>
                <li>Avoid cooking or burning candles before bedtime</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
