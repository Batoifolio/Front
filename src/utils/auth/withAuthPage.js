// utils/auth/withAuthPage.js
import React from 'react';
import UnauthorizedRequiredLogin from '@/components/UnauthorizedRequiredLogin';

export function withAuthPage(PageComponent) {
    return function AuthWrapper(props) {
        if (props.unauthorized) {
            return <UnauthorizedRequiredLogin />;
        }

        return <PageComponent {...props} />;
    };
}
