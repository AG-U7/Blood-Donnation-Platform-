import React, { useState } from "react";
import { useNavigate } from "react-router";
import { HospitalLayout } from "../../components/layouts";
import { Card, Typography, Button, Input } from "../../components/ui";
import { Building2, Mail, Phone, MapPin, LogOut, Bell, Globe } from "lucide-react";

export function HospitalProfile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "CHU Yalgado Ouédraogo",
    email: "contact@chu-yo.bf",
    phone: "+226 25 30 67 00",
    address: "Avenue de l'Indépendance, Ouagadougou",
    registrationId: "HOS-2024-001",
    capacity: "500 lits",
  });

  const handleLogout = () => {
    navigate("/home");
  };

  return (
    <HospitalLayout>
      <div className="p-4 md:p-8 max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Typography.H1>Profil de l'hôpital</Typography.H1>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Annuler" : "Modifier"}
          </Button>
        </div>

        {/* Hospital Header */}
        <Card className="mb-6 text-center">
          <div className="w-24 h-24 rounded-full bg-[#CC0000]/10 flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-12 h-12 text-[#CC0000]" />
          </div>
          <Typography.H2 className="text-2xl mb-2">{profile.name}</Typography.H2>
          <Typography.Body className="text-[#888888]">
            ID: {profile.registrationId}
          </Typography.Body>
        </Card>

        {/* Hospital Details */}
        <Card className="mb-6">
          <Typography.H2 className="text-[18px] mb-4">Informations de l'établissement</Typography.H2>
          <div className="space-y-4">
            <div>
              <label className="flex items-center text-sm font-medium text-[#888888] mb-2 font-['DM_Sans']">
                <Mail className="w-4 h-4 mr-2" />
                Email institutionnel
              </label>
              {isEditing ? (
                <Input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              ) : (
                <Typography.Body>{profile.email}</Typography.Body>
              )}
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-[#888888] mb-2 font-['DM_Sans']">
                <Phone className="w-4 h-4 mr-2" />
                Téléphone
              </label>
              {isEditing ? (
                <Input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                />
              ) : (
                <Typography.Body>{profile.phone}</Typography.Body>
              )}
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-[#888888] mb-2 font-['DM_Sans']">
                <MapPin className="w-4 h-4 mr-2" />
                Adresse
              </label>
              {isEditing ? (
                <Input
                  value={profile.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                />
              ) : (
                <Typography.Body>{profile.address}</Typography.Body>
              )}
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-[#888888] mb-2 font-['DM_Sans']">
                <Building2 className="w-4 h-4 mr-2" />
                Capacité
              </label>
              {isEditing ? (
                <Input
                  value={profile.capacity}
                  onChange={(e) => setProfile({ ...profile, capacity: e.target.value })}
                />
              ) : (
                <Typography.Body>{profile.capacity}</Typography.Body>
              )}
            </div>
          </div>

          {isEditing && (
            <Button className="w-full mt-4" onClick={() => setIsEditing(false)}>
              Enregistrer les modifications
            </Button>
          )}
        </Card>

        {/* Settings */}
        <Card className="mb-6">
          <Typography.H2 className="text-[18px] mb-4">Paramètres</Typography.H2>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 hover:bg-[#F9F9F9] rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-[#444444]" />
                <Typography.Body>Notifications</Typography.Body>
              </div>
              <div className="w-10 h-6 bg-[#1A7A3F] rounded-full flex items-center px-1">
                <div className="w-4 h-4 bg-white rounded-full ml-auto" />
              </div>
            </button>

            <button className="w-full flex items-center justify-between p-3 hover:bg-[#F9F9F9] rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-[#444444]" />
                <Typography.Body>Langue</Typography.Body>
              </div>
              <Typography.Small className="text-[#888888]">Français</Typography.Small>
            </button>
          </div>
        </Card>

        {/* Logout */}
        <Button
          variant="secondary"
          className="w-full flex items-center justify-center gap-2 text-[#CC0000] hover:bg-[#CC0000]/5"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          Se déconnecter
        </Button>
      </div>
    </HospitalLayout>
  );
}
