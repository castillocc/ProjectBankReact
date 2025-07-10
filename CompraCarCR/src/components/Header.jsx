import React from 'react';

const Header = () => {
  return (
    <header className="bg-purple-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">CompraCar CR</h1>
        <nav className="space-x-4">
        </nav>
      </div>
    </header>
  );
};

export default Header;