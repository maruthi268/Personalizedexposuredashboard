import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Lightbulb, CheckCircle2, Clock, TrendingUp, Wind, Utensils, Home } from 'lucide-react';
import { Checkbox } from './ui/checkbox';
import { useState } from 'react';

const todaySummary = {
  title: "Good Air Day with Evening Spike",
  description: "Your exposure was low for most of the day, but cooking at 6:30 PM caused a significant PM2.5 spike that lasted 45 minutes.",
  rating: "moderate",
};

const currentActions = [
  {
    icon: Wind,
    title: "Open Window in Living Room",
    reason: "CO₂ is building up (750 ppm)",
    impact: "Will improve air in 10-15 min",
    urgency: "medium",
  },
  {
    icon: Utensils,
    title: "Turn on Kitchen Ventilation",
    reason: "PM2.5 elevated from cooking",
    impact: "Clears in 20 min",
    urgency: "low",
  },
];

const habitSuggestions = [
  {
    id: 1,
    title: "Use kitchen exhaust when cooking",
    why: "Reduces PM2.5 spikes by 60%",
    frequency: "Before cooking",
    completed: false,
  },
  {
    id: 2,
    title: "Ventilate bedroom before sleep",
    why: "Improves overnight CO₂ levels",
    frequency: "Every evening",
    completed: true,
  },
  {
    id: 3,
    title: "Open windows during low outdoor pollution",
    why: "Free clean air exchange",
    frequency: "Check app for alerts",
    completed: false,
  },
];

export function MyAirCoaching() {
  const [habits, setHabits] = useState(habitSuggestions);

  const toggleHabit = (id: number) => {
    setHabits(habits.map(h => 
      h.id === id ? { ...h, completed: !h.completed } : h
    ));
  };

  return (
    <div className="space-y-4 p-4">
      {/* What Happened Today */}
      <Card className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-base">What Happened Today</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-medium">{todaySummary.title}</h3>
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                {todaySummary.rating}
              </Badge>
            </div>
            <p className="text-sm text-slate-600">{todaySummary.description}</p>
          </div>
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="text-center p-2 bg-white rounded-lg">
              <p className="text-xl font-bold text-green-600">7.2h</p>
              <p className="text-xs text-slate-500">Clean air</p>
            </div>
            <div className="text-center p-2 bg-white rounded-lg">
              <p className="text-xl font-bold text-orange-600">2</p>
              <p className="text-xs text-slate-500">Spikes</p>
            </div>
            <div className="text-center p-2 bg-white rounded-lg">
              <p className="text-xl font-bold text-blue-600">42</p>
              <p className="text-xs text-slate-500">Strain</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* What To Do Now */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">What To Do Now</CardTitle>
          <p className="text-sm text-slate-500">Real-time recommendations</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {currentActions.map((action, idx) => {
            const Icon = action.icon;
            const urgencyColor = action.urgency === 'high' 
              ? 'bg-red-100 text-red-700 border-red-200' 
              : action.urgency === 'medium'
              ? 'bg-orange-100 text-orange-700 border-orange-200'
              : 'bg-blue-100 text-blue-700 border-blue-200';
            
            return (
              <div key={idx} className={`p-4 rounded-lg border-2 ${urgencyColor}`}>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{action.title}</h4>
                    <p className="text-sm opacity-80 mt-1">{action.reason}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <TrendingUp className="w-3 h-3" />
                      <span className="text-xs">{action.impact}</span>
                    </div>
                  </div>
                </div>
                <Button size="sm" className="w-full mt-3">
                  Mark as Done
                </Button>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Habit Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Build Better Air Habits</CardTitle>
          <p className="text-sm text-slate-500">Personalized based on your patterns</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {habits.map((habit) => (
            <div 
              key={habit.id} 
              className={`p-4 rounded-lg border-2 transition-all ${
                habit.completed 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <Checkbox 
                  checked={habit.completed}
                  onCheckedChange={() => toggleHabit(habit.id)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <h4 className={`font-medium ${habit.completed ? 'line-through text-slate-500' : ''}`}>
                    {habit.title}
                  </h4>
                  <p className="text-sm text-slate-600 mt-1">{habit.why}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span className="text-xs text-slate-500">{habit.frequency}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Completed Actions History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Wins</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { action: 'Opened windows during clean air window', time: '2h ago', impact: '+45 min clean air' },
              { action: 'Used kitchen ventilation while cooking', time: '4h ago', impact: 'Prevented spike' },
              { action: 'Ventilated bedroom before sleep', time: 'Yesterday', impact: 'Better recovery' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.action}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-slate-500">{item.time}</span>
                    <span className="text-xs text-green-600">• {item.impact}</span>
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
