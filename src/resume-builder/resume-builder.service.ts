import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { google } from 'googleapis';
import { JSONClient } from 'google-auth-library/build/src/auth/googleauth';
import { Compute } from 'google-auth-library';
import googleConfig from 'src/config/google.config';
import { ConfigType } from '@nestjs/config';
import { GoogleDocTemplateFields } from 'src/types/google-doc-template-fields.type';
import { Req, Res } from 'src/dtos';
import { API_RESPONSE_MESSAGES } from 'src/constants/api-response-messages';
import { mockProfessionalData } from './mock-professional-data';

@Injectable()
export class ResumeBuilderService {
  private readonly logger = new Logger(ResumeBuilderService.name);

  private authClient: JSONClient | Compute;
  private googleDocTemplateFields: GoogleDocTemplateFields;

  constructor(
    @Inject(googleConfig.KEY)
    private readonly googleConf: ConfigType<typeof googleConfig>,
  ) {
    this.authorizeGoogleDrive();
    this.googleDocTemplateFields = this.googleConf.googleDocTemplateFields;
  }

  async generateResume(
    buildResumeReqDto: Req.BuildResumeReqDto,
  ): Promise<Res.BuildResumeResDto> {
    // TODO: Get professional data from database
    const professionalData = mockProfessionalData.find(
      (professional) => professional.id === buildResumeReqDto.professionalId,
    );
    if (!professionalData) {
      throw new NotFoundException(API_RESPONSE_MESSAGES.PROFESSIONAL_NOT_FOUND);
    }
    try {
      const templateId = await this.getTemplateCopyId(professionalData.name);
      await this.fillResume(templateId, professionalData);

      return { resumeUrl: `${this.googleConf.googleDocBaseUrl}${templateId}` };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        API_RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async authorizeGoogleDrive(): Promise<void> {
    const auth = new google.auth.GoogleAuth({
      keyFile: this.googleConf.credentialsPath,
      scopes: this.googleConf.scopes,
    });

    this.authClient = await auth.getClient();
  }

  private async getTemplateCopyId(professionalName: string): Promise<string> {
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

  private async fillResume(
    documentId: string,
    professionalData: any, // TODO: professionalData will by typed after the professional data is retrieved from the database
  ): Promise<void> {
    const docs = google.docs({
      version: this.googleConf.googleDocApiVersion,
      auth: this.authClient,
    });

    const requests = this.createRequests(professionalData);

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
            resolve();
          }
        },
      );
    });
  }

  private createRequests(professionalData: any): any {
    const projects = this.generateProjectRequests(professionalData.projects);

    const requests = [
      ...projects,
      this.createReplaceRequestObject(
        this.googleDocTemplateFields.professionalTechnologies,
        this.parseProfessionalTechnologies(professionalData.technologies),
      ),
      this.createReplaceRequestObject(
        this.googleDocTemplateFields.professionalName,
        professionalData.name,
      ),
      this.createReplaceRequestObject(
        this.googleDocTemplateFields.professionalHeadline,
        professionalData.profile,
      ),
      this.createReplaceRequestObject(
        this.googleDocTemplateFields.professionalAboutMe,
        professionalData.aboutMe,
      ),
      this.createReplaceRequestObject(
        this.googleDocTemplateFields.professionalEnglishLevel,
        professionalData.englishLevel,
      ),
    ];

    return requests;
  }
  // TODO: projects will by typed after the professional data is retrieved from the database
  private generateProjectRequests(projects: any) {
    const projectsArray = [];

    for (let i = 0; i < this.googleConf.googleDocTemplateMaxProjects; i++) {
      const project = projects[i];
      const projectIndex = i + 1;

      const projectPlaceholder = [
        this.createReplaceRequestObject(
          this.replaceIndexString(
            this.googleDocTemplateFields.projectTitle,
            projectIndex,
          ),
          project
            ? project.title + this.googleDocTemplateFields.projectNewLine
            : '',
        ),
        this.createReplaceRequestObject(
          this.replaceIndexString(
            this.googleDocTemplateFields.projectDescription,
            projectIndex,
          ),
          project
            ? project.description + this.googleDocTemplateFields.projectNewLine
            : '',
        ),
        this.createReplaceRequestObject(
          this.replaceIndexString(
            this.googleDocTemplateFields.projectTechnologiesTitle,
            projectIndex,
          ),
          project
            ? this.googleDocTemplateFields.projectTechnologiesTitleText
            : '',
        ),
        this.createReplaceRequestObject(
          this.replaceIndexString(
            this.googleDocTemplateFields.projectTechnologies,
            projectIndex,
          ),
          project
            ? this.parseProjectTechnologies(project.technologies) +
                this.googleDocTemplateFields.projectNewLine
            : '',
        ),
      ];

      projectsArray.push(...projectPlaceholder);
    }

    return projectsArray;
  }

  private parseProfessionalTechnologies(technologies: string[]): string {
    let parsedTechnologies = '';

    technologies.forEach((technology) => {
      parsedTechnologies += technology + '\n';
    });

    return parsedTechnologies;
  }

  private parseProjectTechnologies(technologies: string[]): string {
    let parsedTechnologies = '';

    technologies.forEach((technology) => {
      parsedTechnologies += technology + ', ';
    });

    return parsedTechnologies;
  }

  private replaceIndexString(text: string, index: number) {
    return text.replace(
      this.googleDocTemplateFields.indexTextForReplace,
      index.toString(),
    );
  }

  private createReplaceRequestObject(text: string, replaceText: string) {
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
