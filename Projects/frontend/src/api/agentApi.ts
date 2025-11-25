import { api } from "./axios";
import type { AgentContactDTO, AgentContactResponse } from "../types/agents";

export const agentApi = {
  async contactAgent(data: AgentContactDTO): Promise<AgentContactResponse> {
    const res = await api.post<AgentContactResponse>("/agent-contact", data);
    return res.data;
  },
};
