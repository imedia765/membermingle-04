import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { Label } from "@/components/ui/label";
import { useLocation } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

interface MembershipSectionProps {
  onCollectorChange?: (collectorId: string) => void;
}

export const MembershipSection = ({ onCollectorChange }: MembershipSectionProps) => {
  const [collectors, setCollectors] = useState<Array<{ id: string; name: string; prefix: string; number: string }>>([]);
  const [selectedCollector, setSelectedCollector] = useState<string>("");
  const [assignedCollectorName, setAssignedCollectorName] = useState<string>("");
  const [nextMemberNumber, setNextMemberNumber] = useState<string>("");
  const [currentMemberNumber, setCurrentMemberNumber] = useState<string>("");
  const location = useLocation();
  const prefilledData = location.state?.prefilledData;
  const memberId = location.state?.memberId;

  const calculateNextMemberNumber = async (collectorId: string) => {
    console.log("Calculating next member number for collector:", collectorId);
    const { data: collector } = await supabase
      .from('collectors')
      .select('prefix, number')
      .eq('id', collectorId)
      .single();

    if (collector) {
      console.log("Found collector:", collector);
      const { data: lastMember } = await supabase
        .from('members')
        .select('member_number')
        .like('member_number', `${collector.prefix}${collector.number}%`)
        .order('member_number', { ascending: false })
        .limit(1);

      let sequence = 1;
      if (lastMember && lastMember.length > 0) {
        console.log("Last member number:", lastMember[0].member_number);
        const lastSequence = parseInt(lastMember[0].member_number.substring((collector.prefix + collector.number).length)) || 0;
        sequence = lastSequence + 1;
      }

      const nextNumber = `${collector.prefix}${collector.number}${String(sequence).padStart(3, '0')}`;
      console.log("Calculated next member number:", nextNumber);
      setNextMemberNumber(nextNumber);
    }
  };

  useEffect(() => {
    const fetchCollectors = async () => {
      console.log("Fetching collectors...");
      try {
        if (memberId) {
          console.log("Fetching member data for ID:", memberId);
          const { data: memberData, error: memberError } = await supabase
            .from('members')
            .select('collector_id, collector, member_number')
            .eq('member_number', memberId)
            .single();

          if (memberError) {
            console.error("Error fetching member data:", memberError);
          } else if (memberData) {
            console.log("Found member data:", memberData);
            setCurrentMemberNumber(memberData.member_number);
            if (memberData.collector) {
              setAssignedCollectorName(memberData.collector);
              if (memberData.collector_id) {
                setSelectedCollector(memberData.collector_id);
                onCollectorChange?.(memberData.collector_id);
              }
              return;
            }
          }
        }

        const { data: collectorsData, error: collectorsError } = await supabase
          .from('collectors')
          .select('id, name, prefix, number')
          .eq('active', true)
          .order('name');

        if (collectorsError) {
          console.error("Error fetching collectors:", collectorsError);
          return;
        }

        console.log("Fetched collectors:", collectorsData);
        
        if (collectorsData && collectorsData.length > 0) {
          setCollectors(collectorsData);
          
          if (!selectedCollector) {
            console.log("Setting default collector:", collectorsData[0].id);
            setSelectedCollector(collectorsData[0].id);
            onCollectorChange?.(collectorsData[0].id);
            calculateNextMemberNumber(collectorsData[0].id);
          }
        } else {
          console.warn("No active collectors found in the database");
        }
      } catch (error) {
        console.error("Unexpected error during collector fetch:", error);
      }
    };

    fetchCollectors();
  }, [memberId, onCollectorChange]); 

  const handleCollectorChange = (value: string) => {
    console.log("Selected collector:", value);
    setSelectedCollector(value);
    onCollectorChange?.(value);
    calculateNextMemberNumber(value);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Membership Information</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="collector" className="text-lg">Select Collector</Label>
          {memberId && assignedCollectorName ? (
            <>
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg shadow-sm">
                <p className="text-lg">
                  Currently assigned to: {" "}
                  <span className="font-semibold text-blue-600 text-xl">
                    {assignedCollectorName}
                  </span>
                </p>
              </div>
              {currentMemberNumber && (
                <Alert className="mt-3 bg-blue-50 border-blue-200">
                  <InfoIcon className="h-5 w-5 text-blue-500" />
                  <AlertDescription className="text-lg">
                    Your member number is: {" "}
                    <span className="font-semibold text-blue-600 text-xl">
                      {currentMemberNumber}
                    </span>
                  </AlertDescription>
                </Alert>
              )}
            </>
          ) : (
            <>
              <Select 
                value={selectedCollector} 
                onValueChange={handleCollectorChange}
                disabled={!!memberId}
              >
                <SelectTrigger id="collector" className="w-full">
                  <SelectValue placeholder="Select a collector" />
                </SelectTrigger>
                <SelectContent>
                  {collectors.length === 0 ? (
                    <SelectItem value="no-collectors" disabled>
                      No active collectors available
                    </SelectItem>
                  ) : (
                    collectors.map((collector) => (
                      <SelectItem key={collector.id} value={collector.id}>
                        {collector.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              {nextMemberNumber && (
                <Alert className="mt-3 bg-blue-50 border-blue-200">
                  <InfoIcon className="h-5 w-5 text-blue-500" />
                  <AlertDescription className="text-lg">
                    Your member number will be: {" "}
                    <span className="font-semibold text-blue-600 text-xl">
                      {nextMemberNumber}
                    </span>
                  </AlertDescription>
                </Alert>
              )}
            </>
          )}
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-lg">Membership Fee</h4>
          <p>Registration fee: £150</p>
          <p>Annual fee: £40 (collected £20 in January and £20 in June)</p>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="giftAid" />
          <label htmlFor="giftAid">I am eligible for Gift Aid</label>
        </div>

        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <Checkbox id="terms" required />
            <label htmlFor="terms" className="text-sm">
              I/We Hereby confirm the above details provided are genuine and valid. I/We also understand
              that submitting an application or making payment does not obligate PWA Burton On Trent to
              grant Membership. Membership will only be approved once all criteria are met, Supporting
              documents presented, Payment made in Full and approval is informed by the Management of PWA
              Burton On Trent. I/We understand and agree that it is my/our duty and responsibility to
              notify PWA Burton On Trent of ALL changes in circumstance in relation to myself/ALL those
              under this Membership, at my/our earliest convenience.
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};