import React, { useState } from "react";
import { HospitalLayout } from "../../components/layouts";
import { Card, Typography, Badge, Button, Input } from "../../components/ui";
import { Plus, X, Calendar, Droplet, Users } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const REQUESTS = [
  {
    id: 1,
    bloodGroup: "O+",
    quantity: 3,
    urgency: "critical",
    reason: "Accident de la route",
    status: "active",
    responses: 5,
    createdAt: "Il y a 10 min",
  },
  {
    id: 2,
    bloodGroup: "A-",
    quantity: 2,
    urgency: "moderate",
    reason: "Intervention chirurgicale",
    status: "active",
    responses: 2,
    createdAt: "Il y a 2h",
  },
  {
    id: 3,
    bloodGroup: "B+",
    quantity: 1,
    urgency: "critical",
    reason: "Complication accouchement",
    status: "fulfilled",
    responses: 8,
    createdAt: "Hier",
  },
];

export function HospitalRequests() {
  const [showNewRequest, setShowNewRequest] = useState(false);
  const [newRequest, setNewRequest] = useState({
    bloodGroup: "O+",
    quantity: 1,
    urgency: "moderate",
    reason: "",
  });

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setShowNewRequest(false);
    setNewRequest({ bloodGroup: "O+", quantity: 1, urgency: "moderate", reason: "" });
  };

  return (
    <HospitalLayout>
      <div className="p-4 md:p-8 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Typography.H1>Demandes de sang</Typography.H1>
          <Button onClick={() => setShowNewRequest(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle demande
          </Button>
        </div>

        {/* Active Requests */}
        <div className="mb-8">
          <Typography.H2 className="text-[20px] mb-4">Demandes actives</Typography.H2>
          <div className="space-y-4">
            {REQUESTS.filter((r) => r.status === "active").map((request) => (
              <Card key={request.id}>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-[#CC0000]/10 flex items-center justify-center font-['DM_Sans'] font-semibold text-[#CC0000] text-2xl">
                      {request.bloodGroup}
                    </div>
                    <div>
                      <Typography.H3 className="text-[16px] mb-1">{request.reason}</Typography.H3>
                      <Typography.Small className="text-[#888888]">
                        {request.createdAt}
                      </Typography.Small>
                    </div>
                  </div>
                  <Badge variant={request.urgency as any}>
                    {request.urgency === "critical" ? "Urgence vitale" : "Urgence modérée"}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Droplet className="w-4 h-4 text-[#888888]" />
                    <div>
                      <Typography.Small className="text-[#888888]">Quantité</Typography.Small>
                      <Typography.Body className="font-semibold">
                        {request.quantity} {request.quantity > 1 ? "poches" : "poche"}
                      </Typography.Body>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#888888]" />
                    <div>
                      <Typography.Small className="text-[#888888]">Réponses</Typography.Small>
                      <Typography.Body className="font-semibold text-[#1A7A3F]">
                        {request.responses}
                      </Typography.Body>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" className="flex-1">
                    Voir les réponses
                  </Button>
                  <Button variant="secondary" size="sm" className="flex-1">
                    Clôturer
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Fulfilled Requests */}
        <div>
          <Typography.H2 className="text-[20px] mb-4">Demandes satisfaites</Typography.H2>
          <div className="space-y-4">
            {REQUESTS.filter((r) => r.status === "fulfilled").map((request) => (
              <Card key={request.id} className="opacity-60">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-[#1A7A3F]/10 flex items-center justify-center font-['DM_Sans'] font-semibold text-[#1A7A3F] text-2xl">
                      {request.bloodGroup}
                    </div>
                    <div>
                      <Typography.H3 className="text-[16px] mb-1">{request.reason}</Typography.H3>
                      <Typography.Small className="text-[#888888]">
                        {request.createdAt}
                      </Typography.Small>
                    </div>
                  </div>
                  <Badge variant="success">Satisfaite</Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* New Request Modal */}
        <AnimatePresence>
          {showNewRequest && (
            <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center p-4 sm:p-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                onClick={() => setShowNewRequest(false)}
              />
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="bg-white w-full max-w-lg rounded-t-2xl sm:rounded-2xl shadow-2xl relative z-10 p-6"
              >
                <button
                  onClick={() => setShowNewRequest(false)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-[#F5F5F5] hover:bg-[#E0E0E0]"
                >
                  <X className="w-5 h-5 text-[#444444]" />
                </button>

                <Typography.H2 className="text-2xl mb-6">Nouvelle demande de sang</Typography.H2>

                <form onSubmit={handleCreateRequest} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#111111] mb-1 font-['DM_Sans']">
                      Groupe sanguin
                    </label>
                    <select
                      className="w-full px-4 py-2 border border-[#E0E0E0] rounded-lg font-['DM_Sans']"
                      value={newRequest.bloodGroup}
                      onChange={(e) =>
                        setNewRequest({ ...newRequest, bloodGroup: e.target.value })
                      }
                    >
                      {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
                        <option key={group} value={group}>
                          {group}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#111111] mb-1 font-['DM_Sans']">
                      Quantité (poches)
                    </label>
                    <Input
                      type="number"
                      min="1"
                      value={newRequest.quantity}
                      onChange={(e) =>
                        setNewRequest({ ...newRequest, quantity: parseInt(e.target.value) })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#111111] mb-1 font-['DM_Sans']">
                      Urgence
                    </label>
                    <select
                      className="w-full px-4 py-2 border border-[#E0E0E0] rounded-lg font-['DM_Sans']"
                      value={newRequest.urgency}
                      onChange={(e) => setNewRequest({ ...newRequest, urgency: e.target.value })}
                    >
                      <option value="moderate">Urgence modérée</option>
                      <option value="critical">Urgence vitale</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#111111] mb-1 font-['DM_Sans']">
                      Raison médicale
                    </label>
                    <textarea
                      className="w-full px-4 py-2 border border-[#E0E0E0] rounded-lg font-['DM_Sans'] min-h-[100px]"
                      placeholder="Décrivez brièvement la situation..."
                      value={newRequest.reason}
                      onChange={(e) => setNewRequest({ ...newRequest, reason: e.target.value })}
                      required
                    />
                  </div>

                  <div className="flex gap-3 mt-6">
                    <Button
                      type="button"
                      variant="secondary"
                      className="flex-1"
                      onClick={() => setShowNewRequest(false)}
                    >
                      Annuler
                    </Button>
                    <Button type="submit" variant="danger" className="flex-1">
                      Publier la demande
                    </Button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </HospitalLayout>
  );
}
