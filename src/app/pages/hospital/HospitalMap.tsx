import React, { useState } from "react";
import { HospitalLayout } from "../../components/layouts";
import { Typography, Badge, Button, Card } from "../../components/ui";
import { MapPin, Navigation, Users, Droplet, Search, Filter } from "lucide-react";

const NEARBY_DONORS = [
  {
    id: 1,
    name: "Marie K.",
    bloodType: "O+",
    distance: "1.2 km",
    lastDonation: "Il y a 3 mois",
    available: true,
    phone: "+226 70 00 00 01",
  },
  {
    id: 2,
    name: "Jean D.",
    bloodType: "A+",
    distance: "2.5 km",
    lastDonation: "Il y a 4 mois",
    available: true,
    phone: "+226 70 00 00 02",
  },
  {
    id: 3,
    name: "Pierre S.",
    bloodType: "B+",
    distance: "3.1 km",
    lastDonation: "Il y a 6 mois",
    available: false,
    phone: "+226 70 00 00 03",
  },
  {
    id: 4,
    name: "Anne T.",
    bloodType: "AB-",
    distance: "4.0 km",
    lastDonation: "Il y a 2 mois",
    available: true,
    phone: "+226 70 00 00 04",
  },
  {
    id: 5,
    name: "Paul R.",
    bloodType: "O-",
    distance: "5.2 km",
    lastDonation: "Il y a 5 mois",
    available: true,
    phone: "+226 70 00 00 05",
  },
];

export function HospitalMap() {
  const [selectedDonor, setSelectedDonor] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBloodType, setFilterBloodType] = useState<string | null>(null);

  const filteredDonors = NEARBY_DONORS.filter((donor) => {
    const matchesSearch = donor.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBloodType = filterBloodType ? donor.bloodType === filterBloodType : true;
    return matchesSearch && matchesBloodType;
  });

  return (
    <HospitalLayout>
      <div className="flex flex-col h-[calc(100vh-180px)] lg:h-[calc(100vh-120px)]">
        {/* Header */}
        <div className="mb-4">
          <Typography.H1 className="text-[24px] md:text-[32px] mb-2">Carte des donneurs</Typography.H1>
          <Typography.Body className="text-[#888888]">
            Localisez les donneurs disponibles dans votre région
          </Typography.Body>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#888888]" />
            <input
              type="text"
              placeholder="Rechercher un donneur..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#E0E0E0] focus:outline-none focus:border-[#CC0000] focus:ring-4 focus:ring-[#CC0000]/15 font-['DM_Sans'] text-[#111111] placeholder:text-[#888888]"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {["O+", "A+", "B+", "AB+", "O-", "A-", "B-", "AB-"].map((type) => (
              <button
                key={type}
                onClick={() => setFilterBloodType(filterBloodType === type ? null : type)}
                className={`px-3 py-2 rounded-lg border font-['DM_Sans'] text-sm font-medium transition-all ${
                  filterBloodType === type
                    ? 'bg-[#CC0000] text-white border-[#CC0000]'
                    : 'bg-white text-[#111111] border-[#E0E0E0] hover:border-[#CC0000]/50'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Map and List Container */}
        <div className="flex-1 flex flex-col lg:flex-row gap-4 min-h-0">
          {/* Map Area */}
          <div className="relative flex-1 bg-gradient-to-br from-[#E8F5E9] to-[#F5F5F5] rounded-xl overflow-hidden min-h-[300px] lg:min-h-0">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-[#CC0000] mx-auto mb-4" />
                <Typography.H2 className="mb-2">Carte des donneurs</Typography.H2>
                <Typography.Body className="text-[#888888]">
                  Zone de couverture CHU Yalgado
                </Typography.Body>
              </div>
            </div>

            {/* Mock Donor Markers */}
            {filteredDonors.map((donor, index) => (
              <button
                key={donor.id}
                onClick={() => setSelectedDonor(donor.id)}
                className={`absolute w-10 h-10 rounded-full shadow-lg flex items-center justify-center text-white hover:scale-110 transition-transform ${
                  donor.available ? 'bg-[#CC0000]' : 'bg-[#888888]'
                }`}
                style={{
                  top: `${20 + (index % 3) * 25}%`,
                  left: `${30 + (index % 4) * 15}%`,
                }}
              >
                <Droplet className="w-5 h-5" />
              </button>
            ))}

            {/* My Location Button */}
            <button className="absolute top-4 right-4 z-10 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow">
              <Navigation className="w-5 h-5 text-[#CC0000]" />
            </button>

            {/* Map Legend */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
              <div className="flex items-center gap-4 text-xs font-['DM_Sans']">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-[#CC0000]"></div>
                  <span className="text-[#111111]">Disponible</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-[#888888]"></div>
                  <span className="text-[#111111]">Indisponible</span>
                </div>
              </div>
            </div>
          </div>

          {/* Donors List */}
          <div className="w-full lg:w-[400px] bg-white rounded-xl border border-[#E0E0E0] shadow-sm overflow-hidden flex flex-col">
            <div className="p-4 border-b border-[#E0E0E0] flex justify-between items-center">
              <Typography.H2 className="text-[18px]">
                Donneurs à proximité ({filteredDonors.length})
              </Typography.H2>
            </div>
            <div className="flex-1 overflow-y-auto">
              {filteredDonors.map((donor) => (
                <div
                  key={donor.id}
                  onClick={() => setSelectedDonor(donor.id)}
                  className={`p-4 border-b border-[#E0E0E0] hover:bg-[#F9F9F9] cursor-pointer transition-colors ${
                    selectedDonor === donor.id ? 'bg-[#CC0000]/5 border-l-4 border-l-[#CC0000]' : ''
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#CC0000]/10 flex items-center justify-center font-['DM_Sans'] font-semibold text-[#CC0000]">
                        {donor.bloodType}
                      </div>
                      <div>
                        <h3 className="font-['DM_Sans'] font-semibold text-[#111111]">
                          {donor.name}
                        </h3>
                        <div className="flex items-center text-[#888888] text-sm">
                          <MapPin className="w-3 h-3 mr-1" />
                          {donor.distance}
                        </div>
                      </div>
                    </div>
                    <Badge variant={donor.available ? "active" : "inactive"}>
                      {donor.available ? "Disponible" : "Indisponible"}
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center mt-3">
                    <Typography.Small className="text-[#888888]">
                      Dernier don: {donor.lastDonation}
                    </Typography.Small>
                    {selectedDonor === donor.id && donor.available && (
                      <Button size="sm" className="bg-[#CC0000]">
                        Contacter
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              
              {filteredDonors.length === 0 && (
                <div className="p-8 text-center">
                  <Users className="w-12 h-12 text-[#888888] mx-auto mb-3" />
                  <Typography.Body className="text-[#888888]">
                    Aucun donneur trouvé
                  </Typography.Body>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </HospitalLayout>
  );
}

