import { Header } from "@/features/header";

import { AdminNavbar } from "./admin-navbar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header>
        <AdminNavbar />
      </Header>
      {children}
    </div>
  );
};

export default AdminLayout;
