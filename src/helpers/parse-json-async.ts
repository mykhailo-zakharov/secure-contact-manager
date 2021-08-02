export const parseJsonAsync = (text: string): Promise<unknown> =>
    new Promise((resolve, reject) => {
        try {
            resolve(JSON.parse(text));
        } catch (error) {
            reject(error);
        }
    });
