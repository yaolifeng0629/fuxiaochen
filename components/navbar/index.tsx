'use client';

import { useBoolean } from 'ahooks';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

import { NavItem } from '@/types';
import { cn } from '@/utils';

import Logo from '../logo';

const baseNavItems: NavItem[] = [
  {
    label: '文章',
    link: '/articles',
  },
  {
    label: '标签',
    link: '/tags',
  },
  {
    label: '视频',
    link: '/videos',
  },
  {
    label: '项目',
    link: '/projects',
  },
  {
    label: '日志',
    link: '/logs',
  },
  {
    label: '关于',
    link: '/about',
  },
];

const Navbar = () => {
  const [state, { setTrue, setFalse }] = useBoolean(false);

  return (
    <div className="py-10 flex justify-between items-center">
      <Logo className="w-[64px] h-[64px]" />
      <button>
        <Menu size={40} onClick={setTrue} />
      </button>

      <div
        className={cn(
          'fixed top-0 left-0 z-50 w-full h-full transform opacity-95 bg-gray-200 duration-300 ease-in-out',
          state ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="py-12 pr-4 flex items-center justify-end">
          <button onClick={setFalse}>
            <X size={40} />
          </button>
        </div>
        <ul className="flex flex-col space-y-8 px-12">
          {baseNavItems.map((item) => (
            <li key={item.link}>
              <Link
                href={item.link}
                className="text-2xl font-bold tracking-widest text-gray-900"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
