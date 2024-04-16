import logError from 'react-native/Libraries/Utilities/logError';
import { Globals } from '../Config/index';
import AsyncStorage from '@react-native-community/async-storage';

const getApiKey = async () => {
  // console.log(AsyncStorage.getItem('login'), 'tokentokentokentokentokentoken');
  return await AsyncStorage.getItem('login');
};

class Logistical {
  post(path, data = null) {
    return this.send(path, 'POST', data);
  }

  postlogin(path, data = null) {
    return this.sendlogin(path, 'POST', data);
  }

  get(path, data = null) {
    return this.sendget(path, 'GET', data);
  }

  sendget = async (url, method, data) => {
    const login = await getApiKey();
    let token = JSON.parse(login);
    authtoken = 'Bearer ' + token;
    let uri = `${Globals.baseUrl}${url}`;
    // console.log(
    //   '>>>>>>>>>>>login%%%%%%%%%%%%%%%%%%%%%%%%%5',
    //   uri,
    //   data,
    //   authtoken,
    // );

    const headers = {
      Accept: 'application/json',
      // 'Content-Length': '285',
      // 'Host': '192.168.1.214',
      'Content-Type': 'application/json',
      Authorization: authtoken,
    };

    return new Promise((resolve, reject) => {
      fetch(uri, { method, headers })
        .then(response => response.json())
        .then(responseJson => {
          // console.log('??????????????? ===>',responseJson);
          resolve(responseJson);
        })
        .catch(error => {
          logError(error);
          console.log('error', error);
          reject(new Error('Something go wrong'));
        });
    });
  };

  send = async (url, method, data) => {
    const login = await getApiKey();

    //  console.log(login, 'UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU');
    let token = JSON.parse(login);
    // console.log(token, 'UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU');

    authtoken = 'bearer ' + token;
    //console.log(authtoken, 'LLLLLLLLLLLLLLLLLLLLLLLLLLLLLL');
    let uri = `${Globals.baseUrl}${url}`;
    //console.log('LLLLLLLLLLLLLLLLLLLLLLLLLLLLLL>>>>>>>>>>>', uri, data);

    const headers = {
      // Accept: 'application/json',
      // 'Content-Length': '285',
      // 'Host': '192.168.1.214',
      'Content-Type': 'application/json',
      Authorization: authtoken,
      //   "Authorization":'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNjUzMzQyNDY1ZjIyNzg1YjRkNTVhMDdmMjNhZTlkNDcyYzVkMDIyNmM0ZWEyN2ViMTVjZTI4NzRjYTA4NmM0MzUzYTc3ZmFiOWZjNDczNDAiLCJpYXQiOjE2NDIwNTY1NjkuMTQ3MTc1LCJuYmYiOjE2NDIwNTY1NjkuMTQ3MTc5LCJleHAiOjE2NTc2OTQ5NjkuMDMxNDU5LCJzdWIiOiIxODkiLCJzY29wZXMiOltdfQ.FxncU82uLM_sHEQwGMmYmBqaIuhbDky7Jff-rxehqXrnG_W8Sco3JKzbryZFNmDVHCpYhdXudEFHtgEGnWTjVDudTdksXiEgL1TCf4R-JXSDCelx3vPgquqV_sM2LlEXD2JiMGWodjztRr_Cvn5-voJPQRlbehcqc-G4Uq2jQIQy9IDxNECvQUoHypAgCSeINwxcLS7E8nRgR1Eq83SEAsouZUcuTiWo_SPjeU9qqtvXRYfxgHJ_4DjDZCAMxeXTNMqPQdb3NPTVuV2HJE3zkqmXZpBvbGUyCybtY34xCRNGNDUcbwqRRKxm0zUxeQJNwGLq_TTNg0ajvpGP4EOFzE4e8gNLCTju5H6O6cg2giCNKt_0Z4ZwTdxbkuVekisdVz-8tjQCa6o87Ziz19dz3HedjZ1A68REyR1NKwN6GMut2K4PD0zn_x7YVCnCRYBit8Rd9277mrFXmyG3xLaWQhPQFiBSqdGL8SyHtN2qpEOPnjfw3zCzfKl4OiVmu2NKVvVH3VU34nO266bP4Et5Pks0TsgueJgNOrfG8njIAk6xyraSEc-v2ci9cTaZDc9Sn-21MFNfEw-spgz_qjKAoGxZGdK0HNNc-YeMfbvdWjHIBc9Pzqc6LobmLMmpjUx9aoKAWu2d_qpwj4i1F3ciPUcoFQz8_Lt0Hu7tH-L3fss'
    };

    return new Promise((resolve, reject) => {
      fetch(uri, { method, headers, body: JSON.stringify(data) })
        .then(response => response.json())
        .then(responseJson => {
          //  console.log('Prince???????????????', responseJson);
          resolve(responseJson);
        })
        .catch(error => {
          logError(error);
          console.log('error', error);

          reject(new Error('Something go wrong'));
        });
    });
  };

