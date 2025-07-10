"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  Plus,
  SlidersHorizontal,
  ArrowUp,
  X,
  ImageIcon,
  Loader2,
  AlertCircle,
  Copy,
  Paintbrush,
  Globe,
  PencilIcon,
  Search,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as PopoverPrimitive from "@radix-ui/react-popover";

// Tooltip components
const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & { showArrow?: boolean }
>(({ className, sideOffset = 4, showArrow = false, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "relative z-50 max-w-[280px] rounded-md bg-gray-900 text-white px-2 py-1 text-xs animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        className
      )}
      {...props}
    >
      {props.children}
      {showArrow && <TooltipPrimitive.Arrow className="-my-px fill-gray-900" />}
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

// Popover components
const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-64 rounded-xl bg-white p-2 text-gray-900 shadow-md outline-none animate-in data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
        className
      )}
      style={{ border: '1px solid #DDDDDD' }}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

// Tools list
const toolsList = [
  { id: 'createImage', name: 'Create an image', shortName: 'Image', icon: Paintbrush },
  { id: 'searchWeb', name: 'Search the web', shortName: 'Search', icon: Globe },
  { id: 'deepResearch', name: 'Run deep research', shortName: 'Deep Search', icon: Search },
  { id: 'thinkLonger', name: 'Think for longer', shortName: 'Think', icon: Lightbulb },
];

// Replace Math.random with nanoid
// import { nanoid } from "nanoid";

// Types
export interface FileWithPreview {
  id: string;
  file: File;
  preview?: string;
  type: string;
  uploadStatus: "pending" | "uploading" | "complete" | "error";
  uploadProgress?: number;
  abortController?: AbortController;
  textContent?: string;
}

export interface PastedContent {
  id: string;
  content: string;
  timestamp: Date;
  wordCount: number;
}



interface ChatInputProps {
  onSendMessage?: (
    message: string,
    files: FileWithPreview[],
    pastedContent: PastedContent[]
  ) => void;
  disabled?: boolean;
  placeholder?: string;
  maxFiles?: number;
  maxFileSize?: number; // in bytes
  acceptedFileTypes?: string[];
  hideAttachButton?: boolean;
  hideToolsButton?: boolean;
  hideTooltips?: boolean;
}

// Constants
const MAX_FILES = 10;
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const PASTE_THRESHOLD = 200; // characters threshold for showing as pasted content

// File type helpers
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return (
    Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  );
};

const getFileTypeLabel = (type: string): string => {
  const parts = type.split("/");
  let label = parts[parts.length - 1].toUpperCase();
  if (label.length > 7 && label.includes("-")) {
    // e.g. VND.OPENXMLFORMATS-OFFICEDOCUMENT...
    label = label.substring(0, label.indexOf("-"));
  }
  if (label.length > 10) {
    label = label.substring(0, 10) + "...";
  }
  return label;
};

// Helper function to check if a file is textual
const isTextualFile = (file: File): boolean => {
  const textualTypes = [
    "text/",
    "application/json",
    "application/xml",
    "application/javascript",
    "application/typescript",
  ];

  const textualExtensions = [
    "txt",
    "md",
    "py",
    "js",
    "ts",
    "jsx",
    "tsx",
    "html",
    "htm",
    "css",
    "scss",
    "sass",
    "json",
    "xml",
    "yaml",
    "yml",
    "csv",
    "sql",
    "sh",
    "bash",
    "php",
    "rb",
    "go",
    "java",
    "c",
    "cpp",
    "h",
    "hpp",
    "cs",
    "rs",
    "swift",
    "kt",
    "scala",
    "r",
    "vue",
    "svelte",
    "astro",
    "config",
    "conf",
    "ini",
    "toml",
    "log",
    "gitignore",
    "dockerfile",
    "makefile",
    "readme",
  ];

  // Check MIME type
  const isTextualMimeType = textualTypes.some((type) =>
    file.type.toLowerCase().startsWith(type)
  );

  // Check file extension
  const extension = file.name.split(".").pop()?.toLowerCase() || "";
  const isTextualExtension =
    textualExtensions.includes(extension) ||
    file.name.toLowerCase().includes("readme") ||
    file.name.toLowerCase().includes("dockerfile") ||
    file.name.toLowerCase().includes("makefile");

  return isTextualMimeType || isTextualExtension;
};

