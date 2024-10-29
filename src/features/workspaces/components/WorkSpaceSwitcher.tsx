"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RiAddCircleLine } from "react-icons/ri";
import { useGetWorkspaces } from "../api/useGetWorkSpaces";
import { WorkSpaceAvatar } from "./WorkSpaceAvatar";

export const WorkSpaceSwitcher = () => {
  const { data: workspaces } = useGetWorkspaces();
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500">Workspaces</p>
        <RiAddCircleLine size="5" className="cursor-pointer text-neutral-500" />
      </div>
      <Select>
        <SelectTrigger className="w-full bg-neutral-200 p-1 font-medium">
          <SelectValue
            placeholder={
              workspaces?.documents.length && workspaces.documents.length > 0
                ? "Select a workspace"
                : "No workspaces found"
            }
          />
          {workspaces?.documents.length && workspaces.documents.length > 0 ? (
            <SelectContent>
              {workspaces?.documents.map((workspace) => (
                <SelectItem key={workspace.$id} value={workspace.$id}>
                  <div className="flex items-center justify-start gap-3 font-medium">
                    <WorkSpaceAvatar
                      image={workspace.imageUrl}
                      name={workspace.name}
                    />
                    <span className="truncate text-sm">{workspace.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          ) : null}
        </SelectTrigger>
      </Select>
    </div>
  );
};
