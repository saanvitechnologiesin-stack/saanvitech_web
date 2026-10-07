export interface FormType {
    cls: string;
    onSubmitHandler: (event: React.FormEvent<HTMLFormElement>) => void;
    children: React.ReactNode;
}