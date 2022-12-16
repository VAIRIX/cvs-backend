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
import { google } from 'googleapis';
import { GoogleReplaceRequest } from 'src/types';

@Injectable()
export class GoogleService implements OnApplicationBootstrap {
  private readonly logger = new Logger(GoogleService.name);

  private authClient: JSONClient | Compute;

  constructor(
    @Inject(googleConfig.KEY)
    private readonly googleConf: ConfigType<typeof googleConfig>,
  ) {}
  async onApplicationBootstrap() {
    try {
      await this.authorizeGoogleDrive();
    } catch (error) {
      this.logger.error(error);
    }
  }

  private async authorizeGoogleDrive(): Promise<void> {
    const auth = new google.auth.GoogleAuth({
      keyFile: this.googleConf.credentialsPath,
      scopes: this.googleConf.scopes,
    });

    this.authClient = await auth.getClient();
  }

  async getTemplateCopyId(professionalName: string): Promise<string> {
    const drive = google.drive({
      version: this.googleConf.googleDriveApiVersion,
      auth: this.authClient,
    });

    return new Promise((resolve, reject) => {
      const copyTemplateRequest = {
        name: professionalName,
        parents: [this.googleConf.googleDriveFolderId],
      };

      drive.files.copy(
        {
          fileId: this.googleConf.googleDocTemplateId,
          requestBody: copyTemplateRequest,
        },
        function (err, response) {
          if (err) {
            reject(err);
          } else {
            resolve(response.data.id);
          }
        },
      );
    });
  }

  async fillTemplate(
    documentId: string,
    requests: GoogleReplaceRequest[],
  ): Promise<string> {
    const docs = google.docs({
      version: this.googleConf.googleDocApiVersion,
      auth: this.authClient,
    });

    return new Promise((resolve, reject) => {
      docs.documents.batchUpdate(
        {
          auth: this.authClient,
          documentId: documentId,
          requestBody: {
            requests,
          },
        },
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(`${this.googleConf.googleDocBaseUrl}${documentId}`);
          }
        },
      );
    });
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
