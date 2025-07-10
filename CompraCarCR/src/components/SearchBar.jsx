import React from "react";

const SearchBar = () => {
    return (
        <div className="max-w-md mx-auto">
            <label for="default-search" className="mb-2 text-sm font-medium text-white-900 sr-only white:text-white">Buscar</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-purple-500 white:text-white-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input type="search" id="default-search" 
                className="block w-full p-4 ps-10 text-sm text-purple-900 border border-purple-300 rounded-lg bg-purple-50 focus:ring-purple-500 focus:border-purple-500 bg-white-700 white:border-white-600 white:placeholder-white-400 white:text-white white:focus:ring-purple-500 white:focus:border-purple-500" placeholder="Busca tu auto favorito" required />
                <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2 white:bg-purple-600 white:hover:bg-purple-700 white:focus:ring-purple-800">Buscar</button>
            </div>
        </div>
    );
};

export default SearchBar;