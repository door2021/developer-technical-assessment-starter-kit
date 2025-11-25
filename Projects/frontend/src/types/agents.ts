export interface AgentContactDTO {
  user_id: number;
  property_id: number;
  message: string;
}

export interface AgentContactResponse {
  success: boolean;
  message: string;
}
