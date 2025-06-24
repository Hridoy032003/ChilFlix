import React from 'react'
import { SingUpForm } from '../components/Sinup-form'

const SingUp = () => {
  return (
        <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="w-full max-w-sm">
                <SingUpForm />
            </div>
        </div>
    )
}

export default SingUp