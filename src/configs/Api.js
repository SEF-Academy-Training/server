import axios from 'axios';
import { toast } from 'react-toastify';

export const domainBack = 'http://localhost:4000/tax-hub/uploads';

export const apiOption = { headers: { 'Content-Type': 'multipart/form-data' } };

export const handleApiError = (error) => {
	if (Array.isArray(error.response?.data?.error)) {
		error.response.data.error.map((e) => toast.error(e.message));
	} else {
		const errorMes = error.response?.data?.error || error.response?.data?.message;
		toast.error(errorMes);
	}
	return error.response.data.error;
};

const Api = axios.create({
	baseURL: 'http://localhost:4000/tax-hub',
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true,
});

export default Api;
