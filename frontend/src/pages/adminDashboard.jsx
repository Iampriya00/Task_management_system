import { Button } from "@/components/ui/button";
import { handleLogout } from "@/services/authservice";
import React from "react";

function AdminDashboard() {
  return (
    <div>
      <Button variant="destructive" onClick={() => handleLogout()}>
        Log Out
      </Button>
    </div>
  );
}

export default AdminDashboard;
