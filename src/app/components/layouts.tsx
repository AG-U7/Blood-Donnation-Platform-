import React from "react";
import { Link, useLocation } from "react-router";
import { Droplet, Home, MapPin, Clock, User, Bell, LayoutDashboard, Stethoscope, BarChart3, Settings, ShieldCheck } from "lucide-react";
import { useLanguage, useTranslation } from "../i18n";

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#FFFFFF] font-sans flex flex-col">
      <header className="flex items-center justify-between p-4 bg-white border-b border-[#E0E0E0] sticky top-0 z-50 shadow-sm">
        <Link to="/" className="flex items-center gap-2">
          <Droplet className="text-[#CC0000] w-6 h-6 fill-[#CC0000]" />
          <span className="font-['DM_Sans'] text-xl font-semibold text-[#111111]">SangVie</span>
        </Link>
        <div className="flex gap-4 items-center">
          <button
            type="button"
            onClick={() => setLanguage("fr")}
            className={`text-sm font-['DM_Sans'] transition-colors ${
              language === "fr" ? "text-[#111111] font-medium" : "text-[#888888] hover:text-[#111111]"
            }`}
          >
            {t("nav.public.fr")}
          </button>
          <span className="text-[#E0E0E0]">|</span>
          <button
            type="button"
            onClick={() => setLanguage("en")}
            className={`text-sm font-['DM_Sans'] transition-colors ${
              language === "en" ? "text-[#111111] font-medium" : "text-[#888888] hover:text-[#111111]"
            }`}
          >
            {t("nav.public.en")}
          </button>
        </div>
      </header>
      <main className="flex-1 flex flex-col w-full max-w-[1440px] mx-auto overflow-hidden">
        {children}
      </main>
    </div>
  );
}

