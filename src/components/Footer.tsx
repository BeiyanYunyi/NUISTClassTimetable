import Link from 'next/link';

const Footer = () => (
  <>
    <div className="h-16" />
    <p className="h-16 fixed bottom-0 left-0 right-0 bg-background/95 pt-4 text-center">
      ©2022-2024 北雁云依 以 AGPLv3 协议
      <Link className="underline" href="https://github.com/BeiyanYunyi/NUISTClassTimetable">
        开源
      </Link>{' '}
      <Link className="underline" href="/about">
        关于本站
      </Link>
    </p>
  </>
);

export default Footer;
