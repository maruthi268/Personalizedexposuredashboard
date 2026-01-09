import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { MapPin, Users, Wind, Thermometer, Droplets, X } from 'lucide-react';

// Floor plan zones with coordinates and air quality data
const floorZones = {
  'floor-1': [
    { id: 'lobby', name: 'Main Lobby', x: 10, y: 10, width: 30, height: 25, pm25: 12, co2: 520, temp: 22, humidity: 45, occupants: 8, capacity: 30, status: 'good' },
    { id: 'reception', name: 'Reception', x: 42, y: 10, width: 20, height: 15, pm25: 15, co2: 580, temp: 22, humidity: 44, occupants: 3, capacity: 5, status: 'good' },
    { id: 'cafe', name: 'Cafeteria', x: 10, y: 38, width: 35, height: 30, pm25: 48, co2: 720, temp: 24, humidity: 52, occupants: 32, capacity: 60, status: 'poor' },
    { id: 'kitchen', name: 'Kitchen', x: 47, y: 38, width: 15, height: 30, pm25: 65, co2: 850, temp: 26, humidity: 58, occupants: 5, capacity: 8, status: 'poor' },
    { id: 'restroom-1', name: 'Restrooms', x: 10, y: 70, width: 15, height: 12, pm25: 18, co2: 620, temp: 21, humidity: 55, occupants: 2, capacity: 8, status: 'good' },
    { id: 'storage-1', name: 'Storage', x: 45, y: 70, width: 17, height: 12, pm25: 22, co2: 680, temp: 20, humidity: 48, occupants: 0, capacity: 2, status: 'moderate' },
  ],
  'floor-2': [
    { id: 'office-2a', name: 'Office 2A', x: 10, y: 10, width: 25, height: 30, pm25: 18, co2: 620, temp: 22, humidity: 43, occupants: 18, capacity: 24, status: 'good' },
    { id: 'office-2b', name: 'Office 2B', x: 37, y: 10, width: 25, height: 30, pm25: 22, co2: 680, temp: 23, humidity: 45, occupants: 20, capacity: 24, status: 'moderate' },
    { id: 'meeting-2a', name: 'Meeting Room 2A', x: 10, y: 42, width: 18, height: 18, pm25: 28, co2: 920, temp: 24, humidity: 48, occupants: 8, capacity: 12, status: 'moderate' },
    { id: 'meeting-2b', name: 'Meeting Room 2B', x: 30, y: 42, width: 18, height: 18, pm25: 25, co2: 880, temp: 23, humidity: 46, occupants: 6, capacity: 12, status: 'moderate' },
    { id: 'breakroom-2', name: 'Break Room', x: 50, y: 42, width: 12, height: 18, pm25: 32, co2: 750, temp: 23, humidity: 50, occupants: 4, capacity: 10, status: 'moderate' },
    { id: 'restroom-2', name: 'Restrooms', x: 10, y: 62, width: 15, height: 12, pm25: 16, co2: 590, temp: 21, humidity: 52, occupants: 1, capacity: 8, status: 'good' },
  ],
  'floor-3': [
    { id: 'conf-a', name: 'Conference A', x: 10, y: 10, width: 22, height: 22, pm25: 38, co2: 1150, temp: 25, humidity: 52, occupants: 15, capacity: 20, status: 'poor' },
    { id: 'conf-b', name: 'Conference B', x: 34, y: 10, width: 22, height: 22, pm25: 35, co2: 1080, temp: 24, humidity: 50, occupants: 12, capacity: 20, status: 'poor' },
    { id: 'office-3-east', name: 'Office 3 East', x: 10, y: 34, width: 25, height: 30, pm25: 42, co2: 820, temp: 24, humidity: 48, occupants: 22, capacity: 28, status: 'poor' },
    { id: 'office-3-west', name: 'Office 3 West', x: 37, y: 34, width: 25, height: 30, pm25: 28, co2: 720, temp: 23, humidity: 45, occupants: 19, capacity: 28, status: 'moderate' },
    { id: 'server-room', name: 'Server Room', x: 10, y: 66, width: 12, height: 12, pm25: 8, co2: 450, temp: 18, humidity: 35, occupants: 0, capacity: 2, status: 'good' },
  ],
};

