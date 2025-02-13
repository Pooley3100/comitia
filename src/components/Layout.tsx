import Footer from "./Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Your header/nav components */}
            <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
                {children}
            </main>
            <Footer />         
        </div>
    )
} 