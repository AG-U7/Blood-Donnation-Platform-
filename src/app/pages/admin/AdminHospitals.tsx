import React, { useState } from "react";
import { AdminLayout } from "../../components/layouts";
import { Card, Typography, Badge, Button, Input } from "../../components/ui";
import { Building2, Search, Filter, MapPin, CheckCircle2, XCircle } from "lucide-react";

const HOSPITALS = [
  {
    id: 1,
    name: "CHU Yalgado Ouédraogo",
    location: "Ouagadougou",
    status: "verified",
    requests: 12,
    donations: 48,
    registrationDate: "Jan 2024",
  },
  {
    id: 2,
    name: "Clinique Sandof",
    location: "Ouagadougou",
    status: "verified",
    requests: 8,
    donations: 32,
    registrationDate: "Fév 2024",
  },
  {
    id: 3,
    name: "CMA Pissy",
    location: "Ouagadougou",
    status: "pending",
    requests: 5,
    donations: 15,
    registrationDate: "Mar 2026",
  },
];

export function AdminHospitals() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredHospitals = HOSPITALS.filter((hospital) =>
    hospital.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="p-4 md:p-8 max-w-6xl mx-auto">
        <Typography.H1 className="mb-6">Gestion des hôpitaux</Typography.H1>

        {/* Search and Filters */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#888888]" />
            <Input
              placeholder="Rechercher un hôpital..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="secondary">
            <Filter className="w-4 h-4 mr-2" />
            Filtres
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card>
            <Typography.Small className="text-[#888888] mb-1">Total hôpitaux</Typography.Small>
            <Typography.H2 className="text-3xl">{HOSPITALS.length}</Typography.H2>
          </Card>
          <Card>
            <Typography.Small className="text-[#888888] mb-1">Vérifiés</Typography.Small>
            <Typography.H2 className="text-3xl text-[#1A7A3F]">
              {HOSPITALS.filter((h) => h.status === "verified").length}
            </Typography.H2>
          </Card>
          <Card>
            <Typography.Small className="text-[#888888] mb-1">En attente</Typography.Small>
            <Typography.H2 className="text-3xl text-[#D4720B]">
              {HOSPITALS.filter((h) => h.status === "pending").length}
            </Typography.H2>
          </Card>
        </div>

        {/* Hospitals List */}
        <div className="space-y-4">
          {filteredHospitals.map((hospital) => (
            <Card key={hospital.id}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#CC0000]/10 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-[#CC0000]" />
                  </div>
                  <div>
                    <Typography.H3 className="text-[16px] mb-1">{hospital.name}</Typography.H3>
                    <div className="flex items-center text-[#888888] text-sm">
                      <MapPin className="w-3 h-3 mr-1" />
                      {hospital.location}
                    </div>
                  </div>
                </div>
                <Badge variant={hospital.status === "verified" ? "success" : "warning"}>
                  {hospital.status === "verified" ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Vérifié
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3 h-3 mr-1" />
                      En attente
                    </>
                  )}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4 py-3 border-t border-b border-[#E0E0E0]">
                <div>
                  <Typography.Small className="text-[#888888] mb-1">Demandes</Typography.Small>
                  <Typography.Body className="font-semibold">{hospital.requests}</Typography.Body>
                </div>
                <div>
                  <Typography.Small className="text-[#888888] mb-1">Dons collectés</Typography.Small>
                  <Typography.Body className="font-semibold">{hospital.donations}</Typography.Body>
                </div>
                <div>
                  <Typography.Small className="text-[#888888] mb-1">Inscrit depuis</Typography.Small>
                  <Typography.Body className="font-semibold">
                    {hospital.registrationDate}
                  </Typography.Body>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="secondary" size="sm" className="flex-1">
                  Voir les détails
                </Button>
                {hospital.status === "pending" && (
                  <>
                    <Button variant="danger" size="sm" className="flex-1">
                      Approuver
                    </Button>
                    <Button variant="secondary" size="sm" className="flex-1">
                      Rejeter
                    </Button>
                  </>
                )}
                {hospital.status === "verified" && (
                  <Button variant="secondary" size="sm" className="flex-1">
                    Suspendre
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
