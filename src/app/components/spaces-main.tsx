import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { SpacesOverview } from './spaces-overview';
import { SpacesBuildings } from './spaces-buildings';
import { SpacesZones } from './spaces-zones';
import { SpacesIndoorOutdoor } from './spaces-indoor-outdoor';

export function SpacesMain() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Spaces</h2>
        <p className="text-sm text-slate-500 mt-1">Where exposure actually happens</p>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Site Overview</TabsTrigger>
          <TabsTrigger value="buildings">Buildings</TabsTrigger>
          <TabsTrigger value="zones">Zones & Floor Plans</TabsTrigger>
          <TabsTrigger value="indoor-outdoor">Indoor vs Outdoor</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <SpacesOverview />
        </TabsContent>

        <TabsContent value="buildings" className="mt-6">
          <SpacesBuildings />
        </TabsContent>

        <TabsContent value="zones" className="mt-6">
          <SpacesZones />
        </TabsContent>

        <TabsContent value="indoor-outdoor" className="mt-6">
          <SpacesIndoorOutdoor />
        </TabsContent>
      </Tabs>
    </div>
  );
}
