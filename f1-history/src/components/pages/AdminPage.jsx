import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useAdminData } from '../../context/AppContext';

const AdminPage = () => {
  const { isAdmin } = useAuth();
  const { pendingTeams, addTeam } = useAdminData();
  const navigate = useNavigate();

  const empty = { teamName:'', fullName:'', base:'', founded:'', color:'#ff0000', pilot1Name:'', pilot1Nationality:'', pilot1Number:'', pilot1Born:'', pilot2Name:'', pilot2Nationality:'', pilot2Number:'', pilot2Born:'', notes:'' };
  const [form, setForm]     = useState(empty);
  const [errors, setErrors] = useState({});
  const [saved, setSaved]   = useState(false);
  const [tab, setTab]       = useState('add');

  if (!isAdmin) return (
    <div className="page" style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'80vh' }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ fontSize:'4rem', marginBottom:'1rem' }}>🔒</div>
        <div style={{ fontSize:'1.5rem', fontWeight:'700', marginBottom:'0.5rem', color:'var(--text-primary)' }}>Acceso Restringido</div>
        <div style={{ color:'var(--text-muted)', marginBottom:'1.5rem' }}>Necesitas iniciar sesión como administrador.</div>
        <button className="btn btn-primary" onClick={() => navigate('/login')}>Ir al Login</button>
      </div>
    </div>
  );

  const validate = () => {
    const e = {};
    ['teamName','fullName','base','founded','pilot1Name','pilot1Nationality','pilot1Number','pilot2Name','pilot2Nationality','pilot2Number']
      .forEach(k => { if (!String(form[k]).trim()) e[k] = true; });
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    addTeam({ teamName:form.teamName, fullName:form.fullName, base:form.base, founded:form.founded, color:form.color,
      pilots:[
        { name:form.pilot1Name, nationality:form.pilot1Nationality, number:form.pilot1Number, born:form.pilot1Born },
        { name:form.pilot2Name, nationality:form.pilot2Nationality, number:form.pilot2Number, born:form.pilot2Born },
      ], notes:form.notes });
    setSaved(true);
    setForm(empty);
    setTimeout(() => setSaved(false), 4000);
  };

  const Field = ({ label, fieldKey, placeholder, type='text', required }) => (
    <div className="form-group">
      <label className="form-label">{label}{required && ' *'}</label>
      <input className="form-input" type={type} placeholder={placeholder} value={form[fieldKey]}
        onChange={e => setForm(f => ({...f,[fieldKey]:e.target.value}))}
        style={{ borderColor: errors[fieldKey] ? 'var(--accent)' : undefined }} />
      {errors[fieldKey] && <span style={{ fontSize:'0.72rem', color:'var(--accent)' }}>Campo requerido</span>}
    </div>
  );

  return (
    <div className="page">
      <div style={{ background:'var(--gradient-hero)', padding:'4rem 0 2.5rem', borderBottom:'1px solid var(--border)' }}>
        <div className="container">
          <div className="hero-eyebrow">⚙️ Administrador</div>
          <h1 style={{ fontSize:'2.8rem', fontWeight:'900', marginBottom:'0.5rem', color:'white' }}>Panel de Administración</h1>
          <p style={{ color:'rgba(255,255,255,0.6)' }}>Gestiona escuderías, pilotos y datos del campeonato</p>
        </div>
      </div>

      <div className="container" style={{ padding:'2rem' }}>
        <div className="page-tabs">
          <button className={`page-tab ${tab==='add'?'active':''}`} onClick={() => setTab('add')}>➕ Agregar Escudería</button>
          <button className={`page-tab ${tab==='pending'?'active':''}`} onClick={() => setTab('pending')}>
            📋 Pendientes ({pendingTeams.length})
          </button>
        </div>

        {tab === 'add' && (
          <div className="admin-form">
            <div className="admin-warning">
              <span className="admin-warning-icon">⚠️</span>
              <div className="admin-warning-text">
                <strong>Importante:</strong> La nueva escudería será añadida a la parrilla en la temporada <strong>2027</strong>. No es posible incluir equipos nuevos en el campeonato actual (2026) una vez iniciada la temporada.
              </div>
            </div>

            <div style={{ fontSize:'0.72rem', fontWeight:'700', letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'1rem', borderBottom:'1px solid var(--border)', paddingBottom:'0.5rem' }}>
              🏁 Datos del Equipo
            </div>
            <div className="form-grid" style={{ marginBottom:'1.5rem' }}>
              <Field label="Nombre Corto"       fieldKey="teamName" placeholder="Ej: Andretti" required />
              <Field label="Nombre Completo"    fieldKey="fullName" placeholder="Ej: Andretti Cadillac F1 Team" required />
              <Field label="Base de Operaciones"fieldKey="base"     placeholder="Ej: Silverstone, UK" required />
              <Field label="Año de Fundación"   fieldKey="founded"  type="number" placeholder="Ej: 2025" required />
              <div className="form-group">
                <label className="form-label">Color del Equipo</label>
                <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
                  <input type="color" value={form.color} onChange={e => setForm(f=>({...f,color:e.target.value}))}
                    style={{ width:48, height:36, border:'none', cursor:'pointer', background:'none' }} />
                  <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'0.85rem', color:'var(--text-secondary)' }}>{form.color}</span>
                  <div style={{ width:24, height:24, borderRadius:'50%', background:form.color }} />
                </div>
              </div>
            </div>

            {['1','2'].map(n => (
              <div key={n} style={{ marginBottom:'1.5rem' }}>
                <div style={{ fontSize:'0.72rem', fontWeight:'700', letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'1rem', borderBottom:'1px solid var(--border)', paddingBottom:'0.5rem' }}>
                  🏎 Piloto {n}
                </div>
                <div className="form-grid">
                  <Field label="Nombre Completo" fieldKey={`pilot${n}Name`}        placeholder="Ej: Marco Rossi" required />
                  <Field label="Nacionalidad"    fieldKey={`pilot${n}Nationality`} placeholder="Ej: Italiano"   required />
                  <Field label="Número"          fieldKey={`pilot${n}Number`}      type="number" placeholder="Ej: 23" required />
                  <Field label="Fecha Nacimiento"fieldKey={`pilot${n}Born`}        placeholder="DD/MM/AAAA" />
                </div>
              </div>
            ))}

            <div className="form-group" style={{ marginBottom:'1.5rem' }}>
              <label className="form-label">Notas Adicionales</label>
              <textarea className="form-input" rows={3} placeholder="Información sobre el equipo, patrocinadores, etc."
                value={form.notes} onChange={e => setForm(f=>({...f,notes:e.target.value}))} />
            </div>

            <div style={{ display:'flex', gap:'1rem', alignItems:'center', flexWrap:'wrap' }}>
              <button className="btn btn-primary" onClick={handleSubmit}>✅ Registrar Escudería para 2027</button>
              <button className="btn btn-secondary" onClick={() => { setForm(empty); setErrors({}); }}>🗑 Limpiar</button>
              <span style={{ fontSize:'0.8rem', color:'var(--text-muted)' }}>* Campos obligatorios</span>
            </div>
          </div>
        )}

        {tab === 'pending' && (
          <div>
            {pendingTeams.length === 0 ? (
              <div style={{ textAlign:'center', padding:'4rem', color:'var(--text-muted)' }}>
                <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>📋</div>
                <div style={{ fontWeight:'700', marginBottom:'0.5rem', color:'var(--text-primary)' }}>No hay escuderías pendientes</div>
                <div style={{ fontSize:'0.85rem' }}>Las escuderías registradas para 2027 aparecerán aquí.</div>
              </div>
            ) : (
              <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
                {pendingTeams.map(t => (
                  <div key={t.id} className="card">
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:'1rem' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
                        <div style={{ width:48, height:48, borderRadius:'50%', background:t.color, border:'3px solid rgba(255,255,255,0.1)', flexShrink:0 }} />
                        <div>
                          <div style={{ fontWeight:'900', fontSize:'1.1rem', color:'var(--text-primary)' }}>{t.teamName}</div>
                          <div style={{ fontSize:'0.82rem', color:'var(--text-muted)' }}>{t.fullName}</div>
                          <div style={{ fontSize:'0.78rem', color:'var(--text-muted)' }}>{t.base} · Fundado: {t.founded}</div>
                        </div>
                      </div>
                      <div style={{ background:'rgba(245,197,24,0.1)', border:'1px solid rgba(245,197,24,0.3)', color:'var(--accent-gold)', padding:'4px 12px', borderRadius:'4px', fontSize:'0.75rem', fontWeight:'700' }}>
                        🕐 Entrada 2027
                      </div>
                    </div>
                    <div style={{ marginTop:'1rem', paddingTop:'1rem', borderTop:'1px solid var(--border)', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
                      {t.pilots?.map((p,i) => (
                        <div key={i} style={{ background:'var(--bg-secondary)', padding:'0.75rem 1rem', borderRadius:'6px', border:'1px solid var(--border)' }}>
                          <div style={{ fontSize:'0.68rem', fontWeight:'700', letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--text-muted)', marginBottom:'0.35rem' }}>Piloto {i+1}</div>
                          <div style={{ fontWeight:'700', color:'var(--text-primary)' }}>{p.name}</div>
                          <div style={{ fontSize:'0.78rem', color:'var(--text-muted)' }}>{p.nationality} · #{p.number}</div>
                        </div>
                      ))}
                    </div>
                    {t.notes && <div style={{ marginTop:'0.75rem', fontSize:'0.82rem', color:'var(--text-secondary)', fontStyle:'italic' }}>📝 {t.notes}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {saved && <div className="success-toast">✅ Escudería registrada para la temporada 2027</div>}
    </div>
  );
};

export default AdminPage;
