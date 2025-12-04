import React from 'react'

const AuthPageWrapper = ({ children }) => {
    return (
        <div className="w-full h-dvh flex justify-center items-center min-h-[550px]">
            <div className="flex flex-col items-center gap-4 sm:gap-6 w-full">
                <h1 className="font-logo text-4xl sm:text-5xl">Writespace</h1>
                {children}
            </div>
        </div>
    )
}

export default AuthPageWrapper