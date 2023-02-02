import React from 'react'
import { getProviders } from 'next-auth/react';
import Image from 'next/image';
import SignInComponent from './SignInComponent';

const SignIn = async () => {
    const providers = await getProviders();
    return (
        <div className='grid justify-center'>
            <div>
                <Image className='rounded-full mx-2 object-contain' height={700} width={700} src="https://links.papareact.com/161" alt="Meta" />
            </div>
            <SignInComponent providers={providers} />
        </div>
    )
}
export default SignIn;