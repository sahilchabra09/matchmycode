import { EditProfileForm } from "@/components/edit-profile-form"

export default function EditProfilePage() {
  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Edit Your Profile</h1>
        <EditProfileForm />
      </div>
    </div>
  )
}

