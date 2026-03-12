import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { PublicLayout } from "../../components/layouts";
import { Button, Input, Typography } from "../../components/ui";
import { motion } from "motion/react";
import { useTranslation } from "../../i18n";

type Step = "request" | "sent";

export function ForgotPassword() {
  const [step, setStep] = useState<Step>("request");
  const [identifier, setIdentifier] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("sent");
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  return (
    <PublicLayout>
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 md:py-20 bg-[#F9F9F9]">
        <div className="w-full max-w-md bg-white p-6 md:p-8 rounded-xl border border-[#E0E0E0] shadow-sm">
          {step === "request" ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Typography.H1 className="mb-2 text-center text-3xl">
                {t("auth.forgot.title")}
              </Typography.H1>
              <Typography.Body className="mb-8 text-center">
                {t("auth.forgot.subtitle")}
              </Typography.Body>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#111111] mb-1 font-['DM_Sans']">
                    {t("auth.forgot.identifier")}
                  </label>
                  <Input
                    type="text"
                    placeholder="contact@example.com ou +226 XX XX XX XX"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full h-12">
                  {t("auth.forgot.submit")}
                </Button>

                <div className="text-center">
                  <Link
                    to="/login"
                    className="text-sm font-['DM_Sans'] text-[#CC0000] hover:underline"
                  >
                    {t("auth.forgot.backToLogin")}
                  </Link>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-[#E8F5E9] rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-[#4CAF50]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <Typography.H1 className="mb-2 text-center text-3xl">
                {t("auth.forgot.sentTitle")}
              </Typography.H1>
              <Typography.Body className="mb-8 text-center">
                {t("auth.forgot.sentDescription", { identifier })}
              </Typography.Body>

              <Button onClick={handleBackToLogin} className="w-full h-12">
                {t("auth.forgot.backToLogin")}
              </Button>

              <div className="mt-6 text-sm font-['DM_Sans'] text-[#444444]">
                {t("auth.forgot.notReceived")}{" "}
                <button
                  onClick={() => setStep("request")}
                  className="text-[#CC0000] font-semibold hover:underline"
                >
                  {t("auth.forgot.resend")}
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </PublicLayout>
  );
}
