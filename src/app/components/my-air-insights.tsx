import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { TrendingDown, TrendingUp, Award } from 'lucide-react';
import { Badge } from './ui/badge';

const weeklyTrend = [
  { day: 'Mon', exposure: 35, cleanHours: 7.2 },
  { day: 'Tue', exposure: 42, cleanHours: 6.8 },
  { day: 'Wed', exposure: 28, cleanHours: 8.5 },
  { day: 'Thu', exposure: 38, cleanHours: 7.4 },
  { day: 'Fri', exposure: 45, cleanHours: 6.2 },
  { day: 'Sat', exposure: 22, cleanHours: 9.1 },
  { day: 'Sun', exposure: 18, cleanHours: 9.8 },
];

const zoneBreakdown = [
  { name: 'Kitchen', value: 35, color: '#ef4444' },
  { name: 'Living Room', value: 25, color: '#f59e0b' },
  { name: 'Bedroom', value: 15, color: '#10b981' },
  { name: 'Office', value: 20, color: '#3b82f6' },
  { name: 'Outdoors', value: 5, color: '#8b5cf6' },
];

const timeBreakdown = [
  { hour: '6-9am', exposure: 22 },
  { hour: '9-12pm', exposure: 18 },
  { hour: '12-3pm', exposure: 25 },
  { hour: '3-6pm', exposure: 28 },
  { hour: '6-9pm', exposure: 45 },
  { hour: '9-12am', exposure: 15 },
  { hour: '12-6am', exposure: 8 },
];

export function MyAirInsights() {
  const totalCleanHours = 54.0;
  const weeklyChange = -8; // percentage change

  return (
    <div className="space-y-4 p-4">
      {/* Weekly Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Weekly Exposure Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="exposure">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="exposure">Exposure</TabsTrigger>
              <TabsTrigger value="clean">Clean Hours</TabsTrigger>
            </TabsList>
            
            <TabsContent value="exposure" className="mt-4">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={weeklyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="day" stroke="#94a3b8" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="exposure" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="flex items-center justify-between mt-4 p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-700">8% lower this week</span>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  Improving
                </Badge>
              </div>
            </TabsContent>

            <TabsContent value="clean" className="mt-4">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={weeklyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="day" stroke="#94a3b8" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="cleanHours" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Clean-Air Hours Earned */}
      <Card className="bg-gradient-to-br from-green-50 to-white border-2 border-green-100">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Clean-Air Hours Earned</CardTitle>
            <Award className="w-5 h-5 text-green-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-5xl font-bold text-green-600">{totalCleanHours}</div>
            <p className="text-sm text-slate-500 mt-1">hours this week</p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="text-center p-3 bg-white rounded-lg">
              <p className="text-2xl font-bold">9.8h</p>
              <p className="text-xs text-slate-500 mt-1">Best day (Sun)</p>
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <p className="text-2xl font-bold">7.7h</p>
              <p className="text-xs text-slate-500 mt-1">Daily avg</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Exposure by Zone */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Exposure by Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={zoneBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {zoneBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {zoneBreakdown.map((zone, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: zone.color }}></div>
                <span className="text-slate-600">{zone.name}</span>
                <span className="ml-auto font-medium">{zone.value}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Exposure by Time of Day */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Exposure by Time of Day</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={timeBreakdown} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" stroke="#94a3b8" style={{ fontSize: '12px' }} />
              <YAxis type="category" dataKey="hour" stroke="#94a3b8" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Bar dataKey="exposure" fill="#8b5cf6" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
