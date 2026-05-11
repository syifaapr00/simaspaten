import React, { useState, useMemo } from 'react';

// ===================== SAMPLE DATA (berdasarkan file Excel) =====================
// Data ini sudah ditambahkan properti: punyaPBJ, punyaPNT, dan statusLulusDiklat (simulasi dari panitia)
const initialData = [
  { id:1, nama:"AAN YULIANTO", nip:"198207172009011009", unit:"KPP PRATAMA", kppn:"137 BATAM", statusSimas:"Antrean Diklat", tglVerif:"27/04/2026", punyaPBJ:false, punyaPNT:false, lulusDiklat:false },
  { id:2, nama:"ABD. MUIS", nip:"197210022006041002", unit:"KEMENAG HAJI", kppn:"109 BATURAJA", statusSimas:"Antrean Diklat", tglVerif:"17/04/2026", punyaPBJ:false, punyaPNT:false, lulusDiklat:true },
  { id:3, nama:"ABDUL RAHMAN", nip:"197912192007101002", unit:"KEMENAG BONE", kppn:"055 WATAMPONE", statusSimas:"Antrean Diklat", tglVerif:"16/03/2026", punyaPBJ:false, punyaPNT:false, lulusDiklat:false },
  { id:4, nama:"ABDUL HADI", nip:"197105042009101001", unit:"KEMENAG PEKANBARU", kppn:"008 PEKANBARU", statusSimas:"Antrean Diklat", tglVerif:"20/04/2026", punyaPBJ:false, punyaPNT:false, lulusDiklat:true },
  { id:5, nama:"ABDUL JAMAL", nip:"197601042007011016", unit:"KEMENAG TANGERANG", kppn:"127 TANGERANG", statusSimas:"Antrean Diklat", tglVerif:"13/01/2026", punyaPBJ:true, punyaPNT:false, lulusDiklat:false },
  { id:6, nama:"ADAM TJAHJA", nip:"148540000000000207", unit:"KOARMADA II", kppn:"031 SURABAYA I", statusSimas:"Antrean Diklat", tglVerif:"09/03/2026", punyaPBJ:false, punyaPNT:true, lulusDiklat:true },
  { id:7, nama:"ADE AYU", nip:"199810212025042003", unit:"TVRI PUSAT", kppn:"182 JAKARTA VII", statusSimas:"Antrean Diklat", tglVerif:"14/04/2026", punyaPBJ:false, punyaPNT:false, lulusDiklat:false },
  { id:8, nama:"ADVENT RUMAST", nip:"198510012009011003", unit:"KPP TANGERANG", kppn:"127 TANGERANG", statusSimas:"Antrean Diklat", tglVerif:"06/03/2026", punyaPBJ:false, punyaPNT:false, lulusDiklat:true },
  { id:9, nama:"AGUNG SYARIFUDDIN", nip:"198301262006021001", unit:"BADAN BUMN", kppn:"019 JAKARTA II", statusSimas:"Antrean Diklat", tglVerif:"02/04/2026", punyaPBJ:true, punyaPNT:false, lulusDiklat:false },
  { id:10, nama:"AGUS SUGIYARSO", nip:"78081237", unit:"POLDA", kppn:"015 PANGKAL PINANG", statusSimas:"Antrean Diklat", tglVerif:"22/04/2026", punyaPBJ:false, punyaPNT:false, lulusDiklat:true },
  { id:11, nama:"AHMAD ZAINUL", nip:"197205182000031001", unit:"MODERASI BERAGAMA", kppn:"133 JAKARTA IV", statusSimas:"Antrean Diklat", tglVerif:"03/03/2026", punyaPBJ:false, punyaPNT:false, lulusDiklat:false },
  { id:12, nama:"ALFIAN", nip:"197809281999051001", unit:"KANWIL HAJI SUMUT", kppn:"123 MEDAN II", statusSimas:"Antrean Diklat", tglVerif:"20/04/2026", punyaPBJ:false, punyaPNT:false, lulusDiklat:true },
  { id:13, nama:"ANDI ISWAN NUR", nip:"197511102014111002", unit:"BAWASLU", kppn:"054 MAKASSAR I", statusSimas:"Antrean Diklat", tglVerif:"20/02/2026", punyaPBJ:false, punyaPNT:false, lulusDiklat:true },
  { id:14, nama:"ARIF FIRMANSYAH", nip:"198401232009121004", unit:"BBTN", kppn:"117 PUTUSSIBAU", statusSimas:"Antrean Diklat", tglVerif:"28/01/2026", punyaPBJ:false, punyaPNT:false, lulusDiklat:true },
  { id:15, nama:"BAYU NUGROHO", nip:"198203042009101001", unit:"KPU JAKUT", kppn:"133 JAKARTA IV", statusSimas:"Antrean Diklat", tglVerif:"19/12/2025", punyaPBJ:false, punyaPNT:true, lulusDiklat:true },
  { id:16, nama:"BONAR SATRIA", nip:"198210182009121002", unit:"KEJAKSAAN", kppn:"127 TANGERANG", statusSimas:"Antrean Diklat", tglVerif:"05/03/2026", punyaPBJ:false, punyaPNT:false, lulusDiklat:false },
];

