export type TreeData = {
    id: string;
    parent: string | null;
    name: string;
    children: TreeData[];
    isOpen?: boolean;
    isFolder?: boolean;
    code?: string;
}