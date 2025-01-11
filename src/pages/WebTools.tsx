import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { WebMetricsForm } from "@/components/web-tools/WebMetricsForm";
import { MetricsDisplay } from "@/components/web-tools/MetricsDisplay";
import { ConsoleOutput } from "@/components/web-tools/ConsoleOutput";

const WebTools = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-6">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">Web Development Tools</h1>
              <SidebarTrigger className="md:hidden" />
            </div>
            <div className="grid gap-6">
              <WebMetricsForm />
              <MetricsDisplay />
              <ConsoleOutput />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default WebTools;