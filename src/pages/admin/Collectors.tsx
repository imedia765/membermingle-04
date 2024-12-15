import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { importDataFromJson } from "@/utils/importData";
import { EditCollectorDialog } from "@/components/collectors/EditCollectorDialog";
import { CollectorList } from "@/components/collectors/CollectorList";
import { syncCollectorIds } from "@/utils/databaseOperations";
import { CollectorHeader } from "@/components/collectors/CollectorHeader";
import { CollectorSearch } from "@/components/collectors/CollectorSearch";
import { PrintTemplate } from "@/components/collectors/PrintTemplate";

export default function Collectors() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCollector, setExpandedCollector] = useState<string | null>(null);
  const [editingCollector, setEditingCollector] = useState<{ id: string; name: string } | null>(null);
  const { toast } = useToast();

  const { data: collectors, isLoading, refetch } = useQuery({
    queryKey: ['collectors'],
    queryFn: async () => {
      console.log('Starting collectors fetch process...');
      
      // First, ensure collector_ids are up to date
      await syncCollectorIds();
      console.log('Collector IDs synced');

      // Debug: First get all members to check their collector assignments
      const { data: allMembers, error: membersError } = await supabase
        .from('members')
        .select('id, full_name, collector, collector_id');
      
      if (membersError) {
        console.error('Error fetching members:', membersError);
      } else {
        console.log('All members data:', allMembers);
        // Log members without collector_id but with collector name
        const unmatchedMembers = allMembers.filter(m => !m.collector_id && m.collector);
        if (unmatchedMembers.length > 0) {
          console.log('Members with collector name but no collector_id:', unmatchedMembers);
        }
      }

      // Then fetch collectors with their members
      const { data: collectorsData, error: collectorsError } = await supabase
        .from('collectors')
        .select(`
          *,
          members!members_collector_id_fkey (
            id,
            full_name,
            member_number,
            email,
            phone,
            address,
            town,
            postcode,
            status,
            membership_type,
            collector,
            collector_id
          )
        `)
        .order('name');
      
      if (collectorsError) {
        console.error('Error fetching collectors:', collectorsError);
        throw collectorsError;
      }

      return collectorsData;
    }
  });

  const handleImportData = async () => {
    const result = await importDataFromJson();
    if (result.success) {
      toast({
        title: "Data imported successfully",
        description: "The collectors and members data has been imported.",
      });
      refetch();
    } else {
      toast({
        title: "Import failed",
        description: "There was an error importing the data.",
        variant: "destructive",
      });
    }
  };

  const handlePrintAll = () => {
    const printContent = PrintTemplate({ collectors });
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="space-y-6">
      <CollectorHeader 
        onImportData={handleImportData}
        onPrintAll={handlePrintAll}
      />

      <CollectorSearch 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <CollectorList
        collectors={collectors || []}
        expandedCollector={expandedCollector}
        onToggleCollector={setExpandedCollector}
        onEditCollector={setEditingCollector}
        onUpdate={refetch}
        isLoading={isLoading}
        searchTerm={searchTerm}
      />

      {editingCollector && (
        <EditCollectorDialog
          isOpen={true}
          onClose={() => setEditingCollector(null)}
          collector={editingCollector}
          onUpdate={refetch}
        />
      )}
    </div>
  );
}