import React from 'react';
import { Link } from 'gatsby';

import { navigation } from '../data';

export default function Sidebar() {
  return (
    <aside className="hidden lg:block">
      <nav className="sticky rounded-lg top-28">
        {navigation.map((navItem) => (
          <Link
            key={navItem.id}
            to={navItem.slug}
            activeClassName="text-gray-900 bg-gray-100 hover:bg-gray-100 focus:bg-gray-200"
            className="flex items-center px-2 py-2 mt-1 text-sm font-medium leading-5 text-gray-600 transition duration-150 ease-in-out rounded-lg group first:mt-0 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-100"
          >
            <navItem.icon className="w-6 h-6 mr-3 text-gray-500 transition duration-150 ease-in-out group-hover:text-gray-500 group-focus:text-gray-600" />
            {navItem.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
