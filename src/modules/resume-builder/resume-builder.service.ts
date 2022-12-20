import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import googleConfig from 'src/config/google.config';
import { ConfigType } from '@nestjs/config';
import { GoogleDocTemplateFields, GoogleReplaceRequest } from 'src/types/';
import { Req, Res } from 'src/dtos';
import { API_RESPONSE_MESSAGES } from 'src/constants/api-response-messages';
import { mockProfessionalData } from './__mock__/mock-professional-data';
import { GoogleService } from 'src/modules/google/google.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ResumeBuilderService {
  private readonly logger = new Logger(ResumeBuilderService.name);

  private googleDocTemplateFields: GoogleDocTemplateFields;

  constructor(
    @Inject(googleConfig.KEY)
    private readonly googleConf: ConfigType<typeof googleConfig>,
    private readonly googleService: GoogleService,
  ) {
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
      const templateId = await this.googleService.getTemplateCopyId(
        professionalData.name,
      );
      const replaceRequests = this.createReplaceRequests(professionalData);
      const resumeUrl = await this.googleService.fillTemplate(
        templateId,
        replaceRequests,
      );

      return plainToInstance(Res.BuildResumeResDto, { resumeUrl });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        API_RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private createReplaceRequests(professionalData: any): GoogleReplaceRequest[] {
    const projects = this.generateProjectRequests(professionalData.projects);

    const requests = [
      ...projects,
      this.googleService.createReplaceRequestObject(
        this.googleDocTemplateFields.professionalTechnologies,
        this.parseProfessionalTechnologies(professionalData.technologies),
      ),
      this.googleService.createReplaceRequestObject(
        this.googleDocTemplateFields.professionalName,
        professionalData.name,
      ),
      this.googleService.createReplaceRequestObject(
        this.googleDocTemplateFields.professionalHeadline,
        professionalData.profile,
      ),
      this.googleService.createReplaceRequestObject(
        this.googleDocTemplateFields.professionalAboutMe,
        professionalData.aboutMe,
      ),
      this.googleService.createReplaceRequestObject(
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
        this.googleService.createReplaceRequestObject(
          this.replaceIndexString(
            this.googleDocTemplateFields.projectTitle,
            projectIndex,
          ),
          project
            ? project.title + this.googleDocTemplateFields.projectNewLine
            : '',
        ),
        this.googleService.createReplaceRequestObject(
          this.replaceIndexString(
            this.googleDocTemplateFields.projectDescription,
            projectIndex,
          ),
          project
            ? project.description + this.googleDocTemplateFields.projectNewLine
            : '',
        ),
        this.googleService.createReplaceRequestObject(
          this.replaceIndexString(
            this.googleDocTemplateFields.projectTechnologiesTitle,
            projectIndex,
          ),
          project
            ? this.googleDocTemplateFields.projectTechnologiesTitleText
            : '',
        ),
        this.googleService.createReplaceRequestObject(
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
}
