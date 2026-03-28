/**
 * FoodBridge Navbar Organism
 * Handles global navigation, search, and authentication states.
 * @param {Object} user - Optional user object to determine Auth state
 * @param {Function} onLogin - Callback for login action
 * @param {Function} onLogout - Callback for logout action
 */
import { useState } from "react";
import { 
  Button, 
  Input, 
  Icon
} from "@components/export/index"; 

interface User {
  name: string;
  avatar?: string;
  role: string;
}

interface NavbarProps {
  user?: User;
  onLogin?: () => void;
  onLogout?: () => void;
  onSearch?: (query: string) => void;
}

const Navbar = ({ user, onLogin, onLogout, onSearch }: NavbarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-8">
        

        <div className="flex items-center gap-2 cursor-pointer shrink-0">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white">
            <Icon name="leafCustom" size={18} />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900 hidden sm:block">
            FoodBridge
          </span>
        </div>
        <div className="flex-1 max-w-2xl hidden md:block">
          <Input
            type="search"
            placeholder="Search for restaurants, food or locations..."
            value={searchQuery}
            onChange={handleSearchChange}
            inputSize="md"
            className="bg-gray-50 border-transparent focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-4 shrink-0">
          {!user ? (
      
            <div className="flex items-center gap-2">
              <Button buttonType="secondary" className="hidden sm:flex">
                Partner with us
              </Button>
              <Button buttonType="primary" onClick={onLogin}>
                Login
              </Button>
            </div>
          ) : (
            
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                <Icon name="edit" size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              </button>

              <div className="h-8 w-px bg-gray-200 mx-1" />

              
              <div className="flex items-center gap-3 cursor-pointer group">
                <div className="text-right hidden lg:block">
                  <p className="text-sm font-bold text-gray-900 leading-none">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">
                    {user.role}
                  </p>
                </div>
                
                <div 
                  className="w-10 h-10 rounded-full bg-green-100 border-2 border-green-200 flex items-center justify-center overflow-hidden"
                  onClick={onLogout} 
                  title="Logout"
                >
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-green-700 font-bold">{user.name[0]}</span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      

      <div className="md:hidden px-4 pb-3">
        <Input
          type="search"
          placeholder="Search..."
          inputSize="sm"
          className="bg-gray-50"
        />
      </div>
    </nav>
  );
};

export default Navbar;