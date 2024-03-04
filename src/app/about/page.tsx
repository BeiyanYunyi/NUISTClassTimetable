import { css } from '@/styled-system/css';
import { TypographyStylesProvider } from '@mantine/core';
import Link from 'next/link';

const AboutPage = () => (
  <TypographyStylesProvider className={css({ maxW: 'xl', mx: 4 })}>
    <p>
      <Link href="/">返回</Link>
    </p>
    <h1>关于</h1>
    <h2 id="why">为什么会有本站？</h2>
    <p>
      现有的大量课程表软件，不是需要手动输入课表，就是要收集大量个人信息（如手机号）、不登录则无法使用，又或者兼而有之。
    </p>
    <p>
      在完全没有硬性要求（如对跟帖服务的实名要求）的情况下强制要求绑定手机，狼子野心昭然若揭。也因此，我一直使用南元带的在线课表系统，然而它在今年进行了一次更新，并出现了很严重的问题：
    </p>
    <p>南元带的新课表系统会以一个较短的间隔清除登录状态，我每次都需要重新登录。</p>
    <p>
      此外，显然南元带的外包前端完全没有考虑到兼容性问题。我的 Firefox
      在页面上会反复刷新、完全无法使用。
    </p>
    <blockquote>
      <p>
        有些写前端的人就该去炒粉。
        <br />
        ——SukkaW
      </p>
    </blockquote>
    <p>
      为了给他们一个良好的示范，是时候自己写一个了。本站使用 Next.js
      完成，并使用其默认兼容性配置，这意味着它应该具备如下兼容性：
    </p>
    <pre>
      <code>
        {`[
  "chrome 64",
  "edge 79",
  "firefox 67",
  "opera 51",
  "safari 12"
]`}
      </code>
    </pre>
    <p>如果没有，那就是 Next.js 的锅。</p>
    <p>
      在写这个网站的过程中，我还发现南元带的登录系统居然会拿 AES
      对传输中的密码进行加密，他们毫无必要地使用了对称加密（正确的做法应该是使用非对称加密，如
      RSA）。这和直接使用明文没有任何区别，在没有 HTTPS 加密（确实没有。南元带的 WiFi
      也不带加密，这意味着可以直接抓到无线网络数据包）的情况下，中间人可以获取到你的密码。
    </p>
    <p>
      总之，我逆向了南元带的登录系统，从而使在本网站上登录成为可能。不过，本网站不会对用户名和密码进行任何存储，只会存储登录后拿到的
      Session。Session 也会很快过期失效。
    </p>
    <h2 id="whySync">为什么会有离线模式和同步？</h2>
    <p>
      南元带的课表系统会以一个较短的间隔清除登录状态（Session）。为了避免频繁登录，我们提供了离线模式：当登录状态失效时，展示之前的数据。也因此，我们需要同步按钮来手动更新数据。
    </p>
    <p>
      <Link href="/">返回</Link>
    </p>
  </TypographyStylesProvider>
);

export default AboutPage;