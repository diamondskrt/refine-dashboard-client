import { Property } from "@/interfaces/common";
import { BaseRecord } from "@refinedev/core";

export interface AgentCardProps {
  id: string;
  name: string;
  email: string;
  avatar: string;
  propertiesCount: number;
}

export type ProfileCardProps = Omit<AgentCardProps, "id">;

export interface userData {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  allProperties: Property[];
}

export interface ProfileProps {
  userData: BaseRecord;
  currentUser?: boolean;
}
