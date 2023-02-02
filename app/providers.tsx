"use client";
import { SessionProvider } from 'next-auth/react'
import React from 'react'

const providers = ({ session, children }: any) => {
    return (
        <SessionProvider session={session}>{children}</SessionProvider>
    )
}
export default providers;