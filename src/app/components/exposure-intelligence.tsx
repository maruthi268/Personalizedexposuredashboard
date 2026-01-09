import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, Cell } from 'recharts';
import { Badge } from './ui/badge';
import { Brain, TrendingUp, Users, AlertTriangle, Calendar } from 'lucide-react';

const exposureDoseData = [
  { zone: 'Conf A', people: 15, avgExposure: 82, totalDose: 1230 },
  { zone: 'Conf B', people: 12, avgExposure: 78, totalDose: 936 },
  { zone: 'Kitchen', people: 45, avgExposure: 65, totalDose: 2925 },
  { zone: 'Office 1', people: 38, avgExposure: 42, totalDose: 1596 },
  { zone: 'Office 2', people: 42, avgExposure: 38, totalDose: 1596 },
  { zone: 'Lobby', people: 28, avgExposure: 25, totalDose: 700 },
];

const timeAboveGuidelines = [
  { zone: 'Conference A', pm25Hours: 4.2, co2Hours: 5.8 },
  { zone: 'Conference B', pm25Hours: 3.8, co2Hours: 5.2 },
  { zone: 'Kitchen', pm25Hours: 6.5, co2Hours: 2.1 },
  { zone: 'Meeting Room 1', pm25Hours: 2.1, co2Hours: 4.5 },
  { zone: 'Meeting Room 2', pm25Hours: 1.8, co2Hours: 4.2 },
];

const topDrivers = [
  { driver: 'Poor ventilation in conference rooms', impact: 'High', affected: 48, frequency: 'Daily' },
  { driver: 'Kitchen cooking during lunch rush', impact: 'High', affected: 85, frequency: '11:30-13:30' },
  { driver: 'HVAC cycling delay (Floor 3)', impact: 'Medium', affected: 32, frequency: 'Morning' },
  { driver: 'Outdoor pollution ingress (West entrance)', impact: 'Medium', affected: 15, frequency: 'Rush hour' },
];

const sensitiveGroups = [
  { group: 'Sensitive Users', count: 28, avgExposure: 52, breaches: 8 },
  { group: 'Normal Users', count: 217, avgExposure: 38, breaches: 2 },
];

