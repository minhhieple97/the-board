"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "../../ui/button";
import { ACCEPTED_IMAGE_TYPES } from "@/constants";
import { UploadCloud } from "lucide-react";
import { useImageUpload } from "./useImageUpload";
import { forwardRef } from "react";

interface ImageUploadProps {
  value?: File | string;
  onChange: (value: File | string | undefined) => void;
  className?: string;
  error?: string;
  disabled?: boolean;
}

export const ImageUpload = forwardRef<HTMLDivElement, ImageUploadProps>(
  ({ value, onChange, className, error: propError, disabled }, ref) => {
    const {
      fileRef,
      preview,
      isDragging,
      error: uploadError,
      handlers,
    } = useImageUpload({
      value,
      onChange,
      disabled,
    });

    // Use either prop error or upload error
    const displayError = propError || uploadError;

    return (
      <div ref={ref} className={cn("space-y-2", className)}>
        <input
          type="file"
          accept={ACCEPTED_IMAGE_TYPES.join(",")}
          className="hidden"
          ref={fileRef}
          onChange={handlers.handleFileChange}
          disabled={disabled}
        />

        {preview ? (
          <div className="group relative h-[200px] w-full">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="rounded-lg object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute right-2 top-2"
                onClick={handlers.handleRemove}
              >
                Remove
              </Button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => !disabled && fileRef.current?.click()}
            onDragOver={handlers.handleDragOver}
            onDragLeave={handlers.handleDragLeave}
            onDrop={handlers.handleDrop}
            className={cn(
              "relative rounded-lg border-2 border-dashed p-6 transition-colors",
              "flex flex-col items-center justify-center gap-3",
              "group cursor-pointer hover:border-primary/50",
              isDragging && "border-primary/50 bg-primary/5",
              disabled && "cursor-not-allowed opacity-60",
              "h-[200px] w-full",
            )}
          >
            <div className="rounded-full bg-primary/10 p-3 transition-colors group-hover:bg-primary/20">
              <UploadCloud className="h-8 w-8 text-primary/50" />
            </div>
            <div className="space-y-0.5 text-center">
              <p className="text-sm font-medium">
                Drag & drop your image here, or click to select
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPEG (max. 1MB)
              </p>
            </div>
          </div>
        )}

        {displayError && (
          <p className="text-sm font-medium text-destructive">{displayError}</p>
        )}
      </div>
    );
  },
);

ImageUpload.displayName = "ImageUpload";
