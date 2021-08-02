export const downloadFile = (blob: unknown, fileName: string, extension: string): void => {
    const fileBlob = new Blob([blob as Blob], { type: "" });
    const link = document.createElement("a");
    link.setAttribute("href", URL.createObjectURL(fileBlob));
    link.setAttribute("download", `${fileName}.${extension}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
