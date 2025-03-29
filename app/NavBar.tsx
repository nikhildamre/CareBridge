'use client'

import Link from 'next/link'
import classNames from 'classnames'
import { usePathname } from 'next/navigation'
import { AiFillBug } from "react-icons/ai";
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';


function NavBar() {
    const { data: session } = useSession();
    console.log(session)
    const CurrentPath = usePathname();
    const isAuth = true;
    
    const Navlist = [
        { label: 'Home', href: '/' },
        { label: 'Patient List', href: '/patient' },
        { label: 'Add Patient', href: '/patient/add' }
    ];

    return (
        <nav className="flex space-x-6 border-b mb-5">
            <ul className="flex space-x-6 px-5 items-center mt-4 pb-4">
                <Link href="/" className="font-bold">
                    <AiFillBug />

                </Link>
                {isAuth && Navlist.map(list => (
                    <Link 
                        key={list.label} 
                        href={list.href} 
                        className={classNames({
                            'text-black font-bold': CurrentPath === list.href,
                            'text-gray-600': CurrentPath !== list.href,
                            'hover:text-gray-600 transition-colors': true,
                        })}
                    >
                        {list.label}
                    </Link>
                ))}
            </ul>
            <h1>{session?.user.email}</h1>
          
            <a className='pt-2 ' href="/"> <Button>SignUp</Button></a>
           
        </nav>
    );
}

export default NavBar;
