import { AxiosResponse } from 'axios';
import axios from '../axios';
import { CreateSessionDTO, Session } from '../types/sessions';

export default class SessionsService {
  static async fetchSessions () {
    return new Promise<AxiosResponse<Session[]>>((resolve, reject) => {
      axios.get<Session[]>(`/sessions`)
        .then(response => {
          resolve(response);
        })
        .catch(error => reject(error));
    });
  };

  static async fetchSession (sessionId: number | string) {
    return new Promise<AxiosResponse<Session>>((resolve, reject) => {
      axios.get<Session>(`/sessions/${sessionId}`)
        .then(response => {
          resolve(response);
        })
        .catch(error => reject(error));
    });
  };

  static async createSession (createSessionDTO: CreateSessionDTO) {
    return new Promise<AxiosResponse<Session>>((resolve, reject) => {
      axios.post<Session>(`/sessions`, createSessionDTO)
        .then(response => {
          resolve(response);
        })
        .catch(error => reject(error));
    });
  };

  // static async createVariable (templateUuid: string, payload: CreateVariableDTO) {
  //   return new Promise((resolve, reject) => {
  //     axios.post(`/template/${templateUuid}/add-variable`, payload)
  //       .then(response => {
  //         resolve(response);
  //       })
  //       .catch(error => reject(error));
  //   });
  // };

  // static async updateVariable (variableUuid: string, payload: UpdateVariableDTO) {
  //   return new Promise((resolve, reject) => {
  //     axios.patch(`/variable/${variableUuid}`, payload)
  //       .then(response => {
  //         resolve(response);
  //       })
  //       .catch(error => reject(error));
  //   });
  // };

  // static async deleteVariable (variableUuid: string) {
  //   return new Promise((resolve, reject) => {
  //     axios.delete(`/variable/${variableUuid}`)
  //       .then(response => {
  //         resolve(response);
  //       })
  //       .catch(error => reject(error));
  //   });
  // };
};
