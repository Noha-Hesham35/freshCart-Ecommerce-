"use client"
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import Link from 'next/link'
import {
  User,
  KeyRound,
  Package,
  Heart,
  ShoppingCart,
  LoaderCircle,
  Save,
  ArrowRight,
  UserCheck
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Field, FieldError } from '@/components/ui/field'
import { profileSchema, ProfileSchemaType } from '@/app/schema/profile.schema'
import { changePasswordSchema, ChangePasswordSchemaType } from '@/app/schema/changePassword.schema'
import { UpdateUserData, UpdateUserPassword } from '@/AuthenticationAction/Authentication.action'

export default function ProfilePage() {
  const { data: session, status, update } = useSession()
  const [activeTab, setActiveTab] = useState<'profile' | 'password'>('profile')
  const [isSavingProfile, setIsSavingProfile] = useState(false)
  const [isSavingPassword, setIsSavingPassword] = useState(false)

  const profileForm = useForm<ProfileSchemaType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: ''
    },
    mode: 'all'
  })

  const passwordForm = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      password: '',
      rePassword: ''
    },
    mode: 'all'
  })

  useEffect(() => {
    if (session?.user) {
      profileForm.reset({
        name: session.user.name || '',
        email: session.user.email || '',
        phone: ''
      })
    }
  }, [session, profileForm])

  const handleUpdateProfile = async (values: ProfileSchemaType) => {
    setIsSavingProfile(true)
    try {
      const response = await UpdateUserData(values)
      if (response?.message === 'success' || response?.user) {
        toast.success('Profile updated successfully!', { position: 'top-right', autoClose: 2000 })
        if (update) {
          await update({
            ...session,
            user: {
              ...session?.user,
              name: values.name,
              email: values.email
            }
          })
        }
      } else {
        toast.error(response?.message || response?.errors?.msg || 'Failed to update profile', {
          position: 'top-right',
          autoClose: 2500
        })
      }
    } catch (error: any) {
      toast.error(error?.message || 'Something went wrong', { position: 'top-right', autoClose: 2000 })
    } finally {
      setIsSavingProfile(false)
    }
  }

  const handleUpdatePassword = async (values: ChangePasswordSchemaType) => {
    setIsSavingPassword(true)
    try {
      const response = await UpdateUserPassword(values)
      if (response?.message === 'success' || response?.token) {
        toast.success('Password updated successfully!', { position: 'top-right', autoClose: 2000 })
        passwordForm.reset()
      } else {
        toast.error(response?.message || response?.errors?.msg || 'Failed to update password', {
          position: 'top-right',
          autoClose: 2500
        })
      }
    } catch (error: any) {
      toast.error(error?.message || 'Failed to change password', { position: 'top-right', autoClose: 2000 })
    } finally {
      setIsSavingPassword(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className='min-h-[60vh] flex items-center justify-center'>
        <LoaderCircle className='animate-spin text-green-600' size={40} />
      </div>
    )
  }

  if (!session) {
    return (
      <div className='min-h-[60vh] flex flex-col items-center justify-center text-center px-4'>
        <div className='rounded-full bg-green-50 p-6 mb-4'>
          <User className='text-green-600' size={48} />
        </div>
        <h2 className='text-2xl font-bold text-gray-800'>Please login first</h2>
        <p className='text-gray-500 mt-2 mb-6 max-w-sm'>
          You need to be logged in to view and manage your profile details.
        </p>
        <Link
          href="/login"
          className='bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-2xl font-semibold transition-colors shadow-md shadow-green-600/20'
        >
          Sign In
        </Link>
      </div>
    )
  }

  return (
    <>
      <title>My Profile - FreshCart</title>
      <div className='bg-linear-to-r from-[#17A74C] to-[#46DB7C] min-h-60'>
        <div className='w-[90%] mx-auto py-10'>
          <div className='flex items-center gap-2 text-[15px] mt-4 mb-5'>
            <Link className='text-gray-200 hover:text-white transition-colors' href="/">Home</Link>
            <span className='text-white/60'>/</span>
            <span className='text-white font-medium'>My Profile</span>
          </div>

          <div className='flex flex-wrap items-center gap-5'>
            <div className='w-20 h-20 rounded-full bg-white/20 backdrop-blur-xs border-2 border-white flex items-center justify-center text-white text-3xl font-bold shadow-lg'>
              {session.user?.name ? session.user.name.charAt(0).toUpperCase() : <User size={36} />}
            </div>
            <div>
              <h1 className='text-white text-3xl font-bold'>{session.user?.name || 'My Account'}</h1>
              <p className='text-white/80 text-sm mt-0.5'>{session.user?.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className='w-[90%] max-w-5xl mx-auto my-10'>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10'>
          <Link
            href="/allorders"
            className='bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-green-300 transition-all flex items-center justify-between group'
          >
            <div className='flex items-center gap-3'>
              <div className='w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center group-hover:scale-105 transition-transform'>
                <Package size={24} />
              </div>
              <div>
                <h3 className='font-bold text-gray-800 text-sm'>My Orders</h3>
                <p className='text-xs text-gray-500'>Track & view orders</p>
              </div>
            </div>
            <ArrowRight size={18} className='text-gray-400 group-hover:text-green-600 transition-colors' />
          </Link>

          <Link
            href="/wishList"
            className='bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-red-300 transition-all flex items-center justify-between group'
          >
            <div className='flex items-center gap-3'>
              <div className='w-12 h-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center group-hover:scale-105 transition-transform'>
                <Heart size={24} />
              </div>
              <div>
                <h3 className='font-bold text-gray-800 text-sm'>My Wishlist</h3>
                <p className='text-xs text-gray-500'>Saved items</p>
              </div>
            </div>
            <ArrowRight size={18} className='text-gray-400 group-hover:text-red-500 transition-colors' />
          </Link>

          <Link
            href="/cart"
            className='bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all flex items-center justify-between group'
          >
            <div className='flex items-center gap-3'>
              <div className='w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform'>
                <ShoppingCart size={24} />
              </div>
              <div>
                <h3 className='font-bold text-gray-800 text-sm'>Shopping Cart</h3>
                <p className='text-xs text-gray-500'>View current cart</p>
              </div>
            </div>
            <ArrowRight size={18} className='text-gray-400 group-hover:text-emerald-600 transition-colors' />
          </Link>
        </div>
        <div className='bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden'>
          <div className='flex border-b border-gray-100 bg-gray-50/60 p-2 gap-2'>
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 py-3 px-4 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-white text-green-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <UserCheck size={18} />
              Edit Profile Info
            </button>
            <button
              onClick={() => setActiveTab('password')}
              className={`flex-1 py-3 px-4 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'password'
                  ? 'bg-white text-green-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <KeyRound size={18} />
              Change Password
            </button>
          </div>

          <div className='p-6 sm:p-10'>
            {activeTab === 'profile' && (
              <form onSubmit={profileForm.handleSubmit(handleUpdateProfile)} className='max-w-lg mx-auto space-y-5'>
                <div>
                  <h2 className='text-xl font-bold text-gray-800'>Personal Information</h2>
                  <p className='text-xs text-gray-500 mt-1'>Update your basic profile information</p>
                </div>

                <Controller
                  name='name'
                  control={profileForm.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <label htmlFor='profile-name' className='text-xs font-semibold text-gray-600 mb-1 block'>
                        Full Name
                      </label>
                      <Input
                        {...field}
                        id='profile-name'
                        placeholder='Enter your full name'
                        className='p-4 rounded-xl'
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                <Controller
                  name='email'
                  control={profileForm.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <label htmlFor='profile-email' className='text-xs font-semibold text-gray-600 mb-1 block'>
                        Email Address
                      </label>
                      <Input
                        {...field}
                        id='profile-email'
                        type='email'
                        placeholder='Enter your email address'
                        className='p-4 rounded-xl'
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                <Controller
                  name='phone'
                  control={profileForm.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <label htmlFor='profile-phone' className='text-xs font-semibold text-gray-600 mb-1 block'>
                        Phone Number (Egyptian format)
                      </label>
                      <Input
                        {...field}
                        id='profile-phone'
                        type='tel'
                        placeholder='e.g. 01012345678'
                        className='p-4 rounded-xl'
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                <Button
                  disabled={isSavingProfile}
                  type='submit'
                  className='bg-green-600 hover:bg-green-700 text-white font-bold py-6 rounded-2xl w-full text-base shadow-lg shadow-green-600/20 cursor-pointer flex items-center justify-center gap-2 mt-6'
                >
                  {isSavingProfile ? (
                    <LoaderCircle className='animate-spin' />
                  ) : (
                    <>
                      Save Changes <Save size={18} />
                    </>
                  )}
                </Button>
              </form>
            )}
            {activeTab === 'password' && (
              <form onSubmit={passwordForm.handleSubmit(handleUpdatePassword)} className='max-w-lg mx-auto space-y-5'>
                <div>
                  <h2 className='text-xl font-bold text-gray-800'>Security & Password</h2>
                  <p className='text-xs text-gray-500 mt-1'>Update your password to keep your account safe</p>
                </div>
                <Controller
                  name='currentPassword'
                  control={passwordForm.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <label htmlFor='current-pass' className='text-xs font-semibold text-gray-600 mb-1 block'>
                        Current Password
                      </label>
                      <Input
                        {...field}
                        id='current-pass'
                        type='password'
                        placeholder='Enter current password'
                        className='p-4 rounded-xl'
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                <Controller
                  name='password'
                  control={passwordForm.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <label htmlFor='new-pass' className='text-xs font-semibold text-gray-600 mb-1 block'>
                        New Password
                      </label>
                      <Input
                        {...field}
                        id='new-pass'
                        type='password'
                        placeholder='Enter new password (min. 6 characters)'
                        className='p-4 rounded-xl'
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                <Controller
                  name='rePassword'
                  control={passwordForm.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <label htmlFor='confirm-pass' className='text-xs font-semibold text-gray-600 mb-1 block'>
                        Confirm New Password
                      </label>
                      <Input
                        {...field}
                        id='confirm-pass'
                        type='password'
                        placeholder='Re-type new password'
                        className='p-4 rounded-xl'
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                <Button
                  disabled={isSavingPassword}
                  type='submit'
                  className='bg-green-600 hover:bg-green-700 text-white font-bold py-6 rounded-2xl w-full text-base shadow-lg shadow-green-600/20 cursor-pointer flex items-center justify-center gap-2 mt-6'
                >
                  {isSavingPassword ? (
                    <LoaderCircle className='animate-spin' />
                  ) : (
                    <>
                      Update Password <KeyRound size={18} />
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
