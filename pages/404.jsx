import Link from 'next/link';

export default function Custom404() {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>404 - Page Not Found</h1>
            <p>Oops! The page you are looking for has disappeared.</p>
            <Link href="/">
                <p>Go back home</p>
            </Link>
        </div>
    );
}
