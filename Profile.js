import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Calendar, Star } from 'lucide-react';
import ReactDOM from 'react-dom';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadProfile = async () => {
      // Get userID from URL
      const params = new URLSearchParams(window.location.search);
      const userID = params.get('userID');
      
      // Load users from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = users.find(u => u.login.uuid === userID);
      
      if (foundUser) {
        setUser(foundUser);
        // Fetch Lorem Ipsum bio
        try {
          const response = await fetch('https://loripsum.net/api/2/short/plaintext');
          const text = await response.text();
          setBio(text);
        } catch (error) {
          console.error('Error fetching bio:', error);
          setBio('Bio unavailable');
        }
      }
      
      // Load favorites
      const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setFavorites(savedFavorites);
      setLoading(false);
    };

    loadProfile();
  }, []);

  const toggleFavorite = (userId) => {
    const newFavorites = favorites.includes(userId)
      ? favorites.filter(id => id !== userId)
      : [...favorites, userId];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (!user) {
    return <div className="text-center p-4">User not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <img
                  src={user.picture.large}
                  alt={`${user.name.first} ${user.name.last}`}
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
              
              <div className="md:w-2/3">
                <div className="flex justify-between items-start">
                  <h1 className="text-3xl font-bold mb-2">
                    {user.name.first} {user.name.last}
                  </h1>
                  <Button
                    variant="ghost"
                    className="p-1"
                    onClick={() => toggleFavorite(user.login.uuid)}
                  >
                    <Star
                      className={`h-6 w-6 ${
                        favorites.includes(user.login.uuid)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-400'
                      }`}
                    />
                  </Button>
                </div>

                <div className="space-y-3">
                  <p className="flex items-center gap-2 text-gray-600">
                    <Mail className="h-5 w-5" />
                    {user.email}
                  </p>
                  <p className="flex items-center gap-2 text-gray-600">
                    <Phone className="h-5 w-5" />
                    {user.phone}
                  </p>
                  <p className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-5 w-5" />
                    {user.location.street.number} {user.location.street.name},
                    {user.location.city}, {user.location.country}
                  </p>
                  <p className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-5 w-5" />
                    Joined {new Date(user.registered.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">About</h2>
            <p className="text-gray-600 leading-relaxed">{bio}</p>
          </CardContent>
        </Card>

        <div className="mt-6">
          <Button
            onClick={() => window.location.href = 'index.html'}
            variant="outline"
          >
            Back to Directory
          </Button>
        </div>
      </div>
    </div>
  );
};

// Mount the UserProfile component if running as entry point
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.render(<UserProfile />, rootElement);
}

export default UserProfile;