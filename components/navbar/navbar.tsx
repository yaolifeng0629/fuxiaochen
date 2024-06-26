'use client';

import React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useScroll } from 'ahooks';
import { UserCog } from 'lucide-react';

import {
  DARK_FAVICON_URL,
  LIGHT_LOGO,
  NICKNAME,
  PATHS,
  SOURCE_CODE_GITHUB_PAGE,
  WEBSITE,
} from '@/constants';
import { cn } from '@/lib/utils';

import { navItems } from './config';
import { MobileNav } from './mobile-nav';

import { IconBarandGithub } from '../icons';
import { ModeToggle } from '../mode-toggle';
import { NextLink } from '../next-link';
import { Button } from '../ui/button';

export const Navbar = () => {
  const scroll = useScroll(() => document);
  const pathname = usePathname();

  return (
    <header
      className={cn(
        'w-full sticky top-0 backdrop-blur transition-[background-color,border-width] border-x-0  flex justify-center z-10',
        (scroll?.top ?? 0) > 60 && 'bg-background/50 border-b border-border/50',
      )}
    >
      <div className="w-full flex items-center h-16 p-4 sm:p-8 md:max-w-screen-md 2xl:max-w-screen-xl">
        <NextLink
          href={PATHS.SITE_HOME}
          className={cn('mr-4 hidden sm:flex')}
          aria-label={NICKNAME}
        >
          <img
            src={LIGHT_LOGO}
            className={cn('w-8 h-8 hidden dark:block')}
            alt={WEBSITE}
          />
          <img
            src={DARK_FAVICON_URL}
            className={cn('w-8 h-8 dark:hidden')}
            alt={WEBSITE}
          />
          <span className="ml-2 font-semibold text-primary text-base">
            {WEBSITE}
          </span>
        </NextLink>
        <div className="h-16 flex-1 hidden sm:flex justify-end items-center text-base font-medium mr-8">
          {navItems.map((el) => (
            <Link
              href={el.link}
              key={el.link}
              className={cn(
                'font-normal text-sm text-muted-foreground transition-colors px-4 py-2',
                'hover:font-semibold hover:text-primary ',
                pathname === el.link && 'font-semibold text-primary',
              )}
            >
              {el.label}
            </Link>
          ))}
        </div>
        <MobileNav />
        <div className="flex flex-1 sm:flex-none justify-end items-center gap-2">
          <ModeToggle />
          <Link
            href={SOURCE_CODE_GITHUB_PAGE}
            target="_blank"
            title={SOURCE_CODE_GITHUB_PAGE}
            aria-label={SOURCE_CODE_GITHUB_PAGE}
          >
            <Button variant="outline" size={'icon'} aria-label="Github Icon">
              <IconBarandGithub className="text-base" />
            </Button>
          </Link>
          <Link
            href={PATHS.ADMIN_HOME}
            target="_blank"
            rel="nofollow"
            title="后台管理"
            aria-label={PATHS.ADMIN_HOME}
          >
            <Button variant="outline" size={'icon'} aria-label="后台管理">
              <UserCog className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
