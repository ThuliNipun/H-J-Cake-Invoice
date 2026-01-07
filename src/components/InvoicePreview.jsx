import React from 'react';
import './InvoicePreview.css';
import Logo from '../assets/Logo.png';

const InvoicePreview = ({ data }) => {
    const {
        invoiceNumber,
        date,
        customerName,
        customerAddress,
        customerPhone,
        items,
        companyName,
        companyDetails
    } = data;

    // Calculate total
    const total = items.reduce((sum, item) => sum + (parseFloat(item.price || 0) * parseFloat(item.quantity || 0)), 0);

    // Use only actual items
    const rowsToRender = items;

    const formatCurrency = (amount) => {
        if (!amount) return '';
        return `Rs. ${parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 0 })}`;
    };

    return (
        <div className="invoice-preview">
            {/* Header / Logo */}
            <div className="invoice-header-logo">
                <img src={Logo} alt="H & J Cakes" style={{ height: '180px', width: 'auto', display: 'block', margin: '0 auto', objectFit: 'contain' }} />
            </div>

            <div className="invoice-meta-grid">
                <div>
                    <h2 className="invoice-title">INVOICE</h2>
                    <p><strong>Invoice Number:</strong> {invoiceNumber}</p>
                    <p><strong>Date:</strong> {date}</p>
                </div>
                <div className="invoice-billed-to">
                    <h3>Billed To:</h3>
                    <p><strong>Customer Name:</strong> {customerName}</p>
                    <p><strong>Address:</strong> {customerAddress}</p>
                    <p><strong>Phone:</strong> {customerPhone}</p>
                </div>
            </div>

            {/* Table */}
            <div className="invoice-table">
                <div className="invoice-table-header">
                    <div>Description</div>
                    <div>Price</div>
                    <div>Quantity</div>
                    <div>Amount</div>
                </div>

                <div className="invoice-table-body" style={{ borderLeft: '2px solid #000', borderRight: '2px solid #000', borderBottom: '2px solid #000' }}>
                    {rowsToRender.map((item, index) => {
                        // Determine if this is a real item or placeholder
                        const amount = item.price && item.quantity ? (item.price * item.quantity) : '';
                        const isPlaceholder = !item.description && !amount;

                        return (
                            <div key={index} className="invoice-table-row">
                                <div className="invoice-col" style={{ fontWeight: isPlaceholder ? 'normal' : '700' }}>
                                    {item.description}
                                </div>
                                <div className="invoice-col center">
                                    {item.price}
                                </div>
                                <div className="invoice-col center">
                                    {item.quantity ? String(item.quantity).padStart(2, '0') : ''}
                                </div>
                                <div className="invoice-col" style={{ fontWeight: '600' }}>
                                    {amount ? (
                                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                            <span>Rs.</span>
                                            <span>{parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 0 })}</span>
                                        </div>
                                    ) : ''}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Footer */}
            <div className="invoice-footer">
                <div className="invoice-company-info">
                    <h3>{companyName}</h3>
                    {companyDetails.map((line, i) => (
                        <p key={i}>{line}</p>
                    ))}
                </div>
                <div className="invoice-total-box">
                    <span>Total</span>
                    <span>{formatCurrency(total)}</span>
                </div>
            </div>
        </div>
    );
};

export default InvoicePreview;
