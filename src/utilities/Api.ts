import { Alert } from 'react-native';
import Urls from './Urls';
import axios from 'axios';

const urls = Urls();
export async function sendPostRequest(
  phoneNumber: string | undefined,
  password: string
) {
  try {
    const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const response = await axios.post(
      urls.api,
      {
        phone: phoneNumber,
        accesspass: password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${currentDate}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    Alert.alert('Error Login', `${error}`);
    return null;
  }
}
