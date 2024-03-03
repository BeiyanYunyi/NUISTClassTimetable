import { AES, enc, mode, pad } from 'crypto-js';

export const encrypt = (t: unknown, r: string = 'MWMqg2tPcDkxcm11') => {
  const newT = t instanceof Object ? JSON.stringify(t) : (t as string);
  const p = AES.encrypt(enc.Utf8.parse(newT), enc.Utf8.parse(r), {
    mode: mode.ECB,
    padding: pad.Pkcs7,
  });
  return p.toString();
};

export const decrypt = function (t: string, r: string = 'MWMqg2tPcDkxcm11') {
  const p = AES.decrypt(t, enc.Utf8.parse(r), {
    mode: mode.ECB,
    padding: pad.Pkcs7,
  });
  let e = enc.Utf8.stringify(p).toString();
  return ('{' !== e.charAt(0) && '[' !== e.charAt(0)) || (e = JSON.parse(e)), e;
};
