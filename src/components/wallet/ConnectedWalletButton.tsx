"use client";

import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useCallback } from "react";

export function ConnectedWalletButton() {
  const { account, disconnect, wallet } = useWallet();

  const handleDisconnect = useCallback(async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error("Failed to disconnect:", error);
    }
  }, [disconnect]);

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="bg-blue-500  hover:bg-blue-500/90 text-white hover:text-white/90 border-0 font-medium px-6 py-2 h-10 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] hover:brightness-110 w-[160px] justify-center"
        >
          {account?.address ? shortenAddress(account.address) : "Connected"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-white/90 backdrop-blur-sm border border-gray-200 shadow-xl rounded-xl w-[160px] mt-2"
      >
        <DropdownMenuItem
          className="cursor-pointer hover:bg-red-50 text-red-600 hover:text-red-700 rounded-lg m-1 font-medium transition-colors"
          onClick={handleDisconnect}
        >
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
