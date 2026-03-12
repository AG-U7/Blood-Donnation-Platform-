import { createBrowserRouter } from "react-router";

import { SplashPage } from "./pages/Splash";
import { HomePage } from "./pages/Home";
import { UnifiedLogin } from "./pages/auth/UnifiedLogin";
import { Register } from "./pages/auth/Register";
import { ForgotPassword } from "./pages/auth/ForgotPassword";
import { DonorFeed } from "./pages/donor/DonorFeed";
import { DonorMap } from "./pages/donor/DonorMap";
import { DonorHistory } from "./pages/donor/DonorHistory";
import { DonorProfile } from "./pages/donor/DonorProfile";
import { HospitalDashboard } from "./pages/hospital/HospitalDashboard";
import { HospitalRequests } from "./pages/hospital/HospitalRequests";
import { HospitalStats } from "./pages/hospital/HospitalStats";
import { HospitalProfile } from "./pages/hospital/HospitalProfile";
import { HospitalMap } from "./pages/hospital/HospitalMap";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminHospitals } from "./pages/admin/AdminHospitals";
import { AdminUsers } from "./pages/admin/AdminUsers";
import { AdminReports } from "./pages/admin/AdminReports";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: SplashPage,
  },
  {
    path: "/racine",
    Component: SplashPage,
  },
  {
    path: "/home",
    Component: HomePage,
  },
  {
    path: "/login",
    Component: UnifiedLogin,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/forgot-password",
    Component: ForgotPassword,
  },
  {
    path: "/donor/feed",
    Component: DonorFeed,
  },
  {
    path: "/donor/map",
    Component: DonorMap,
  },
  {
    path: "/donor/history",
    Component: DonorHistory,
  },
  {
    path: "/donor/profile",
    Component: DonorProfile,
  },
  {
    path: "/hospital/dashboard",
    Component: HospitalDashboard,
  },
  {
    path: "/hospital/requests",
    Component: HospitalRequests,
  },
  {
    path: "/hospital/stats",
    Component: HospitalStats,
  },
  {
    path: "/hospital/map",
    Component: HospitalMap,
  },
  {
    path: "/hospital/profile",
    Component: HospitalProfile,
  },
  {
    path: "/admin/dashboard",
    Component: AdminDashboard,
  },
  {
    path: "/admin/hospitals",
    Component: AdminHospitals,
  },
  {
    path: "/admin/users",
    Component: AdminUsers,
  },
  {
    path: "/admin/reports",
    Component: AdminReports,
  }
]);