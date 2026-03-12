import React from "react";
import { DonorLayout } from "../../components/layouts";
import { Card, Typography, Badge } from "../../components/ui";
import { Calendar, MapPin, Award, TrendingUp } from "lucide-react";

const DONATIONS = [
  {
    id: 1,
    date: "15 Février 2026",
    hospital: "CHU Yalgado Ouédraogo",
    bloodGroup: "O+",
    status: "completed",
    impact: "3 vies sauvées",
  },
  {
    id: 2,
    date: "10 Décembre 2025",
    hospital: "Clinique Sandof",
    bloodGroup: "O+",
    status: "completed",
    impact: "2 vies sauvées",
  },
  {
    id: 3,
    date: "05 Septembre 2025",
    hospital: "CMA Pissy",
    bloodGroup: "O+",
    status: "completed",
    impact: "1 vie sauvée",
  },
];

const STATS = [
  { label: "Dons totaux", value: "3", icon: Award },
  { label: "Vies sauvées", value: "6", icon: TrendingUp },
  { label: "Depuis", value: "Sept 2025", icon: Calendar },
];

export function DonorHistory() {
  return (
    <DonorLayout>
      <div className="p-4 md:p-8 max-w-3xl mx-auto">
        <Typography.H1 className="mb-6">Mon historique</Typography.H1>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {STATS.map((stat) => (
            <Card key={stat.label} className="text-center p-4">
              <stat.icon className="w-6 h-6 text-[#CC0000] mx-auto mb-2" />
              <Typography.H2 className="text-2xl mb-1">{stat.value}</Typography.H2>
              <Typography.Small className="text-[#888888]">{stat.label}</Typography.Small>
            </Card>
          ))}
        </div>

        {/* Next Eligibility */}
        <div className="bg-[#E8F5E9] border border-[#1A7A3F]/20 rounded-xl p-4 mb-8 flex items-start gap-3">
          <Calendar className="w-5 h-5 text-[#1A7A3F] mt-0.5 flex-shrink-0" />
          <div>
            <Typography.Body className="text-[#1A7A3F] font-semibold mb-1">
              Prochain don possible
            </Typography.Body>
            <Typography.Small className="text-[#1A7A3F]/80">
              Vous pourrez donner à nouveau à partir du <strong>15 Mai 2026</strong> (dans 2 mois)
            </Typography.Small>
          </div>
        </div>

        {/* Donation History */}
        <div className="space-y-4">
          <Typography.H2 className="text-[20px] mb-4">Historique des dons</Typography.H2>
          {DONATIONS.map((donation) => (
            <Card key={donation.id}>
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#CC0000]/10 flex items-center justify-center font-['DM_Sans'] font-semibold text-[#CC0000] text-xl">
                    {donation.bloodGroup}
                  </div>
                  <div>
                    <h3 className="font-['DM_Sans'] font-semibold text-[#111111]">
                      {donation.hospital}
                    </h3>
                    <div className="flex items-center text-[#888888] text-xs mt-0.5">
                      <Calendar className="w-3 h-3 mr-1" />
                      {donation.date}
                    </div>
                  </div>
                </div>
                <Badge variant="success">Complété</Badge>
              </div>

              <div className="border-t border-[#E0E0E0] pt-3">
                <div className="flex items-center justify-between">
                  <Typography.Small className="text-[#888888]">Impact</Typography.Small>
                  <Typography.Body className="text-[#1A7A3F] font-semibold text-sm">
                    {donation.impact}
                  </Typography.Body>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DonorLayout>
  );
}
