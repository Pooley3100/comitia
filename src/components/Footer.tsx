import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8 w-full mt-auto">
            <div className="container mx-auto grid grid-cols-4 gap-4 text-xs">
                <div>
                    <h3 className="font-bold mb-2 text-yellow-400">About</h3>
                    <ul>
                        <li><a href="/about" className="hover:underline">About Us</a></li>
                        <li><a href="/team" className="hover:underline">Our Team</a></li>
                        <li><a href="/contact" className="hover:underline">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold mb-2 text-red-500">Create</h3>
                    <ul>
                        <li><a href="/create" className="hover:underline">Create Poll</a></li>
                        <li><a href="/create" className="hover:underline">Create Survey</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold mb-2">Homepage</h3>
                    <ul>
                        <li><a href="/" className="hover:underline">Home</a></li>
                        <li><a href="/features" className="hover:underline">Features</a></li>
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