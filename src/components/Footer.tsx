import React from 'react'
import Link from 'next/link'

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8 w-full mt-auto">
            <div className="container mx-auto grid grid-cols-4 gap-4 text-xs">
                <div>
                    <h3 className="font-bold mb-2 text-yellow-400">About</h3>
                    <ul>
                        <li><Link href="/about/" className="hover:underline">About Us</Link></li>
                        <li><Link href="/team/" className="hover:underline">Our Team</Link></li>
                        <li><Link href="/contact/" className="hover:underline">Contact</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold mb-2 text-red-500">Create</h3>
                    <ul>
                        <li><Link href="/create/" className="hover:underline">Create Poll</Link></li>
                        <li><Link href="/create/" className="hover:underline">Create Survey</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold mb-2">Homepage</h3>
                    <ul>
                        <li><Link href="/" className="hover:underline">Home</Link></li>
                        <li><Link href="/features/" className="hover:underline">Features</Link></li>
                    </ul>
                </div>
                <div className="col-span-4 text-center mt-4">
                    <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer