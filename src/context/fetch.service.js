import axios from "axios";
const token = import.meta.env.VITE_OPEN_AI_API_KEY;

export const generateImageFromAPI = async (prompt) => {
    try {
        const response = await axios.post(
            "https://api.openai.com/v1/images/generations",
            {
                prompt: prompt,
                n: 1,
                size: "512x512",
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data.data[0].url;
    } catch (error) {
        console.error("Error generating image:", error);
        throw error;
    }
};