import { useState } from 'react';
import { Card, CardContent } from './components/ui/card';
import { Button } from './components/ui/button';
import { 
  User, 
  Building2, 
  Brain, 
  Zap, 
  FileText, 
  Activity, 
  Users as UsersIcon,
  Settings,
  Home,
  TrendingUp,
  Lightbulb,
  Moon,
  BarChart3,
  MapPin
} from 'lucide-react';

// Occupant (My Air) Views - Lazy loaded to avoid circular deps
import { MyAirToday } from './components/my-air-today';
import { MyAirTimeline } from './components/my-air-timeline';
import { MyAirInsights } from './components/my-air-insights';
import { MyAirCoaching } from './components/my-air-coaching';
import { MyAirRecovery } from './components/my-air-recovery';

// Enterprise Views
import { SpacesOverview } from './components/spaces-overview';
import { SpacesMain } from './components/spaces-main';
import { ExposureIntelligence } from './components/exposure-intelligence';
import { ActionsAutomation } from './components/actions-automation';
import { DevicesInfrastructure } from './components/devices-infrastructure';

export default function App() {
  const [viewMode, setViewMode] = useState<'occupant' | 'enterprise'>('occupant');
  const [occupantTab, setOccupantTab] = useState('today');
  const [enterpriseSection, setEnterpriseSection] = useState('overview');

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">AirScore</h1>
                <p className="text-xs text-slate-500">Air Quality Monitoring Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'occupant' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('occupant')}
              >
                <User className="w-4 h-4 mr-2" />
                My Air
              </Button>
              <Button
                variant={viewMode === 'enterprise' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('enterprise')}
              >
                <Building2 className="w-4 h-4 mr-2" />
                Enterprise
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Occupant View */}
      {viewMode === 'occupant' && (
        <div className="max-w-2xl mx-auto">
          {/* Mobile-style navigation */}
          <div className="bg-white border-b sticky top-[73px] z-40">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setOccupantTab('today')}
                className={`flex-1 min-w-[80px] px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                  occupantTab === 'today'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                <Home className="w-5 h-5 mx-auto mb-1" />
                Today
              </button>
              <button
                onClick={() => setOccupantTab('timeline')}
                className={`flex-1 min-w-[80px] px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                  occupantTab === 'timeline'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                <TrendingUp className="w-5 h-5 mx-auto mb-1" />
                Timeline
              </button>
              <button
                onClick={() => setOccupantTab('insights')}
                className={`flex-1 min-w-[80px] px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                  occupantTab === 'insights'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                <BarChart3 className="w-5 h-5 mx-auto mb-1" />
                Insights
              </button>
              <button
                onClick={() => setOccupantTab('coaching')}
                className={`flex-1 min-w-[80px] px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                  occupantTab === 'coaching'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                <Lightbulb className="w-5 h-5 mx-auto mb-1" />
                Coaching
              </button>
              <button
                onClick={() => setOccupantTab('recovery')}
                className={`flex-1 min-w-[80px] px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                  occupantTab === 'recovery'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                <Moon className="w-5 h-5 mx-auto mb-1" />
                Recovery
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="pb-8">
            {occupantTab === 'today' && <MyAirToday />}
            {occupantTab === 'timeline' && <MyAirTimeline />}
            {occupantTab === 'insights' && <MyAirInsights />}
            {occupantTab === 'coaching' && <MyAirCoaching />}
            {occupantTab === 'recovery' && <MyAirRecovery />}
          </div>
        </div>
      )}

      {/* Enterprise View */}
      {viewMode === 'enterprise' && (
        <div className="flex h-[calc(100vh-73px)]">
          {/* Sidebar Navigation */}
          <div className="w-64 bg-white border-r overflow-y-auto">
            <div className="p-4 space-y-1">
              <h3 className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                Main
              </h3>
              
              <button
                onClick={() => setEnterpriseSection('overview')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  enterpriseSection === 'overview'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Building2 className="w-4 h-4" />
                  <span>Site Overview</span>
                </div>
              </button>
              
              <button
                onClick={() => setEnterpriseSection('spaces')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  enterpriseSection === 'spaces'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4" />
                  <span>Spaces</span>
                </div>
              </button>
              
              <button
                onClick={() => setEnterpriseSection('intelligence')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  enterpriseSection === 'intelligence'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Brain className="w-4 h-4" />
                  <span>Exposure Intelligence</span>
                </div>
                <span className="px-2 py-0.5 text-xs font-bold rounded bg-green-100 text-green-700">
                  NEW
                </span>
              </button>
              
              <button
                onClick={() => setEnterpriseSection('actions')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  enterpriseSection === 'actions'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Zap className="w-4 h-4" />
                  <span>Actions & Automation</span>
                </div>
                <span className="px-2 py-0.5 text-xs font-bold rounded bg-red-100 text-red-700">
                  3
                </span>
              </button>

              <h3 className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mt-6 mb-3">
                Management
              </h3>
              
              <button
                onClick={() => setEnterpriseSection('reports')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  enterpriseSection === 'reports'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Reports & ESG</span>
              </button>
              
              <button
                onClick={() => setEnterpriseSection('devices')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  enterpriseSection === 'devices'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Activity className="w-4 h-4" />
                <span>Devices</span>
              </button>
              
              <button
                onClick={() => setEnterpriseSection('people')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  enterpriseSection === 'people'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <UsersIcon className="w-4 h-4" />
                <span>People & Policies</span>
              </button>
              
              <button
                onClick={() => setEnterpriseSection('admin')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  enterpriseSection === 'admin'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Admin & Settings</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            {enterpriseSection === 'overview' && <SpacesOverview />}
            {enterpriseSection === 'spaces' && <SpacesMain />}
            {enterpriseSection === 'intelligence' && <ExposureIntelligence />}
            {enterpriseSection === 'actions' && <ActionsAutomation />}
            {enterpriseSection === 'reports' && (
              <div className="p-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center py-12">
                      <FileText className="w-16 h-16 mx-auto text-slate-300 mb-4" />
                      <h3 className="text-xl font-bold mb-2">Reports & ESG</h3>
                      <p className="text-slate-500 mb-4">Executive summaries, compliance reports, and ESG metrics</p>
                      <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-8">
                        <div className="p-4 bg-slate-50 rounded-lg">
                          <p className="text-sm font-medium mb-1">Monthly Report</p>
                          <p className="text-xs text-slate-500">December 2025</p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-lg">
                          <p className="text-sm font-medium mb-1">ESG Dashboard</p>
                          <p className="text-xs text-slate-500">WELL Certified</p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-lg">
                          <p className="text-sm font-medium mb-1">Export Data</p>
                          <p className="text-xs text-slate-500">CSV, PDF, API</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            {enterpriseSection === 'devices' && <DevicesInfrastructure />}
            {enterpriseSection === 'people' && (
              <div className="p-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center py-12">
                      <UsersIcon className="w-16 h-16 mx-auto text-slate-300 mb-4" />
                      <h3 className="text-xl font-bold mb-2">People & Policies</h3>
                      <p className="text-slate-500 mb-4">User management, occupancy tracking, and privacy settings</p>
                      <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto mt-8">
                        <div className="p-4 bg-slate-50 rounded-lg text-left">
                          <p className="text-sm font-medium mb-1">245 Active Users</p>
                          <p className="text-xs text-slate-500">3 Admin • 12 Facility • 230 Occupants</p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-lg text-left">
                          <p className="text-sm font-medium mb-1">Privacy Compliant</p>
                          <p className="text-xs text-slate-500">GDPR • CCPA • Anonymized tracking</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            {enterpriseSection === 'admin' && (
              <div className="p-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center py-12">
                      <Settings className="w-16 h-16 mx-auto text-slate-300 mb-4" />
                      <h3 className="text-xl font-bold mb-2">Admin & Settings</h3>
                      <p className="text-slate-500 mb-4">Platform configuration, audit logs, and system health</p>
                      <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto mt-8">
                        <div className="p-4 bg-green-50 rounded-lg text-left">
                          <p className="text-sm font-medium mb-1 text-green-900">System Health</p>
                          <p className="text-xs text-green-700">All systems operational</p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg text-left">
                          <p className="text-sm font-medium mb-1 text-blue-900">Data Ingestion</p>
                          <p className="text-xs text-blue-700">Real-time • 1s latency</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}