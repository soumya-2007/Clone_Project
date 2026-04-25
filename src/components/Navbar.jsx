import { Menu, Search, Mic, Bell, User, LogOut, Moon, Sun } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

const dummyNotifications = [
  { id: 1, text: "Fireship uploaded: 100 Seconds of Code", time: "2 hours ago", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fireship" },
  { id: 2, text: "Marques Brownlee replied to your comment", time: "5 hours ago", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=MKBHD" },
  { id: 3, text: "New login from an unrecognized device", time: "1 day ago", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Security" },
  { id: 4, text: "Your video 'My First Vlog' got 100 views", time: "2 days ago", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=YouTube" },
  { id: 5, text: "Veritasium went live", time: "1 week ago", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Veritasium" },
];

const Navbar = ({ toggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isLightMode, setIsLightMode] = useState(() => localStorage.getItem('theme') === 'light');
  const { currentUser, logout } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    }
  }, [isLightMode]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="flex items-center justify-between px-4 h-14 bg-yt-black border-b border-yt-gray sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="p-2 hover:bg-yt-gray rounded-full transition-colors">
          <Menu size={24} />
        </button>
        <Link to="/" className="flex items-center gap-1 cursor-pointer">
          <div className="w-8 h-6 bg-yt-red rounded-lg flex items-center justify-center">
            <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-white border-b-[4px] border-b-transparent ml-0.5"></div>
          </div>
          <span className="text-xl font-bold tracking-tighter">YouTube</span>
        </Link>
      </div>

      <div className="flex items-center flex-1 max-w-[720px] ml-10">
        <form onSubmit={handleSearch} className="flex flex-1 items-center h-10 ml-0 sm:ml-8">
          <div className="flex flex-1 items-center bg-[#121212] border border-yt-gray rounded-l-full px-4 h-full overflow-hidden focus-within:border-blue-500">
            <Search size={18} className="text-yt-lightgray mr-2 hidden sm:block flex-shrink-0" />
            <input 
              type="text" 
              placeholder="Search"
              className="w-full h-full bg-transparent outline-none text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button type="submit" className="bg-yt-gray border border-l-0 border-yt-gray rounded-r-full px-5 h-full hover:bg-[#3f3f3f] transition-colors flex items-center justify-center flex-shrink-0">
            <Search size={20} />
          </button>
        </form>
        <button className="p-2.5 bg-[#181818] hover:bg-yt-gray rounded-full ml-4 transition-colors flex-shrink-0">
          <Mic size={20} />
        </button>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 hover:bg-yt-gray rounded-full hidden sm:block transition-colors relative"
          >
            <Bell size={24} />
            <span className="absolute top-1.5 right-1.5 bg-yt-red text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">9+</span>
          </button>
          
          {showNotifications && (
            <div className="absolute top-full right-0 mt-2 w-80 max-h-[400px] bg-[#212121] border border-yt-gray rounded-xl shadow-xl overflow-y-auto hide-scrollbar z-50">
              <div className="flex items-center justify-between p-4 border-b border-yt-gray sticky top-0 bg-[#212121] z-10">
                <h3 className="text-white font-medium">Notifications</h3>
              </div>
              <div className="flex flex-col">
                {dummyNotifications.map((notif) => (
                  <div key={notif.id} className="flex items-start gap-4 p-4 hover:bg-[#3f3f3f] cursor-pointer transition-colors">
                    <img src={notif.avatar} alt="avatar" className="w-12 h-12 rounded-full object-cover bg-yt-black" />
                    <div className="flex flex-col flex-1">
                      <p className="text-sm text-white line-clamp-3">{notif.text}</p>
                      <span className="text-xs text-yt-lightgray mt-1">{notif.time}</span>
                    </div>
                    <div className="w-1 h-1 bg-blue-500 rounded-full mt-2"></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {currentUser ? (
          <div className="relative ml-2">
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="p-1 hover:bg-yt-gray rounded-full transition-colors flex items-center justify-center"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
            </button>

            {showProfileMenu && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-[#212121] border border-yt-gray rounded-xl shadow-xl overflow-hidden z-50">
                <div className="p-4 border-b border-yt-gray">
                  <p className="text-white font-medium truncate">{currentUser.name}</p>
                  <p className="text-yt-lightgray text-sm truncate">{currentUser.email}</p>
                </div>
                
                <button 
                  onClick={() => setIsLightMode(!isLightMode)}
                  className="w-full flex items-center gap-4 px-4 py-3 hover:bg-[#3f3f3f] transition-colors text-white text-left border-b border-yt-gray"
                >
                  {isLightMode ? <Moon size={20} /> : <Sun size={20} />}
                  <span>{isLightMode ? 'Dark theme' : 'Light theme'}</span>
                </button>

                <button 
                  onClick={() => {
                    logout();
                    setShowProfileMenu(false);
                    navigate('/login');
                  }}
                  className="w-full flex items-center gap-4 px-4 py-3 hover:bg-[#3f3f3f] transition-colors text-white text-left"
                >
                  <LogOut size={20} />
                  <span>Sign out</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link 
            to="/login"
            className="ml-2 flex items-center gap-2 border border-yt-gray hover:bg-blue-500/10 hover:border-transparent text-blue-400 px-4 py-1.5 rounded-full transition-colors font-medium"
          >
            <User size={20} />
            <span>Sign in</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
