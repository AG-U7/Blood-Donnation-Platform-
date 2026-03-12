import React, { useState } from "react";
import { AdminLayout } from "../../components/layouts";
import { Card, Typography, Badge, Button, Input } from "../../components/ui";
import { User, Search, Filter, Droplet, Calendar } from "lucide-react";

const USERS = [
  {
    id: 1,
    name: "Jean Dupont",
    phone: "+226 70 12 34 56",
    bloodGroup: "O+",
    status: "active",
    donations: 3,
    lastDonation: "15 Fév 2026",
    registrationDate: "Sept 2025",
  },
  {
    id: 2,
    name: "Marie Kaboré",
    phone: "+226 75 23 45 67",
    bloodGroup: "A+",
    status: "active",
    donations: 5,
    lastDonation: "01 Mar 2026",
    registrationDate: "Juin 2025",
  },
  {
    id: 3,
    name: "Paul Ouédraogo",
    phone: "+226 78 34 56 78",
    bloodGroup: "B+",
    status: "inactive",
    donations: 1,
    lastDonation: "10 Jan 2025",
    registrationDate: "Jan 2025",
  },
];

export function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = USERS.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery)
  );

  return (
    <AdminLayout>
      <div className="p-4 md:p-8 max-w-6xl mx-auto">
        <Typography.H1 className="mb-6">Gestion des donneurs</Typography.H1>

        {/* Search and Filters */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#888888]" />
            <Input
              placeholder="Rechercher par nom ou téléphone..."
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
            <Typography.Small className="text-[#888888] mb-1">Total donneurs</Typography.Small>
            <Typography.H2 className="text-3xl">{USERS.length}</Typography.H2>
          </Card>
          <Card>
            <Typography.Small className="text-[#888888] mb-1">Actifs</Typography.Small>
            <Typography.H2 className="text-3xl text-[#1A7A3F]">
              {USERS.filter((u) => u.status === "active").length}
            </Typography.H2>
          </Card>
          <Card>
            <Typography.Small className="text-[#888888] mb-1">Dons ce mois</Typography.Small>
            <Typography.H2 className="text-3xl text-[#CC0000]">24</Typography.H2>
          </Card>
        </div>

        {/* Users List */}
        <div className="space-y-4">
          {filteredUsers.map((user) => (
            <Card key={user.id}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#CC0000]/10 flex items-center justify-center">
                    <User className="w-6 h-6 text-[#CC0000]" />
                  </div>
                  <div>
                    <Typography.H3 className="text-[16px] mb-1">{user.name}</Typography.H3>
                    <Typography.Small className="text-[#888888]">{user.phone}</Typography.Small>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#CC0000]/10 flex items-center justify-center font-['DM_Sans'] text-[#CC0000] text-sm font-semibold">
                    {user.bloodGroup}
                  </div>
                  <Badge variant={user.status === "active" ? "success" : "default"}>
                    {user.status === "active" ? "Actif" : "Inactif"}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4 py-3 border-t border-b border-[#E0E0E0]">
                <div>
                  <Typography.Small className="text-[#888888] mb-1">Dons totaux</Typography.Small>
                  <div className="flex items-center gap-1">
                    <Droplet className="w-4 h-4 text-[#CC0000]" />
                    <Typography.Body className="font-semibold">{user.donations}</Typography.Body>
                  </div>
                </div>
                <div>
                  <Typography.Small className="text-[#888888] mb-1">Dernier don</Typography.Small>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-[#888888]" />
                    <Typography.Body className="font-semibold text-sm">
                      {user.lastDonation}
                    </Typography.Body>
                  </div>
                </div>
                <div>
                  <Typography.Small className="text-[#888888] mb-1">Inscrit depuis</Typography.Small>
                  <Typography.Body className="font-semibold">
                    {user.registrationDate}
                  </Typography.Body>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="secondary" size="sm" className="flex-1">
                  Voir le profil
                </Button>
                <Button variant="secondary" size="sm" className="flex-1">
                  Historique
                </Button>
                <Button variant="secondary" size="sm" className="flex-1">
                  Contacter
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
