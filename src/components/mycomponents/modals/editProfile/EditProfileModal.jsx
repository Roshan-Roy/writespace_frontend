import React from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { MEDIA_URL } from '@/lib/urls'
import { profileUpdateSchema, formatErrors } from '@/lib/validation'
import api from '@/api/api'
import CustomToast from '../../toast/CustomToast'
import { CircleX } from 'lucide-react'
import toast from 'react-hot-toast'

const EditProfileModal = ({ username, image }) => {
    const [data, setData] = useState({ username, image: null })
    const [errors, setErrors] = useState({
        username: ""
    })
    const [defaultImage, setDefaultImage] = useState(image)
    const [openModal, setOpenModal] = useState(false)
    const [loading, setLoading] = useState(false)


    const handleInputChange = (value, fieldName) => {
        setErrors(preErrors => ({ ...preErrors, [fieldName]: "" }))
        setData(prevData => ({ ...prevData, [fieldName]: value }))
    }
    const handleOpenModal = () => {
        setOpenModal(true)
    }
    const handlePhotoRemove = () => {
        setDefaultImage(null)
        setData(prevData => ({ ...prevData, image: null }))
    }
    const updateProfile = async ({ username: newUsername, image }) => {
        try {
            setLoading(true)
            const formData = new FormData()

            if (newUsername !== username) {
                formData.append("user.username", newUsername)
            }
            if (image || !defaultImage) {
                if (image) {
                    formData.append("image", image)
                }
                formData.append("remove_image", "true")
            }

            await api.patch("profile_update/", formData)
        } catch (e) {
            const status = e.response?.status
            if (status === 400) {
                const username = e.response.data?.user?.username
                const image = e.response.data?.image
                setErrors(prev => ({
                    ...prev,
                    username: Array.isArray(username) ? username[0] : ""
                }))
                if (image) {
                    toast.custom(t => <CustomToast t={t} message="An error occurred" icon={CircleX} iconStyles="text-red-500" />)
                }
            } else {
                toast.custom(t => <CustomToast t={t} message="An error occurred" icon={CircleX} iconStyles="text-red-500" />)
            }
        } finally {
            setLoading(false)
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        const result = profileUpdateSchema.safeParse({ username: data.username })
        if (result.success) {
            updateProfile({ username: result.data.username, image: data.image })
            setErrors(prevErrors => ({ ...prevErrors, username: "" }))
        } else {
            setErrors(prevErrors => ({ ...prevErrors, ...formatErrors(result.error.issues) }))
        }
    }

    return (
        <>
            <Dialog open={openModal} onOpenChange={() => setOpenModal(false)}>
                <DialogContent className="p-8 sm:p-9 gap-6" onOpenAutoFocus={e => e.preventDefault()} showCloseButton={!loading} onInteractOutside={(e) => loading && e.preventDefault()} onEscapeKeyDown={(e) => loading && e.preventDefault()}>
                    <DialogTitle className="text-center">Profile information</DialogTitle>
                    <form onSubmit={handleFormSubmit}>
                        <div className="flex flex-col gap-3 mb-5">
                            <p className="leading-none font-medium text-sm select-none">Photo</p>
                            <div className="flex items-center gap-5">
                                <img src={data.image ? URL.createObjectURL(data.image) : defaultImage ? `${MEDIA_URL}${defaultImage}` : "/images/default_avatar.jpg"} onChange={handleInputChange} className="w-18 h-18 rounded-full" alt="profile picture" />
                                <div>
                                    <div className="mb-2">
                                        <label htmlFor="image" className="text-green-btn cursor-pointer">Update</label>
                                        <input id="image" type="file" className="hidden" onChange={e => handleInputChange(e.target.files[0], "image")} />
                                        <span className="ml-3 text-destructive cursor-pointer" onClick={handlePhotoRemove}>Remove</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">1:1 recommended</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="username_or_email">Username</Label>
                            <Input id="username_or_email" placeholder="Enter username" className="h-11 px-4 rounded-2xl" value={data.username} onChange={e => handleInputChange(e.target.value, "username")} />
                        </div>
                        {errors.username && <p className="text-xs mt-1 text-destructive">{errors.username}</p>}
                        <Button variant="success" className="w-full mt-6 h-11 rounded-2xl">Save</Button>
                    </form>
                </DialogContent>
            </Dialog>
            <Button variant="outline" className="w-full md:w-60 rounded-2xl" onClick={handleOpenModal}>Edit Profile</Button>
        </>
    )
}

export default EditProfileModal

