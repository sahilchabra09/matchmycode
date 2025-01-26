import { Button } from "@/components/ui/hs_ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/hs_ui/dialog"
import { AlertTriangleIcon, InfoIcon, UserPlusIcon } from "lucide-react";

type RegistrationDialogProps = {
  hackathonId: number;
  userStartId: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function RegistrationDialog({ 
  hackathonId,
  userStartId,
  onSuccess,
  onError 
}: RegistrationDialogProps) {
  const handleConfirm = async () => {
    try {
      const response = await fetch(
        `/hackathon/${hackathonId}/register_for_hackathon`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_startId: userStartId })
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      onSuccess?.();
    } catch (error: any) {
      onError?.(error.message);
      console.error("Registration error:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
      <Button
        variant="default" // Use your existing variant from buttonVariants
        size="lg" // Use your existing size variant
        className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
        onClick={handleConfirm}
      >

          <UserPlusIcon className="h-4 w-4" />
          Register for Hackathon
        </Button>
      </DialogTrigger>

      <DialogContent className="border-2 border-primary/20 rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-primary">
            Confirm Hackathon Registration
          </DialogTitle>
          <DialogDescription className="text-muted-foreground/80">
            You're about to register for this hackathon
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-2">
          <p className="text-sm flex items-center gap-2">
            <InfoIcon className="h-5 w-5 text-blue-500" />
            This will register user ID: <code className="text-primary">{userStartId}</code>
          </p>
          <p className="text-sm flex items-center gap-2">
            <AlertTriangleIcon className="h-5 w-5 text-yellow-500" />
            Registration cannot be undone
          </p>
        </div>

        <DialogFooter>
          <Button variant="outline" className="border-destructive/40">
            Cancel
          </Button>
          <Button
        variant="default" // Use your existing variant from buttonVariants
        size="lg" // Use your existing size variant
        className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
        onClick={handleConfirm}
      >

            Confirm Registration
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

