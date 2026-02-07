import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useVerificationModal } from "@/contexts/VerificationModalContext"

const VerificationModal = () => {
    const { data, setVerificationModalData } = useVerificationModal()
    return (
        <Dialog open={!!data} onOpenChange={() => setVerificationModalData(null)}>
            <DialogContent className="max-w-full sm:max-w-full h-dvh flex flex-col justify-center items-center md:gap-6 p-10 md:p-12 border-0 rounded-none text-center">
                <p className="font-semibold text-xl md:text-2xl">{data?.email_subject}</p>
                <div className="flex flex-col gap-2 md:gap-4">
                    <p className="md:text-lg">{data?.email_body}</p>
                    <a className="wrap-anywhere text-blue-600 underline underline-offset-1 lg:text-lg" target="_blank" rel="noopener noreferrer" href={data ? data.link : "#"}>{data?.link}</a>
                </div>
                <p className="mt-4 text-muted-foreground text-sm leading-relaxed">{data?.message} <span className="text-foreground">{data?.email_to}</span></p>
            </DialogContent>
        </Dialog>
    )
}

export default VerificationModal
