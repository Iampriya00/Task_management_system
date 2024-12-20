import React, { useEffect } from "react";
import { handleLogout } from "../services/authservice";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { ModeToggle } from "@/components/ui/themeToggle";
import { Button } from "@/components/ui/button";

function UserDashboard() {
  return (
    <div>
      <Button variant="destructive" onClick={() => handleLogout()}>
        Log Out
      </Button>
      <ModeToggle />
    </div>
  );
}

export default UserDashboard;
