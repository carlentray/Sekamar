import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Upload, MapPin, DollarSign, MessageCircle, Type, Save } from 'lucide-react';

export default function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState<File | null>(null);
  
  const [phoneNumber, setPhoneNumber] = useState('');
  
  const [habits, setHabits] = useState({
    smoking: false,
    sleepSchedule: 'Normal',
    cleanliness: 'Standard'
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/posts/${id}`)
      .then(res => {
        const data = res.data;
        setTitle(data.title);
        setDescription(data.description);
        setBudget(data.budget);
        setLocation(data.location);
        setHabits(data.habits);
        
        let rawNumber = data.contactLink || '';
        rawNumber = rawNumber.replace('https://wa.me/62', '').replace('https://wa.me/', '');
        setPhoneNumber(rawNumber);

        setLoading(false);
      })
      .catch(err => {
        alert('Gagal mengambil data lama');
        navigate('/');
      });
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('budget', budget);
    formData.append('location', location);
    
    let formattedNumber = phoneNumber.replace(/\D/g, ''); 
    if (formattedNumber.startsWith('0')) formattedNumber = formattedNumber.slice(1);
    const finalLink = `https://wa.me/62${formattedNumber}`;
    formData.append('contactLink', finalLink);

    formData.append('habits', JSON.stringify(habits));
    
    if (image) {
      formData.append('image', image);
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/posts/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Berhasil diedit!');
      navigate(`/post/${id}`);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Gagal update');
    }
  };

  if (loading) return <div className="text-center mt-20">Loading data...</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-100 mb-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Save className="text-orange-500" /> Edit Iklan
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="font-medium text-gray-700">Judul</label>
          <div className="flex items-center border rounded-lg px-3 py-2 mt-1 focus-within:ring-2 ring-orange-400">
            <Type size={18} className="text-gray-400 mr-2" />
            <input type="text" className="w-full outline-none" value={title} onChange={e => setTitle(e.target.value)} required />
          </div>
        </div>

        <div>
          <label className="font-medium text-gray-700">Ganti Foto (Kosongkan jika tidak ingin ganti)</label>
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} className="block w-full mt-1 text-sm text-gray-500"/>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-medium text-gray-700">Budget (Rp)</label>
            <div className="flex items-center border rounded-lg px-3 py-2 mt-1 focus-within:ring-2 ring-orange-400">
                <span className="text-gray-500 font-bold mr-2 text-sm">Rp</span>
                <input type="number" className="w-full outline-none" value={budget} onChange={e => setBudget(e.target.value)} required />
            </div>
          </div>
          <div>
            <label className="font-medium text-gray-700">Lokasi</label>
            <input type="text" className="w-full border rounded-lg px-3 py-2 mt-1" value={location} onChange={e => setLocation(e.target.value)} required />
          </div>
        </div>

        <div>
          <label className="font-medium text-gray-700">Deskripsi</label>
          <textarea className="w-full border rounded-lg px-3 py-2 mt-1 h-24" value={description} onChange={e => setDescription(e.target.value)} required></textarea>
        </div>

        <div>
          <label className="font-medium text-gray-700">Nomor WhatsApp</label>
          <div className="flex items-center border rounded-lg px-3 py-2 mt-1 focus-within:ring-2 ring-orange-400">
            <div className="bg-orange-100 text-orange-700 p-1 rounded mr-2 text-xs font-bold">
                +62
            </div>
            <input 
                type="number" 
                className="w-full outline-none" 
                placeholder="81234567890" 
                value={phoneNumber} 
                onChange={e => setPhoneNumber(e.target.value)} 
                required 
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">Masukkan nomor saja (Contoh: 8123...)</p>
        </div>

        <button type="submit" className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition font-bold shadow-lg">
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}