import axios from 'axios';

const JIRA_API_BASE = 'https://your-domain.atlassian.net/rest/agile/1.0';

export interface JiraIssue {
  id: string;
  key: string;
  fields: {
    summary: string;
    status: {
      name: string;
    };
    assignee?: {
      displayName: string;
    };
  };
}

export class JiraService {
  private static instance: JiraService;
  private apiToken: string = '';
  private email: string = '';

  private constructor() {}

  public static getInstance(): JiraService {
    if (!JiraService.instance) {
      JiraService.instance = new JiraService();
    }
    return JiraService.instance;
  }

  public setCredentials(email: string, apiToken: string) {
    this.email = email;
    this.apiToken = apiToken;
  }

  private getAuthHeader() {
    return {
      Authorization: `Basic ${Buffer.from(`${this.email}:${this.apiToken}`).toString('base64')}`,
      'Content-Type': 'application/json',
    };
  }

  public async getScrumBoard(boardId: number): Promise<JiraIssue[]> {
    try {
      const response = await axios.get(
        `${JIRA_API_BASE}/board/${boardId}/issue`,
        {
          headers: this.getAuthHeader(),
        }
      );
      return response.data.issues;
    } catch (error) {
      console.error('Error fetching scrum board:', error);
      throw error;
    }
  }
} 