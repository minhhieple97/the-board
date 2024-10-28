import { ChangeEvent, useRef, useState, useEffect } from "react";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/constants";

type UseImageUploadProps = {
  value?: File | string;
  onChange: (value: File | string | undefined) => void;
  disabled?: boolean;
};

type UseImageUploadReturn = {
  fileRef: React.RefObject<HTMLInputElement>;
  preview: string;
  isDragging: boolean;
  error: string | null; // Add error to return type
  handlers: {
    handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleRemove: () => void;
    handleDragOver: (e: React.DragEvent) => void;
    handleDragLeave: (e: React.DragEvent) => void;
    handleDrop: (e: React.DragEvent) => void;
  };
};

export const useImageUpload = ({
  value,
  onChange,
  disabled,
}: UseImageUploadProps): UseImageUploadReturn => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null); // Add error state

  useEffect(() => {
    if (!value && preview) {
      URL.revokeObjectURL(preview);
      setPreview("");
      if (fileRef.current) fileRef.current.value = "";
    }
  }, [value, preview]);

  useEffect(() => {
    return () => {
      if (preview && !preview.startsWith("http")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const validateFile = (file: File): string | null => {
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      return "File must be a PNG or JPEG image";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "File size must be less than 1MB";
    }
    return null;
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null); // Reset error
    const file = e.target.files?.[0];
    if (!file) return;

    const validationError = validateFile(file);
    if (validationError) {
      if (fileRef.current) fileRef.current.value = "";
      onChange(undefined);
      setError(validationError); // Set error message
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    onChange(file);
  };

  const handleRemove = () => {
    setPreview("");
    onChange(undefined);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setError(null); // Reset error

    if (disabled) return;

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    const validationError = validateFile(file);
    if (validationError) {
      if (fileRef.current) fileRef.current.value = "";
      onChange(undefined);
      setError(validationError); // Set error message
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    onChange(file);
  };

  return {
    fileRef,
    preview,
    isDragging,
    error, // Add error to return value
    handlers: {
      handleFileChange,
      handleRemove,
      handleDragOver,
      handleDragLeave,
      handleDrop,
    },
  };
};
