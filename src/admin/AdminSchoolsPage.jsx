import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Plus,
  Search,
  Edit2,
  Trash2,
  MapPin,
  X,
  CheckCircle2
} from 'lucide-react';
import { getSchools, addSchool, updateSchool, deleteSchool } from '../utils/storage';

export default function AdminSchoolsPage() {
  const [schools, setSchools] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSchool, setEditingSchool] = useState(null);

  const [form, setForm] = useState({
    name: '',
    city: '',
    category: 'Matriculation',
    students: 500,
    uniformType: '',
    colors: '#1e3a8a, #bae6fd, #ffffff',
  });

  useEffect(() => {
    setSchools(getSchools());
  }, []);

  const openAddModal = () => {
    setEditingSchool(null);
    setForm({
      name: '',
      city: '',
      category: 'Matriculation',
      students: 500,
      uniformType: '',
      colors: '#1e3a8a, #bae6fd, #ffffff',
    });
    setModalOpen(true);
  };

  const openEditModal = (s) => {
    setEditingSchool(s);
    setForm({
      name: s.name,
      city: s.city,
      category: s.category || 'Matriculation',
      students: s.students || 500,
      uniformType: s.uniformType || '',
      colors: s.colors ? s.colors.join(', ') : '#1e3a8a, #ffffff',
    });
    setModalOpen(true);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to remove ${name} from partner schools?`)) {
      const updated = deleteSchool(id);
      setSchools(updated);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const colorsArray = form.colors.split(',').map((c) => c.trim()).filter(Boolean);

    if (editingSchool) {
      const updated = updateSchool(editingSchool.id, {
        name: form.name,
        city: form.city,
        category: form.category,
        students: Number(form.students),
        uniformType: form.uniformType,
        colors: colorsArray,
      });
      setSchools(updated);
    } else {
      const updated = addSchool({
        name: form.name,
        city: form.city,
        category: form.category,
        students: Number(form.students),
        uniformType: form.uniformType,
        colors: colorsArray,
      });
      setSchools(updated);
    }
    setModalOpen(false);
  };

  const filtered = schools.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.uniformType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', color: 'var(--color-secondary)', margin: 0 }}>
            Partner Schools & Institutional Directory
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '0.2rem' }}>
            Manage the database of schools and academies showcased on the client portal and directory.
          </p>
        </div>
        <button onClick={openAddModal} className="btn btn-primary btn-sm">
          <Plus size={16} />
          Add New Partner School
        </button>
      </div>

      {/* SEARCH BAR */}
      <div style={{ background: '#ffffff', borderRadius: 'var(--radius-md)', padding: '1.2rem', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)', marginBottom: '1.5rem', display: 'flex', gap: '1rem' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Search by school name, city, or uniform pattern..."
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
      </div>

      {/* TABLE */}
      <div style={{ background: '#ffffff', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f8fafc', color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>
              <th style={{ padding: '1rem 1.4rem', fontWeight: '600' }}>Institution Name</th>
              <th style={{ padding: '1rem 1.4rem', fontWeight: '600' }}>Region / City</th>
              <th style={{ padding: '1rem 1.4rem', fontWeight: '600' }}>Board / Category</th>
              <th style={{ padding: '1rem 1.4rem', fontWeight: '600' }}>Students</th>
              <th style={{ padding: '1rem 1.4rem', fontWeight: '600' }}>Uniform Specification</th>
              <th style={{ padding: '1rem 1.4rem', fontWeight: '600', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '1.1rem 1.4rem', fontWeight: '700', color: 'var(--color-secondary)' }}>
                  {s.name}
                </td>
                <td style={{ padding: '1.1rem 1.4rem', color: '#64748b' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <MapPin size={14} style={{ color: 'var(--color-primary)' }} />
                    <span>{s.city}</span>
                  </div>
                </td>
                <td style={{ padding: '1.1rem 1.4rem' }}>
                  <span style={{ background: '#f1f5f9', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', fontWeight: '600', color: '#334155' }}>
                    {s.category}
                  </span>
                </td>
                <td style={{ padding: '1.1rem 1.4rem', color: '#64748b' }}>
                  ~{s.students}
                </td>
                <td style={{ padding: '1.1rem 1.4rem', fontSize: '0.85rem', color: '#475569', maxWidth: '260px' }}>
                  {s.uniformType}
                </td>
                <td style={{ padding: '1.1rem 1.4rem', textAlign: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem' }}>
                    <button
                      onClick={() => openEditModal(s)}
                      style={{ background: 'none', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', padding: '0.3rem' }}
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(s.id, s.name)}
                      style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.3rem' }}
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ADD / EDIT MODAL */}
      {modalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(4px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
          onClick={() => setModalOpen(false)}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              maxWidth: '540px',
              width: '100%',
              padding: '2rem',
              boxShadow: 'var(--shadow-lg)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--color-secondary)', margin: 0 }}>
                {editingSchool ? 'Edit Partner School' : 'Add New Partner School'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">School / Institution Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Don Bosco Matriculation School"
                  className="form-control"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">City / Region *</label>
                  <input
                    type="text"
                    required
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    placeholder="e.g. Vellore"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Board / Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="form-control"
                  >
                    <option value="Matriculation">Matriculation</option>
                    <option value="CBSE">CBSE</option>
                    <option value="ICSE">ICSE</option>
                    <option value="Higher Secondary">Higher Secondary</option>
                    <option value="College">College</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Approximate Student Strength</label>
                <input
                  type="number"
                  value={form.students}
                  onChange={(e) => setForm({ ...form, students: e.target.value })}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Uniform Style & Colors *</label>
                <textarea
                  rows={2}
                  required
                  value={form.uniformType}
                  onChange={(e) => setForm({ ...form, uniformType: e.target.value })}
                  placeholder="e.g. Navy Pleated Skirt / Trousers + Sky Blue Oxford Shirt"
                  className="form-control"
                />
              </div>

              <div className="form-group" style={{ marginBottom: '1.8rem' }}>
                <label className="form-label">Palette Hex Codes (comma separated)</label>
                <input
                  type="text"
                  value={form.colors}
                  onChange={(e) => setForm({ ...form, colors: e.target.value })}
                  placeholder="#1e3a8a, #bae6fd, #ffffff"
                  className="form-control"
                />
              </div>

              <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn btn-outline btn-sm"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  {editingSchool ? 'Save Changes' : 'Create Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
