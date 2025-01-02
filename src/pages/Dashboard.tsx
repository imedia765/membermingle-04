import { Card } from "@/components/ui/card";
import { MembersList } from "@/components/members/MembersList";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1f2c] to-[#151821] text-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#4a9eed] to-[#63b3ff] text-transparent bg-clip-text">
            Dashboard
          </h1>
        </div>

        <Card className="bg-gradient-to-br from-[#1e2430] to-[#252b3b] border-[#2a3040] text-white p-6">
          <MembersList />
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;