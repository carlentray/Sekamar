import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { MapPin, DollarSign, MessageCircle, ArrowLeft, User, Calendar } from 'lucide-react';

export default function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/posts/${id}`)
      .then(res => {
        setPost(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center mt-20">Memuat detail...</div>;
  if (!post) return <div className="text-center mt-20">Iklan tidak ditemukan :(</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 my-8">
      
      <div className="p-4 border-b">
        <Link to="/" className="flex items-center text-gray-500 hover:text-primary w-fit">
          <ArrowLeft size={18} className="mr-2" /> Back to Home
        </Link>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 bg-gray-200 h-[400px] md:h-auto relative">
          <img 
            src={`http://localhost:5000${post.image}`} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="md:w-1/2 p-8 flex flex-col">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-md text-xs font-bold">
              {post.genderTarget === 'Male' ? 'Khusus Putra' : (post.genderTarget === 'Female' ? 'Khusus Putri' : 'Campur/Bebas')}
            </span>
            <span className="flex items-center gap-1">
               <Calendar size={14}/> {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
          
          <div className="text-2xl font-bold text-primary mb-6 flex items-center">
            <DollarSign size={24} /> {post.budget.toLocaleString('id-ID')} <span className="text-sm text-gray-400 font-normal ml-1">/bulan</span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-400">Lokasi</p>
              <p className="font-medium flex items-center gap-1 text-gray-700">
                <MapPin size={16}/> {post.location}
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-400">Diposting Oleh</p>
              <p className="font-medium flex items-center gap-1 text-gray-700">
                <User size={16}/> {post.user?.username || 'User'}
              </p>
            </div>
          </div>

          <div className="mb-8">
             <h3 className="font-bold text-gray-700 mb-2">Deskripsi & Kriteria:</h3>
             <p className="text-gray-600 leading-relaxed whitespace-pre-line">
               {post.description}
             </p>
          </div>

          <a 
            href={post.contactLink} 
            target="_blank" 
            className="mt-auto w-full bg-green-500 text-white py-3 rounded-xl hover:bg-green-600 transition flex justify-center items-center gap-2 font-bold shadow-lg shadow-green-200"
          >
            <MessageCircle size={20} /> Hubungi via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}