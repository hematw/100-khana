import { ImagePlus, Trash2 } from "lucide-react";
import { ChangeEventHandler, useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { IPropertyForm } from "..";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";

type FilePreview = {
  name: string;
  size: number;
  url: string;
};

function FileUpload({ form }: { form: UseFormReturn<IPropertyForm> }) {
  const [previews, setPreviews] = useState<FilePreview[]>([]);

  useEffect(() => {
    const fileList = form.getValues("images") as File[];
    const files = Array.from(fileList);

    form.setValue("images", files);

    setPreviews(
      files.map((file) => ({
        name: file.name,
        size: file.size,
        url: URL.createObjectURL(file),
      }))
    );
  }, [form]);

  const handleFileChange: ChangeEventHandler = (e) => {
    const fileList = (e.target as HTMLInputElement)?.files;
    if (fileList) {
      const files = Array.from(fileList);

      form.setValue("images", files);

      setPreviews((prev) => [
        ...prev,
        ...files.map((file) => ({
          name: file.name,
          size: file.size,
          url: URL.createObjectURL(file),
        })),
      ]);
    }
  };

  const handleDelete = (fileName: string) => {
    setPreviews((prev) => prev.filter((file) => file.name !== fileName));
    form.setValue(
      "images",
      form
        .getValues("images")
        .filter((file) => (file as File).name !== fileName)
    );
  };

  return (
    <div className="gap-3 rounded-lg col-span-2">
      <h3>
        Upload the photos of your property{" "}
        <span className="text-sm text-gray-400">(This helps get more views)</span>.
      </h3>
      <p className="text-sm text-gray-400">
        Photos should be in <span className="font-semibold">jpeg, png</span> or{" "}
        <span className="font-semibold">webp</span> format.
      </p>

      <div className="w-full grid grid-cols-3 gap-4 mt-4 overflow-auto max-h-[410px]">
        {Array.from({ length: 6 }).map((_, index) => {
          const file = previews[index];

          return file ? (
            <Card
              key={index}
              className="relative w-full aspect-square overflow-hidden rounded-lg"
            >
              <img
                src={file.url}
                alt={`Preview ${index}`}
                className="w-full h-full object-cover rounded-lg"
              />
              <Button
                isIconOnly
                className="absolute top-1 right-1 p-1 rounded-full shadow"
                onPress={() => handleDelete(file.name)}
              >
                <Trash2 size={18} />
              </Button>
            </Card>
          ) : (
            <Card
              key={index}
              className="border-2 aspect-square border-gray-400 border-dashed hover:opacity-70"
            >
              <label className="cursor-pointer w-full h-full flex items-center justify-center">
                <ImagePlus size={42} color="gray" />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                />
              </label>
            </Card>
          );
        })}
        {previews.length > 6 && (
          <>
            {previews.map((_, index) => {
              if (index >= 6) {
                const file = previews[index];
                return (
                  <Card
                    key={index}
                    className="relative w-full aspect-square overflow-hidden rounded-lg"
                  >
                    <img
                      src={file.url}
                      alt={`Preview ${index}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <Button
                      isIconOnly
                      className="absolute top-1 right-1 p-1 rounded-full shadow"
                      onPress={() => handleDelete(file.name)}
                    >
                      <Trash2 size={18} />
                    </Button>
                  </Card>
                );
              }
            })}
          </>
        )}
        <div className="col-span-3">
          <span className="text-xs text-primary-400 mt-2">{form.formState.errors.images?.message}</span>
        </div>

      </div>
    </div>
  );
}

export default FileUpload;
