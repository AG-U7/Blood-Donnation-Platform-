import React, { useState } from "react";
import { Link } from "react-router";
import { DonorLayout } from "../../components/layouts";
import { Card, Typography, Badge, Button } from "../../components/ui";
import { MapPin, Filter, X, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const DEMANDES = [
  {
    id: 1,
    hospital: "CHU Yalgado Ouédraogo",
    group: "O+",
    urgency: "critical",
    distance: "2.5 km",
    description: "Urgence accident de la route. Besoin immédiat de 3 poches.",
  },
  {
    id: 2,
    hospital: "Clinique Sandof",
    group: "A-",
    urgency: "moderate",
    distance: "5.1 km",
    description: "Intervention chirurgicale programmée. Besoin de 2 poches.",
  },
  {
    id: 3,
    hospital: "CMA Pissy",
    group: "B+",
    urgency: "critical",
    distance: "7.8 km",
    description: "Complication accouchement. Besoin urgent.",
  },
];

export function DonorFeed() {
  const [isActive, setIsActive] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  return (
    <DonorLayout>
      <div className="p-4 md:p-8 max-w-3xl mx-auto">
        {/* Statut Donneur Toggle */}
        <div className="bg-white p-5 rounded-xl border border-[#E0E0E0] mb-6 flex items-center justify-between">
          <div>
            <Typography.H2 className="text-[18px]">Statut de don</Typography.H2>
            <Typography.Small>
              {isActive ? "Vous êtes visible pour les urgences" : "Vous ne recevrez pas de notifications"}
            </Typography.Small>
          </div>
          <button 
            onClick={() => setIsActive(!isActive)}
            className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors ${isActive ? 'bg-[#1A7A3F]' : 'bg-[#E0E0E0]'}`}
          >
            <motion.div 
              layout 
              className={`w-6 h-6 rounded-full shadow-sm bg-white`} 
              style={{ x: isActive ? 24 : 0 }} 
            />
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between mb-4">
          <Typography.H2 className="text-[20px]">Urgences autour de vous</Typography.H2>
          <button className="flex items-center gap-2 text-sm text-[#444444] font-medium font-['DM_Sans'] hover:text-[#111111]">
            <Filter className="w-4 h-4" />
            Filtres
          </button>
        </div>

        {/* Feed List */}
        <div className="flex flex-col gap-4 mb-24 md:mb-8">
          {DEMANDES.map((demande) => (
            <Card key={demande.id} className="hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow cursor-pointer">
              <div onClick={() => setSelectedRequest(demande)}>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#CC0000]/10 flex items-center justify-center font-['DM_Sans'] font-semibold text-[#CC0000] text-xl">
                      {demande.group}
                    </div>
                    <div>
                      <h3 className="font-['DM_Sans'] font-semibold text-[#111111]">{demande.hospital}</h3>
                      <div className="flex items-center text-[#888888] text-xs mt-0.5">
                        <MapPin className="w-3 h-3 mr-1" />
                        {demande.distance}
                      </div>
                    </div>
                  </div>
                  <Badge variant={demande.urgency as any}>
                    {demande.urgency === "critical" ? "Urgence vitale" : "Urgence modérée"}
                  </Badge>
                </div>
                <Typography.Body className="text-sm mb-4">{demande.description}</Typography.Body>
                <div className="border-t border-[#E0E0E0] pt-3 flex justify-between items-center">
                  <span className="text-xs text-[#888888] font-['DM_Sans']">Il y a 10 min</span>
                  <Button size="sm" onClick={(e) => { e.stopPropagation(); setSelectedRequest(demande); }}>Répondre</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Détail Demande Modal */}
        <AnimatePresence>
          {selectedRequest && (
            <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center p-4 sm:p-0">
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                onClick={() => setSelectedRequest(null)}
              />
              <motion.div 
                initial={{ y: "100%" }} 
                animate={{ y: 0 }} 
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="bg-white w-full max-w-lg rounded-t-2xl sm:rounded-2xl shadow-2xl relative z-10 p-6 flex flex-col max-h-[90vh]"
              >
                <button 
                  onClick={() => setSelectedRequest(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-[#F5F5F5] hover:bg-[#E0E0E0]"
                >
                  <X className="w-5 h-5 text-[#444444]" />
                </button>
                
                <div className="flex flex-col items-center mb-6 mt-4 text-center">
                  <div className="w-20 h-20 rounded-full bg-[#CC0000]/10 flex items-center justify-center font-['DM_Sans'] font-semibold text-[#CC0000] text-4xl mb-3">
                    {selectedRequest.group}
                  </div>
                  <Badge variant={selectedRequest.urgency as any} className="mb-2">
                    {selectedRequest.urgency === "critical" ? "Urgence vitale" : "Urgence modérée"}
                  </Badge>
                  <Typography.H2 className="text-2xl">{selectedRequest.hospital}</Typography.H2>
                  <div className="flex items-center text-[#888888] text-sm mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    Ouagadougou, Secteur 4 ({selectedRequest.distance})
                  </div>
                </div>

                <div className="bg-[#F9F9F9] rounded-xl p-4 mb-6">
                  <h4 className="font-['DM_Sans'] font-semibold text-[#111111] mb-2 text-sm">Description médicale</h4>
                  <Typography.Body className="text-sm">{selectedRequest.description}</Typography.Body>
                </div>

                <div className="bg-[#FFF4E5] border border-[#D4720B]/30 rounded-xl p-4 mb-6 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#D4720B] mt-0.5 flex-shrink-0" />
                  <Typography.Small className="text-[#D4720B] leading-relaxed">
                    Assurez-vous d'avoir mangé et d'être bien hydraté avant de vous rendre à l'hôpital. N'oubliez pas votre pièce d'identité.
                  </Typography.Small>
                </div>

                <div className="flex gap-3 mt-auto">
                  <Button variant="secondary" className="flex-1" onClick={() => setSelectedRequest(null)}>Fermer</Button>
                  <Button variant="danger" className="flex-1">Je peux donner</Button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </DonorLayout>
  );
}