export function DonorLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { t } = useTranslation();
  const navItems = [
    { icon: Home, labelKey: "nav.donor.home", path: "/donor/feed" },
    { icon: MapPin, labelKey: "nav.donor.map", path: "/donor/map" },
    { icon: Clock, labelKey: "nav.donor.history", path: "/donor/history" },
    { icon: User, labelKey: "nav.donor.profile", path: "/donor/profile" }
  ];

  return (
    <div className="min-h-screen bg-[#F9F9F9] flex flex-col md:flex-row max-w-[1440px] mx-auto relative overflow-hidden">
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-[#E0E0E0] sticky top-0 z-50 shadow-sm">
        <Link to="/donor/feed" className="flex items-center gap-2">
          <Droplet className="text-[#CC0000] w-6 h-6 fill-[#CC0000]" />
          <span className="font-['DM_Sans'] text-xl font-semibold text-[#111111]">SangVie</span>
        </Link>
        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-full hover:bg-[#F5F5F5] transition-colors">
            <Bell className="w-5 h-5 text-[#444444]" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#FF0000] rounded-full border-2 border-white"></span>
          </button>
          <img src="https://images.unsplash.com/photo-1627897495484-229b29feb0d5?crop=entropy&cs=tinysrgb&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Avatar" className="w-8 h-8 rounded-full border border-[#E0E0E0] object-cover" />
        </div>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-[260px] bg-white border-r border-[#E0E0E0] h-screen sticky top-0">
        <div className="p-6">
          <Link to="/donor/feed" className="flex items-center gap-2">
            <Droplet className="text-[#CC0000] w-8 h-8 fill-[#CC0000]" />
            <span className="font-['DM_Sans'] text-2xl font-semibold text-[#111111]">SangVie</span>
          </Link>
        </div>
        <nav className="flex-1 px-4 flex flex-col gap-2 mt-4">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link key={item.path} to={item.path} className={`flex items-center gap-3 px-4 py-3 rounded-lg font-['DM_Sans'] transition-colors ${isActive ? 'bg-[#F9F9F9] text-[#CC0000] font-medium' : 'text-[#444444] hover:bg-[#F5F5F5]'}`}>
                <item.icon className={`w-5 h-5 ${isActive ? 'text-[#CC0000]' : 'text-[#888888]'}`} />
                {t(item.labelKey as any)}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-[#E0E0E0] flex items-center gap-3">
          <img src="https://images.unsplash.com/photo-1627897495484-229b29feb0d5?crop=entropy&cs=tinysrgb&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Avatar" className="w-10 h-10 rounded-full border border-[#E0E0E0] object-cover" />
          <div className="flex-1 truncate font-['DM_Sans']">
            <p className="text-sm font-medium text-[#111111] truncate">John Doe</p>
            <p className="text-xs text-[#888888]">Donneur O+</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pb-20 md:pb-0 overflow-y-auto w-full">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E0E0E0] flex justify-around pb-safe z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] h-[64px] items-center">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link key={item.path} to={item.path} className={`flex flex-col items-center gap-1 w-16 ${isActive ? 'text-[#CC0000]' : 'text-[#888888]'}`}>
              <item.icon className={`w-6 h-6 ${isActive ? 'text-[#CC0000] fill-[#CC0000]/10' : ''}`} />
              <span className="text-[10px] font-medium font-['DM_Sans']">{t(item.labelKey as any)}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export function HospitalLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { t } = useTranslation();
  const navItems = [
    { icon: LayoutDashboard, labelKey: "nav.hospital.dashboard", path: "/hospital/dashboard" },
    { icon: Stethoscope, labelKey: "nav.hospital.requests", path: "/hospital/requests" },
    { icon: BarChart3, labelKey: "nav.hospital.stats", path: "/hospital/stats" },
    { icon: MapPin, labelKey: "nav.hospital.map", path: "/hospital/map" },
    { icon: Settings, labelKey: "nav.hospital.profile", path: "/hospital/profile" }
  ];

  return (
    <div className="min-h-screen bg-[#F9F9F9] flex flex-col lg:flex-row max-w-[1440px] mx-auto">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex flex-col w-[260px] bg-white border-r border-[#E0E0E0] h-screen sticky top-0">
        <div className="p-6">
          <Link to="/hospital/dashboard" className="flex items-center gap-2">
            <Droplet className="text-[#CC0000] w-8 h-8 fill-[#CC0000]" />
            <span className="font-['DM_Sans'] text-2xl font-semibold text-[#111111]">SangVie<span className="text-sm font-['DM_Sans'] text-[#888888] ml-2 block">Pro</span></span>
          </Link>
        </div>
        <nav className="flex-1 px-4 flex flex-col gap-2 mt-4">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link key={item.path} to={item.path} className={`flex items-center gap-3 px-4 py-3 rounded-lg font-['DM_Sans'] transition-colors ${isActive ? 'bg-[#CC0000] text-white font-medium shadow-md' : 'text-[#444444] hover:bg-[#F5F5F5]'}`}>
                <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[#888888]'}`} />
                {t(item.labelKey as any)}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-[#E0E0E0] flex flex-col gap-2 font-['DM_Sans']">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-4 h-4 text-[#1A7A3F]" />
            <span className="text-xs text-[#1A7A3F] bg-[#E8F5EE] px-2 py-1 rounded-full font-medium">Compte Validé</span>
          </div>
          <p className="text-sm font-medium text-[#111111] truncate">CHU Yalgado</p>
          <p className="text-xs text-[#888888] truncate">contact@chu-yalgado.bf</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Top Header Mobile/Tablet */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-[#E0E0E0] sticky top-0 z-50">
          <Link to="/hospital/dashboard" className="flex items-center gap-2">
            <Droplet className="text-[#CC0000] w-6 h-6 fill-[#CC0000]" />
            <span className="font-['DM_Sans'] text-xl font-semibold text-[#111111]">SangVie Pro</span>
          </Link>
          <button className="p-2">
            <Bell className="w-5 h-5 text-[#444444]" />
          </button>
        </header>
        <div className="p-4 md:p-8 flex-1">
          {children}
        </div>
        
        {/* Mobile Bottom Nav */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E0E0E0] flex justify-around pb-safe z-50 h-[64px] items-center">
          {navItems.slice(0, 4).map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link key={item.path} to={item.path} className={`flex flex-col items-center gap-1 w-16 ${isActive ? 'text-[#CC0000]' : 'text-[#888888]'}`}>
                <item.icon className={`w-6 h-6 ${isActive ? 'text-[#CC0000]' : ''}`} />
                <span className="text-[10px] font-medium font-['DM_Sans']">{t(item.labelKey as any)}</span>
              </Link>
            );
          })}
        </nav>
      </main>
    </div>
  );
}

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { t } = useTranslation();
  const navItems = [
    { icon: LayoutDashboard, labelKey: "nav.admin.dashboard", path: "/admin/dashboard" },
    { icon: Stethoscope, labelKey: "nav.admin.hospitals", path: "/admin/hospitals" },
    { icon: User, labelKey: "nav.admin.users", path: "/admin/users" },
    { icon: BarChart3, labelKey: "nav.admin.reports", path: "/admin/reports" }
  ];

  return (
    <div className="min-h-screen bg-[#F9F9F9] flex max-w-[1440px] mx-auto">
      <aside className="w-[280px] bg-[#111111] text-white h-screen sticky top-0 flex flex-col">
        <div className="p-6">
          <Link to="/admin/dashboard" className="flex items-center gap-3">
            <div className="bg-[#CC0000] p-1.5 rounded-lg">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <span className="font-['DM_Sans'] text-2xl font-semibold">SangVie Admin</span>
          </Link>
        </div>
        <nav className="flex-1 px-4 flex flex-col gap-2 mt-8">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link key={item.path} to={item.path} className={`flex items-center gap-3 px-4 py-3 rounded-lg font-['DM_Sans'] transition-colors ${isActive ? 'bg-[#333333] text-white font-medium' : 'text-[#888888] hover:bg-[#222222] hover:text-white'}`}>
                <item.icon className={`w-5 h-5 ${isActive ? 'text-[#CC0000]' : 'text-[#888888]'}`} />
                {t(item.labelKey as any)}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-[#333333] flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#CC0000] flex items-center justify-center font-bold font-['DM_Sans'] text-sm">SA</div>
          <div className="flex-1 truncate font-['DM_Sans']">
            <p className="text-sm font-medium text-white truncate">Super Admin</p>
            <p className="text-xs text-[#888888] hover:text-white cursor-pointer">Déconnexion</p>
          </div>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto min-h-screen w-full">
        {children}
      </main>
    </div>
  );
}