  sendlogin = async (url, method, data) => {
    // const login = await getApiKey();
    // let token = JSON.parse(login);
    // authtoken = 'Bearer ' + token;

    let uri = `${Globals.baseUrl}${url}`;
    // console.log('>>>>>>>>>>>', uri, data);

    const headers = {
      Accept: 'application/json',
      // 'Content-Length': '285',
      // 'Host': '192.168.1.214',
      'Content-Type': 'application/json',
      // Authorization: authtoken,
      //   "Authorization":'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNjUzMzQyNDY1ZjIyNzg1YjRkNTVhMDdmMjNhZTlkNDcyYzVkMDIyNmM0ZWEyN2ViMTVjZTI4NzRjYTA4NmM0MzUzYTc3ZmFiOWZjNDczNDAiLCJpYXQiOjE2NDIwNTY1NjkuMTQ3MTc1LCJuYmYiOjE2NDIwNTY1NjkuMTQ3MTc5LCJleHAiOjE2NTc2OTQ5NjkuMDMxNDU5LCJzdWIiOiIxODkiLCJzY29wZXMiOltdfQ.FxncU82uLM_sHEQwGMmYmBqaIuhbDky7Jff-rxehqXrnG_W8Sco3JKzbryZFNmDVHCpYhdXudEFHtgEGnWTjVDudTdksXiEgL1TCf4R-JXSDCelx3vPgquqV_sM2LlEXD2JiMGWodjztRr_Cvn5-voJPQRlbehcqc-G4Uq2jQIQy9IDxNECvQUoHypAgCSeINwxcLS7E8nRgR1Eq83SEAsouZUcuTiWo_SPjeU9qqtvXRYfxgHJ_4DjDZCAMxeXTNMqPQdb3NPTVuV2HJE3zkqmXZpBvbGUyCybtY34xCRNGNDUcbwqRRKxm0zUxeQJNwGLq_TTNg0ajvpGP4EOFzE4e8gNLCTju5H6O6cg2giCNKt_0Z4ZwTdxbkuVekisdVz-8tjQCa6o87Ziz19dz3HedjZ1A68REyR1NKwN6GMut2K4PD0zn_x7YVCnCRYBit8Rd9277mrFXmyG3xLaWQhPQFiBSqdGL8SyHtN2qpEOPnjfw3zCzfKl4OiVmu2NKVvVH3VU34nO266bP4Et5Pks0TsgueJgNOrfG8njIAk6xyraSEc-v2ci9cTaZDc9Sn-21MFNfEw-spgz_qjKAoGxZGdK0HNNc-YeMfbvdWjHIBc9Pzqc6LobmLMmpjUx9aoKAWu2d_qpwj4i1F3ciPUcoFQz8_Lt0Hu7tH-L3fss'
    };

    return new Promise((resolve, reject) => {
      fetch(uri, { method, headers, body: JSON.stringify(data) })
        .then(response => response.json())
        .then(responseJson => {
          //  console.log('???????????????', responseJson);
          resolve(responseJson);
        })
        .catch(error => {
          logError(error);
          console.log('error', error);

          reject(new Error('Something go wrong'));
        });
    });
  };
}

export const logistical = new Logistical();
