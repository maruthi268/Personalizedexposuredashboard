import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Wifi, WifiOff, Activity, AlertCircle, MapPin, Settings, RefreshCw } from 'lucide-react';
import { Progress } from './ui/progress';

const deviceFleet = [
  { id: 'AQ-001', zone: 'Lobby', status: 'online', signal: 95, firmware: 'v2.4.1', battery: 100, lastSeen: '2 min ago' },
  { id: 'AQ-002', zone: 'Conference A', status: 'online', signal: 88, firmware: 'v2.4.1', battery: 85, lastSeen: '1 min ago' },
  { id: 'AQ-003', zone: 'Conference B', status: 'online', signal: 92, firmware: 'v2.4.1', battery: 92, lastSeen: '3 min ago' },
  { id: 'AQ-004', zone: 'Kitchen', status: 'online', signal: 78, firmware: 'v2.4.0', battery: 67, lastSeen: '1 min ago' },
  { id: 'AQ-005', zone: 'Office Floor 2', status: 'offline', signal: 0, firmware: 'v2.4.1', battery: 0, lastSeen: '2h ago' },
  { id: 'AQ-006', zone: 'Office Floor 3 East', status: 'online', signal: 85, firmware: 'v2.4.1', battery: 78, lastSeen: '2 min ago' },
  { id: 'AQ-007', zone: 'Office Floor 3 West', status: 'online', signal: 90, firmware: 'v2.4.1', battery: 88, lastSeen: '1 min ago' },
  { id: 'AQ-008', zone: 'Cafeteria', status: 'warning', signal: 45, firmware: 'v2.3.8', battery: 34, lastSeen: '12 min ago' },
];

const deviceHealth = [
  { device: 'AQ-004', zone: 'Kitchen', issue: 'PM2.5 sensor confidence low', confidence: 72, action: 'Calibration recommended' },
  { device: 'AQ-008', zone: 'Cafeteria', issue: 'Drift detected - reads 15% high', confidence: 68, action: 'Calibration required' },
  { device: 'AQ-005', zone: 'Office Floor 2', issue: 'Device offline', confidence: 0, action: 'Check power/connectivity' },
];

const zones = [
  { name: 'Lobby', devices: 1, coverage: 100, redundancy: false },
  { name: 'Conference A', devices: 1, coverage: 95, redundancy: false },
  { name: 'Conference B', devices: 1, coverage: 95, redundancy: false },
  { name: 'Kitchen', devices: 1, coverage: 90, redundancy: false },
  { name: 'Office Floor 2', devices: 1, coverage: 0, redundancy: false },
  { name: 'Office Floor 3 East', devices: 2, coverage: 100, redundancy: true },
  { name: 'Office Floor 3 West', devices: 1, coverage: 85, redundancy: false },
  { name: 'Cafeteria', devices: 1, coverage: 80, redundancy: false },
];

const integrations = [
  { name: 'BMS / HVAC', type: 'Building Management', status: 'connected', lastSync: '1 min ago', actions: 42 },
  { name: 'Smart Purifiers', type: 'Air Purification', status: 'connected', lastSync: '30 sec ago', actions: 18 },
  { name: 'ServiceNow', type: 'Ticketing System', status: 'connected', lastSync: '5 min ago', actions: 3 },
  { name: 'Slack', type: 'Notifications', status: 'connected', lastSync: '2 min ago', actions: 8 },
];

