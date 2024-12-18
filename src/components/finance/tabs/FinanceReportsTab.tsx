import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PrintTemplate } from "@/components/collectors/PrintTemplate";
import { useToast } from "@/components/ui/use-toast";

export function FinanceReportsTab() {
  const [selectedPeriod, setSelectedPeriod] = useState("current");
  const [selectedCollector, setSelectedCollector] = useState("");
  const { toast } = useToast();

  // Fetch collectors
  const { data: collectors } = useQuery({
    queryKey: ['collectors'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('collectors')
        .select('*, members(*)');
      
      if (error) {
        console.error('Error fetching collectors:', error);
        throw error;
      }
      return data || [];
    }
  });

  // Fetch payments based on selected period
  const { data: payments } = useQuery({
    queryKey: ['payments', selectedPeriod],
    queryFn: async () => {
      let startDate;
      const now = new Date();
      
      switch (selectedPeriod) {
        case 'current':
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          break;
        case 'last':
          startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
          break;
        default:
          startDate = new Date(now.getFullYear(), now.getMonth() - 3, 1); // Last 3 months for custom
      }

      const { data, error } = await supabase
        .from('payments')
        .select('*, member:members(*), collector:collectors(*)')
        .gte('payment_date', startDate.toISOString())
        .order('payment_date', { ascending: false });

      if (error) {
        console.error('Error fetching payments:', error);
        throw error;
      }
      return data || [];
    }
  });

  const generateReport = () => {
    try {
      let reportData;
      if (selectedCollector) {
        reportData = collectors?.filter(c => c.id === selectedCollector);
      } else {
        reportData = collectors;
      }

      if (!reportData?.length) {
        toast({
          title: "No data available",
          description: "There is no data available for the selected criteria.",
          variant: "destructive"
        });
        return;
      }

      const printContent = PrintTemplate({ collectors: reportData });
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.print();
      }
    } catch (error) {
      console.error('Error generating report:', error);
      toast({
        title: "Error",
        description: "Failed to generate report. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Monthly Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger>
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Current Month</SelectItem>
                <SelectItem value="last">Last Month</SelectItem>
                <SelectItem value="custom">Last 3 Months</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={generateReport} className="w-full">
              <FileText className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Collector Reports</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Select value={selectedCollector} onValueChange={setSelectedCollector}>
              <SelectTrigger>
                <SelectValue placeholder="Select collector" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Collectors</SelectItem>
                {collectors?.map((collector) => (
                  <SelectItem key={collector.id} value={collector.id}>
                    {collector.name} ({collector.members?.length || 0} members)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={generateReport} className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}