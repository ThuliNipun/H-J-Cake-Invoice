import { useState, useEffect } from 'react'
import InvoiceEditor from './components/InvoiceEditor'
import { Printer, Sun, Moon } from 'lucide-react'

function App() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200 print:bg-white">
            <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10 print:hidden transition-colors duration-200">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <h1 className="text-xl font-bold text-gray-900 dark:text-white" style={{ color: 'var(--brand-color)' }}>Invoice Generator</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
                            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                        >
                            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <button className="btn btn-primary gap-2" onClick={() => window.print()}>
                            <Printer size={20} />
                            Print / Save PDF
                        </button>
                    </div>
                </div>
            </header>
            <main className="max-w-7xl mx-auto py-8 px-4 print:p-0 print:m-0 print:max-w-none print:w-full">
                <InvoiceEditor />
            </main>
        </div>
    )
}

export default App