const getZoneColor = (status: string) => {
  switch (status) {
    case 'good':
      return '#10b981';
    case 'moderate':
      return '#f59e0b';
    case 'poor':
      return '#ef4444';
    default:
      return '#94a3b8';
  }
};

export function SpacesZones() {
  const [selectedFloor, setSelectedFloor] = useState<'floor-1' | 'floor-2' | 'floor-3'>('floor-1');
  const [selectedZone, setSelectedZone] = useState<any>(null);
  const zones = floorZones[selectedFloor];

  return (
    <div className="space-y-6">
      <Tabs value={selectedFloor} onValueChange={(v) => setSelectedFloor(v as any)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="floor-1">Floor 1</TabsTrigger>
          <TabsTrigger value="floor-2">Floor 2</TabsTrigger>
          <TabsTrigger value="floor-3">Floor 3</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedFloor} className="space-y-6">
          {/* Floor Plan Visualization */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  {selectedFloor === 'floor-1' ? 'Floor 1 - Ground Level' : 
                   selectedFloor === 'floor-2' ? 'Floor 2 - Office Level' : 
                   'Floor 3 - Executive Level'}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-xs">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span>Good</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span>Moderate</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span>Poor</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Floor Plan SVG */}
              <div className="relative bg-slate-100 rounded-lg p-4" style={{ height: '500px' }}>
                <svg viewBox="0 0 70 85" className="w-full h-full">
                  {/* Background grid */}
                  <defs>
                    <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
                      <path d="M 5 0 L 0 0 0 5" fill="none" stroke="#e2e8f0" strokeWidth="0.1"/>
                    </pattern>
                  </defs>
                  <rect width="70" height="85" fill="url(#grid)" />
                  
                  {/* Zones */}
                  {zones.map((zone) => (
                    <g key={zone.id}>
                      <rect
                        x={zone.x}
                        y={zone.y}
                        width={zone.width}
                        height={zone.height}
                        fill={getZoneColor(zone.status)}
                        fillOpacity="0.3"
                        stroke={getZoneColor(zone.status)}
                        strokeWidth="0.3"
                        className="cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => setSelectedZone(zone)}
                      />
                      <text
                        x={zone.x + zone.width / 2}
                        y={zone.y + zone.height / 2}
                        textAnchor="middle"
                        fontSize="2"
                        fill="#1e293b"
                        fontWeight="600"
                        className="pointer-events-none"
                      >
                        {zone.name}
                      </text>
                      <text
                        x={zone.x + zone.width / 2}
                        y={zone.y + zone.height / 2 + 2.5}
                        textAnchor="middle"
                        fontSize="1.5"
                        fill="#64748b"
                        className="pointer-events-none"
                      >
                        {zone.occupants}/{zone.capacity}
                      </text>
                      <text
                        x={zone.x + zone.width / 2}
                        y={zone.y + zone.height / 2 + 4.5}
                        textAnchor="middle"
                        fontSize="1.2"
                        fill="#64748b"
                        className="pointer-events-none"
                      >
                        PM2.5: {zone.pm25} | CO₂: {zone.co2}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            </CardContent>
          </Card>

          {/* Zone Detail Panel */}
          {selectedZone && (
            <Card className="border-2 border-blue-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: getZoneColor(selectedZone.status) }}></div>
                    <CardTitle>{selectedZone.name}</CardTitle>
                    <Badge variant={selectedZone.status === 'good' ? 'secondary' : 'outline'}
                      className={selectedZone.status === 'good' ? 'bg-green-100 text-green-700' : 
                                 selectedZone.status === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
                                 'bg-red-100 text-red-700'}>
                      {selectedZone.status}
                    </Badge>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedZone(null)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Occupancy */}
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">Occupancy</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-600">{selectedZone.occupants}</p>
                    <p className="text-xs text-blue-700 mt-1">
                      {Math.round((selectedZone.occupants / selectedZone.capacity) * 100)}% of capacity
                    </p>
                  </div>

                  {/* PM2.5 */}
                  <div className={`p-4 rounded-lg ${
                    selectedZone.pm25 < 12 ? 'bg-green-50' :
                    selectedZone.pm25 < 35 ? 'bg-yellow-50' : 'bg-red-50'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Wind className="w-4 h-4" />
                      <span className="text-sm font-medium">PM2.5</span>
                    </div>
                    <p className="text-2xl font-bold">{selectedZone.pm25}</p>
                    <p className="text-xs mt-1">μg/m³</p>
                  </div>

                  {/* CO2 */}
                  <div className={`p-4 rounded-lg ${
                    selectedZone.co2 < 800 ? 'bg-green-50' :
                    selectedZone.co2 < 1000 ? 'bg-yellow-50' : 'bg-red-50'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Wind className="w-4 h-4" />
                      <span className="text-sm font-medium">CO₂</span>
                    </div>
                    <p className="text-2xl font-bold">{selectedZone.co2}</p>
                    <p className="text-xs mt-1">ppm</p>
                  </div>

                  {/* Temperature */}
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Thermometer className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium text-purple-900">Temp</span>
                    </div>
                    <p className="text-2xl font-bold text-purple-600">{selectedZone.temp}°C</p>
                    <p className="text-xs text-purple-700 mt-1">{selectedZone.humidity}% humidity</p>
                  </div>
                </div>

                {/* Recommendations */}
                {selectedZone.status !== 'good' && (
                  <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <h4 className="font-medium text-orange-900 mb-2">Recommendations</h4>
                    <ul className="text-sm text-orange-700 space-y-1">
                      {selectedZone.co2 > 1000 && (
                        <li>• Increase ventilation to reduce CO₂ levels</li>
                      )}
                      {selectedZone.pm25 > 35 && (
                        <li>• Activate air purifiers to reduce PM2.5</li>
                      )}
                      {selectedZone.occupants / selectedZone.capacity > 0.8 && (
                        <li>• Consider occupancy limits or improved air circulation</li>
                      )}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Zone List */}
          <Card>
            <CardHeader>
              <CardTitle>Zone Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {zones.map((zone) => (
                  <div
                    key={zone.id}
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-all hover:bg-slate-50 ${
                      selectedZone?.id === zone.id ? 'border-blue-500 bg-blue-50' : 'border-slate-200'
                    }`}
                    onClick={() => setSelectedZone(zone)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getZoneColor(zone.status) }}></div>
                        <div>
                          <p className="font-medium">{zone.name}</p>
                          <p className="text-xs text-slate-500">
                            {zone.occupants} occupants • PM2.5: {zone.pm25} • CO₂: {zone.co2}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className={
                        zone.status === 'good' ? 'bg-green-50 text-green-700 border-green-300' :
                        zone.status === 'moderate' ? 'bg-yellow-50 text-yellow-700 border-yellow-300' :
                        'bg-red-50 text-red-700 border-red-300'
                      }>
                        {zone.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Zone Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Zone Exposure Contribution</CardTitle>
          <p className="text-sm text-slate-500">Percentage of total site exposure by zone</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {zones
              .sort((a, b) => (b.pm25 * b.occupants) - (a.pm25 * a.occupants))
              .slice(0, 5)
              .map((zone, idx) => {
                const contribution = Math.round((zone.pm25 * zone.occupants) / 10);
                return (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-32 truncate">
                      <p className="text-sm font-medium">{zone.name}</p>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              width: `${Math.min(contribution, 100)}%`,
                              backgroundColor: getZoneColor(zone.status),
                            }}
                          />
                        </div>
                        <span className="text-sm font-medium w-12 text-right">{contribution}%</span>
                      </div>
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
