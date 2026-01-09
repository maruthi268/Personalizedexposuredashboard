import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Building2, TrendingUp, TrendingDown, Users, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Progress } from './ui/progress';

const exposureTrend = [
  { day: '1/1', exposure: 35 },
  { day: '1/2', exposure: 42 },
  { day: '1/3', exposure: 38 },
  { day: '1/4', exposure: 33 },
  { day: '1/5', exposure: 29 },
  { day: '1/6', exposure: 31 },
  { day: '1/7', exposure: 27 },
];

export function SpacesOverview() {
  const exposureIndex = 68; // 0-100, lower is better
  const cleanAirHours = 1847; // Total across all occupants today
  const trendChange = -12; // percentage
  const dataCompleteness = 96;
  const totalOccupants = 245;
  const activeSensors = 38;

  return (
    <div className="space-y-6 p-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <Building2 className="w-8 h-8 text-blue-600" />
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                Moderate
              </Badge>
            </div>
            <div className="text-3xl font-bold text-blue-600">{exposureIndex}</div>
            <p className="text-sm text-slate-500 mt-1">Occupant-Weighted Exposure Index</p>
            <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
              <TrendingDown className="w-4 h-4" />
              <span>{Math.abs(trendChange)}% vs last week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-green-600">{cleanAirHours.toLocaleString()}</div>
            <p className="text-sm text-slate-500 mt-1">Clean-Air Hours Delivered</p>
            <p className="text-xs text-slate-400 mt-2">Today across all occupants</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <div className="text-3xl font-bold">{totalOccupants}</div>
            <p className="text-sm text-slate-500 mt-1">Active Occupants</p>
            <p className="text-xs text-slate-400 mt-2">{activeSensors} sensors monitoring</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-600">{dataCompleteness}%</span>
            </div>
            <div className="text-3xl font-bold">{dataCompleteness}%</div>
            <p className="text-sm text-slate-500 mt-1">Data Completeness</p>
            <Progress value={dataCompleteness} className="h-1 mt-3" />
          </CardContent>
        </Card>
      </div>

      {/* Exposure Trend */}
      <Card>
        <CardHeader>
          <CardTitle>7-Day Exposure Trend</CardTitle>
          <p className="text-sm text-slate-500">Site-wide occupant-weighted exposure</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={exposureTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="day" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="exposure" 
                stroke="#3b82f6" 
                fill="#3b82f6" 
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Top Risk Zone</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-bold">Building A - Floor 3</p>
                <p className="text-sm text-slate-500 mt-1">Conference rooms</p>
              </div>
              <Badge variant="destructive">High</Badge>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-slate-500">Avg CO₂</p>
                <p className="font-medium">1,240 ppm</p>
              </div>
              <div>
                <p className="text-slate-500">Occupants</p>
                <p className="font-medium">42</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Best Performing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-bold">Building C - Floor 1</p>
                <p className="text-sm text-slate-500 mt-1">Open workspace</p>
              </div>
              <Badge className="bg-green-100 text-green-700">Excellent</Badge>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-slate-500">Avg CO₂</p>
                <p className="font-medium">520 ppm</p>
              </div>
              <div>
                <p className="text-slate-500">Occupants</p>
                <p className="font-medium">38</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Active Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-500" />
                <span className="text-sm">2 zones need ventilation</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span className="text-sm">1 sensor offline</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-sm">36 zones optimal</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