export function ExposureIntelligence() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 bg-purple-100 rounded-lg">
          <Brain className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Exposure Intelligence</h2>
          <p className="text-sm text-slate-500">Advanced analytics and pattern detection</p>
        </div>
      </div>

      <Tabs defaultValue="analytics">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="drivers">Drivers</TabsTrigger>
          <TabsTrigger value="sensitivity">Sensitivity</TabsTrigger>
          <TabsTrigger value="benchmarking">Benchmarking</TabsTrigger>
        </TabsList>

        {/* Exposure Analytics */}
        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Exposure Dose by Zone</CardTitle>
              <p className="text-sm text-slate-500">People × Time × Exposure concentration</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={exposureDoseData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis type="number" stroke="#94a3b8" />
                  <YAxis type="category" dataKey="zone" stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="totalDose" fill="#8b5cf6" radius={[0, 8, 8, 0]}>
                    {exposureDoseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.avgExposure > 70 ? '#ef4444' : entry.avgExposure > 50 ? '#f59e0b' : '#8b5cf6'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-3 gap-4 mt-6">
                {exposureDoseData.slice(0, 3).map((zone, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-sm font-medium">{zone.zone}</p>
                    <p className="text-xs text-slate-500 mt-1">{zone.people} people</p>
                    <p className="text-lg font-bold mt-2">{zone.avgExposure}</p>
                    <p className="text-xs text-slate-500">Avg exposure</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Time Above Guidelines</CardTitle>
              <p className="text-sm text-slate-500">Hours per day exceeding WHO/ASHRAE limits</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={timeAboveGuidelines}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="zone" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="pm25Hours" fill="#f59e0b" radius={[8, 8, 0, 0]} name="PM2.5" />
                  <Bar dataKey="co2Hours" fill="#3b82f6" radius={[8, 8, 0, 0]} name="CO₂" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Drivers & Patterns */}
        <TabsContent value="drivers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Exposure Drivers</CardTitle>
              <p className="text-sm text-slate-500">Root causes of high exposure events</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topDrivers.map((driver, idx) => (
                  <div key={idx} className="p-4 border-2 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className={`w-4 h-4 ${driver.impact === 'High' ? 'text-red-500' : 'text-orange-500'}`} />
                          <h4 className="font-medium">{driver.driver}</h4>
                        </div>
                      </div>
                      <Badge variant={driver.impact === 'High' ? 'destructive' : 'secondary'}>
                        {driver.impact}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-600">{driver.affected} people affected</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-600">{driver.frequency}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Repeating Risk Windows</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { time: 'Weekdays 11:30-13:30', zone: 'Kitchen', issue: 'Cooking PM2.5 spikes' },
                    { time: 'Weekdays 14:00-16:00', zone: 'Conference rooms', issue: 'CO₂ buildup' },
                    { time: 'Mon/Wed 09:00-10:00', zone: 'All-hands room', issue: 'Occupancy surge' },
                  ].map((window, idx) => (
                    <div key={idx} className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <p className="font-medium text-sm">{window.time}</p>
                      <p className="text-sm text-slate-600 mt-1">{window.zone}</p>
                      <p className="text-xs text-orange-700 mt-1">{window.issue}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Seasonal Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { season: 'Winter (Current)', pattern: 'Windows closed → CO₂ buildup', trend: 'up' },
                    { season: 'Summer', pattern: 'AC recirculation → PM2.5 retention', trend: 'neutral' },
                    { season: 'Spring/Fall', pattern: 'Open windows → outdoor ingress', trend: 'neutral' },
                  ].map((pattern, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm">{pattern.season}</p>
                        <TrendingUp className={`w-4 h-4 ${pattern.trend === 'up' ? 'text-red-500' : 'text-slate-400'}`} />
                      </div>
                      <p className="text-xs text-slate-600 mt-1">{pattern.pattern}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Sensitivity Analysis */}
        <TabsContent value="sensitivity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sensitive vs Normal Users</CardTitle>
              <p className="text-sm text-slate-500">Self-reported or high-risk groups</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sensitiveGroups.map((group, idx) => (
                  <div key={idx} className={`p-6 rounded-lg border-2 ${idx === 0 ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium">{group.group}</h4>
                      <Badge variant={idx === 0 ? 'destructive' : 'secondary'}>
                        {group.count} people
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-3xl font-bold">{group.avgExposure}</p>
                        <p className="text-xs text-slate-500 mt-1">Avg exposure</p>
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-red-600">{group.breaches}</p>
                        <p className="text-xs text-slate-500 mt-1">Threshold breaches</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>High-Risk Group Exposure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'Sarah M.', exposure: 78, zone: 'Floor 3 East', status: 'High', alert: true },
                  { name: 'James K.', exposure: 65, zone: 'Conference A', status: 'Moderate', alert: false },
                  { name: 'Maria L.', exposure: 58, zone: 'Floor 2 West', status: 'Moderate', alert: false },
                  { name: 'David R.', exposure: 72, zone: 'Kitchen area', status: 'High', alert: true },
                ].map((person, idx) => (
                  <div key={idx} className={`p-4 border rounded-lg ${person.alert ? 'border-red-200 bg-red-50' : 'border-slate-200'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium">{person.name}</p>
                        <p className="text-sm text-slate-500 mt-1">{person.zone}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">{person.exposure}</p>
                        <Badge variant={person.status === 'High' ? 'destructive' : 'secondary'} className="mt-1">
                          {person.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Benchmarking */}
        <TabsContent value="benchmarking" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Internal Baseline Comparison</CardTitle>
              <p className="text-sm text-slate-500">Performance vs site baseline</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { metric: 'Avg Daily Exposure', current: 38, baseline: 52, change: -27 },
                  { metric: 'Clean-Air Hours', current: 7.8, baseline: 6.2, change: 26 },
                  { metric: 'High Exposure Events', current: 3.2, baseline: 5.8, change: -45 },
                  { metric: 'Guideline Breaches/Day', current: 1.4, baseline: 3.2, change: -56 },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{item.metric}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        <span className="text-slate-600">Current: <strong>{item.current}</strong></span>
                        <span className="text-slate-400">Baseline: {item.baseline}</span>
                      </div>
                    </div>
                    <div className={`flex items-center gap-1 font-medium ${item.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {item.change > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingUp className="w-4 h-4 rotate-180" />}
                      <span>{Math.abs(item.change)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Before vs After Interventions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { intervention: 'Installed purifiers (Floor 3)', date: 'Dec 15', improvement: -42 },
                    { intervention: 'HVAC schedule optimization', date: 'Dec 1', improvement: -28 },
                    { intervention: 'Conference room ventilation', date: 'Nov 20', improvement: -35 },
                  ].map((item, idx) => (
                    <div key={idx} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="font-medium text-sm">{item.intervention}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-slate-500">{item.date}</span>
                        <Badge className="bg-green-600">{item.improvement}% exposure</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Site vs Site Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { site: 'HQ (Current)', score: 68, rank: '2nd of 4' },
                    { site: 'West Campus', score: 72, rank: '3rd of 4' },
                    { site: 'East Campus', score: 58, rank: '1st of 4' },
                    { site: 'Downtown Office', score: 85, rank: '4th of 4' },
                  ].map((site, idx) => (
                    <div key={idx} className={`p-3 rounded-lg ${idx === 0 ? 'bg-blue-50 border-2 border-blue-200' : 'bg-slate-50'}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{site.site}</p>
                          <p className="text-xs text-slate-500 mt-1">{site.rank}</p>
                        </div>
                        <div className="text-2xl font-bold">{site.score}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
