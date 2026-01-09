import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Building2, Users, Wind, AlertTriangle, TrendingUp, TrendingDown, ChevronRight } from 'lucide-react';
import { Progress } from './ui/progress';

const buildings = [
  {
    id: 'building-a',
    name: 'Building A - Main Office',
    floors: 4,
    zones: 12,
    occupants: 145,
    healthScore: 68,
    trend: -8,
    status: 'moderate',
    avgExposure: 42,
    topIssue: 'Conference rooms - CO₂ buildup',
  },
  {
    id: 'building-b',
    name: 'Building B - Research Wing',
    floors: 3,
    zones: 8,
    occupants: 58,
    healthScore: 82,
    trend: 3,
    status: 'good',
    avgExposure: 28,
    topIssue: 'None',
  },
  {
    id: 'building-c',
    name: 'Building C - Cafeteria & Commons',
    floors: 2,
    zones: 6,
    occupants: 42,
    healthScore: 58,
    trend: -15,
    status: 'poor',
    avgExposure: 65,
    topIssue: 'Kitchen PM2.5 spikes',
  },
];

export function SpacesBuildings() {
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'poor':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Building Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {buildings.map((building) => (
          <Card
            key={building.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedBuilding === building.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setSelectedBuilding(building.id)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  <CardTitle className="text-base">{building.name}</CardTitle>
                </div>
                <Badge className={getStatusColor(building.status)}>
                  {building.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Health Score */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600">Health Score</span>
                    <div className="flex items-center gap-1">
                      <span className="text-2xl font-bold">{building.healthScore}</span>
                      <div className={`flex items-center text-xs ${building.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {building.trend > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {Math.abs(building.trend)}%
                      </div>
                    </div>
                  </div>
                  <Progress value={building.healthScore} className="h-2" />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 bg-slate-50 rounded">
                    <p className="text-lg font-bold">{building.floors}</p>
                    <p className="text-xs text-slate-500">Floors</p>
                  </div>
                  <div className="p-2 bg-slate-50 rounded">
                    <p className="text-lg font-bold">{building.zones}</p>
                    <p className="text-xs text-slate-500">Zones</p>
                  </div>
                  <div className="p-2 bg-slate-50 rounded">
                    <p className="text-lg font-bold">{building.occupants}</p>
                    <p className="text-xs text-slate-500">People</p>
                  </div>
                </div>

                {/* Top Issue */}
                {building.topIssue !== 'None' && (
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-orange-900">Top Issue</p>
                        <p className="text-xs text-orange-700 mt-1">{building.topIssue}</p>
                      </div>
                    </div>
                  </div>
                )}

                <Button variant="outline" className="w-full" size="sm">
                  View Floors
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Building Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Building Performance Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {buildings.map((building, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-48 truncate">
                  <p className="text-sm font-medium">{building.name.split(' - ')[0]}</p>
                  <p className="text-xs text-slate-500">{building.zones} zones</p>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Progress value={building.healthScore} className="h-2 flex-1" />
                    <span className="text-sm font-medium w-8">{building.healthScore}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span className="text-sm">{building.occupants}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="w-4 h-4 text-slate-400" />
                  <span className="text-sm">{building.avgExposure}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ventilation Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Ventilation Performance by Building</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { building: 'Building A', performance: 72, ach: 4.2, status: 'Needs improvement' },
              { building: 'Building B', performance: 88, ach: 6.8, status: 'Excellent' },
              { building: 'Building C', performance: 65, ach: 3.5, status: 'Poor' },
            ].map((item, idx) => (
              <div key={idx} className="p-4 border-2 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-medium">{item.building}</p>
                  <Badge variant={item.performance > 80 ? 'secondary' : 'outline'} 
                    className={item.performance > 80 ? 'bg-green-100 text-green-700' : ''}>
                    {item.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-slate-600">Performance</span>
                      <span className="font-medium">{item.performance}%</span>
                    </div>
                    <Progress value={item.performance} className="h-2" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Air Changes/Hour</span>
                    <span className="font-medium">{item.ach} ACH</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
