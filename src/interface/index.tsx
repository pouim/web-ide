export type TreeData = {
    id: number;
    parent: number | null;
    name: string;
    children?: TreeData[];
    isOpen?: boolean;
    isFolder?: boolean;
}