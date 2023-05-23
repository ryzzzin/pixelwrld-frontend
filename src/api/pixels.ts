import { AxiosResponse } from 'axios';
import axios from '../axios';
import { CreatePixelDTO, Pixel, UpdatePixelDTO } from '../types/pixels';

export default class PixelsService {
  static async createPixel (createPixelDTO: CreatePixelDTO) {
    return new Promise<AxiosResponse<Pixel>>((resolve, reject) => {
      axios.post<Pixel>(`/pixels`, createPixelDTO)
        .then(response => {
          resolve(response);
        })
        .catch(error => reject(error));
    });
  };

  static async updatePixel (updatePixelDTO: UpdatePixelDTO) {
    return new Promise<AxiosResponse<Pixel>>((resolve, reject) => {
      axios.patch<Pixel>(`/pixels/${updatePixelDTO.id}`, {...updatePixelDTO, id: undefined})
        .then(response => {
          resolve(response);
        })
        .catch(error => reject(error));
    });
  };
};
