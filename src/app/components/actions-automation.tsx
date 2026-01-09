import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Zap, Wind, Filter, Clock, CheckCircle2, XCircle, TrendingUp, Bell } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const liveActions = [
  {
    id: 1,
    action: 'Increase ventilation',
    zone: 'Conference Room A',
    trigger: 'CO₂ > 1000 ppm',
    priority: 'high',
    status: 'pending',
    estimatedImpact: 'CO₂ reduced to ~650 ppm in 15 min',
  },
  {
    id: 2,
    action: 'Activate air purifier',
    zone: 'Kitchen',
    trigger: 'PM2.5 > 35 μg/m³',
    priority: 'medium',
    status: 'active',
    estimatedImpact: 'PM2.5 cleared in 20 min',
  },
  {
    id: 3,
    action: 'Send ventilation alert',
    zone: 'Floor 3 East',
    trigger: 'Multiple zones stale',
    priority: 'low',
    status: 'pending',
    estimatedImpact: 'User notified to open windows',
  },
];

const automationRules = [
  {
    id: 1,
    name: 'Conference Room Ventilation',
    trigger: 'CO₂ > 800 ppm',
    action: 'Increase HVAC fresh air intake to 50%',
    zones: ['All conference rooms'],
    active: true,
    triggered: 24,
  },
  {
    id: 2,
    name: 'Kitchen Purifier Automation',
    trigger: 'PM2.5 > 25 μg/m³',
    action: 'Activate purifiers on high',
    zones: ['Kitchen', 'Cafeteria'],
    active: true,
    triggered: 18,
  },
  {
    id: 3,
    name: 'Overnight CO₂ Control',
    trigger: 'After hours + CO₂ > 600 ppm',
    action: 'Activate ventilation for 10 min/hour',
    zones: ['All zones'],
    active: true,
    triggered: 7,
  },
  {
    id: 4,
    name: 'Outdoor Pollution Protection',
    trigger: 'Outdoor AQI > 150',
    action: 'Close fresh air dampers, recirculate + filter',
    zones: ['All zones'],
    active: false,
    triggered: 2,
  },
];

const effectivenessData = [
  { intervention: 'Conf Room HVAC', before: 1150, after: 680, improvement: 41 },
  { intervention: 'Kitchen Purifier', before: 42, after: 12, improvement: 71 },
  { intervention: 'Window Alert', before: 850, after: 620, improvement: 27 },
];

