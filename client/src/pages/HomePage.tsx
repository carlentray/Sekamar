import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MapPin, DollarSign, MessageCircle, Cigarette, Moon, Sparkles, User } from 'lucide-react';

interface Post {
  _id: string;
  title: string;
  description: string;
  budget: number;
  location: string;
  image: string;
  habits: {
    smoking: boolean;
    sleepSchedule: string;
    cleanliness: string;
  };
  contactLink: string;
  user: {
    username: string;
  };
}

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/posts');
        setPosts(res.data);
      } catch (error) {
        console.error("Gagal ambil data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );

  return (
    <div>
      <div className="bg-primary text-white p-8 rounded-2xl mb-8 shadow-lg flex flex-col md:flex-row justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Cari Teman Sekamar yang Cocok! 🤝</h1>
          <p className="opacity-90">Jangan asal pilih roomie, cek kebiasaan mereka dulu di sini.</p>
        </div>
        <div className="mt-4 md:mt-0 bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg font-bold border border-white/30">
           {posts.length} Iklan Tersedia
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500 text-lg">Belum ada iklan yang tayang nih...</p>
          <p className="text-sm text-gray-400">Jadilah yang pertama memasang iklan!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
             <Link to={`/post/${post._id}`} key={post._id} className="bg-white rounded-xl ... block hover:scale-[1.02] transition-transform">
              
              <div className="h-48 bg-gray-200 relative overflow-hidden">
                <img 
                  src={`http://localhost:5000${post.image}`} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x300?text=No+Image";
                  }}
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-gray-700 shadow-sm flex items-center gap-1">
                  <User size={12} /> @{post.user?.username || 'User'}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <div className="mb-2">
                  <h2 className="font-bold text-lg text-gray-800 line-clamp-1" title={post.title}>
                    {post.title}
                  </h2>
                  <div className="flex items-center text-gray-500 text-sm mt-1">
                    <MapPin size={14} className="mr-1 text-primary" /> {post.location}
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1 bg-gray-50 p-2 rounded-lg">
                  "{post.description}"
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4 text-[10px] font-semibold uppercase tracking-wide">
                  <span className={`px-2 py-1 rounded border ${post.habits.smoking ? 'bg-red-50 text-red-600 border-red-200' : 'bg-emerald-50 text-emerald-600 border-emerald-200'}`}>
                    {post.habits.smoking ? '🚬 Perokok' : '🚭 Bebas Asap'}
                  </span>

                  <span className="px-2 py-1 rounded border bg-blue-50 text-blue-600 border-blue-200">
                    {post.habits.sleepSchedule === 'NightOwl' ? '🦉 Begadang' : (post.habits.sleepSchedule === 'EarlyBird' ? '🌅 Pagi' : '⏰ Normal')}
                  </span>

                  <span className="px-2 py-1 rounded border bg-purple-50 text-purple-600 border-purple-200">
                     {post.habits.cleanliness === 'CleanFreak' ? '✨ Resik' : (post.habits.cleanliness === 'Messy' ? '🗑️ Santai' : '🧹 Standar')}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                  <div className="text-gray-800 font-bold text-lg flex items-center">
                    <span className="text-xs text-gray-400 mr-1 font-normal">Rp</span>
                    {post.budget.toLocaleString('id-ID')}
                    <span className="text-xs text-gray-400 ml-1 font-normal">/bln</span>
                  </div>
                  
                  <a 
                    href={post.contactLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition shadow-green-200 shadow-md flex items-center justify-center"
                    title="Chat WhatsApp"
                  >
                    <MessageCircle size={20} />
                  </a>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}