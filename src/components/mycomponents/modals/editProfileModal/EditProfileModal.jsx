import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { MEDIA_URL } from '@/lib/urls'
import { profileUpdateSchema, formatErrors } from '@/lib/validation'
import api from '@/api/api'
import CustomToast from '../../toast/CustomToast'
import { CircleX, CircleCheck } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '@/contexts/AuthContext'
import { Spinner } from '@/components/ui/spinner'

const EditProfileModal = ({ username, image, updateProfileData }) => {
    const { updateUser } = useAuth()
    const [data, setData] = useState({ username, image: null })
    const [previewUrl, setPreviewUrl] = useState(null)
    const [errors, setErrors] = useState({
        username: ""
    })
    const [defaultImage, setDefaultImage] = useState(image)
    const [openModal, setOpenModal] = useState(false)
    const [loading, setLoading] = useState(false)


    const handleInputChange = (value, fieldName) => {
        if (fieldName === "image" && !value) {
            return
        }
        if (fieldName === "username") {
            setErrors(preErrors => ({ ...preErrors, [fieldName]: "" }))
        }
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

            const response = await api.patch("profile_update/", formData)
            const updatedUserData = response.data.data
            updateUser({ username: updatedUserData.user.username, image: updatedUserData.image })
            updateProfileData({ username: updatedUserData.user.username, image: updatedUserData.image })
            toast.custom(t => <CustomToast t={t} message="Profile updated successfully!" icon={CircleCheck} iconStyles="text-green-500" />)
            setOpenModal(false)
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

    useEffect(() => {
        if (!data.image) {
            setPreviewUrl(null)
            return
        }

        const url = URL.createObjectURL(data.image)
        setPreviewUrl(url)

        return () => {
            URL.revokeObjectURL(url)
        }
    }, [data.image])

    useEffect(() => {
        if (openModal) {
            setData(prevData => ({ ...prevData, username, image: null }))
            setDefaultImage(image)
        }
    }, [openModal])

    return (
        <>
            <Dialog open={openModal} onOpenChange={() => setOpenModal(false)}>
                <DialogContent className="p-8 sm:p-9 gap-6" onOpenAutoFocus={e => e.preventDefault()} showCloseButton={!loading} onInteractOutside={(e) => loading && e.preventDefault()} onEscapeKeyDown={(e) => loading && e.preventDefault()}>
                    <DialogTitle className="text-center">Profile information</DialogTitle>
                    <form onSubmit={handleFormSubmit}>
                        <div className="flex flex-col gap-3 mb-5">
                            <p className="leading-none font-medium text-sm select-none">Photo</p>
                            <div className="flex items-center gap-5">
                                <img src={
                                    previewUrl
                                        ? previewUrl
                                        : defaultImage
                                            ? `${MEDIA_URL}${defaultImage}`
                                            : "/images/default_avatar.jpg"
                                } onChange={handleInputChange} className="w-18 h-18 rounded-full" alt="profile picture" />
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
                        <Button variant="success" className="w-full mt-6 h-11 rounded-2xl" disabled={loading}>{loading ? <Spinner /> : "Save"}</Button>
                    </form>
                </DialogContent>
            </Dialog>
            <Button variant="outline" className="w-full md:w-60 rounded-2xl" onClick={handleOpenModal}>Edit Profile</Button>
        </>
    )
}

export default EditProfileModal

