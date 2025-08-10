import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import React from "react";


const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <Card className="p-8 text-center max-w-md">
        <h1 className="text-6xl font-mono font-bold text-cyan-400 mb-4">404</h1>
        <h2 className="text-2xl font-mono font-bold text-white mb-4">Page Not Found</h2>
        <p className="text-gray-400 font-mono mb-6">
          The page you're looking for doesn't exist.
        </p>
        <Link to="/">
          <Button>Go Home</Button>
        </Link>
      </Card>
    </div>
  );
};

export default NotFoundPage;
