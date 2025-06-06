import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Root (no ref needed)                                               */
/* ------------------------------------------------------------------ */
function Sheet(
  props: React.ComponentPropsWithoutRef<typeof SheetPrimitive.Root>
) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}
Sheet.displayName = "Sheet";

/* ------------------------------------------------------------------ */
/* Trigger                                                            */
/* ------------------------------------------------------------------ */
const SheetTrigger = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Trigger>
>((props, ref) => (
  <SheetPrimitive.Trigger data-slot="sheet-trigger" ref={ref} {...props} />
));
SheetTrigger.displayName = "SheetTrigger";

/* ------------------------------------------------------------------ */
/* Close                                                              */
/* ------------------------------------------------------------------ */
const SheetClose = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Close>
>((props, ref) => (
  <SheetPrimitive.Close data-slot="sheet-close" ref={ref} {...props} />
));
SheetClose.displayName = "SheetClose";

/* ------------------------------------------------------------------ */
/* Portal (no ref required)                                           */
/* ------------------------------------------------------------------ */
function SheetPortal(
  props: React.ComponentPropsWithoutRef<typeof SheetPrimitive.Portal>
) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}
SheetPortal.displayName = "SheetPortal";

/* ------------------------------------------------------------------ */
/* Overlay                                                            */
/* ------------------------------------------------------------------ */
const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    ref={ref}
    data-slot="sheet-overlay"
    className={cn(
      "fixed inset-0 z-50 bg-black/50",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
SheetOverlay.displayName = "SheetOverlay";

/* ------------------------------------------------------------------ */
/* Content                                                            */
/* ------------------------------------------------------------------ */
type SheetContentProps = React.ComponentPropsWithoutRef<
  typeof SheetPrimitive.Content
> & {
  side?: "top" | "right" | "bottom" | "left";
};

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ className, children, side = "right", ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      data-slot="sheet-content"
      className={cn(
        "fixed z-50 flex flex-col gap-4 bg-background shadow-lg transition ease-in-out",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:duration-300 data-[state=open]:duration-500",
        side === "right" &&
          "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right",
        side === "left" &&
          "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left",
        side === "top" &&
          "inset-x-0 top-0 h-auto border-b data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top",
        side === "bottom" &&
          "inset-x-0 bottom-0 h-auto border-t data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom",
        className
      )}
      {...props}
    >
      {children}

      {/* built-in close button */}
      <SheetPrimitive.Close className="absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-offset-2 ring-offset-background focus:ring-ring disabled:pointer-events-none data-[state=open]:bg-secondary">
        <XIcon className="size-4" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = "SheetContent";

/* ------------------------------------------------------------------ */
/* Header / Footer (no ref needed)                                    */
/* ------------------------------------------------------------------ */
function SheetHeader(
  props: React.ComponentPropsWithoutRef<"div">
) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 p-4", props.className)}
      {...props}
    />
  );
}
SheetHeader.displayName = "SheetHeader";

function SheetFooter(
  props: React.ComponentPropsWithoutRef<"div">
) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", props.className)}
      {...props}
    />
  );
}
SheetFooter.displayName = "SheetFooter";

/* ------------------------------------------------------------------ */
/* Title                                                              */
/* ------------------------------------------------------------------ */
const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    data-slot="sheet-title"
    className={cn("font-semibold text-foreground", className)}
    {...props}
  />
));
SheetTitle.displayName = "SheetTitle";

/* ------------------------------------------------------------------ */
/* Description                                                        */
/* ------------------------------------------------------------------ */
const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    data-slot="sheet-description"
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
SheetDescription.displayName = "SheetDescription";

/* ------------------------------------------------------------------ */
/* Exports                                                            */
/* ------------------------------------------------------------------ */
export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};