function App() {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState('');
  const [kppnFilter, setKppnFilter] = useState('all');
  const [plotList, setPlotList] = useState([]);

  // Ambil daftar unik KPPN untuk filter
  const uniqueKppn = useMemo(() => {
    return ['all', ...new Set(data.map(item => item.kppn))];
  }, [data]);

  // Filter data berdasarkan pencarian dan KPPN
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchSearch = search === '' || item.nama.toLowerCase().includes(search.toLowerCase()) || item.nip.includes(search);
      const matchKppn = kppnFilter === 'all' || item.kppn === kppnFilter;
      return matchSearch && matchKppn;
    });
  }, [data, search, kppnFilter]);

  // Fungsi untuk menambahkan ke daftar plot (hanya yang status antrean & belum punya PNT)
  const addToPlot = (person) => {
    // Validasi: hanya status Antrean Diklat dan belum punya PNT yang bisa di-plot
    if (person.statusSimas !== "Antrean Diklat") {
      alert(`❌ ${person.nama} tidak berstatus "Antrean Diklat", tidak bisa diplot.`);
      return;
    }
    if (person.punyaPNT) {
      alert(`⚠️ ${person.nama} sudah memiliki Sertifikat PNT, tidak perlu diikutkan diklat.`);
      return;
    }
    if (person.punyaPBJ) {
      alert(`💡 ${person.nama} sudah memiliki Sertifikat PBJ. Disarankan untuk mengikuti konversi ke PNT, bukan diklat ulang.`);
      return;
    }
    const exists = plotList.some(p => p.id === person.id);
    if (!exists) {
      setPlotList([...plotList, person]);
    } else {
      alert(`${person.nama} sudah ada di daftar plot.`);
    }
  };

  const removeFromPlot = (id) => {
    setPlotList(plotList.filter(p => p.id !== id));
  };

  const generatePlots = () => {
    // Filter otomatis untuk plotting: status Antrean Diklat, belum punya PNT, dan belum punya PBJ
    const eligible = data.filter(p => 
      p.statusSimas === "Antrean Diklat" && !p.punyaPNT && !p.punyaPBJ
    );
    if (eligible.length === 0) {
      alert("Tidak ada peserta dengan status 'Antrean Diklat' yang eligible untuk diplot.");
      return;
    }
    setPlotList(eligible);
  };

  const resetFilter = () => {
    setSearch('');
    setKppnFilter('all');
  };

  // Helper untuk badge status
  const renderStatusBadges = (person) => {
    return (
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
        <span className={`badge badge-${person.statusSimas === 'Antrean Diklat' ? 'antrean' : 'lulus'}`}>
          {person.statusSimas}
        </span>
        {person.lulusDiklat && <span className="badge badge-lulus">✅ Lulus Diklat</span>}
        {person.punyaPNT && <span className="badge badge-pnt">📜 Sudah PNT</span>}
        {person.punyaPBJ && <span className="badge badge-pbj">📋 Punya PBJ</span>}
      </div>
    );
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="card">
        <h1 style={{ marginBottom: 8 }}>📋 SIMASPATEN - Plotting Diklat PNT</h1>
        <p style={{ color: '#334155' }}>
          Memfilter peserta dengan status <strong>Antrean Diklat</strong> untuk diplot ke diklat berikutnya.
          Peserta yang sudah punya <strong>PNT</strong> diabaikan, yang sudah punya <strong>PBJ</strong> disarankan konversi.
        </p>
      </div>

      {/* Filter dan Tombol */}
      <div className="card">
        <div className="filter-group">
          <div className="filter-item">
            <label>🔍 Cari Nama / NIP</label>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Ketik nama atau NIP..." />
          </div>
          <div className="filter-item">
            <label>🏢 Filter KPPN</label>
            <select value={kppnFilter} onChange={(e) => setKppnFilter(e.target.value)}>
              {uniqueKppn.map(kppn => (
                <option key={kppn} value={kppn}>{kppn === 'all' ? 'Semua KPPN' : kppn}</option>
              ))}
            </select>
          </div>
          <div className="filter-item">
            <button className="btn-reset" onClick={resetFilter}>Reset Filter</button>
          </div>
          <div className="filter-item">
            <button className="btn-primary" onClick={generatePlots}>✨ Generate Plotting Otomatis</button>
          </div>
        </div>
      </div>

      {/* Tabel Data Peserta */}
      <div className="card">
        <h3 style={{ marginBottom: 16 }}>📌 Daftar Peserta (dari SIMASPATEN)</h3>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Nama</th><th>NIP</th><th>Unit</th><th>KPPN</th><th>Status</th><th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map(person => (
                <tr key={person.id}>
                  <td><strong>{person.nama}</strong></td>
                  <td>{person.nip}</td>
                  <td>{person.unit}</td>
                  <td>{person.kppn}</td>
                  <td>{renderStatusBadges(person)}</td>
                  <td>
                    <button className="btn-plot" onClick={() => addToPlot(person)}>📌 Plot</button>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr><td colSpan="6" style={{ textAlign: 'center', padding: 32 }}>Tidak ada data sesuai filter</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Hasil Plotting */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <h3>🎯 Daftar Plot untuk Diklat Berikutnya</h3>
          {plotList.length > 0 && (
            <button onClick={() => setPlotList([])} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '6px 18px', borderRadius: 40, cursor: 'pointer' }}>
              Kosongkan Daftar
            </button>
          )}
        </div>
        <div className="plot-grid">
          {plotList.length === 0 ? (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: 32, background: '#F9FAFB', borderRadius: 32 }}>
              ✨ Belum ada peserta yang diplot. Gunakan tombol <strong>"Generate Plotting Otomatis"</strong> atau tombol <strong>"Plot"</strong> pada tabel.
            </div>
          ) : (
            plotList.map(p => (
              <div key={p.id} className="plot-card">
                <h4>📌 {p.nama}</h4>
                <p><strong>NIP:</strong> {p.nip}</p>
                <p><strong>KPPN:</strong> {p.kppn} | {p.unit}</p>
                <p><span className="badge badge-antrean">Antrean Diklat</span></p>
                {p.lulusDiklat && <p><small>✅ Status kelulusan: Lulus diklat (siap plotting)</small></p>}
                <button onClick={() => removeFromPlot(p.id)} style={{ marginTop: 10, background: '#dc2626', border: 'none', padding: '4px 12px', borderRadius: 24, color: 'white', cursor: 'pointer', fontSize: '0.7rem' }}>
                  Hapus dari plot
                </button>
              </div>
            ))
          )}
        </div>
        <div className="note">
          💡 <strong>Catatan Penting:</strong>
          <ul style={{ marginTop: 8, marginLeft: 20 }}>
            <li>✅ Hanya peserta dengan status <strong>"Antrean Diklat"</strong> yang dapat diplot.</li>
            <li>📜 Peserta yang sudah memiliki <strong>Sertifikat PNT</strong> diabaikan (tidak perlu diklat).</li>
            <li>📋 Peserta yang sudah memiliki <strong>Sertifikat PBJ</strong> <strong>tidak diplot</strong> ke diklat biasa, melainkan <strong>disarankan mengikuti konversi ke PNT</strong>.</li>
            <li>Data kelulusan diklat diambil dari informasi panitia (simulasi pada kolom "lulusDiklat").</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
