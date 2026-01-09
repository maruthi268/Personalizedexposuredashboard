import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Badge } from './ui/badge';
import { ArrowUpRight, ArrowDownRight, Wind, AlertCircle } from 'lucide-react';

const indoorOutdoorData = [
  { time: '00:00', indoor: 12, outdoor: 15 },
  { time: '03:00', indoor: 10, outdoor: 18 },
  { time: '06:00', indoor: 15, outdoor: 32 },
  { time: '09:00', indoor: 18, outdoor: 28 },
  { time: '12:00', indoor: 22, outdoor: 22 },
  { time: '15:00', indoor: 25, outdoor: 18 },
  { time: '18:00', indoor: 28, outdoor: 25 },
  { time: '21:00', indoor: 20, outdoor: 22 },
  { time: '23:59', indoor: 14, outdoor: 20 },
];

const ventilationWindows = [
  { time: '06:00 - 08:00', quality: 'Poor', action: 'Keep closed', outdoor: 32, indoor: 15, delta: -17 },
  { time: '09:00 - 11:00', quality: 'Moderate', action: 'Ventilate cautiously', outdoor: 25, indoor: 18, delta: -7 },
  { time: '12:00 - 15:00', quality: 'Good', action: 'Ventilate freely', outdoor: 18, indoor: 22, delta: 4 },
  { time: '16:00 - 18:00', quality: 'Moderate', action: 'Monitor closely', outdoor: 22, indoor: 25, delta: 3 },
  { time: '19:00 - 21:00', quality: 'Good', action: 'Recommended', outdoor: 20, indoor: 28, delta: 8 },
];

const pollutionEvents = [
  {
    time: '06:30 AM',
    type: 'Morning Traffic Rush',
    outdoor: 38,
    impact: 'High',
    affected: ['West Entrance', 'Lobby', 'Reception'],
    recommendation: 'Close fresh air intake',
  },
  {
    time: '12:15 PM',
    type: 'Industrial Activity (Nearby)',
    outdoor: 42,
    impact: 'High',
    affected: ['North Wing', 'Floor 2'],
    recommendation: 'Switch to recirculation mode',
  },
  {
    time: '06:00 PM',
    type: 'Evening Traffic',
    outdoor: 35,
    impact: 'Medium',
    affected: ['West Entrance'],
    recommendation: 'Monitor and limit exposure',
  },
];

export function SpacesIndoorOutdoor() {
  const currentIndoor = 22;
  const currentOutdoor = 18;
  const delta = currentIndoor - currentOutdoor;

  return (
    <div className="space-y-6">
      {/* Current Conditions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">Indoor Average</span>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                Site-wide
              </Badge>
            </div>
            <div className="text-3xl font-bold text-blue-600">{currentIndoor}</div>
            <p className="text-xs text-slate-500 mt-1">μg/m³ PM2.5</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">Outdoor Current</span>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                Better
              </Badge>
            </div>
            <div className="text-3xl font-bold text-green-600">{currentOutdoor}</div>
            <p className="text-xs text-slate-500 mt-1">μg/m³ PM2.5</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">Indoor–Outdoor Delta</span>
              {delta > 0 ? (
                <ArrowUpRight className="w-5 h-5 text-red-600" />
              ) : (
                <ArrowDownRight className="w-5 h-5 text-green-600" />
              )}
            </div>
            <div className={`text-3xl font-bold ${delta > 0 ? 'text-red-600' : 'text-green-600'}`}>
              {delta > 0 ? '+' : ''}{delta}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {delta > 0 ? 'Indoor worse' : 'Outdoor worse'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Indoor vs Outdoor Trend */}
      <Card>
        <CardHeader>
          <CardTitle>24-Hour Indoor vs Outdoor Comparison</CardTitle>
          <p className="text-sm text-slate-500">PM2.5 levels throughout the day</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={indoorOutdoorData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="time" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" label={{ value: 'PM2.5 (μg/m³)', angle: -90, position: 'insideLeft' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
              />
              <ReferenceLine y={12} stroke="#10b981" strokeDasharray="3 3" label={{ value: 'WHO Good', position: 'right', fontSize: 10 }} />
              <ReferenceLine y={35} stroke="#f59e0b" strokeDasharray="3 3" label={{ value: 'WHO Moderate', position: 'right', fontSize: 10 }} />
              <Line type="monotone" dataKey="indoor" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} name="Indoor" />
              <Line type="monotone" dataKey="outdoor" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} name="Outdoor" />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-600 rounded"></div>
              <span className="text-sm">Indoor</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-600 rounded"></div>
              <span className="text-sm">Outdoor</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ventilation Opportunity Windows */}
      <Card>
        <CardHeader>
          <CardTitle>Ventilation Opportunity Windows</CardTitle>
          <p className="text-sm text-slate-500">Optimal times for natural ventilation</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {ventilationWindows.map((window, idx) => (
              <div
                key={idx}
                className={`p-4 border-2 rounded-lg ${
                  window.quality === 'Good'
                    ? 'border-green-200 bg-green-50'
                    : window.quality === 'Moderate'
                    ? 'border-yellow-200 bg-yellow-50'
                    : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Wind className={`w-5 h-5 ${
                      window.quality === 'Good' ? 'text-green-600' :
                      window.quality === 'Moderate' ? 'text-yellow-600' : 'text-red-600'
                    }`} />
                    <div>
                      <p className="font-medium">{window.time}</p>
                      <p className="text-sm text-slate-600 mt-1">{window.action}</p>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className={
                      window.quality === 'Good'
                        ? 'bg-green-100 text-green-700'
                        : window.quality === 'Moderate'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }
                  >
                    {window.quality}
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
                  <div>
                    <p className="text-slate-500 text-xs">Outdoor</p>
                    <p className="font-medium">{window.outdoor} μg/m³</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs">Indoor</p>
                    <p className="font-medium">{window.indoor} μg/m³</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs">Benefit</p>
                    <p className={`font-medium ${window.delta > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {window.delta > 0 ? '+' : ''}{window.delta}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Outdoor Pollution Events */}
      <Card>
        <CardHeader>
          <CardTitle>Outdoor Pollution Events</CardTitle>
          <p className="text-sm text-slate-500">Tracked high pollution events affecting the building</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pollutionEvents.map((event, idx) => (
              <div key={idx} className="p-4 border-2 border-orange-200 bg-orange-50 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium">{event.type}</p>
                        <Badge variant="outline" className="border-orange-300 text-orange-700">
                          {event.time}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600">Peak: {event.outdoor} μg/m³</p>
                    </div>
                  </div>
                  <Badge variant={event.impact === 'High' ? 'destructive' : 'secondary'}>
                    {event.impact} Impact
                  </Badge>
                </div>
                <div className="ml-8 space-y-2">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Affected Areas:</p>
                    <div className="flex flex-wrap gap-1">
                      {event.affected.map((area, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="p-2 bg-white rounded text-xs text-orange-900">
                    <strong>Action Taken:</strong> {event.recommendation}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-slate-600 mb-2">Good Ventilation Hours Today</p>
            <p className="text-3xl font-bold text-green-600">8.5h</p>
            <p className="text-xs text-slate-500 mt-1">Out of 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-slate-600 mb-2">Outdoor Pollution Alerts</p>
            <p className="text-3xl font-bold text-orange-600">3</p>
            <p className="text-xs text-slate-500 mt-1">High pollution events today</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-slate-600 mb-2">Fresh Air Intake Efficiency</p>
            <p className="text-3xl font-bold text-blue-600">76%</p>
            <p className="text-xs text-slate-500 mt-1">Optimized based on outdoor quality</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
