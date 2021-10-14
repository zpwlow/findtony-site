import Cookies from "js-cookie";
import process from 'process';

export default function ({ route, redirect }) {
    const token = Cookies.get('token')
    if (!token) {
      redirect('/');
    }
}
