export const readFileAsync = (file: Blob): Promise<unknown> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            resolve(event.target?.result);
        };
        reader.onerror = reject;
        reader.readAsText(file);
    });
