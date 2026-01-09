import { Activity, Wind, MapPin, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

export function MyAirToday() {
  const exposureStrain = 42; // 0-100 scale
  const cleanAirRecovery = 87; // percentage
  const topDriver = { zone: 'Kitchen', time: '18:30', exposure: 'High PM2.5' };
  const dataConfidence = 94; // percentage

  const getStrainColor = (value: number) => {
    if (value < 30) return 'text-green-600';
    if (value < 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRecoveryColor = (value: number) => {
    if (value > 80) return 'text-green-600';
    if (value > 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-4 p-4">
      {/* Exposure Strain */}
      <Card className="bg-gradient-to-br from-slate-50 to-white border-2">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">Exposure Strain</CardTitle>
            <Activity className="w-4 h-4 text-slate-400" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between mb-3">
            <div>
              <div className={`text-4xl ${getStrainColor(exposureStrain)}`}>
                {exposureStrain}
              </div>
              <p className="text-xs text-slate-500 mt-1">Today's Score</p>
            </div>
            <Badge variant={exposureStrain < 60 ? 'secondary' : 'destructive'}>
              {exposureStrain < 30 ? 'Low' : exposureStrain < 60 ? 'Moderate' : 'High'}
            </Badge>
          </div>
          <Progress value={exposureStrain} className="h-2" />
          <p className="text-xs text-slate-500 mt-2">
            Lower is better • Updated 2 min ago
          </p>
        </CardContent>
      </Card>

      {/* Clean-Air Recovery */}
      <Card className="bg-gradient-to-br from-green-50 to-white border-2 border-green-100">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">Clean-Air Recovery</CardTitle>
            <Wind className="w-4 h-4 text-green-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between mb-3">
            <div>
              <div className={`text-4xl ${getRecoveryColor(cleanAirRecovery)}`}>
                {cleanAirRecovery}%
              </div>
              <p className="text-xs text-slate-500 mt-1">Recovery Index</p>
            </div>
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <Progress value={cleanAirRecovery} className="h-2 bg-green-100" />
          <p className="text-xs text-slate-500 mt-2">
            8.2 hours of clean air today
          </p>
        </CardContent>
      </Card>

      {/* Top Exposure Driver */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">Top Exposure Driver</CardTitle>
            <AlertTriangle className="w-4 h-4 text-orange-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <MapPin className="w-5 h-5 text-orange-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium">{topDriver.zone}</p>
              <p className="text-sm text-slate-500">{topDriver.exposure}</p>
              <p className="text-xs text-slate-400 mt-1">at {topDriver.time}</p>
            </div>
            <Badge variant="outline" className="text-orange-600 border-orange-300">
              Peak
            </Badge>
          </div>
          <div className="mt-4 p-3 bg-slate-50 rounded-lg">
            <p className="text-xs text-slate-600">
              💡 <span className="font-medium">Tip:</span> Consider turning on ventilation while cooking
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Data Confidence */}
      <Card className="border-slate-200">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-600">Data Confidence</span>
            </div>
            <span className="text-sm font-medium">{dataConfidence}%</span>
          </div>
          <Progress value={dataConfidence} className="h-1 mt-2" />
          <p className="text-xs text-slate-500 mt-2">
            All sensors active • Location tracking enabled
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
