import React from "react";
import { HospitalLayout } from "../../components/layouts";
import { Card, Typography } from "../../components/ui";
import { TrendingUp, Users, Droplet, Calendar, Activity } from "lucide-react";

const STATS = [
  {
    label: "Demandes totales",
    value: "48",
    change: "+12%",
    icon: Activity,
    trend: "up",
  },
  {
    label: "Donneurs actifs",
    value: "156",
    change: "+8%",
    icon: Users,
    trend: "up",
  },
  {
    label: "Poches collectées",
    value: "342",
    change: "+15%",
    icon: Droplet,
    trend: "up",
  },
  {
    label: "Taux de réponse",
    value: "87%",
    change: "+3%",
    icon: TrendingUp,
    trend: "up",
  },
];

const MONTHLY_DATA = [
  { month: "Jan", donations: 28 },
  { month: "Fév", donations: 35 },
  { month: "Mar", donations: 42 },
];

const BLOOD_GROUPS = [
  { group: "O+", count: 89, percentage: 26 },
  { group: "A+", count: 72, percentage: 21 },
  { group: "B+", count: 58, percentage: 17 },
  { group: "AB+", count: 34, percentage: 10 },
  { group: "O-", count: 31, percentage: 9 },
  { group: "A-", count: 28, percentage: 8 },
  { group: "B-", count: 19, percentage: 6 },
  { group: "AB-", count: 11, percentage: 3 },
];

export function HospitalStats() {
  return (
    <HospitalLayout>
      <div className="p-4 md:p-8 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Typography.H1>Statistiques</Typography.H1>
          <button className="px-4 py-2 border border-[#E0E0E0] rounded-lg text-sm font-['DM_Sans'] hover:bg-[#F9F9F9]">
            <Calendar className="w-4 h-4 inline mr-2" />
            Ce mois
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {STATS.map((stat) => (
            <Card key={stat.label}>
              <div className="flex justify-between items-start mb-3">
                <stat.icon className="w-8 h-8 text-[#CC0000]" />
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded ${
                    stat.trend === "up"
                      ? "bg-[#E8F5E9] text-[#1A7A3F]"
                      : "bg-[#FFEBEE] text-[#CC0000]"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <Typography.H2 className="text-3xl mb-1">{stat.value}</Typography.H2>
              <Typography.Small className="text-[#888888]">{stat.label}</Typography.Small>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Trend */}
          <Card>
            <Typography.H2 className="text-[18px] mb-4">Évolution mensuelle</Typography.H2>
            <div className="flex items-end justify-around h-48">
              {MONTHLY_DATA.map((data) => (
                <div key={data.month} className="flex flex-col items-center gap-2">
                  <div
                    className="w-16 bg-[#CC0000] rounded-t-lg relative"
                    style={{ height: `${(data.donations / 50) * 100}%` }}
                  >
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-sm font-semibold text-[#111111]">
                      {data.donations}
                    </span>
                  </div>
                  <Typography.Small className="text-[#888888]">{data.month}</Typography.Small>
                </div>
              ))}
            </div>
          </Card>

          {/* Blood Groups Distribution */}
          <Card>
            <Typography.H2 className="text-[18px] mb-4">
              Répartition par groupe sanguin
            </Typography.H2>
            <div className="space-y-3">
              {BLOOD_GROUPS.slice(0, 5).map((bg) => (
                <div key={bg.group}>
                  <div className="flex justify-between mb-1">
                    <Typography.Body className="font-semibold">{bg.group}</Typography.Body>
                    <Typography.Small className="text-[#888888]">
                      {bg.count} ({bg.percentage}%)
                    </Typography.Small>
                  </div>
                  <div className="w-full bg-[#F5F5F5] rounded-full h-2">
                    <div
                      className="bg-[#CC0000] h-2 rounded-full"
                      style={{ width: `${bg.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <Typography.H2 className="text-[18px] mb-4">Activité récente</Typography.H2>
          <div className="space-y-3">
            {[
              {
                action: "Nouvelle demande de sang",
                detail: "O+ - 3 poches",
                time: "Il y a 5 min",
              },
              {
                action: "Donneur confirmé",
                detail: "Jean Dupont - A+",
                time: "Il y a 15 min",
              },
              {
                action: "Demande satisfaite",
                detail: "B+ - 2 poches",
                time: "Il y a 1h",
              },
              {
                action: "Nouveau donneur inscrit",
                detail: "Marie Kaboré",
                time: "Il y a 2h",
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-3 border-b border-[#E0E0E0] last:border-0"
              >
                <div>
                  <Typography.Body className="font-semibold mb-1">
                    {activity.action}
                  </Typography.Body>
                  <Typography.Small className="text-[#888888]">{activity.detail}</Typography.Small>
                </div>
                <Typography.Small className="text-[#888888]">{activity.time}</Typography.Small>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </HospitalLayout>
  );
}
