const baseUrl = 'https://zkydata.com/';

type props = {
  home: string;
  login: string;
  forgetPassword: string;
  signup: string;
  api: string;
};
const Urls = (): props => {
  return {
    home: `${baseUrl}mobile/home/`,
    login: `${baseUrl}mobile/login/`,
    forgetPassword: `${baseUrl}mobile/recovery/`,
    signup: `${baseUrl}mobile/register/`,
    api: `${baseUrl}api/account/login/`,
  };
};

export default Urls;
