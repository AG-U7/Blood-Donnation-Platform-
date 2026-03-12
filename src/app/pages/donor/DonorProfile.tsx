import React, { useState } from "react";
import { useNavigate } from "react-router";
import { DonorLayout } from "../../components/layouts";
import { Card, Typography, Button, Input } from "../../components/ui";
import { User, Phone, MapPin, Droplet, Calendar, LogOut, Bell, Globe } from "lucide-react";

export function DonorProfile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Jean Dupont",
    phone: "+226 70 12 34 56",
    bloodGroup: "O+",
    location: "Ouagadougou, Burkina Faso",
    birthDate: "15/03/1990",
    lastDonation: "15 Février 2026",
  });

  const handleLogout = () => {
    navigate("/home");
  };

  return (
    <DonorLayout>
      <div className="p-4 md:p-8 max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Typography.H1>Mon profil</Typography.H1>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Annuler" : "Modifier"}
          </Button>
        </div>

        {/* Profile Header */}
        <Card className="mb-6 text-center">
          <div className="w-24 h-24 rounded-full bg-[#CC0000]/10 flex items-center justify-center mx-auto mb-4">
            <User className="w-12 h-12 text-[#CC0000]" />
          </div>
          <Typography.H2 className="text-2xl mb-1">{profile.name}</Typography.H2>
          <div className="inline-flex items-center gap-2 bg-[#E8F5E9] px-4 py-2 rounded-full">
            <Droplet className="w-4 h-4 text-[#CC0000]" />
            <Typography.Body className="text-[#1A7A3F] font-semibold">
              Groupe sanguin: {profile.bloodGroup}
            </Typography.Body>
          </div>
        </Card>

        {/* Profile Details */}
        <Card className="mb-6">
          <Typography.H2 className="text-[18px] mb-4">Informations personnelles</Typography.H2>
          <div className="space-y-4">
            <div>
              <label className="flex items-center text-sm font-medium text-[#888888] mb-2 font-['DM_Sans']">
                <Phone className="w-4 h-4 mr-2" />
                Téléphone
              </label>
              {isEditing ? (
                <Input
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
                Localisation
              </label>
              {isEditing ? (
                <Input
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                />
              ) : (
                <Typography.Body>{profile.location}</Typography.Body>
              )}
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-[#888888] mb-2 font-['DM_Sans']">
                <Calendar className="w-4 h-4 mr-2" />
                Date de naissance
              </label>
              {isEditing ? (
                <Input
                  value={profile.birthDate}
                  onChange={(e) => setProfile({ ...profile, birthDate: e.target.value })}
                />
              ) : (
                <Typography.Body>{profile.birthDate}</Typography.Body>
              )}
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-[#888888] mb-2 font-['DM_Sans']">
                <Droplet className="w-4 h-4 mr-2" />
                Dernier don
              </label>
              <Typography.Body>{profile.lastDonation}</Typography.Body>
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
    </DonorLayout>
  );
}
