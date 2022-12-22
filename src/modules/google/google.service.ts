import {
  Inject,
  Injectable,
  Logger,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { JSONClient } from 'google-auth-library/build/src/auth/googleauth';
import { Compute } from 'google-auth-library';
import googleConfig from 'src/config/google.config';
import { ConfigType } from '@nestjs/config';
import { docs_v1, drive_v3, google } from 'googleapis';
import { GoogleReplaceRequest } from 'src/types';

@Injectable()
export class GoogleService implements OnApplicationBootstrap {
  private readonly logger = new Logger(GoogleService.name);

  private authClient: JSONClient | Compute;
  private driveConnection: drive_v3.Drive;
  private docsConnection: docs_v1.Docs;

  constructor(
    @Inject(googleConfig.KEY)
    private readonly googleConf: ConfigType<typeof googleConfig>,
  ) {}
  async onApplicationBootstrap() {
    try {
      await this.authorizeGoogleDrive();
      this.driveConnection = google.drive({
        version: 'v3',
        auth: this.authClient,
      });
      this.docsConnection = google.docs({
        version: 'v1',
        auth: this.authClient,
      });
    } catch (error) {
      this.logger.error(error);
      process.exit(1);
    }
  }

  private async authorizeGoogleDrive(): Promise<void> {
    const auth = new google.auth.GoogleAuth({
      keyFile: this.googleConf.credentialsPath,
      scopes: this.googleConf.scopes,
    });

    this.authClient = await auth.getClient();
  }

  async getTemplateCopyId(documentName: string): Promise<string> {
    const copyTemplateRequest = {
      name: documentName,
      parents: [this.googleConf.googleDriveFolderId],
    };

    const response = await this.driveConnection.files.copy({
      fileId: this.googleConf.googleDocTemplateId,
      requestBody: copyTemplateRequest,
    });

    return response.data.id;
  }

  async fillTemplate(
    documentId: string,
    requests: GoogleReplaceRequest[],
  ): Promise<string> {
    const response = await this.docsConnection.documents.batchUpdate({
      auth: this.authClient,
      documentId: documentId,
      requestBody: {
        requests,
      },
    });

    return `${this.googleConf.googleDocBaseUrl}${response.data.documentId}`;
  }

  createReplaceRequestObject(
    text: string,
    replaceText: string,
  ): GoogleReplaceRequest {
    return {
      replaceAllText: {
        containsText: {
          text: text,
          matchCase: true,
        },
        replaceText: replaceText,
      },
    };
  }
}
