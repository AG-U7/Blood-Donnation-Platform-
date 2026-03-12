import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { PublicLayout } from "../../components/layouts";
import { Button, Input, Typography } from "../../components/ui";
import { useTranslation } from "../../i18n";

// Mock database pour la détection automatique du type de compte
const MOCK_USERS = {
  // Donneurs (téléphone)
  "+22670123456": { type: "donor", password: "donor123" },
  "+22675234567": { type: "donor", password: "donor123" },
  
  // Hôpitaux (email)
  "contact@chu-yo.bf": { type: "hospital", password: "hospital123" },
  "contact@sandof.bf": { type: "hospital", password: "hospital123" },
  
  // Admin (email)
  "admin@sangvie.bf": { type: "admin", password: "admin123" },
};

export function UnifiedLogin() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const detectAccountType = (id: string): "donor" | "hospital" | "admin" | null => {
    // Vérifier si l'identifiant existe dans notre mock database
    const user = MOCK_USERS[id as keyof typeof MOCK_USERS];
    if (user) {
      return user.type as "donor" | "hospital" | "admin";
    }
    
    // Détection automatique basée sur le format
    // Téléphone = donneur, Email = hôpital ou admin
    if (id.startsWith("+") || /^\d+$/.test(id)) {
      return "donor";
    } else if (id.includes("@")) {
      if (id.includes("admin")) {
        return "admin";
      }
      return "hospital";
    }
    
    return null;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const accountType = detectAccountType(identifier);
    
    if (!accountType) {
      setError("Identifiant invalide");
      return;
    }

    // Redirection basée sur le type de compte détecté
    if (accountType === "admin") {
      navigate("/admin/dashboard");
    } else if (accountType === "hospital") {
      navigate("/hospital/dashboard");
    } else {
      navigate("/donor/feed");
    }
  };

  return (
    <PublicLayout>
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 md:py-20 bg-[#F9F9F9]">
        <div className="w-full max-w-md bg-white p-6 md:p-8 rounded-xl border border-[#E0E0E0] shadow-sm">
          <Typography.H1 className="mb-2 text-center text-3xl">
            {t("auth.login.title")}
          </Typography.H1>
          <Typography.Body className="mb-8 text-center">
            {t("auth.login.subtitle")}
          </Typography.Body>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-[#111111] mb-1 font-['DM_Sans']">
                {t("auth.login.identifier")}
              </label>
              <Input
                type="text"
                placeholder="contact@hopital.com ou +226 XX XX XX XX"
                value={identifier}
                onChange={(e) => {
                  setIdentifier(e.target.value);
                  setError("");
                }}
                error={error}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#111111] mb-1 font-['DM_Sans']">
                {t("auth.login.password")}
              </label>
              <Input
                type="password"
                placeholder="Votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex justify-end mt-1">
              <Link
                to="/forgot-password"
                className="text-sm font-['DM_Sans'] text-[#CC0000] hover:underline"
              >
                {t("auth.login.forgot")}
              </Link>
            </div>

            <Button type="submit" className="w-full mt-4 h-12">
              {t("auth.login.submit")}
            </Button>
          </form>

          <div className="mt-8 text-center text-sm font-['DM_Sans'] text-[#444444]">
            {t("auth.login.noAccount")}{" "}
            <Link to="/register" className="text-[#CC0000] font-semibold hover:underline">
              {t("auth.login.createAccount")}
            </Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
