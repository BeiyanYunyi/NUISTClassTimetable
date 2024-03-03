'use server';

import { BackendResponse } from '@/types/ServerResponse';
import { encrypt } from '@/utils/crypto';
import getAesKey from '@/utils/getAesKey';
import ky from 'ky';
import { cookies } from 'next/headers';

interface LoginParam {
  loginname: string;
  password: string;
  captcha: string;
  uuid: string;
}

const login = async (param: LoginParam) => {
  const aesKey = await getAesKey();
  const trueLoginParam = { ...param, password: encrypt(param.password, aesKey) };
  const body = new FormData();
  Object.entries(trueLoginParam).forEach(([key, value]) => body.append(key, value));
  const res = await ky.post('http://xsxk.nuist.edu.cn/xsxk/auth/login', { body }).json<
    BackendResponse<{
      token: string;
      student: {
        XH: string;
        XM: string;
        gender: string;
        college: string;
        YXMC: string;
        major: string;
        ZYMC: string;
        ZYLB: string;
        majorDirection: null;
        majorDirectionName: null;
        lengthOfSchool: string;
        headImageUrl: null;
        NJ: string;
        schoolClass: string;
        schoolClassName: string;
        virtualClasses: null;
        campus: string;
        campusName: string;
        teachCampus: string;
        ZXF: string;
        YXXF: string;
        levelTeaching: null;
        trainingLevel: string;
        studentType: string;
        studentType2: string;
        specialStudentType: null;
        studentTag: null;
        origin: null;
        emigrant: null;
        majorTrainingCode: string;
        minorTrainingCode: null;
        extendTrainingCode: null;
        limitElectiveMap: null;
        electiveBatchList: {
          displayCourseDetail: string;
          code: string;
          name: string;
          noSelectReason: null;
          noSelectCode: null;
          canSelect: string;
          schoolTerm: string;
          beginTime: string;
          endTime: string;
          tacticCode: string;
          tacticName: string;
          typeCode: string;
          typeName: string;
          needConfirm: string;
          confirmInfo: null;
          isConfirmed: string;
          schoolTermName: string;
          weekRange: string;
          canSelectBook: string;
          canDeleteBook: string;
          multiCampus: string;
          multiTeachCampus: string;
          menuList: null;
          noCheckTimeConflict: string;
        }[];
        noSearchCj: string;
        historyStudyResult: null;
        lscjMap: null;
        hasInfo: string;
        infoCount: number;
        sfz: string;
        yearCampusMap: null;
        ZSXDXF: string;
        xsbh: null;
        xgxkxz: null;
      };
    }>
  >();
  if (res.data?.token) {
    cookies().set('token', res.data.token);
  } else {
    console.log(res);
  }
  return res;
};

export default login;
