import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Home, Building2, Utensils, Users, Wind } from 'lucide-react';

const pm25Data = [
  { time: '00:00', indoor: 8, outdoor: 12 },
  { time: '03:00', indoor: 6, outdoor: 10 },
  { time: '06:00', indoor: 10, outdoor: 15 },
  { time: '09:00', indoor: 12, outdoor: 18 },
  { time: '12:00', indoor: 15, outdoor: 22 },
  { time: '15:00', indoor: 18, outdoor: 25 },
  { time: '18:00', indoor: 45, outdoor: 28 }, // Cooking spike
  { time: '21:00', indoor: 12, outdoor: 20 },
  { time: '23:59', indoor: 8, outdoor: 15 },
];

const co2Data = [
  { time: '00:00', indoor: 450, outdoor: 410 },
  { time: '03:00', indoor: 520, outdoor: 410 },
  { time: '06:00', indoor: 480, outdoor: 410 },
  { time: '09:00', indoor: 650, outdoor: 415 },
  { time: '12:00', indoor: 720, outdoor: 415 },
  { time: '15:00', indoor: 1100, outdoor: 420 }, // Meeting
  { time: '18:00', indoor: 800, outdoor: 420 },
  { time: '21:00', indoor: 600, outdoor: 415 },
  { time: '23:59', indoor: 500, outdoor: 410 },
];

const events = [
  { time: '07:30', type: 'outdoor', icon: Wind, label: 'Morning commute', color: 'bg-blue-100 text-blue-700' },
  { time: '14:30', type: 'meeting', icon: Users, label: 'Meeting room (stale air)', color: 'bg-yellow-100 text-yellow-700' },
  { time: '18:30', type: 'cooking', icon: Utensils, label: 'Cooking spike', color: 'bg-orange-100 text-orange-700' },
  { time: '20:00', type: 'outdoor', icon: Wind, label: 'Outdoor ingress', color: 'bg-purple-100 text-purple-700' },
];

export function MyAirTimeline() {
  const [metric, setMetric] = useState<'pm25' | 'co2'>('pm25');
  const data = metric === 'pm25' ? pm25Data : co2Data;

  return (
    <div className="space-y-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Exposure Timeline</CardTitle>
          <p className="text-sm text-slate-500">Track your air quality throughout the day</p>
        </CardHeader>
        <CardContent>
          <Tabs value={metric} onValueChange={(v) => setMetric(v as 'pm25' | 'co2')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="pm25">PM2.5</TabsTrigger>
              <TabsTrigger value="co2">CO₂</TabsTrigger>
            </TabsList>
            
            <TabsContent value="pm25" className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Indoor</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
                  <span>Outdoor</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="time" 
                    stroke="#94a3b8"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis 
                    stroke="#94a3b8"
                    style={{ fontSize: '12px' }}
                    label={{ value: 'μg/m³', angle: -90, position: 'insideLeft', style: { fontSize: '12px' } }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <ReferenceLine y={12} stroke="#10b981" strokeDasharray="3 3" label={{ value: 'Good', position: 'right', fontSize: 10 }} />
                  <ReferenceLine y={35} stroke="#f59e0b" strokeDasharray="3 3" label={{ value: 'Moderate', position: 'right', fontSize: 10 }} />
                  <Area type="monotone" dataKey="outdoor" stroke="#94a3b8" fill="#e2e8f0" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="indoor" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="co2" className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Indoor</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
                  <span>Outdoor</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="time" 
                    stroke="#94a3b8"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis 
                    stroke="#94a3b8"
                    style={{ fontSize: '12px' }}
                    label={{ value: 'ppm', angle: -90, position: 'insideLeft', style: { fontSize: '12px' } }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <ReferenceLine y={800} stroke="#f59e0b" strokeDasharray="3 3" label={{ value: 'Stale', position: 'right', fontSize: 10 }} />
                  <ReferenceLine y={1000} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'Poor', position: 'right', fontSize: 10 }} />
                  <Area type="monotone" dataKey="outdoor" stroke="#94a3b8" fill="#e2e8f0" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="indoor" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Events Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Today's Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {events.map((event, idx) => {
              const Icon = event.icon;
              return (
                <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <div className={`p-2 rounded-lg ${event.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{event.label}</p>
                    <p className="text-xs text-slate-500">{event.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
