import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const NavItem = ({ path, label }) => {
    const router = useRouter();
    const isActive = router.pathname === path;

    if (isActive) {
        return (
            <Link
                className="navItem active"
                href="#"
            >
                <span >
                    {label}
                </span>
            </Link>

        );
    }

    return (
        <Link
            className="navItem "
            href={path}
        >
            <span >
                {label}
            </span>
        </Link>
    );
};

export default NavItem;
