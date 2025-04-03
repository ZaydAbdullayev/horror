export async function generateImages(apiKey, artStyle, prompt) {
    try {
        const msg = `Create a simple horror comic with 4 connected scenes in ${artStyle} style that follow a continuous story about ${prompt}`;
        const response = await fetch(
            "https://api.openai.com/v1/images/generations",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: "dall-e-3", // Model name
                    prompt: msg, // Prompt for image generation
                    n: 1, // Number of images to generate
                    size: '1024x1024', // Image size
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