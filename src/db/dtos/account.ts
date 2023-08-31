import { ProjectDTO } from "./project";

export class AccountDTO {
    address: string;
    created_at?: Date;
    updated_at?: Date;
    messages?: string[];
    projects?: ProjectDTO[];
}

export class UpdateAccountDTO {
    address?: string;
    created_at?: Date;
    updated_at?: Date;
    messages?: string[];
    projects?: ProjectDTO[];
}