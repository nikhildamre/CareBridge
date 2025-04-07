import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarClock,
  UserRound,
  Stethoscope,
  ClipboardList,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to AutoMed, your comprehensive medical management system.
        </p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-muted/40">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Patients
              </CardTitle>
              <UserRound className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">245</div>
              <p className="text-xs text-muted-foreground">
                +12 from last month
              </p>
            </CardContent>
          </Card>
          <Card className="bg-muted/40">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Doctors
              </CardTitle>
              <Stethoscope className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>
          <Card className="bg-muted/40">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Today's Appointments
              </CardTitle>
              <CalendarClock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+5 from yesterday</p>
            </CardContent>
          </Card>
          <Card className="bg-muted/40">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Reports
              </CardTitle>
              <ClipboardList className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">-3 from yesterday</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="appointments" className="mt-4">
          <TabsList>
            <TabsTrigger value="appointments">Today's Appointments</TabsTrigger>
            <TabsTrigger value="patients">Recent Patients</TabsTrigger>
          </TabsList>
          <TabsContent
            value="appointments"
            className="mt-2 rounded-md bg-muted/40 p-4"
          >
            <h3 className="mb-2 text-lg font-medium">Today's Appointments</h3>
            <p className="text-muted-foreground">Loading appointment data...</p>
          </TabsContent>
          <TabsContent
            value="patients"
            className="mt-2 rounded-md bg-muted/40 p-4"
          >
            <h3 className="mb-2 text-lg font-medium">Recent Patients</h3>
            <p className="text-muted-foreground">Loading patient data...</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
