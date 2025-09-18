import { Header } from '@/components/layout/header';
import ForgotPasswordForm from '@/components/auth/forgot-password-form';

export default function ForgotPasswordPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-800'>
      <Header />
      
      <main className='pt-24'>
        <div className='container mx-auto px-4 py-12'>
          <div className='max-w-md mx-auto'>
            <div className='text-center mb-8'>
              <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>
                Reset Password
              </h1>
              <p className='text-gray-600 dark:text-gray-400'>
                Enter your email to receive a password reset link
              </p>
            </div>
            
            <ForgotPasswordForm />
          </div>
        </div>
      </main>
    </div>
  );
}