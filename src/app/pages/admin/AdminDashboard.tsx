import React from "react";
import { AdminLayout } from "../../components/layouts";
import { Card, Typography, Badge, Button } from "../../components/ui";
import { Users, Droplet, Building2, CheckCircle, XCircle } from "lucide-react";

export function AdminDashboard() {
  const STATS = [
    { label: "Hôpitaux inscrits", value: "42", icon: Building2, color: "text-[#111111]" },
    { label: "En attente validation", value: "5", icon: ClockIcon, color: "text-[#D4720B]" },
    { label: "Donneurs actifs", value: "8,921", icon: Users, color: "text-[#1A7A3F]" },
    { label: "Dons réalisés", value: "1,240", icon: Droplet, color: "text-[#CC0000]" },
  ];

  const PENDING_HOSPITALS = [
    { id: 1, name: "Clinique Les Rameaux", region: "Ouagadougou", email: "contact@rameaux.bf", date: "09 Mars 2025" },
    { id: 2, name: "Centre Médical Notre Dame", region: "Bobo-Dioulasso", email: "direction@cmnd.bf", date: "10 Mars 2025" },
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <Typography.H1 className="text-[32px] mb-2">Vue Globale Administrateur</Typography.H1>
        <Typography.Body>Gérez le réseau SangVie au niveau national.</Typography.Body>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {STATS.map((stat, i) => (
          <Card key={i} className="flex flex-col gap-4 bg-white border border-[#E0E0E0] shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className={`p-2 rounded-lg bg-[#F5F5F5] ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <div>
              <p className="text-[#888888] text-sm font-['DM_Sans'] mb-1">{stat.label}</p>
              <p className="text-3xl font-['DM_Sans'] font-semibold text-[#111111]">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* En attente de validation */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#E0E0E0] shadow-sm overflow-hidden flex flex-col h-full">
          <div className="p-6 border-b border-[#E0E0E0] flex justify-between items-center bg-[#F9F9F9]">
            <div>
              <Typography.H2 className="text-[20px] mb-1">Comptes hôpitaux en attente</Typography.H2>
              <p className="text-sm text-[#888888] font-['DM_Sans']">Vérifiez les agréments avant validation</p>
            </div>
            <Badge variant="pending">5 en attente</Badge>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left font-['DM_Sans']">
              <thead className="bg-white text-[#888888] text-xs uppercase tracking-wider border-b border-[#E0E0E0]">
                <tr>
                  <th className="px-6 py-4 font-medium">Hôpital / Clinique</th>
                  <th className="px-6 py-4 font-medium">Région</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E0E0E0]">
                {PENDING_HOSPITALS.map((hosp) => (
                  <tr key={hosp.id} className="hover:bg-[#F9F9F9] transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-[#111111]">{hosp.name}</p>
                      <p className="text-xs text-[#888888]">{hosp.email}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#444444]">{hosp.region}</td>
                    <td className="px-6 py-4 text-[#888888] text-sm">{hosp.date}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-[#CC0000] hover:bg-[#CC0000]/10 rounded-lg transition-colors" title="Rejeter">
                          <XCircle className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-[#1A7A3F] hover:bg-[#1A7A3F]/10 rounded-lg transition-colors" title="Valider">
                          <CheckCircle className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Dernières Activités Système */}
        <div className="bg-white rounded-xl border border-[#E0E0E0] shadow-sm p-6 flex flex-col h-full">
          <Typography.H2 className="text-[20px] mb-6">Activité système</Typography.H2>
          <div className="flex-1 flex flex-col gap-6 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-px before:bg-[#E0E0E0]">
            {[
              { time: "10:42", text: "Nouvelle demande d'urgence critique", entity: "CMA Pissy" },
              { time: "09:15", text: "Don de sang confirmé", entity: "John Doe (O+)" },
              { time: "Hier", text: "Compte hôpital validé", entity: "Clinique Sandof" },
              { time: "Hier", text: "Rapport mensuel généré", entity: "Super Admin" },
            ].map((activity, i) => (
              <div key={i} className="flex gap-4 relative z-10">
                <div className="w-7 h-7 rounded-full bg-white border-2 border-[#E0E0E0] flex-shrink-0 mt-0.5"></div>
                <div>
                  <p className="text-sm font-['DM_Sans'] text-[#111111] mb-1">{activity.text}</p>
                  <p className="text-xs font-['DM_Sans'] text-[#888888]">{activity.entity} · {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="secondary" className="w-full mt-6">Voir tous les logs</Button>
        </div>
      </div>
    </AdminLayout>
  );
}

// Inline clock icon just for stats
function ClockIcon(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
}
