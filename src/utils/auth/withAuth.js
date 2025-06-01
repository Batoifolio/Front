// utils/auth/withAuth.js
import nookies from 'nookies';
import jwt from 'jsonwebtoken';

export function withAuth(gssp = async () => ({ props: {} })) {
    return async (ctx) => {
        const { token } = nookies.get(ctx);

        if (!token) {
            return { props: { unauthorized: true } };
        }

        try {
            const user = jwt.verify(token, process.env.JWT_SECRET);
            const result = await gssp(ctx, user);
            return {
                ...result,
                props: {
                    ...result.props,
                    user,
                },
            };
        } catch {
            return { props: { unauthorized: true } };
        }
    };
}
