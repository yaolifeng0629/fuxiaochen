import {
  IconBaranGithub,
  IconBrandBilibili,
  IconLogoJuejin,
  IconSkillGmailDark,
  IconSkillGmailLight,
} from '@/components/icons';

import { BILIBILI_PAGE, EMAIL, GITHUB_PAGE, JUEJIN_PAGE } from '@/constants';

export const socialMediaList: Array<{
  icon: React.ReactNode;
  label: string;
  link: string;
}> = [
  {
    icon: <IconBaranGithub className="text-2xl" />,
    label: 'Github',
    link: GITHUB_PAGE,
  },
  {
    icon: (
      <>
        <IconSkillGmailDark className="text-lg dark:hidden" />
        <IconSkillGmailLight className="text-lg hidden dark:inline-block" />
      </>
    ),
    label: 'Gmail',
    link: `mailto:${EMAIL}`,
  },
  {
    icon: (
      <IconBrandBilibili
        className={`text-2xl transition-colors hover:text-[#00AEEC]`}
      />
    ),
    label: 'Bilibili',
    link: BILIBILI_PAGE,
  },
  {
    icon: (
      <IconLogoJuejin
        className={`text-2xl transition-colors hover:text-[#2985fc]`}
      />
    ),
    label: '掘金',
    link: JUEJIN_PAGE,
  },
];
