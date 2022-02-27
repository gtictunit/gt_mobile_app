import Axios from "axios";

export const WB_URL = 'http://localhost:88/gt_mobile_app_backend'

export const SundayMessages =Axios.get('https://gt.pario.com.ng/backend/message/get_messages_by_service?id=2');

export const ConventionMessages = Axios.get('https://gt.pario.com.ng/backend/message/get_messages_by_service?id=3');

export const ThursdayMessages = Axios.get('https://gt.pario.com.ng/backend/message/get_messages_by_service?id=1');

export const SpecialMessages = Axios.get('https://gt.pario.com.ng/backend/message/get_messages_by_service?id=4');

export const GenreList = Axios.get('https://gt.pario.com.ng/backend/service/get_services');