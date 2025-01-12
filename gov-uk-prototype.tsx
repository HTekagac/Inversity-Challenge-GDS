import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

const topics = [
  { 
    title: 'Benefits',
    description: 'Financial support like Universal Credit, Housing Benefit, and Jobseeker\'s Allowance for those in need.',
    similar: ['Pensions', 'Disability Support'],
    video: 'https://www.youtube.com/embed/sample1'
  },
  {
    title: 'Healthcare',
    description: 'NHS services, medical advice, and healthcare programs.',
    similar: ['Mental Health', 'Medical Research'],
    video: 'https://www.youtube.com/embed/sample10'
  },
  {
    title: 'Education',
    description: 'Resources on schools, higher education, student loans, and financial support for learning.',
    similar: ['Apprenticeships', 'Student Finance'],
    video: 'https://www.youtube.com/embed/sample8'
  },
  {
    title: 'Housing',
    description: 'Information about council housing, private renting, tenant rights, and housing benefits.',
    similar: ['Property Ownership', 'Council Tax'],
    video: 'https://www.youtube.com/embed/sample2'
  },
  {
    title: 'Employment',
    description: 'Find jobs, employment rights, workplace pensions, and career development opportunities.',
    similar: ['Work Training', 'Employee Rights'],
    video: 'https://www.youtube.com/embed/sample3'
  },
  {
    title: 'Transport',
    description: 'Driving licenses, vehicle tax, MOT testing, and public transportation information.',
    similar: ['Road Safety', 'Public Transit'],
    video: 'https://www.youtube.com/embed/sample4'
  },
  {
    title: 'Environment',
    description: 'Environmental protection, waste management, and climate change initiatives.',
    similar: ['Recycling', 'Green Energy'],
    video: 'https://www.youtube.com/embed/sample5'
  },
  {
    title: 'Business',
    description: 'Starting a business, taxes, licenses, and funding opportunities for entrepreneurs.',
    similar: ['Self-Employment', 'Company Registration'],
    video: 'https://www.youtube.com/embed/sample6'
  },
  {
    title: 'Family',
    description: 'Childcare, marriage, divorce, and support services for families.',
    similar: ['Parenting', 'Child Support'],
    video: 'https://www.youtube.com/embed/sample7'
  },
  {
    title: 'Immigration',
    description: 'Visas, citizenship, asylum, and immigration services.',
    similar: ['Work Permits', 'Settlement'],
    video: 'https://www.youtube.com/embed/sample9'
  },
  {
    title: 'Justice',
    description: 'Legal aid, courts, prisons, and criminal justice system information.',
    similar: ['Legal Rights', 'Court Services'],
    video: 'https://www.youtube.com/embed/sample11'
  },
  {
    title: 'Local Services',
    description: 'Council services, community support, and local government information.',
    similar: ['Libraries', 'Waste Collection'],
    video: 'https://www.youtube.com/embed/sample12'
  }
];

const GovUKPrototype = () => {
  const [page, setPage] = useState('login');
  const [userCredentials, setUserCredentials] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleLogin = () => {
    if (userCredentials[formData.email] === formData.password) {
      setIsAuthenticated(true);
      setPage('topics');
      setError('');
    } else {
      setError('Invalid credentials.');
    }
  };

  const handleRegister = () => {
    if (formData.email && formData.password) {
      setUserCredentials({
        ...userCredentials,
        [formData.email]: formData.password
      });
      setIsAuthenticated(true);
      setPage('topics');
      setError('');
    } else {
      setError('Please fill in all fields.');
    }
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setPage('login');
    setFormData({ email: '', password: '' });
  };

  const filteredTopics = topics.filter(topic =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderNavBar = () => (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <button 
        onClick={() => page === 'topicDetail' ? setPage('topics') : setPage('login')}
        className="text-lg hover:text-gray-200 flex items-center"
      >
        <ChevronLeft className="mr-1" /> Back
      </button>
      <span className="text-xl font-bold">GOV.UK</span>
    </nav>
  );

  const renderLoginPage = () => (
    <Card className="max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>Sign in to GOV.UK</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <Button className="w-full" onClick={handleLogin}>
            Sign In
          </Button>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <p className="text-center">
            Don't have an account?{' '}
            <button 
              onClick={() => setPage('register')}
              className="text-blue-600 hover:underline"
            >
              Create one
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );

  const renderRegisterPage = () => (
    <Card className="max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>Create an Account</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <Button className="w-full" onClick={handleRegister}>
            Create Account
          </Button>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const renderTopicsPage = () => (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search topics..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4"
        />
        <Button onClick={handleSignOut} variant="outline" className="w-full">
          Sign Out
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTopics.map((topic, index) => (
          <Card
            key={topic.title}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => {
              setSelectedTopic(topic);
              setPage('topicDetail');
            }}
          >
            <CardContent className="p-4">
              <h3 className="text-lg font-bold text-blue-600 mb-2">{topic.title}</h3>
              <p className="text-gray-600 mb-2">{topic.description}</p>
              <p className="text-sm text-gray-500">
                Similar topics: {topic.similar.join(', ')}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderTopicDetail = () => (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      <Card>
        <CardHeader>
          <CardTitle>{selectedTopic.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{selectedTopic.description}</p>
          <div className="relative pb-[56.25%] h-0">
            <iframe
              src={selectedTopic.video}
              className="absolute top-0 left-0 w-full h-full"
              frameBorder="0"
              allowFullScreen
            />
          </div>
          <Button 
            onClick={() => setPage('topics')} 
            className="mt-4"
          >
            Back to Topics
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {renderNavBar()}
      {page === 'login' && renderLoginPage()}
      {page === 'register' && renderRegisterPage()}
      {page === 'topics' && renderTopicsPage()}
      {page === 'topicDetail' && renderTopicDetail()}
    </div>
  );
};

export default GovUKPrototype;
