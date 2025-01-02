import { Card } from "@/components/ui/card";
import { MembersList } from "@/components/members/MembersList";
import { Button } from "@/components/ui/button";
import { Users, UserCog, Settings, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1f2c] to-[#151821] text-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#4a9eed] to-[#63b3ff] text-transparent bg-clip-text">
            Dashboard
          </h1>
        </div>

        {/* Submenu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Button
            variant="outline"
            size="lg"
            className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-primary hover:text-white transition-all"
            onClick={() => navigate("/members")}
          >
            <Users className="h-8 w-8" />
            <span>Members Profile</span>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-primary hover:text-white transition-all"
            onClick={() => navigate("/collectors")}
          >
            <UserCog className="h-8 w-8" />
            <span>Collectors</span>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-primary hover:text-white transition-all"
            onClick={() => navigate("/system-tools")}
          >
            <Settings className="h-8 w-8" />
            <span>System Tools</span>
          </Button>
        </div>

        <Card className="bg-gradient-to-br from-[#1e2430] to-[#252b3b] border-[#2a3040] text-white p-6">
          <MembersList />
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;