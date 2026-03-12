import React, { useState } from "react";
import { DonorLayout } from "../../components/layouts";
import { Typography, Badge, Button } from "../../components/ui";
import { MapPin, Navigation } from "lucide-react";

const HOSPITALS = [
  {
    id: 1,
    name: "CHU Yalgado Ouédraogo",
    position: { lat: 12.3714, lng: -1.5197 },
    distance: "2.5 km",
    urgentNeeds: ["O+", "A-"],
  },
  {
    id: 2,
    name: "Clinique Sandof",
    position: { lat: 12.3654, lng: -1.5324 },
    distance: "5.1 km",
    urgentNeeds: ["B+"],
  },
  {
    id: 3,
    name: "CMA Pissy",
    position: { lat: 12.3801, lng: -1.5089 },
    distance: "7.8 km",
    urgentNeeds: ["O+", "AB-"],
  },
];

export function DonorMap() {
  const [selectedHospital, setSelectedHospital] = useState<number | null>(null);

  return (
    <DonorLayout>
      <div className="relative h-[calc(100vh-64px)] md:h-[calc(100vh-80px)]">
        {/* Map Placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#E8F5E9] to-[#F5F5F5]">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-[#CC0000] mx-auto mb-4" />
              <Typography.H2 className="mb-2">Carte des hôpitaux</Typography.H2>
              <Typography.Body className="text-[#888888]">
                Centres de collecte autour de vous
              </Typography.Body>
            </div>
          </div>

          {/* Mock Map Markers */}
          {HOSPITALS.map((hospital, index) => (
            <button
              key={hospital.id}
              onClick={() => setSelectedHospital(hospital.id)}
              className="absolute w-10 h-10 rounded-full bg-[#CC0000] shadow-lg flex items-center justify-center text-white hover:scale-110 transition-transform"
              style={{
                top: `${30 + index * 20}%`,
                left: `${40 + index * 10}%`,
              }}
            >
              <MapPin className="w-5 h-5" />
            </button>
          ))}
        </div>

        {/* My Location Button */}
        <button className="absolute top-4 right-4 z-10 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow">
          <Navigation className="w-5 h-5 text-[#CC0000]" />
        </button>

        {/* Hospital Info Cards */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-4 bg-gradient-to-t from-white via-white to-transparent">
          <div className="max-w-3xl mx-auto space-y-3">
            {HOSPITALS.filter((h) => selectedHospital === null || h.id === selectedHospital).map(
              (hospital) => (
                <div
                  key={hospital.id}
                  className="bg-white rounded-xl border border-[#E0E0E0] p-4 shadow-lg"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-['DM_Sans'] font-semibold text-[#111111] mb-1">
                        {hospital.name}
                      </h3>
                      <div className="flex items-center text-[#888888] text-sm">
                        <MapPin className="w-4 h-4 mr-1" />
                        {hospital.distance}
                      </div>
                    </div>
                    {selectedHospital === hospital.id && (
                      <button
                        onClick={() => setSelectedHospital(null)}
                        className="text-sm text-[#CC0000] font-['DM_Sans'] font-medium"
                      >
                        Fermer
                      </button>
                    )}
                  </div>

                  <div className="mb-3">
                    <Typography.Small className="text-[#888888] mb-2">
                      Besoins urgents :
                    </Typography.Small>
                    <div className="flex gap-2">
                      {hospital.urgentNeeds.map((group) => (
                        <Badge key={group} variant="critical">
                          {group}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      Itinéraire
                    </Button>
                    <Button size="sm" variant="secondary" className="flex-1">
                      Appeler
                    </Button>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </DonorLayout>
  );
}
