import { u as useApi } from './auth-CZZkTxj2.mjs';
import { g as useState } from './server.mjs';
import { ref } from 'vue';

const useUpload = () => {
  const api = useApi();
  const uploads = useState("uploads", () => []);
  const isUploading = ref(false);
  const uploadFile = async (title, file, folder = "uploads", onProgress) => {
    const upload = {
      title,
      file,
      progress: 0,
      status: "pending"
    };
    uploads.value.push(upload);
    isUploading.value = true;
    try {
      upload.status = "uploading";
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title);
      const response = await api.post("/media/upload", formData);
      if (response.success && response.data) {
        upload.status = "success";
        upload.progress = 100;
        onProgress == null ? void 0 : onProgress(100);
        return response.data.photo_id;
      }
      upload.status = "error";
      upload.error = response.message || "Failed to upload file";
      return null;
    } catch (error) {
      upload.status = "error";
      upload.error = error.message || "Upload failed";
      return null;
    } finally {
      isUploading.value = uploads.value.some((u) => u.status === "uploading");
    }
  };
  const clearUploads = () => {
    uploads.value = [];
  };
  const removeUpload = (uploadId) => {
    const index = uploads.value.findIndex((u) => u.file.name === uploadId);
    if (index !== -1) {
      uploads.value.splice(index, 1);
    }
  };
  return {
    uploads,
    isUploading,
    uploadFile,
    clearUploads,
    removeUpload
  };
};

export { useUpload as u };
//# sourceMappingURL=useUpload-BUN8k0ZN.mjs.map
