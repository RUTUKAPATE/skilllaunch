import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[100vh] px-4 text-center">
            <h1 className="text-6xl font-extrabold tracking-tighter text-transparent bg-clip-text pb-2 pr-2 mb-4 bg-gradient-to-b from-gray-800 via-gray-600 to-gray-900 dark:from-gray-400 dark:via-gray-200 dark:to-gray-600">
                404
            </h1>
            <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
            <p className="text-gray-600 mb-8">Oops! The page you&apos;re looking for does&apos;t exist or has been moved.</p>
            <Link href="/">
                <Button>Return Home</Button>
            </Link>
        </div>
    );
}