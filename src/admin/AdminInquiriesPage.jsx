import React, { useState, useEffect } from 'react';
import {
  Inbox,
  Search,
  Filter,
  Trash2,
  Download,
  CheckCircle2,
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import { getInquiries, updateInquiryStatus, deleteInquiry } from '../utils/storage';

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');

  useEffect(() => {
    setInquiries(getInquiries());
  }, []);

  const handleStatusChange = (id, newStatus) => {
    const updated = updateInquiryStatus(id, newStatus);
    setInquiries(updated);
  };

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete inquiry ${id}?`)) {
      const updated = deleteInquiry(id);
      setInquiries(updated);
    }
  };

  const exportToCSV = () => {
    if (inquiries.length === 0) return;
    const headers = ['ID', 'Date', 'Name', 'Organization', 'Email', 'Phone', 'Category', 'Quantity', 'Status', 'Notes'];
    const rows = inquiries.map((i) => [
      i.id,
      i.date,
      `"${i.name || ''}"`,
      `"${i.org || ''}"`,
      i.email,
      i.phone,
      i.category,
      `"${i.quantity || ''}"`,
      i.status,
      `"${(i.notes || '').replace(/"/g, '""')}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `The-Stitch-Room-Inquiries-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = inquiries.filter((inq) => {
    const matchesSearch =
      inq.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.org?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.phone?.includes(searchTerm) ||
      inq.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.notes?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || inq.status === filterStatus;
    const matchesCategory = filterCategory === 'All' || inq.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', color: 'var(--color-secondary)', margin: 0 }}>
            Inquiries & Consultation Requests
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '0.2rem' }}>
            Manage client requests, update sample dispatch milestones, and export reports.
          </p>
        </div>
        <button onClick={exportToCSV} className="btn btn-outline btn-sm">
          <Download size={16} />
          Export Inquiries to CSV
        </button>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-md)',
          padding: '1.2rem',
          border: '1px solid #e2e8f0',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'center',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ position: 'relative', flex: '1 1 240px' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Search inquiries by name, school, email, phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '0.65rem 1rem 0.65rem 2.8rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid #cbd5e1',
              outline: 'none',
              fontSize: '0.9rem',
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              padding: '0.65rem 1rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid #cbd5e1',
              background: '#f8fafc',
              fontSize: '0.85rem',
              outline: 'none',
            }}
          >
            <option value="All">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Sample Sent">Sample Sent</option>
            <option value="Closed">Closed</option>
          </select>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            style={{
              padding: '0.65rem 1rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid #cbd5e1',
              background: '#f8fafc',
              fontSize: '0.85rem',
              outline: 'none',
            }}
          >
            <option value="All">All Categories</option>
            <option value="school">School Uniforms</option>
            <option value="hospital">Hospital Scrubs</option>
            <option value="corporate">Corporate</option>
            <option value="college">College</option>
            <option value="custom">Custom Bulk</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div style={{ background: '#ffffff', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f8fafc', color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>
              <th style={{ padding: '1rem 1.2rem', fontWeight: '600' }}>Ref ID</th>
              <th style={{ padding: '1rem 1.2rem', fontWeight: '600' }}>Client / Institution</th>
              <th style={{ padding: '1rem 1.2rem', fontWeight: '600' }}>Contact Details</th>
              <th style={{ padding: '1rem 1.2rem', fontWeight: '600' }}>Scope & Volume</th>
              <th style={{ padding: '1rem 1.2rem', fontWeight: '600' }}>Notes</th>
              <th style={{ padding: '1rem 1.2rem', fontWeight: '600' }}>Status</th>
              <th style={{ padding: '1rem 1.2rem', fontWeight: '600', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
                  No inquiries found matching your filters.
                </td>
              </tr>
            ) : (
              filtered.map((inq) => (
                <tr key={inq.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '1.1rem 1.2rem', fontWeight: '700', color: 'var(--color-primary)' }}>
                    {inq.id}
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '400' }}>{inq.date}</div>
                  </td>
                  <td style={{ padding: '1.1rem 1.2rem' }}>
                    <div style={{ fontWeight: '700', color: 'var(--color-secondary)' }}>{inq.name}</div>
                    <div style={{ fontSize: '0.82rem', color: '#64748b' }}>{inq.org || 'Individual / School'}</div>
                  </td>
                  <td style={{ padding: '1.1rem 1.2rem' }}>
                    <div>
                      <a href={`tel:${inq.phone}`} style={{ color: 'var(--color-secondary)', fontWeight: '500' }}>
                        {inq.phone}
                      </a>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                      <a href={`mailto:${inq.email}`}>{inq.email}</a>
                    </div>
                  </td>
                  <td style={{ padding: '1.1rem 1.2rem' }}>
                    <div style={{ textTransform: 'capitalize', fontWeight: '600' }}>{inq.category}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{inq.quantity}</div>
                  </td>
                  <td style={{ padding: '1.1rem 1.2rem', maxWidth: '220px' }}>
                    <div style={{ fontSize: '0.82rem', color: '#475569', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={inq.notes}>
                      {inq.notes || '—'}
                    </div>
                  </td>
                  <td style={{ padding: '1.1rem 1.2rem' }}>
                    <select
                      value={inq.status}
                      onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                      style={{
                        padding: '0.35rem 0.6rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.8rem',
                        background: '#ffffff',
                        outline: 'none',
                      }}
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Sample Sent">Sample Sent</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </td>
                  <td style={{ padding: '1.1rem 1.2rem', textAlign: 'center' }}>
                    <button
                      onClick={() => handleDelete(inq.id)}
                      style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.3rem' }}
                      title="Delete record"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