export function DevicesInfrastructure() {
  const onlineCount = deviceFleet.filter(d => d.status === 'online').length;
  const offlineCount = deviceFleet.filter(d => d.status === 'offline').length;
  const warningCount = deviceFleet.filter(d => d.status === 'warning').length;
  const avgSignal = Math.round(deviceFleet.filter(d => d.status === 'online').reduce((acc, d) => acc + d.signal, 0) / onlineCount);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-slate-100 rounded-lg">
            <Activity className="w-6 h-6 text-slate-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Devices & Infrastructure</h2>
            <p className="text-sm text-slate-500">Monitor and manage sensor fleet</p>
          </div>
        </div>
        <Button>
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh All
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <Wifi className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-green-600">{onlineCount}</div>
            <p className="text-sm text-slate-500 mt-1">Devices Online</p>
            <p className="text-xs text-slate-400 mt-1">of {deviceFleet.length} total</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <WifiOff className="w-8 h-8 text-red-600" />
            </div>
            <div className="text-3xl font-bold text-red-600">{offlineCount}</div>
            <p className="text-sm text-slate-500 mt-1">Offline</p>
            {offlineCount > 0 && <Badge variant="destructive" className="mt-2 text-xs">Action needed</Badge>}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <AlertCircle className="w-8 h-8 text-orange-600" />
            </div>
            <div className="text-3xl font-bold text-orange-600">{warningCount}</div>
            <p className="text-sm text-slate-500 mt-1">Warnings</p>
            <p className="text-xs text-slate-400 mt-1">Low battery or signal</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <Activity className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-3xl font-bold">{avgSignal}%</div>
            <p className="text-sm text-slate-500 mt-1">Avg Signal Strength</p>
            <Progress value={avgSignal} className="h-1 mt-2" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="fleet">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="fleet">Device Fleet</TabsTrigger>
          <TabsTrigger value="health">Device Health</TabsTrigger>
          <TabsTrigger value="zones">Zones & Mapping</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        {/* Device Fleet */}
        <TabsContent value="fleet" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>All Devices</CardTitle>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Filter</Button>
                  <Button size="sm" variant="outline">Export</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {deviceFleet.map((device) => (
                  <div 
                    key={device.id} 
                    className={`p-4 border-2 rounded-lg ${
                      device.status === 'offline' ? 'border-red-200 bg-red-50' : 
                      device.status === 'warning' ? 'border-orange-200 bg-orange-50' :
                      'border-slate-200 hover:bg-slate-50'
                    } transition-colors`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {device.status === 'online' ? (
                          <Wifi className="w-5 h-5 text-green-600" />
                        ) : device.status === 'warning' ? (
                          <AlertCircle className="w-5 h-5 text-orange-600" />
                        ) : (
                          <WifiOff className="w-5 h-5 text-red-600" />
                        )}
                        <div>
                          <p className="font-medium">{device.id}</p>
                          <p className="text-sm text-slate-500">{device.zone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={
                          device.status === 'online' ? 'secondary' :
                          device.status === 'warning' ? 'outline' :
                          'destructive'
                        } className={
                          device.status === 'online' ? 'bg-green-100 text-green-700' :
                          device.status === 'warning' ? 'border-orange-300 text-orange-700' : ''
                        }>
                          {device.status}
                        </Badge>
                        <Button size="sm" variant="ghost">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-slate-500 text-xs">Signal</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={device.signal} className="h-1 flex-1" />
                          <span className="font-medium">{device.signal}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-slate-500 text-xs">Battery</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={device.battery} className="h-1 flex-1" />
                          <span className="font-medium">{device.battery}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-slate-500 text-xs">Firmware</p>
                        <p className="font-medium mt-1">{device.firmware}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 text-xs">Last Seen</p>
                        <p className="font-medium mt-1">{device.lastSeen}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Device Health */}
        <TabsContent value="health" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sensor Confidence & Drift Detection</CardTitle>
              <p className="text-sm text-slate-500">Devices requiring attention</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {deviceHealth.map((item, idx) => (
                  <div key={idx} className="p-4 border-2 border-orange-200 bg-orange-50 rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <AlertCircle className="w-4 h-4 text-orange-600" />
                          <p className="font-medium">{item.device}</p>
                        </div>
                        <p className="text-sm text-slate-600">{item.zone}</p>
                      </div>
                      <Badge variant="outline" className="border-orange-300 text-orange-700">
                        {item.confidence}% confidence
                      </Badge>
                    </div>
                    <div className="p-3 bg-white rounded-lg mb-3">
                      <p className="text-sm font-medium text-orange-900">{item.issue}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-slate-600">Recommended: {item.action}</p>
                      <Button size="sm">Schedule Calibration</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Calibration Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    { device: 'AQ-001 to AQ-003', status: 'Calibrated', date: 'Dec 20, 2025' },
                    { device: 'AQ-006, AQ-007', status: 'Calibrated', date: 'Dec 28, 2025' },
                    { device: 'AQ-004', status: 'Due soon', date: 'Calibrated 5 months ago' },
                    { device: 'AQ-008', status: 'Overdue', date: 'Calibrated 8 months ago' },
                  ].map((item, idx) => (
                    <div key={idx} className={`p-3 rounded-lg ${item.status === 'Overdue' ? 'bg-red-50' : item.status === 'Due soon' ? 'bg-yellow-50' : 'bg-green-50'}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">{item.device}</p>
                          <p className="text-xs text-slate-500 mt-1">{item.date}</p>
                        </div>
                        <Badge variant={item.status === 'Overdue' ? 'destructive' : item.status === 'Due soon' ? 'outline' : 'secondary'}>
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Firmware Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">v2.4.1 (Latest)</p>
                      <Badge className="bg-blue-600">Current</Badge>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">7 devices up to date</p>
                    <Progress value={87.5} className="h-1" />
                  </div>
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">1 device needs update</p>
                        <p className="text-xs text-slate-500 mt-1">AQ-004 on v2.4.0</p>
                      </div>
                      <Button size="sm">Update</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Zones & Mapping */}
        <TabsContent value="zones" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Zone Coverage</CardTitle>
              <p className="text-sm text-slate-500">Device placement and redundancy</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {zones.map((zone, idx) => (
                  <div key={idx} className={`p-4 border-2 rounded-lg ${zone.coverage < 50 ? 'border-red-200 bg-red-50' : zone.coverage < 90 ? 'border-orange-200 bg-orange-50' : 'border-slate-200'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-slate-400" />
                        <div>
                          <p className="font-medium">{zone.name}</p>
                          <p className="text-sm text-slate-500">{zone.devices} device{zone.devices > 1 ? 's' : ''}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {zone.redundancy && (
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            Redundant
                          </Badge>
                        )}
                        {zone.coverage === 0 && (
                          <Badge variant="destructive">No coverage</Badge>
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-slate-500">Coverage</span>
                        <span className="font-medium">{zone.coverage}%</span>
                      </div>
                      <Progress value={zone.coverage} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Coverage Gaps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <p className="font-medium">Office Floor 2 - No Coverage</p>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">Device AQ-005 offline for 2 hours</p>
                  <Button size="sm">Add Backup Device</Button>
                </div>
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                    <p className="font-medium">Cafeteria - Poor Coverage</p>
                  </div>
                  <p className="text-sm text-slate-600">Consider adding second device for 1200 sq ft space</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations */}
        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Active Integrations</CardTitle>
                  <p className="text-sm text-slate-500 mt-1">Connected systems and platforms</p>
                </div>
                <Button>Add Integration</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {integrations.map((integration, idx) => (
                  <div key={idx} className="p-4 border-2 border-green-200 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium">{integration.name}</p>
                        <p className="text-sm text-slate-500">{integration.type}</p>
                      </div>
                      <Badge className="bg-green-600">
                        <Activity className="w-3 h-3 mr-1" />
                        {integration.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-slate-500 text-xs">Last Sync</p>
                        <p className="font-medium mt-1">{integration.lastSync}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 text-xs">Actions Today</p>
                        <p className="font-medium mt-1">{integration.actions}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline">Configure</Button>
                      <Button size="sm" variant="ghost">View Logs</Button>
                    </div>
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
