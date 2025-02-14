import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Star, UserCircle, Moon, Sun } from 'lucide-react';
import ReactDOM from 'react-dom';

const StaffDirectory = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    document.documentElement.classList.toggle('dark', savedDarkMode);

    // Load favorites
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(savedFavorites);

    // Load or fetch users
    const loadUsers = async () => {
      const savedUsers = localStorage.getItem('users');
      if (savedUsers) {
        setUsers(JSON.parse(savedUsers));
        setLoading(false);
      } else {
        await fetchUsers();
      }
    };
    loadUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://randomuser.me/api/?results=20');
      const data = await response.json();
      setUsers(data.results);
      localStorage.setItem('users', JSON.stringify(data.results));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  const toggleFavorite = (userId) => {
    const newFavorites = favorites.includes(userId)
      ? favorites.filter(id => id !== userId)
      : [...favorites, userId];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  const filteredUsers = users.filter(user =>
    `${user.name.first} ${user.name.last}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`min-h-screen p-4 ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100'}`}>
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Staff Directory</h1>
          <Button
            onClick={toggleDarkMode}
            variant="outline"
            className="p-2"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>

        <Input
          type="search"
          placeholder="Search staff..."
          className="mb-6"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {loading ? (
          <div className="text-center p-4">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredUsers.map((user) => (
              <Card key={user.login.uuid} className={`overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <CardHeader className="p-0">
                  <img
                    src={user.picture.large}
                    alt={`${user.name.first} ${user.name.last}`}
                    className="w-full h-48 object-cover"
                  />
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold">
                        {user.name.first} {user.name.last}
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {user.email}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {user.location.city}, {user.location.country}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      className="p-1"
                      onClick={() => toggleFavorite(user.login.uuid)}
                    >
                      <Star
                        className={`h-5 w-5 ${
                          favorites.includes(user.login.uuid)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-400'
                        }`}
                      />
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    className="mt-4 w-full"
                    onClick={() => window.location.href = `profile.html?userID=${user.login.uuid}`}
                  >
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Mount the StaffDirectory component if running as entry point
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.render(<StaffDirectory />, rootElement);
}

export default StaffDirectory;