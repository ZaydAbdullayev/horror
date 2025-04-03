export async function generateImages(apiKey, artStyle, prompt) {
    try {
        const msg = `Create 4 high-quality, interconnected realistic horror comic illustrations in ${artStyle} style. 
        The images should depict a continuous story about ${prompt}. Each image should logically follow the previous one, 
        maintaining the same characters, atmosphere, and art consistency. Ensure high detail, cinematic lighting, and a cohesive visual narrative.`;
        const response = await fetch(
            "https://api.openai.com/v1/images/generations",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    prompt: msg, // Prompt for image generation
                    n: 4, // Number of images to generate
                    size: "512x512", // Image size
                    response_format: "url", // Return format
                }),
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                errorData.error?.message || "Failed to generate images"
            );
        }

        const data = await response.json();
        return data.data.map((img) => img.url);
    } catch (error) {
        throw new Error(`API Error: ${error.message}`);
    }
}