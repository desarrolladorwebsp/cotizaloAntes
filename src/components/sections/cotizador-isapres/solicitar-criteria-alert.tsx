"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  SOLICITAR_CRITERIA_ALERT_DEFAULT,
  SOLICITAR_CRITERIA_ALERT_TITLE,
} from "@/lib/validation/solicitar-criteria";

export function SolicitarCriteriaAlert({
  open,
  message = SOLICITAR_CRITERIA_ALERT_DEFAULT,
  onOpenChange,
  onConfirm,
}: {
  open: boolean;
  message?: string;
  onOpenChange: (open: boolean) => void;
  onConfirm?: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{SOLICITAR_CRITERIA_ALERT_TITLE}</DialogTitle>
          <DialogDescription className="text-left text-sm leading-relaxed text-foreground/85">
            {message}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            className="rounded-full"
            onClick={() => {
              onOpenChange(false);
              onConfirm?.();
            }}
          >
            Entendido
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
