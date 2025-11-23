import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Upload, MapPin, DollarSign, Type } from 'lucide-react';

export default function CreatePostPage() {
  const navigate = useNavigate();
  
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      alert('Wajib upload foto kamar!');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('budget', budget);
    formData.append('location', location);
    
    let formattedNumber = phoneNumber.replace(/\D/g, ''); 
    if (formattedNumber.startsWith('0')) {
      formattedNumber = formattedNumber.slice(1); 
    }
    const finalLink = `https://wa.me/62${formattedNumber}`;
    formData.append('contactLink', finalLink);

    formData.append('image', image);
    formData.append('habits', JSON.stringify(habits));

    try {
      const token = localStorage.getItem('token');
      
      await axios.post('http://localhost:5000/api/posts', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      alert('Post Succeed! 🎉');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Post Failed! Login dulu sob.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Upload className="text-primary" /> Pasang Iklan Baru
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div>
          <label className="font-medium text-gray-700">Judul Iklan</label>
          <div className="flex items-center border rounded-lg px-3 py-2 mt-1 focus-within:ring-2 ring-primary">
            <Type size={18} className="text-gray-400 mr-2" />
            <input type="text" className="w-full outline-none" placeholder="Cari teman kosan santuy..." value={title} onChange={e => setTitle(e.target.value)} required />
          </div>
        </div>

        <div>
          <label className="font-medium text-gray-700">Foto Kamar/Kos</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="block w-full mt-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-primary hover:file:bg-indigo-100"/>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-medium text-gray-700">Budget (Rp)</label>
            <div className="flex items-center border rounded-lg px-3 py-2 mt-1 focus-within:ring-2 ring-primary">
              <span className="text-gray-500 font-bold mr-2 text-sm">Rp</span>
              <input type="number" className="w-full outline-none" placeholder="500000" value={budget} onChange={e => setBudget(e.target.value)} required />
            </div>
          </div>

          <div>
            <label className="font-medium text-gray-700">Lokasi</label>
            <div className="flex items-center border rounded-lg px-3 py-2 mt-1 focus-within:ring-2 ring-primary">
              <MapPin size={18} className="text-gray-400 mr-2" />
              <input type="text" className="w-full outline-none" placeholder="Dekat Kampus A..." value={location} onChange={e => setLocation(e.target.value)} required />
            </div>
          </div>
        </div>

        <div>
          <label className="font-medium text-gray-700">Deskripsi Lengkap</label>
          <textarea className="w-full border rounded-lg px-3 py-2 mt-1 outline-none focus:ring-2 ring-primary h-24" placeholder="Jelaskan fasilitas dan kriteria teman..." value={description} onChange={e => setDescription(e.target.value)} required></textarea>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-gray-700 mb-3">Preferensi Teman (Habits)</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="flex flex-col text-sm text-gray-600">
              Status Merokok
              <select 
                className="mt-1 border rounded p-1"
                value={habits.smoking ? 'yes' : 'no'}
                onChange={(e) => setHabits({...habits, smoking: e.target.value === 'yes'})}
              >
                <option value="no">🚭 Tidak Merokok</option>
                <option value="yes">🚬 Perokok</option>
              </select>
            </label>

            <label className="flex flex-col text-sm text-gray-600">
              Jam Tidur
              <select 
                className="mt-1 border rounded p-1"
                value={habits.sleepSchedule}
                onChange={(e) => setHabits({...habits, sleepSchedule: e.target.value})}
              >
                <option value="Normal">⏰ Normal</option>
                <option value="EarlyBird">🌅 Bangun Pagi</option>
                <option value="NightOwl">🦉 Begadang</option>
              </select>
            </label>

             <label className="flex flex-col text-sm text-gray-600">
              Kebersihan
              <select 
                className="mt-1 border rounded p-1"
                value={habits.cleanliness}
                onChange={(e) => setHabits({...habits, cleanliness: e.target.value})}
              >
                <option value="Standard">🧹 Standar</option>
                <option value="Messy">🗑️ Agak Berantakan</option>
                <option value="CleanFreak">✨ Sangat Resik</option>
              </select>
            </label>
          </div>
        </div>

        <div>
          <label className="font-medium text-gray-700">Nomor WhatsApp</label>
          <div className="flex items-center border rounded-lg px-3 py-2 mt-1 focus-within:ring-2 ring-primary">
            <div className="bg-green-100 text-green-700 p-1 rounded mr-2 text-xs font-bold">
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

        <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg hover:bg-indigo-700 transition font-bold shadow-lg">
          🚀 Tayangkan Iklan
        </button>

      </form>
    </div>
  );
}