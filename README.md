# Inversity-Challenge-GDS
desh is fit
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ChevronRight, ExternalLink, Lock } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Logo component
const GovUKLogo = () => (
  <div className="absolute top-4 left-4 flex items-center space-x-2">
    <div className="bg-white p-2 rounded">
      <svg
        width="36"
        height="32"
        viewBox="0 0 36 32"
        xmlns="http://www.w3.org/2000/svg"
        className="text-black"
      >
        <path d="M5.75 3.5H30.25V7H5.75V3.5Z" fill="currentColor" />
        <path d="M18 9.5L30.25 15.5V19L18 13L5.75 19V15.5L18 9.5Z" fill="currentColor" />
        <path d="M5.75 25H30.25V28.5H5.75V25Z" fill="currentColor" />
        <path d="M18 0L23.5 2V3.5H12.5V2L18 0Z" fill="currentColor" />
        <path d="M18 32L12.5 30V28.5H23.5V30L18 32Z" fill="currentColor" />
      </svg>
    </div>
    <div className="text-white font-bold text-xl">GOV.UK</div>
  </div>
);

const GovUKPortal = () => {
  // State declarations
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState({});
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState(null);

  // Constants
  const PASSWORD_MIN_LENGTH = 6;
  const PASSWORD_MAX_LENGTH = 20;

  // Password hashing function
  const hashPassword = async (password) => {
    const msgBuffer = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  // Password validation
  const validatePassword = (password) => {
    if (password.length < PASSWORD_MIN_LENGTH) {
      return `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`;
    }
    if (password.length > PASSWORD_MAX_LENGTH) {
      return `Password cannot be longer than ${PASSWORD_MAX_LENGTH} characters`;
    }
    return '';
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    if (newPassword.length <= PASSWORD_MAX_LENGTH) {
      setPassword(newPassword);
      setError('');
    }
  };

  // Sign up handler
  const handleSignUp = async () => {
    if (!username || !password) {
      setError('Username and password are required');
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (users[username]) {
      setError('Username already exists');
      return;
    }

    const hashedPassword = await hashPassword(password);
    setUsers({ ...users, [username]: hashedPassword });
    setError('Sign up successful! Please log in.');
    setUsername('');
    setPassword('');
  };

  // Login handler
  const handleLogin = async () => {
    if (!username || !password) {
      setError('Username and password are required');
      return;
    }

    if (!users[username]) {
      setError('Username does not exist');
      return;
    }

    const hashedPassword = await hashPassword(password);
    if (users[username] === hashedPassword) {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  // Topics data
  const topics = [
    {
      id: 1,
      title: "Registering to vote",
      description: "Information on how to register to vote in the UK.",
      url: "https://www.gov.uk/register-to-vote",
      relatedTopics: [
        {
          title: "Voting in the UK",
          description: "Details on the voting process.",
          url: "https://www.gov.uk/voting-in-the-uk"
        }
      ]
    },
    // Add more topics as needed
  ];

  const filteredTopics = topics.filter(topic =>
    topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-6 relative">
        <GovUKLogo />
        <div className="w-full max-w-md">
          <Card className="backdrop-blur-sm bg-white/90 shadow-xl">
            <CardHeader className="space-y-1">
              <div className="flex justify-center mb-4">
                <Lock className="h-12 w-12 text-blue-500" />
              </div>
              <CardTitle className="text-2xl text-center">Welcome to GOV.UK</CardTitle>
              <p className="text-center text-sm text-gray-600">Sign in or create an account</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Input
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="border-gray-300"
                    maxLength={PASSWORD_MAX_LENGTH}
                  />
                  <p className="text-xs text-gray-500">
                    Password must be between {PASSWORD_MIN_LENGTH}-{PASSWORD_MAX_LENGTH} characters
                  </p>
                </div>
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <div className="flex space-x-4">
                  <Button onClick={handleSignUp} className="flex-1 bg-blue-500 hover:bg-blue-600">
                    Sign Up
                  </Button>
                  <Button onClick={handleLogin} className="flex-1 bg-purple-500 hover:bg-purple-600">
                    Log In
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 p-4">
        <GovUKLogo />
      </div>
      <div className="max-w-4xl mx-auto p-6 pt-20">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Information Portal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                className="pl-10"
                placeholder="Search topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {filteredTopics.map((topic) => (
            <Card key={topic.id} className="cursor-pointer hover:bg-gray-50" onClick={() => setSelectedTopic(topic)}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{topic.title}</h3>
                    <p className="text-gray-600">{topic.description}</p>
                    <a href={topic.url} className="text-blue-600 hover:underline flex items-center gap-1" target="_blank" rel="noopener noreferrer">
                      Learn more <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                  <ChevronRight className="h-6 w-6 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GovUKPortal;
