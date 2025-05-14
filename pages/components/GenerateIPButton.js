import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const GenerateIPButton = () => {
  const [walletBalance, setWalletBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // This function would be replaced with actual wallet integration
  // For now, it's a mock function that simulates checking the wallet balance
  const checkWalletBalance = async () => {
    try {
      // In a real implementation, this would connect to the user's wallet
      // and fetch the actual CAMP token balance
      
      // Mock implementation - replace with actual wallet integration
      const mockBalance = 0; // Set to 0 for testing the disabled state
      setWalletBalance(mockBalance);
      return mockBalance;
    } catch (error) {
      console.error("Error checking wallet balance:", error);
      toast.error("Failed to check wallet balance");
      return 0;
    }
  };

  useEffect(() => {
    // Check wallet balance when component mounts
    checkWalletBalance();
  }, []);

  const handleGenerateIP = async () => {
    try {
      setIsLoading(true);
      
      // Check if user has enough CAMP tokens
      const balance = await checkWalletBalance();
      
      if (balance < 0.01) {
        toast.error("You need at least 0.01 CAMP tokens to generate your IP");
        setIsLoading(false);
        return;
      }
      
      // If balance is sufficient, proceed with IP generation
      // This would be replaced with actual IP generation logic
      
      // Mock successful generation
      setTimeout(() => {
        toast.success("Your IP has been generated successfully!");
        setIsLoading(false);
      }, 2000);
      
    } catch (error) {
      console.error("Error generating IP:", error);
      toast.error("Failed to generate IP");
      setIsLoading(false);
    }
  };

  // Determine if the button should be disabled
  const isDisabled = walletBalance < 0.01;

  return (
    <div className="w-full max-w-md mx-auto mt-6 mb-4">
      <Button
        onClick={handleGenerateIP}
        disabled={isDisabled || isLoading}
        className="w-full py-6 text-lg font-semibold"
      >
        {isLoading ? "Generating..." : "Generate your IP"}
      </Button>
      {isDisabled && (
        <p className="text-sm text-red-500 mt-2 text-center">
          You need at least 0.01 CAMP tokens to generate your IP
        </p>
      )}
      <p className="text-sm text-gray-500 mt-2 text-center">
        Current balance: {walletBalance} CAMP
      </p>
    </div>
  );
};

export default GenerateIPButton;