export function ActionsAutomation() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 bg-blue-100 rounded-lg">
          <Zap className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Actions & Automation</h2>
          <p className="text-sm text-slate-500">From insight → action → proof</p>
        </div>
      </div>

      <Tabs defaultValue="live">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="live">Live Actions</TabsTrigger>
          <TabsTrigger value="rules">Automation Rules</TabsTrigger>
          <TabsTrigger value="effectiveness">Effectiveness</TabsTrigger>
        </TabsList>

        {/* Live Actions */}
        <TabsContent value="live" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recommended Actions</CardTitle>
              <p className="text-sm text-slate-500">AI-suggested interventions based on current conditions</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {liveActions.map((item) => {
                  const priorityColors = {
                    high: 'border-red-200 bg-red-50',
                    medium: 'border-orange-200 bg-orange-50',
                    low: 'border-blue-200 bg-blue-50',
                  };

                  return (
                    <div key={item.id} className={`p-4 border-2 rounded-lg ${priorityColors[item.priority as keyof typeof priorityColors]}`}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{item.action}</h4>
                            <Badge variant={item.priority === 'high' ? 'destructive' : 'secondary'}>
                              {item.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600">{item.zone}</p>
                          <p className="text-xs text-slate-500 mt-1">Trigger: {item.trigger}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {item.status === 'active' ? (
                            <Badge className="bg-green-600">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Active
                            </Badge>
                          ) : (
                            <Badge variant="outline">Pending</Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-white rounded text-sm mb-3">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="text-slate-600">{item.estimatedImpact}</span>
                      </div>
                      <div className="flex gap-2">
                        {item.status === 'pending' && (
                          <>
                            <Button size="sm" className="flex-1">Approve & Execute</Button>
                            <Button size="sm" variant="outline" className="flex-1">Snooze</Button>
                          </>
                        )}
                        {item.status === 'active' && (
                          <Button size="sm" variant="outline" className="w-full">View Details</Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <Zap className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold">3</div>
                <p className="text-sm text-slate-500 mt-1">Pending Approvals</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-3xl font-bold">8</div>
                <p className="text-sm text-slate-500 mt-1">Active Automations</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
                <div className="text-3xl font-bold">42</div>
                <p className="text-sm text-slate-500 mt-1">Actions Today</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Automation Rules */}
        <TabsContent value="rules" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Automation Rules</CardTitle>
                  <p className="text-sm text-slate-500 mt-1">Configure automatic responses to air quality events</p>
                </div>
                <Button>
                  <Zap className="w-4 h-4 mr-2" />
                  Create Rule
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {automationRules.map((rule) => (
                  <div key={rule.id} className="p-4 border-2 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium">{rule.name}</h4>
                          <Switch checked={rule.active} />
                        </div>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2">
                            <Bell className="w-4 h-4 text-slate-400" />
                            <span className="text-slate-600">When: {rule.trigger}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-slate-400" />
                            <span className="text-slate-600">Then: {rule.action}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Wind className="w-4 h-4 text-slate-400" />
                            <span className="text-slate-600">Zones: {rule.zones.join(', ')}</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary" className="ml-3">
                        {rule.triggered}× today
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="text-xs">Edit Rule</Button>
                      <Button size="sm" variant="ghost" className="text-xs">View History</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Quiet Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Weekday Nights</p>
                      <p className="text-xs text-slate-500 mt-1">10 PM - 6 AM</p>
                    </div>
                    <Switch checked={true} />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Weekends</p>
                      <p className="text-xs text-slate-500 mt-1">All day</p>
                    </div>
                    <Switch checked={true} />
                  </div>
                  <p className="text-xs text-slate-500 mt-3">
                    <Clock className="w-3 h-3 inline mr-1" />
                    During quiet hours, only critical alerts will trigger actions
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Escalation Policies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { level: 'Low Priority', wait: '30 min', notify: 'Occupants only' },
                    { level: 'Medium Priority', wait: '10 min', notify: 'Facility team' },
                    { level: 'High Priority', wait: 'Immediate', notify: 'Facility + Management' },
                  ].map((policy, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-sm">{policy.level}</p>
                        <Badge variant="outline" className="text-xs">{policy.wait}</Badge>
                      </div>
                      <p className="text-xs text-slate-500">{policy.notify}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Effectiveness */}
        <TabsContent value="effectiveness" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Action Effectiveness</CardTitle>
              <p className="text-sm text-slate-500">Before vs after intervention metrics</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={effectivenessData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="intervention" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="before" fill="#94a3b8" name="Before" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="after" fill="#10b981" name="After" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-3 gap-4 mt-6">
                {effectivenessData.map((item, idx) => (
                  <div key={idx} className="text-center p-3 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">-{item.improvement}%</p>
                    <p className="text-xs text-slate-500 mt-1">{item.intervention}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Time to Recovery</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { action: 'HVAC ventilation increase', avgTime: '12 min', target: '15 min', status: 'good' },
                    { action: 'Air purifier activation', avgTime: '18 min', target: '20 min', status: 'good' },
                    { action: 'Window ventilation alert', avgTime: '28 min', target: '25 min', status: 'slow' },
                  ].map((item, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-sm">{item.action}</p>
                        <Badge variant={item.status === 'good' ? 'secondary' : 'outline'} className={item.status === 'good' ? 'bg-green-100 text-green-700' : ''}>
                          {item.avgTime}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-500">Target: {item.target}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Failed Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { action: 'HVAC control', zone: 'Floor 2', reason: 'BMS connection timeout', time: '2h ago' },
                    { action: 'Purifier activation', zone: 'Kitchen', reason: 'Device offline', time: 'Yesterday' },
                  ].map((item, idx) => (
                    <div key={idx} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-start gap-2 mb-2">
                        <XCircle className="w-4 h-4 text-red-600 mt-0.5" />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.action}</p>
                          <p className="text-xs text-slate-600 mt-1">{item.zone}</p>
                        </div>
                      </div>
                      <p className="text-xs text-red-700">{item.reason}</p>
                      <p className="text-xs text-slate-400 mt-1">{item.time}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Maintenance Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { alert: 'Persistent High Zones', details: 'Conference Room B has not improved despite 5 interventions', priority: 'high' },
                  { alert: 'Device Drift Detected', details: 'Sensor #24 readings 15% higher than neighbors', priority: 'medium' },
                  { alert: 'Ventilation Inefficiency', details: 'Floor 3 HVAC taking 2× longer to clear CO₂', priority: 'medium' },
                ].map((item, idx) => (
                  <div key={idx} className={`p-4 border-2 rounded-lg ${item.priority === 'high' ? 'border-red-200 bg-red-50' : 'border-orange-200 bg-orange-50'}`}>
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">{item.alert}</h4>
                      <Badge variant={item.priority === 'high' ? 'destructive' : 'secondary'}>
                        {item.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600">{item.details}</p>
                    <Button size="sm" variant="outline" className="mt-3">Investigate</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