// Helper function to read file content as text
const readFileAsText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve((e.target?.result as string) || "");
    reader.onerror = (e) => reject(e);
    reader.readAsText(file);
  });
};

// Helper function to get file extension for badge
const getFileExtension = (filename: string): string => {
  const extension = filename.split(".").pop()?.toUpperCase() || "FILE";
  return extension.length > 8 ? extension.substring(0, 8) + "..." : extension;
};

// File Preview Component
const FilePreviewCard: React.FC<{
  file: FileWithPreview;
  onRemove: (id: string) => void;
}> = ({ file, onRemove }) => {
  const isImage = file.type.startsWith("image/");
  const isTextual = isTextualFile(file.file);

  // If it's a textual file, use the TextualFilePreviewCard
  if (isTextual) {
    return <TextualFilePreviewCard file={file} onRemove={onRemove} />;
  }

  return (
    <div
      className={cn(
        "relative group bg-white border w-fit rounded-lg p-3 size-[125px] shadow-md flex-shrink-0 overflow-hidden",
        isImage ? "p-0" : "p-3"
      )}
      style={{ borderColor: '#DDDDDD' }}
    >
      <div className="flex items-start gap-3 size-[125px] overflow-hidden">
        {isImage && file.preview ? (
          <div className="relative size-full rounded-md overflow-hidden bg-zinc-600">
            <Image
              src={file.preview || "/placeholder.svg"}
              alt={file.file.name}
              className="w-full h-full object-cover"
              fill
            />
          </div>
        ) : (
          <></>
        )}
        {!isImage && (
          <div className="flex-1 min-w-0 overflow-hidden">
            <div className="flex items-center gap-1.5 mb-1">
              <div className="group absolute flex justify-start items-end p-2 inset-0 bg-gradient-to-b to-white from-transparent overflow-hidden">
                <p className="absolute bottom-2 left-2 capitalize text-gray-700 text-xs bg-gray-100 px-2 py-1 rounded-md" style={{ border: '1px solid #DDDDDD' }}>
                  {getFileTypeLabel(file.type)}
                </p>
              </div>
              {file.uploadStatus === "uploading" && (
                <Loader2 className="h-3.5 w-3.5 animate-spin text-blue-600" />
              )}
              {file.uploadStatus === "error" && (
                <AlertCircle className="h-3.5 w-3.5 text-red-600" />
              )}
            </div>

            <p
              className="max-w-[90%] text-xs font-medium text-gray-800 truncate"
              title={file.file.name}
            >
              {file.file.name}
            </p>
            <p className="text-[10px] text-gray-500 mt-1">
              {formatFileSize(file.file.size)}
            </p>
          </div>
        )}
      </div>
      <Button
        size="icon"
        variant="outline"
        className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
        onClick={() => onRemove(file.id)}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

// Pasted Content Preview Component
const PastedContentCard: React.FC<{
  content: PastedContent;
  onRemove: (id: string) => void;
}> = ({ content, onRemove }) => {
  const [isExpanded] = useState(false);
  const previewText = content.content.slice(0, 150);
  const needsTruncation = content.content.length > 150;

  return (
    <div className="bg-white border relative rounded-lg p-3 size-[125px] shadow-md flex-shrink-0 overflow-hidden" style={{ borderColor: '#DDDDDD' }}>
      <div className="text-[8px] text-gray-700 whitespace-pre-wrap break-words max-h-24 overflow-y-auto custom-scrollbar">
        {isExpanded || !needsTruncation ? content.content : previewText}
        {!isExpanded && needsTruncation && "..."}
      </div>
      {/* OVERLAY */}
      <div className="group absolute flex justify-start items-end p-2 inset-0 bg-gradient-to-b to-white from-transparent overflow-hidden">
        <p className="capitalize text-gray-700 text-xs bg-gray-100 px-2 py-1 rounded-md" style={{ border: '1px solid #DDDDDD' }}>
          COLLÉ
        </p>
        {/* Actions */}
        <div className="group-hover:opacity-100 opacity-0 transition-opacity duration-300 flex items-center gap-0.5 absolute top-2 right-2">
          <Button
            size="icon"
            variant="outline"
            className="size-6"
            onClick={() => navigator.clipboard.writeText(content.content)}
            title="Copy content"
          >
            <Copy className="h-3 w-3" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="size-6"
            onClick={() => onRemove(content.id)}
            title="Remove content"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// Model Selector Component


// Textual File Preview Component
const TextualFilePreviewCard: React.FC<{
  file: FileWithPreview;
  onRemove: (id: string) => void;
}> = ({ file, onRemove }) => {
  const [isExpanded] = useState(false);
  const previewText = file.textContent?.slice(0, 150) || "";
  const needsTruncation = (file.textContent?.length || 0) > 150;
  const fileExtension = getFileExtension(file.file.name);

  return (
    <div className="bg-white border relative rounded-lg p-3 size-[125px] shadow-md flex-shrink-0 overflow-hidden" style={{ borderColor: '#DDDDDD' }}>
      <div className="text-[8px] text-gray-700 whitespace-pre-wrap break-words max-h-24 overflow-y-auto custom-scrollbar">
        {file.textContent ? (
          <>
            {isExpanded || !needsTruncation ? file.textContent : previewText}
            {!isExpanded && needsTruncation && "..."}
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        )}
      </div>
      {/* OVERLAY */}
      <div className="group absolute flex justify-start items-end p-2 inset-0 bg-gradient-to-b to-white from-transparent overflow-hidden">
        <p className="capitalize text-gray-700 text-xs bg-gray-100 px-2 py-1 rounded-md" style={{ border: '1px solid #DDDDDD' }}>
          {fileExtension}
        </p>
        {/* Upload status indicator */}
        {file.uploadStatus === "uploading" && (
          <div className="absolute top-2 left-2">
            <Loader2 className="h-3.5 w-3.5 animate-spin text-blue-600" />
          </div>
        )}
        {file.uploadStatus === "error" && (
          <div className="absolute top-2 left-2">
            <AlertCircle className="h-3.5 w-3.5 text-red-600" />
          </div>
        )}
        {/* Actions */}
        <div className="group-hover:opacity-100 opacity-0 transition-opacity duration-300 flex items-center gap-0.5 absolute top-2 right-2">
          {file.textContent && (
            <Button
              size="icon"
              variant="outline"
              className="size-6"
              onClick={() =>
                navigator.clipboard.writeText(file.textContent || "")
              }
              title="Copy content"
            >
              <Copy className="h-3 w-3" />
            </Button>
          )}
          <Button
            size="icon"
            variant="outline"
            className="size-6"
            onClick={() => onRemove(file.id)}
            title="Remove file"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// Main ChatInput Component
const ClaudeChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  disabled = false,
  placeholder = "How can I help you today?",
  maxFiles = MAX_FILES,
  maxFileSize = MAX_FILE_SIZE,
  acceptedFileTypes,
  hideAttachButton = false,
  hideToolsButton = false,
  hideTooltips = false,
}) => {
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [pastedContent, setPastedContent] = useState<PastedContent[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const maxHeight =
        Number.parseInt(getComputedStyle(textareaRef.current).maxHeight, 10) ||
        120;
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        maxHeight
      )}px`;
    }
  }, [message]);

  const handleFileSelect = useCallback(
    (selectedFiles: FileList | null) => {
      if (!selectedFiles) return;

      const currentFileCount = files.length;
      if (currentFileCount >= maxFiles) {
        alert(
          `Maximum ${maxFiles} files allowed. Please remove some files to add new ones.`
        );
        return;
      }

      const availableSlots = maxFiles - currentFileCount;
      const filesToAdd = Array.from(selectedFiles).slice(0, availableSlots);

      if (selectedFiles.length > availableSlots) {
        alert(
          `You can only add ${availableSlots} more file(s). ${
            selectedFiles.length - availableSlots
          } file(s) were not added.`
        );
      }

      const newFiles = filesToAdd
        .filter((file) => {
          if (file.size > maxFileSize) {
            alert(
              `File ${file.name} (${formatFileSize(
                file.size
              )}) exceeds size limit of ${formatFileSize(maxFileSize)}.`
            );
            return false;
          }
          if (
            acceptedFileTypes &&
            !acceptedFileTypes.some(
              (type) =>
                file.type.includes(type) || type === file.name.split(".").pop()
            )
          ) {
            alert(
              `File type for ${
                file.name
              } not supported. Accepted types: ${acceptedFileTypes.join(", ")}`
            );
            return false;
          }
          return true;
        })
        .map((file) => ({
          id: Math.random().toString(),
          file,
          preview: file.type.startsWith("image/")
            ? URL.createObjectURL(file)
            : undefined,
          type: file.type || "application/octet-stream",
          uploadStatus: "pending" as const,
          uploadProgress: 0,
        }));

      setFiles((prev) => [...prev, ...newFiles]);

      newFiles.forEach((fileToUpload) => {
        // Read text content for textual files
        if (isTextualFile(fileToUpload.file)) {
          readFileAsText(fileToUpload.file)
            .then((textContent) => {
              setFiles((prev) =>
                prev.map((f) =>
                  f.id === fileToUpload.id ? { ...f, textContent } : f
                )
              );
            })
            .catch((error) => {
              console.error("Error reading file content:", error);
              setFiles((prev) =>
                prev.map((f) =>
                  f.id === fileToUpload.id
                    ? { ...f, textContent: "Error reading file content" }
                    : f
                )
              );
            });
        }

        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileToUpload.id ? { ...f, uploadStatus: "uploading" } : f
          )
        );

        let progress = 0;
        const interval = setInterval(() => {
          progress += Math.random() * 20 + 5; // Simulate faster upload
          if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setFiles((prev) =>
              prev.map((f) =>
                f.id === fileToUpload.id
                  ? { ...f, uploadStatus: "complete", uploadProgress: 100 }
                  : f
              )
            );
          } else {
            setFiles((prev) =>
              prev.map((f) =>
                f.id === fileToUpload.id
                  ? { ...f, uploadProgress: progress }
                  : f
              )
            );
          }
        }, 150); // Faster interval
      });
    },
    [files.length, maxFiles, maxFileSize, acceptedFileTypes]
  );

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === id);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      // TODO: Abort upload if in progress using fileToRemove.abortController
      return prev.filter((f) => f.id !== id);
    });
  }, []);

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
      const clipboardData = e.clipboardData;
      const items = clipboardData.items;

      const fileItems = Array.from(items).filter(
        (item) => item.kind === "file"
      );
      if (fileItems.length > 0 && files.length < maxFiles) {
        e.preventDefault();
        const pastedFiles = fileItems
          .map((item) => item.getAsFile())
          .filter(Boolean) as File[];
        const dataTransfer = new DataTransfer();
        pastedFiles.forEach((file) => dataTransfer.items.add(file));
        handleFileSelect(dataTransfer.files);
        return;
      }

      const textData = clipboardData.getData("text");
      if (
        textData &&
        textData.length > PASTE_THRESHOLD &&
        pastedContent.length < 5
      ) {
        // Limit pasted content items
        e.preventDefault();
        setMessage(message + textData.slice(0, PASTE_THRESHOLD) + "..."); // Add a portion to textarea

        const pastedItem: PastedContent = {
          id: Math.random().toString(),
          content: textData,
          timestamp: new Date(),
          wordCount: textData.split(/\s+/).filter(Boolean).length,
        };

        setPastedContent((prev) => [...prev, pastedItem]);
      }
    },
    [handleFileSelect, files.length, maxFiles, pastedContent.length, message]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files) {
        handleFileSelect(e.dataTransfer.files);
      }
    },
    [handleFileSelect]
  );

  const handleSend = useCallback(() => {
    if (
      disabled ||
      (!message.trim() && files.length === 0 && pastedContent.length === 0)
    )
      return;
    if (files.some((f) => f.uploadStatus === "uploading")) {
      alert("Please wait for all files to finish uploading.");
      return;
    }

    onSendMessage?.(message, files, pastedContent);

    setMessage("");
    files.forEach((file) => {
      if (file.preview) URL.revokeObjectURL(file.preview);
    });
    setFiles([]);
    setPastedContent([]);
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  }, [message, files, pastedContent, disabled, onSendMessage]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const hasContent =
    message.trim() || files.length > 0 || pastedContent.length > 0;
  const canSend =
    hasContent &&
    !disabled &&
    !files.some((f) => f.uploadStatus === "uploading");

  return (
    <div
      className="relative w-full max-w-2xl mx-auto"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isDragging && (
        <div className="absolute inset-0 z-50 bg-blue-50 border-2 border-dashed border-blue-400 rounded-xl flex flex-col items-center justify-center pointer-events-none">
          <p className="text-sm text-blue-600 flex items-center gap-2">
            <ImageIcon className="size-4 opacity-50" />
            Glissez vos fichiers ici
          </p>
        </div>
      )}

      <div className="rounded-xl shadow-lg items-end gap-2 min-h-[150px] flex flex-col" style={{ backgroundColor: '#FFFFFF', border: '1px solid #DDDDDD' }}>
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onPaste={handlePaste}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 min-h-[100px] w-full p-4 focus-within:border-none focus:outline-none focus:border-none border-none outline-none focus-within:ring-0 focus-within:ring-offset-0 focus-within:outline-none max-h-[120px] resize-none border-0 bg-transparent text-gray-800 shadow-none focus-visible:ring-0 placeholder:text-gray-500 text-sm sm:text-base custom-scrollbar"
          rows={1}
        />
        <div className="flex items-center gap-2 justify-between w-full px-3 pb-1.5">
          <div className="flex items-center gap-2">
            {!hideAttachButton && !hideTooltips ? (
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-9 w-9 p-0 text-gray-600 hover:text-gray-800 hover:bg-gray-100 flex-shrink-0"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={disabled || files.length >= maxFiles}
                    >
                      <Plus className="h-5 w-5" />
                      <span className="sr-only">Attach files</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top" showArrow={true}>
                    <p>Attach files</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : !hideAttachButton && hideTooltips ? (
              <div className="h-9 w-9 p-0 text-gray-600 flex-shrink-0 flex items-center justify-center pointer-events-none">
                <Plus className="h-5 w-5" />
              </div>
            ) : !hideAttachButton ? (
              <Button
                size="icon"
                variant="ghost"
                className="h-9 w-9 p-0 text-gray-600 hover:text-gray-800 hover:bg-gray-100 flex-shrink-0"
                onClick={() => fileInputRef.current?.click()}
                disabled={disabled || files.length >= maxFiles}
              >
                <Plus className="h-5 w-5" />
                <span className="sr-only">Attach files</span>
              </Button>
            ) : null}
            
            {!hideToolsButton && !hideTooltips ? (
              <TooltipProvider delayDuration={100}>
                <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <PopoverTrigger asChild>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-9 w-9 p-0 text-gray-600 hover:text-gray-800 hover:bg-gray-100 flex-shrink-0"
                          disabled={disabled}
                        >
                          <SlidersHorizontal className="h-5 w-5" />
                          <span className="sr-only">Explore tools</span>
                        </Button>
                      </PopoverTrigger>
                    </TooltipTrigger>
                    <TooltipContent side="top" showArrow={true}>
                      <p>Explore tools</p>
                    </TooltipContent>
                  </Tooltip>
                  <PopoverContent side="top" align="start">
                    <div className="flex flex-col gap-1">
                      {toolsList.map(tool => (
                        <button
                          key={tool.id}
                          onClick={() => {
                            setSelectedTool(tool.id);
                            setIsPopoverOpen(false);
                          }}
                          className="flex w-full items-center gap-2 rounded-md p-2 text-left text-sm hover:bg-gray-100 transition-colors"
                        >
                          <tool.icon className="h-4 w-4" />
                          <span>{tool.name}</span>
                          {tool.extra && (
                            <span className="ml-auto text-xs text-gray-500">{tool.extra}</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </TooltipProvider>
            ) : !hideToolsButton && hideTooltips ? (
              <div className="h-9 w-9 p-0 text-gray-600 flex-shrink-0 flex items-center justify-center pointer-events-none">
                <SlidersHorizontal className="h-5 w-5" />
              </div>
            ) : !hideToolsButton ? (
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-9 w-9 p-0 text-gray-600 hover:text-gray-800 hover:bg-gray-100 flex-shrink-0"
                    disabled={disabled}
                  >
                    <SlidersHorizontal className="h-5 w-5" />
                    <span className="sr-only">Explore tools</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent side="top" align="start">
                  <div className="flex flex-col gap-1">
                    {toolsList.map(tool => (
                      <button
                        key={tool.id}
                        onClick={() => {
                          setSelectedTool(tool.id);
                          setIsPopoverOpen(false);
                        }}
                        className="flex w-full items-center gap-2 rounded-md p-2 text-left text-sm hover:bg-gray-100 transition-colors"
                      >
                        <tool.icon className="h-4 w-4" />
                        <span>{tool.name}</span>
                        {tool.extra && (
                          <span className="ml-auto text-xs text-gray-500">{tool.extra}</span>
                        )}
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            ) : null}

            {selectedTool && !hideToolsButton && !hideTooltips && (
              <>
                <div className="h-4 w-px bg-gray-300" />
                <button
                  onClick={() => setSelectedTool(null)}
                  className="flex h-8 items-center gap-2 rounded-full px-2 text-sm text-blue-600 hover:bg-gray-100 cursor-pointer transition-colors"
                >
                  {(() => {
                    const activeTool = toolsList.find(t => t.id === selectedTool);
                    const ActiveToolIcon = activeTool?.icon;
                    return (
                      <>
                        {ActiveToolIcon && <ActiveToolIcon className="h-4 w-4" />}
                        {activeTool?.shortName}
                        <X className="h-4 w-4" />
                      </>
                    );
                  })()}
                </button>
              </>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {!hideTooltips ? (
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      className={cn(
                        "h-9 w-9 p-0 flex-shrink-0 rounded-md transition-colors",
                        canSend
                          ? "bg-black hover:bg-gray-800 text-white"
                          : "text-white cursor-not-allowed"
                      )}
                      style={{
                        backgroundColor: canSend ? undefined : '#898885'
                      }}
                      onClick={handleSend}
                      disabled={!canSend}
                    >
                      <ArrowUp className="h-5 w-5" />
                      <span className="sr-only">Send message</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top" showArrow={true}>
                    <p>Send</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <Button
                size="icon"
                className={cn(
                  "h-9 w-9 p-0 flex-shrink-0 rounded-md transition-colors",
                  canSend
                    ? "bg-black hover:bg-gray-800 text-white"
                    : "text-white cursor-not-allowed"
                )}
                style={{
                  backgroundColor: canSend ? undefined : '#898885'
                }}
                onClick={handleSend}
                disabled={!canSend}
              >
                <ArrowUp className="h-5 w-5" />
                <span className="sr-only">Send message</span>
              </Button>
            )}
          </div>
        </div>
        {(files.length > 0 || pastedContent.length > 0) && (
          <div className="overflow-x-auto border-t-[1px] p-3 w-full hide-scroll-bar" style={{ borderColor: '#DDDDDD', backgroundColor: '#F8F8F8' }}>
            <div className="flex gap-3">
              {pastedContent.map((content) => (
                <PastedContentCard
                  key={content.id}
                  content={content}
                  onRemove={(id) =>
                    setPastedContent((prev) => prev.filter((c) => c.id !== id))
                  }
                />
              ))}
              {files.map((file) => (
                <FilePreviewCard
                  key={file.id}
                  file={file}
                  onRemove={removeFile}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        accept={acceptedFileTypes?.join(",")}
        onChange={(e) => {
          handleFileSelect(e.target.files);
          if (e.target) e.target.value = ""; // Reset file input
        }}
      />
    </div>
  );
};


export { ClaudeChatInput };

export const Component = ()=>{
  const handleSendMessage = (
    message: string,
    files: FileWithPreview[],
    pastedContent: PastedContent[]
  ) => {
    console.log("Message:", message)
    console.log("Files:", files)
    console.log("Pasted Content:", pastedContent)
    
    // Here you would typically send this data to your backend/AI service
    alert(`Message sent!\nText: ${message}\nFiles: ${files.length}\nPasted Content: ${pastedContent.length}`)
  }

  return (
    <div className="min-h-screen w-screen bg-[#262624] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="mb-8 text-center py-16">
          <h1 className="text-3xl font-serif font-light text-[#C2C0B6] mb-2">
            What&apos;s new, Suraj?
          </h1>
        </div>
        
        <ClaudeChatInput
          onSendMessage={handleSendMessage}
          placeholder="Try pasting large text or uploading textual files..."
          maxFiles={10}
          maxFileSize={10 * 1024 * 1024} // 10MB
        />
        
        {/* <div className="mt-8 text-sm text-zinc-500 space-y-2">
          <p><strong>Features:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Upload textual files (.md, .py, .html, .js, etc.) to see content preview</li>
            <li>Upload images/media files to see the traditional file preview</li>
            <li>Paste large text content to see pasted content cards</li>
            <li>Drag and drop files for easy uploading</li>
            <li>Copy content from textual files and pasted content</li>
          </ul>
        </div> */}
      </div>
    </div>
  )
}
