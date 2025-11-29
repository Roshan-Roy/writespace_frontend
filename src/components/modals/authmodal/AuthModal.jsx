import { Dialog, DialogContent } from "@/components/ui/dialog"
import SignInForm from "./SignInForm"
import SignUpForm from "./SignUpForm"
import { useState } from "react"

export function AuthModal({ openModal, setOpenModal }) {
    const [disableClosing, setDisableClosing] = useState(false)
    return (
        <Dialog open={!!openModal} onOpenChange={() => setOpenModal(null)}>
            <DialogContent className="max-w-full sm:max-w-sm h-dvh sm:h-auto flex flex-col justify-center p-8 sm:p-9 border-0 sm:border rounded-none sm:rounded-lg" onOpenAutoFocus={e => e.preventDefault()} showCloseButton={!disableClosing} onInteractOutside={(e) => disableClosing && e.preventDefault()} onEscapeKeyDown={(e) => disableClosing && e.preventDefault()}>
                {openModal === "signup" && <SignUpForm setOpenModal={setOpenModal} setDisableClosing={setDisableClosing} />}
                {openModal === "signin" && <SignInForm setOpenModal={setOpenModal} setDisableClosing={setDisableClosing} />}
            </DialogContent>
        </Dialog>
    )
}
