export interface Post {
  id: string;
}

export interface IChosenImages {
  url: string | ArrayBuffer | null;
  id: number;
  file: File;
  width: number;
  height: number;
}
