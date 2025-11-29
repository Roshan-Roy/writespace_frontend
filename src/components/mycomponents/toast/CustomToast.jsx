export default function CustomToast({ t, icon, message }) {
    return (
        <div
            className={`${t.visible ? "animate-toast-in" : "animate-toast-out"} px-4 py-2 bg-card text-card-foreground rounded-lg border text-xs flex items-center gap-2`}>
            {icon}
            <span>{message}</span>
        </div>
    );
}
