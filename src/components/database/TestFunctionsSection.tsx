import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function TestFunctionsSection() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const testFunctions = [
    {
      name: "merge_duplicate_collectors",
      description: "Merges collectors with similar names",
      test: async () => {
        const { data, error } = await supabase.rpc('merge_duplicate_collectors');
        if (error) throw error;
        return `Merged ${data[0].merged_count} collectors. Details: ${data[0].details}`;
      }
    },
    {
      name: "sync_collector_ids",
      description: "Syncs collector IDs with collector names",
      test: async () => {
        const { data, error } = await supabase.rpc('sync_collector_ids');
        if (error) throw error;
        return "Collector IDs synchronized successfully";
      }
    },
    {
      name: "normalize_collector_name",
      description: "Tests name normalization with a sample collector",
      test: async () => {
        const testName = "John & Mary / Smith";
        const { data, error } = await supabase.rpc('normalize_collector_name', {
          name: testName
        });
        if (error) throw error;
        return `Normalized "${testName}" to "${data}"`;
      }
    }
  ];

  const runTest = async (name: string, testFn: () => Promise<string>) => {
    setIsLoading(name);
    try {
      const result = await testFn();
      toast({
        title: "Test Successful",
        description: result,
      });
    } catch (error) {
      console.error(`Test failed for ${name}:`, error);
      toast({
        title: "Test Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Test Database Functions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Test various database functions to ensure they are working correctly.
        </p>
        <div className="space-y-4">
          {testFunctions.map((fn) => (
            <div key={fn.name} className="flex flex-col space-y-2 p-4 border rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{fn.name}</h3>
                  <p className="text-sm text-muted-foreground">{fn.description}</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => runTest(fn.name, fn.test)}
                  disabled={!!isLoading}
                >
                  {isLoading === fn.name ? "Testing..." : "Run Test"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}