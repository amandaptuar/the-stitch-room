import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Inbox,
  GraduationCap,
  Users,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet
} from 'lucide-react';
import { getInquiries, getSchools, updateInquiryStatus } from '../utils/storage';

export default function AdminDashboard() {
  const [inquiries, setInquiries] = useState([]);
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    setInquiries(getInquiries());
    setSchools(getSchools());
  }, []);

  const totalInquiries = inquiries.length;
  const newInquiries = inquiries.filter((i) => i.status === 'New').length;
  const sampleSent = inquiries.filter((i) => i.status === 'Sample Sent').length;
  const totalSchools = schools.length;

  const handleStatusChange = (id, newStatus) => {
    const updated = updateInquiryStatus(id, newStatus);
    setInquiries(updated);
  };

  return (
    <div>
      {/* KPI METRIC CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div style={{ background: '#ffffff', padding: '1.8rem', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#64748b' }}>Total Inquiries</span>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Inbox size={20} />
            </div>
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: '800', fontFamily: 'var(--font-heading)', color: 'var(--color-secondary)' }}>
            {totalInquiries}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: '600', marginTop: '0.3rem' }}>
            All-time registered requests
          </div>
        </div>

        <div style={{ background: '#ffffff', padding: '1.8rem', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#64748b' }}>New / Unread Leads</span>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertCircle size={20} />
            </div>
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: '800', fontFamily: 'var(--font-heading)', color: '#d97706' }}>
            {newInquiries}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#d97706', fontWeight: '600', marginTop: '0.3rem' }}>
            Requires follow-up response
          </div>
        </div>

        <div style={{ background: '#ffffff', padding: '1.8rem', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#64748b' }}>Samples Dispatched</span>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 size={20} />
            </div>
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: '800', fontFamily: 'var(--font-heading)', color: '#16a34a' }}>
            {sampleSent}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: '600', marginTop: '0.3rem' }}>
            Physical swatch kits sent
          </div>
        </div>

        <div style={{ background: '#ffffff', padding: '1.8rem', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#64748b' }}>Active Partner Schools</span>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#e0e7ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <GraduationCap size={20} />
            </div>
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: '800', fontFamily: 'var(--font-heading)', color: 'var(--color-secondary)' }}>
            {totalSchools}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#4f46e5', fontWeight: '600', marginTop: '0.3rem' }}>
            Tamil Nadu directory records
          </div>
        </div>
      </div>

      {/* RECENT INQUIRIES DATA TABLE */}
      <div style={{ background: '#ffffff', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--color-secondary)', margin: 0 }}>
              Recent Inquiries & Quote Requests
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0.2rem 0 0' }}>
              Real-time records submitted via website consultation forms.
            </p>
          </div>
          <Link to="/admin/inquiries" className="btn btn-outline btn-sm">
            View All ({totalInquiries})
            <ArrowRight size={14} />
          </Link>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc', color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ padding: '1rem 1.5rem', fontWeight: '600' }}>Ref ID</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: '600' }}>Client / Institution</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: '600' }}>Category & Volume</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: '600' }}>Date</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: '600' }}>Status</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: '600' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.slice(0, 5).map((inq) => (
                <tr key={inq.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '1.1rem 1.5rem', fontWeight: '700', color: 'var(--color-primary)' }}>
                    {inq.id}
                  </td>
                  <td style={{ padding: '1.1rem 1.5rem' }}>
                    <div style={{ fontWeight: '600', color: 'var(--color-secondary)' }}>{inq.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{inq.org || inq.phone}</div>
                  </td>
                  <td style={{ padding: '1.1rem 1.5rem' }}>
                    <div style={{ textTransform: 'capitalize', fontWeight: '500' }}>{inq.category}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{inq.quantity}</div>
                  </td>
                  <td style={{ padding: '1.1rem 1.5rem', color: '#64748b' }}>
                    {inq.date}
                  </td>
                  <td style={{ padding: '1.1rem 1.5rem' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '0.25rem 0.65rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        backgroundColor:
                          inq.status === 'New'
                            ? '#fef3c7'
                            : inq.status === 'Sample Sent'
                            ? '#dcfce7'
                            : inq.status === 'Contacted'
                            ? '#e0e7ff'
                            : '#f1f5f9',
                        color:
                          inq.status === 'New'
                            ? '#d97706'
                            : inq.status === 'Sample Sent'
                            ? '#166534'
                            : inq.status === 'Contacted'
                            ? '#4338ca'
                            : '#64748b',
                      }}
                    >
                      {inq.status}
                    </span>
                  </td>
                  <td style={{ padding: '1.1rem 1.5rem' }}>
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
                      <option value="New">Mark New</option>
                      <option value="Contacted">Mark Contacted</option>
                      <option value="Sample Sent">Mark Sample Sent</option>
                      <option value="Closed">Mark Closed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
