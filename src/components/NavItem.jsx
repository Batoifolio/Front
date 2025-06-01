import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const NavItem = ({ path, label }) => {
    const router = useRouter();
    const isActive = router.pathname === path;

    return (
        <Link
            className={`navItem ${isActive ? 'active' : ''}`}
            href={isActive ? '#' : path}
        >
            <span>
                {label}
            </span>
        </Link>
    );
};

export default NavItem;
