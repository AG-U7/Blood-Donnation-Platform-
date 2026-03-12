import React, { useState } from "react";
import { HospitalLayout } from "../../components/layouts";
import { Card, Typography, Badge, Button, Input } from "../../components/ui";
import { Plus, Users, Droplet, ArrowUpRight, CheckCircle, Clock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function HospitalDashboard() {
  const [isNewRequestModalOpen, setIsNewRequestModalOpen] = useState(false);
  const [bloodGroup, setBloodGroup] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [urgency, setUrgency] = useState("");

  const STATS = [
    { label: "Demandes actives", value: "3", icon: Clock, color: "text-[#D4720B]" },
    { label: "Dons reçus (Ce mois)", value: "145", icon: Droplet, color: "text-[#1A7A3F]" },
    { label: "Taux de réponse", value: "87%", icon: CheckCircle, color: "text-[#CC0000]" },
    { label: "Total donneurs", value: "1,204", icon: Users, color: "text-[#111111]" },
  ];

  const RECENT_REQUESTS = [
    { id: 1, group: "O+", qty: 3, urgency: "critical", status: "active", date: "Il y a 2h" },
    { id: 2, group: "A-", qty: 1, urgency: "moderate", status: "fulfilled", date: "Hier" },
    { id: 3, group: "B+", qty: 2, urgency: "low", status: "active", date: "Hier" },
    { id: 4, group: "AB+", qty: 4, urgency: "critical", status: "fulfilled", date: "Il y a 3j" },
  ];

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNewRequestModalOpen(false);
    // Add toast or logic here
  };

  return (
    <HospitalLayout>
      <div className="flex justify-between items-end mb-8">
        <div>
          <Typography.H1 className="text-[32px] md:text-[40px] mb-2">Tableau de bord</Typography.H1>
          <Typography.Body>Bienvenue, CHU Yalgado Ouédraogo.</Typography.Body>
        </div>
        <Button 
          onClick={() => setIsNewRequestModalOpen(true)}
          className="hidden md:flex gap-2 bg-[#CC0000]"
        >
          <Plus className="w-5 h-5" />
          Nouvelle demande
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {STATS.map((stat, i) => (
          <Card key={i} className="flex flex-col gap-4 bg-white border border-[#E0E0E0] shadow-sm">
            <div className="flex justify-between items-start">
              <div className={`p-2 rounded-lg bg-[#F5F5F5] ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#888888]" />
            </div>
            <div>
              <p className="text-[#888888] text-sm font-['DM_Sans'] mb-1">{stat.label}</p>
              <p className="text-3xl font-['DM_Sans'] font-semibold text-[#111111]">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Demandes Récentes */}
      <div className="bg-white rounded-xl border border-[#E0E0E0] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#E0E0E0] flex justify-between items-center">
          <Typography.H2 className="text-[20px]">Dernières demandes</Typography.H2>
          <Button variant="ghost" size="sm" className="text-[#CC0000] font-['DM_Sans']">Voir tout</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-['DM_Sans']">
            <thead className="bg-[#F9F9F9] text-[#888888] text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">Groupe sanguin</th>
                <th className="px-6 py-4 font-medium">Quantité</th>
                <th className="px-6 py-4 font-medium">Urgence</th>
                <th className="px-6 py-4 font-medium">Statut</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E0E0E0]">
              {RECENT_REQUESTS.map((req) => (
                <tr key={req.id} className="hover:bg-[#F9F9F9] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#CC0000]/10 flex items-center justify-center font-['DM_Sans'] font-semibold text-[#CC0000] text-lg">
                        {req.group}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-[#111111]">{req.qty} poches</td>
                  <td className="px-6 py-4">
                    <Badge variant={req.urgency as any}>
                      {req.urgency === "critical" ? "Critique" : req.urgency === "moderate" ? "Modérée" : "Faible"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={req.status === "active" ? "pending" : "active"}>
                      {req.status === "active" ? "En cours" : "Clôturée"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-[#888888] text-sm">{req.date}</td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm" className="text-[#CC0000]">Détails</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Floating Action Button (Mobile) */}
      <Button 
        onClick={() => setIsNewRequestModalOpen(true)}
        className="md:hidden fixed bottom-20 right-4 w-14 h-14 rounded-full shadow-[0_4px_16px_rgba(204,0,0,0.3)] bg-[#CC0000] flex items-center justify-center z-50 p-0"
      >
        <Plus className="w-6 h-6 text-white" />
      </Button>

      {/* Modal Nouvelle Demande */}
      <AnimatePresence>
        {isNewRequestModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsNewRequestModalOpen(false)}
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white w-full max-w-lg rounded-2xl shadow-2xl relative z-10 p-6 md:p-8 flex flex-col max-h-[90vh] overflow-y-auto"
            >
              <Typography.H2 className="mb-6 text-2xl">Nouvelle demande d'urgence</Typography.H2>
              
              <form onSubmit={handleCreateRequest} className="flex flex-col gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#111111] mb-3 font-['DM_Sans']">Groupe sanguin requis</label>
                  <div className="grid grid-cols-4 gap-2">
                    {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(g => (
                      <button 
                        key={g} 
                        type="button"
                        onClick={() => setBloodGroup(g)}
                        className={`h-12 rounded-lg border font-['DM_Sans'] font-semibold text-lg transition-all ${bloodGroup === g ? 'bg-[#CC0000]/10 border-[#CC0000] text-[#CC0000]' : 'bg-white border-[#E0E0E0] text-[#111111] hover:border-[#CC0000]/50'}`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#111111] mb-1 font-['DM_Sans']">Quantité (en poches)</label>
                  <Input 
                    type="number" 
                    min="1" 
                    max="50" 
                    value={quantity} 
                    onChange={(e) => setQuantity(e.target.value)} 
                    required 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#111111] mb-3 font-['DM_Sans']">Niveau d'urgence</label>
                  <div className="flex flex-col gap-2">
                    <button 
                      type="button"
                      onClick={() => setUrgency("critical")}
                      className={`p-3 rounded-xl border flex items-center justify-between text-left transition-all ${urgency === 'critical' ? 'bg-[#FF0000]/10 border-[#FF0000]' : 'bg-white border-[#E0E0E0] hover:bg-[#F9F9F9]'}`}
                    >
                      <div>
                        <p className="font-semibold text-[#111111] text-sm">Critique</p>
                        <p className="text-xs text-[#888888]">Besoin immédiat, urgence vitale</p>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 ${urgency === 'critical' ? 'border-[#FF0000] bg-[#FF0000] shadow-[0_0_0_2px_white_inset]' : 'border-[#E0E0E0]'}`}></div>
                    </button>
                    <button 
                      type="button"
                      onClick={() => setUrgency("moderate")}
                      className={`p-3 rounded-xl border flex items-center justify-between text-left transition-all ${urgency === 'moderate' ? 'bg-[#D4720B]/10 border-[#D4720B]' : 'bg-white border-[#E0E0E0] hover:bg-[#F9F9F9]'}`}
                    >
                      <div>
                        <p className="font-semibold text-[#111111] text-sm">Modérée</p>
                        <p className="text-xs text-[#888888]">Besoin sous 24h à 48h</p>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 ${urgency === 'moderate' ? 'border-[#D4720B] bg-[#D4720B] shadow-[0_0_0_2px_white_inset]' : 'border-[#E0E0E0]'}`}></div>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#111111] mb-1 font-['DM_Sans']">Description médicale (optionnel)</label>
                  <textarea 
                    className="w-full h-24 rounded-lg border border-[#E0E0E0] p-3 text-sm focus:outline-none focus:border-[#CC0000] focus:ring-4 focus:ring-[#CC0000]/15 resize-none font-['DM_Sans'] text-[#111111] placeholder:text-[#888888]" 
                    placeholder="Précisez la nature de l'intervention..."
                  ></textarea>
                </div>

                <div className="flex gap-3 mt-4 pt-4 border-t border-[#E0E0E0]">
                  <Button variant="secondary" className="flex-1" onClick={() => setIsNewRequestModalOpen(false)}>Annuler</Button>
                  <Button type="submit" variant="primary" className="flex-1 bg-[#CC0000]">Soumettre la demande</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </HospitalLayout>
  );
}
