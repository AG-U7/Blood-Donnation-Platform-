import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { PublicLayout } from "../../components/layouts";
import { Button, Input, Typography } from "../../components/ui";
import { motion, AnimatePresence } from "motion/react";
import { useTranslation } from "../../i18n";

type UserType = "donor" | "hospital";

export function Register() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [userType, setUserType] = useState<UserType>("donor");

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    hospitalName: "",
    hospitalId: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock registration - navigate to appropriate dashboard
    if (userType === "hospital") {
      navigate("/hospital/dashboard");
    } else {
      navigate("/donor/feed");
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTypeChange = (type: UserType) => {
    setUserType(type);
    // Reset form when switching types
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      hospitalName: "",
      hospitalId: "",
    });
  };

  return (
    <PublicLayout>
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 md:py-20 bg-[#F9F9F9]">
        <div className="w-full max-w-md bg-white p-6 md:p-8 rounded-xl border border-[#E0E0E0] shadow-sm">
          <Typography.H1 className="mb-2 text-center text-3xl">
            {t("auth.register.title")}
          </Typography.H1>
          <Typography.Body className="mb-8 text-center">
            {t("auth.register.subtitle")}
          </Typography.Body>

          {/* Type Selector - Onglets Donneur/Hôpital */}
          <div className="flex p-1 mb-8 bg-[#F5F5F5] rounded-lg">
            <button
              onClick={() => handleTypeChange("donor")}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                userType === "donor"
                  ? "bg-white text-[#CC0000] shadow-[0_1px_3px_rgba(0,0,0,0.1)]"
                  : "text-[#888888] hover:text-[#111111]"
              }`}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {t("auth.register.donorTab")}
            </button>
            <button
              onClick={() => handleTypeChange("hospital")}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                userType === "hospital"
                  ? "bg-white text-[#CC0000] shadow-[0_1px_3px_rgba(0,0,0,0.1)]"
                  : "text-[#888888] hover:text-[#111111]"
              }`}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {t("auth.register.hospitalTab")}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={userType}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-4"
              >
                {userType === "hospital" ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-[#111111] mb-1 font-['DM_Sans']">
                        {t("auth.register.hospitalName")}
                      </label>
                      <Input
                        type="text"
                        placeholder="Centre Hospitalier Universitaire"
                        value={formData.hospitalName}
                        onChange={(e) => handleChange("hospitalName", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#111111] mb-1 font-['DM_Sans']">
                        {t("auth.register.hospitalId")}
                      </label>
                      <Input
                        type="text"
                        placeholder="ID-12345"
                        value={formData.hospitalId}
                        onChange={(e) => handleChange("hospitalId", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#111111] mb-1 font-['DM_Sans']">
                        {t("auth.register.hospitalEmail")}
                      </label>
                      <Input
                        type="email"
                        placeholder="contact@hopital.com"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-[#111111] mb-1 font-['DM_Sans']">
                        {t("auth.register.fullName")}
                      </label>
                      <Input
                        type="text"
                        placeholder="Jean Dupont"
                        value={formData.fullName}
                        onChange={(e) => handleChange("fullName", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#111111] mb-1 font-['DM_Sans']">
                        {t("auth.register.phone")}
                      </label>
                      <Input
                        type="tel"
                        placeholder="+226 XX XX XX XX"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        required
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium text-[#111111] mb-1 font-['DM_Sans']">
                    {t("auth.register.password")}
                  </label>
                  <Input
                    type="password"
                    placeholder="Créer un mot de passe"
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#111111] mb-1 font-['DM_Sans']">
                    {t("auth.register.passwordConfirm")}
                  </label>
                  <Input
                    type="password"
                    placeholder="Confirmer le mot de passe"
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange("confirmPassword", e.target.value)}
                    required
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            <Button type="submit" className="w-full mt-4 h-12">
              {t("auth.register.submit")}
            </Button>
          </form>

          <div className="mt-8 text-center text-sm font-['DM_Sans'] text-[#444444]">
            {t("auth.register.already")}{" "}
            <Link to="/login" className="text-[#CC0000] font-semibold hover:underline">
              {t("auth.register.login")}
            </Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
