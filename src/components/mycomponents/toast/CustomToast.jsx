import { cn } from "@/lib/utils";

export default function CustomToast({ t, iconStyles, icon: Icon, message }) {
    return (
        <div
            className={`${t && (t.visible ? "animate-toast-in" : "animate-toast-out")} px-4 sm:px-5 py-2 sm:py-3 bg-card text-card-foreground rounded-lg border text-xs sm:text-sm flex items-center gap-2 sm:gap-2.5`}>
            {Icon && <Icon className={cn("w-4 sm:w-5 h-4 sm:h-5", iconStyles)} />}
            <span>{message}</span>
        </div>
    );
}
