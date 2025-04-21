"use client";

import { useEffect, useState } from "react";
import type React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  UserCog,
  Calendar,
  Activity,
  TrendingUp,
  ClipboardList,
  Settings,
} from "lucide-react";
import { AppointmentStatusChart } from "./components/appointment-status-chart";
import { AppointmentTypeChart } from "./components/appointment-type-chart";
import { GenderDistributionChart } from "./components/gender-distribution-chart";
import { RecentAppointmentsTable } from "./components/recent-appointments-table";
import Link from "next/link";

export default function StatsDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/stats", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch stats");
        }

        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!stats) {
    return <p>Failed to load stats.</p>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-muted/20 pl-12">
        <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between py-4">
            <h1 className="text-2xl font-bold tracking-tight">
              AutoMed Dashboard
            </h1>
            <nav className="flex items-center gap-4">
              <button className="inline-flex h-9 w-9 items-center justify-center whitespace-nowrap rounded-md px-0 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </button>
            </nav>
          </div>
        </header>

        <main className="container flex-1 space-y-8 py-6">
          <div className="flex flex-col space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              📊 Dashboard Overview
            </h2>
            <p className="text-muted-foreground">
              Welcome to your medical practice analytics dashboard
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Patients"
              value={stats.totalPatients}
              description="Total registered patients"
              icon={<Users className="h-5 w-5 text-primary" />}
              trend="+0% from last month"
              ref="/patient"
            />
            <StatCard
              title="Doctors"
              value={stats.totalDoctors}
              description="Active medical staff"
              icon={<UserCog className="h-5 w-5 text-indigo-500" />}
              trend="+0% from last month"
              ref="/doctor"
            />
            <StatCard
              title="Appointments"
              value={stats.totalAppointments}
              description="Total appointments"
              icon={<Calendar className="h-5 w-5 text-green-500" />}
              trend="+5% from last month"
              ref="/"
            />
            <StatCard
              title="Recent Activity"
              value={stats.appointmentsLast7Days}
              description="Appointments in last 7 days"
              icon={<Activity className="h-5 w-5 text-orange-500" />}
              trend="+22% from previous week"
              ref="/"
            />
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
              <TabsTrigger value="overview">
                <TrendingUp className="mr-2 h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="appointments">
                <Calendar className="mr-2 h-4 w-4" />
                Appointments
              </TabsTrigger>
              <TabsTrigger value="reports">
                <ClipboardList className="mr-2 h-4 w-4" />
                Reports
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle>Appointment Status</CardTitle>
                    <CardDescription>
                      Distribution of appointment statuses
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="flex h-[240px] items-center justify-center p-4">
                      <AppointmentStatusChart
                        data={stats.appointmentsByStatus}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle>Appointment Types</CardTitle>
                    <CardDescription>
                      Distribution by appointment type
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="flex h-[240px] items-center justify-center p-4">
                      <AppointmentTypeChart data={stats.appointmentsByType} />
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle>Gender Distribution</CardTitle>
                    <CardDescription>
                      Patient gender demographics
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="flex h-[240px] items-center justify-center p-4">
                      <GenderDistributionChart
                        data={stats.genderDistribution}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="appointments" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Appointments</CardTitle>
                  <CardDescription>
                    Overview of the latest appointments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentAppointmentsTable />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Reports</CardTitle>
                  <CardDescription>
                    Detailed analytics and reports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex h-[400px] items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <ClipboardList className="mx-auto mb-4 h-12 w-12 opacity-50" />
                      <h3 className="mb-2 text-lg font-medium">
                        Reports Coming Soon
                      </h3>
                      <p>
                        Detailed reports and analytics will be available in the
                        next update.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: number;
  description: string;
  icon: React.ReactNode;
  trend: string;
  ref: string;
}

function StatCard({
  title,
  value,
  description,
  icon,
  trend,
  ref,
}: StatCardProps) {
  return (
    <Link href={ref}>
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
            {icon}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{value}</div>
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
          <div className="mt-3 flex items-center text-xs text-muted-foreground">
            <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
            {trend}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
