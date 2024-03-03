import ky from 'ky';

const aesKeyReg = /(?<=loginVue\.loginForm\.aesKey = ").*(?=";)/;

const getAesKey = async () => {
  const res = await ky.get('http://xsxk.nuist.edu.cn/xsxk/profile/index.html').text();
  const aesKey = res.match(aesKeyReg)?.[0];
  if (!aesKey) return Promise.reject('Failed to get aesKey');
  return aesKey;
};

export default getAesKey;
