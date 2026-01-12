import { Dialog, DialogContent, DialogFooter, DialogClose, DialogHeader, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { CircleX, CircleCheck } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import api from "@/api/api"
import CustomToast from "../../toast/CustomToast"
import toast from "react-hot-toast"

export function ConfirmDeleteModal({ deleteId, setDeleteId, filterStories }) {
    const [loading, setLoading] = useState(false)
    const deleteStory = async () => {
        try {
            setLoading(true)
            await api.delete(`story/${deleteId}/`)
            filterStories()
            setDeleteId(null)
            toast.custom(t => <CustomToast t={t} message="Story deleted successfully!" icon={CircleCheck} iconStyles="text-green-500" />)
        } catch (e) {
            toast.custom(t => <CustomToast t={t} message="An error occurred" icon={CircleX} iconStyles="text-red-500" />)
        } finally {
            setLoading(false)
        }
    }
    return (
        <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
            <DialogContent className="p-8 sm:p-9 sm:max-w-md gap-7" onOpenAutoFocus={e => e.preventDefault()} showCloseButton={!loading} onInteractOutside={(e) => loading && e.preventDefault()} onEscapeKeyDown={(e) => loading && e.preventDefault()}>
                <DialogHeader className="gap-3">
                    <DialogTitle className="text-xl">Delete Confirmation</DialogTitle>
                    <DialogDescription className="sm:text-base">Are you sure you want to delete this story?</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" className="sm:w-24" disabled={loading}>Cancel</Button>
                    </DialogClose>
                    <Button variant="destructive" className="sm:w-24" onClick={deleteStory} disabled={loading}>{loading ? <Spinner /> : "Delete"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}