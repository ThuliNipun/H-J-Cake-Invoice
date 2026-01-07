import React, { useState } from 'react';
import InvoicePreview from './InvoicePreview';
import { Plus, Trash2, Printer } from 'lucide-react'; // Need to install lucide-react or use text

// Initial Data
const INITIAL_DATA = {
    invoiceNumber: '0001',
    date: '05 January, 2026',
    customerName: 'Kandy Wattala',
    customerAddress: 'Wattala',
    customerPhone: '+0112 934 222',
    companyName: 'H & J Cakes',
    companyDetails: [
        '115/19D, Yodhayakanthha rd',
        'Alwis Town, Hendala, Wattala',
        '+94 777 00 13 14',
        'thilinitharangi.b@gmail.com'
    ],
    items: [
        { id: 1, description: 'Chocolate Icing Cake', price: 440, quantity: 4 },
        { id: 2, description: 'Ribbon Cake', price: 340, quantity: 5 },
        { id: 3, description: 'Red Velvet Cake', price: 440, quantity: 8 },
        { id: 4, description: 'Marble Cake', price: 340, quantity: 4 },
    ]
};

const InvoiceEditor = () => {
    const [data, setData] = useState(INITIAL_DATA);

    // New Item State
    const [newItem, setNewItem] = useState({ description: '', price: '', quantity: '' });

    const handleInputChange = (e, field) => {
        setData({ ...data, [field]: e.target.value });
    };

    const handleAddItem = (e) => {
        e.preventDefault();
        if (!newItem.description || !newItem.price || !newItem.quantity) return;

        setData({
            ...data,
            items: [...data.items, { ...newItem, id: Date.now() }]
        });
        setNewItem({ description: '', price: '', quantity: '' });
    };

    const handleDeleteItem = (id) => {
        setData({
            ...data,
            items: data.items.filter(item => item.id !== id)
        });
    };

    const updateNewItem = (field, value) => {
        setNewItem({ ...newItem, [field]: value });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Editor Panel */}
            <div className="lg:col-span-5 space-y-6 print:hidden">

                {/* Invoice Details Card */}
                <div className="card">
                    <h3 className="text-lg font-bold mb-4 text-gray-800">Invoice Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="label">Invoice Number</label>
                            <input
                                type="text"
                                className="input-field"
                                value={data.invoiceNumber}
                                onChange={(e) => handleInputChange(e, 'invoiceNumber')}
                            />
                        </div>
                        <div>
                            <label className="label">Date</label>
                            <input
                                type="text"
                                className="input-field"
                                value={data.date}
                                onChange={(e) => handleInputChange(e, 'date')}
                            />
                        </div>
                    </div>
                </div>

                {/* Customer Details Card */}
                <div className="card">
                    <h3 className="text-lg font-bold mb-4 text-gray-800">Customer Details</h3>
                    <div className="space-y-3">
                        <div>
                            <label className="label">Customer Name</label>
                            <input
                                type="text"
                                className="input-field"
                                value={data.customerName}
                                onChange={(e) => handleInputChange(e, 'customerName')}
                            />
                        </div>
                        <div>
                            <label className="label">Address</label>
                            <input
                                type="text"
                                className="input-field"
                                value={data.customerAddress}
                                onChange={(e) => handleInputChange(e, 'customerAddress')}
                            />
                        </div>
                        <div>
                            <label className="label">Phone</label>
                            <input
                                type="text"
                                className="input-field"
                                value={data.customerPhone}
                                onChange={(e) => handleInputChange(e, 'customerPhone')}
                            />
                        </div>
                    </div>
                </div>

                {/* Add Item Card - THE REQUESTED FEATURE */}
                <div className="card border-2 border-[var(--brand-color)]">
                    <h3 className="text-lg font-bold mb-4 text-[var(--brand-color)]">Add New Item</h3>
                    <form onSubmit={handleAddItem} className="space-y-3">
                        <div>
                            <label className="label">Description</label>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="Item name (e.g. Butter Cake)"
                                value={newItem.description}
                                onChange={(e) => updateNewItem('description', e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="label">Price (Rs.)</label>
                                <input
                                    type="number"
                                    className="input-field"
                                    placeholder="0.00"
                                    value={newItem.price}
                                    onChange={(e) => updateNewItem('price', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="label">Quantity</label>
                                <input
                                    type="number"
                                    className="input-field"
                                    placeholder="1"
                                    value={newItem.quantity}
                                    onChange={(e) => updateNewItem('quantity', e.target.value)}
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary w-full mt-2" style={{ gap: '0.5rem' }}>
                            <Plus size={18} /> Add Item
                        </button>
                    </form>
                </div>

                {/* Manage Items List */}
                <div className="card">
                    <h3 className="text-lg font-bold mb-4 text-gray-800">Current Items ({data.items.length})</h3>
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                        {data.items.length === 0 && <p className="text-gray-500 text-sm">No items added yet.</p>}
                        {data.items.map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-100">
                                <div>
                                    <p className="font-medium text-sm">{item.description}</p>
                                    <p className="text-xs text-gray-500">{item.quantity} x Rs. {item.price}</p>
                                </div>
                                <button
                                    onClick={() => handleDeleteItem(item.id)}
                                    className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                                    title="Remove"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Preview Panel */}
            {/* Preview Panel */}
            <div className="lg:col-span-7 bg-transparent dark:bg-gray-800 transition-colors duration-200 p-8 rounded-xl overflow-x-auto flex justify-center items-start print:p-0 print:bg-white print:block print:overflow-visible print:col-span-12">
                <InvoicePreview data={data} />
            </div>
        </div>
    );
};

export default InvoiceEditor;
