import axios from 'axios';

interface FormData {
    name: string;
    email: string;
    password: string;
}

export const registerUser = async (formData: FormData) => {
    try {
        const response = await axios.post('http://localhost:3000/api/v1/auth/register', formData);
        console.log('Registration Success:', response.data);
        return response.data;
    } catch (error: any) {
        console.error('Registration Error:', error.response ? error.response.data : error);
        throw error;
    }
};

// Aquí puedes añadir más funciones relacionadas con el manejo de formularios.