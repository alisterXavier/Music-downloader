import { ReactNode } from "react";

export interface SongsI {
    id: string;
    name: string;
    thumbnail: string;
    title: string;
}

export interface RequireType {
    children: ReactNode;
  }