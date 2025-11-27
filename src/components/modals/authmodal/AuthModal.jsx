import { Dialog, DialogContent } from "@/components/ui/dialog"
import SignInForm from "./SignInForm"
import SignUpForm from "./SignUpForm"

export function AuthModal({ openModal, setOpenModal }) {

    return (
        <Dialog open={!!openModal} onOpenChange={() => setOpenModal(null)}>
            <DialogContent className="max-w-full sm:max-w-sm h-dvh sm:h-auto flex flex-col justify-center p-8 sm:p-9 border-0 sm:border rounded-none sm:rounded-lg">
                {openModal === "signup" && <SignUpForm setOpenModal={setOpenModal} />}
                {openModal === "signin" && <SignInForm setOpenModal={setOpenModal} />}
            </DialogContent>
        </Dialog>
    )
}
