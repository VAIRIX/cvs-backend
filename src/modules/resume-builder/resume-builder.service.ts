import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import googleConfig from 'src/config/google.config';
import { ConfigType } from '@nestjs/config';
import {
  GoogleDocTemplateFields,
  GoogleReplaceRequest,
  ProfessionalResumeData,
  ProjectResumeData,
} from 'src/types/';
import { Req, Res } from 'src/dtos';
import { API_RESPONSE_MESSAGES } from 'src/constants/api-response-messages';
import { GoogleService } from 'src/modules/google/google.service';
import { plainToInstance } from 'class-transformer';
import { ProfessionalsRepository } from 'src/repositories';
import { ProfessionalEntity, TechnologyEntity } from 'src/entities';
import { format } from 'date-fns';

@Injectable()
export class ResumeBuilderService {
  private readonly logger = new Logger(ResumeBuilderService.name);

  private googleDocTemplateFields: GoogleDocTemplateFields;

  constructor(
    @Inject(googleConfig.KEY)
    private readonly googleConf: ConfigType<typeof googleConfig>,
    private readonly googleService: GoogleService,
    private readonly professionalsRepository: ProfessionalsRepository,
  ) {
    this.googleDocTemplateFields = this.googleConf.googleDocTemplateFields;
  }

  async generateResume(
    buildResumeReqDto: Req.BuildResumeReqDto,
  ): Promise<Res.BuildResumeResDto> {
    const professional = await this.professionalsRepository.findOne({
      where: { id: buildResumeReqDto.professionalId },
      relations: [
        'projects',
        'projects.project',
        'technologies',
        'projects.project.technologies',
      ],
    });

    if (!professional) {
      throw new NotFoundException(API_RESPONSE_MESSAGES.PROFESSIONAL_NOT_FOUND);
    }

    const professionalResumeData =
      this.createProfessionalResumeData(professional);
    try {
      const templateId = await this.googleService.getTemplateCopyId(
        professionalResumeData.name,
      );
      const replaceRequests = this.createReplaceRequests(
        professionalResumeData,
      );
      const resumeUrl = await this.googleService.fillTemplate(
        templateId,
        replaceRequests,
      );

      await this.professionalsRepository.update(professional.id, {
        resumeUrl: resumeUrl,
      });

      return plainToInstance(Res.BuildResumeResDto, { resumeUrl });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        API_RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private createReplaceRequests(
    professionalData: ProfessionalResumeData,
  ): GoogleReplaceRequest[] {
    const projects = this.generateProjectRequests(professionalData.projects);

    console.log(professionalData);

    const requests = [
      ...projects,
      this.googleService.createReplaceRequestObject(
        this.googleDocTemplateFields.professionalTechnologies,
        professionalData.technologies,
      ),
      this.googleService.createReplaceRequestObject(
        this.googleDocTemplateFields.professionalName,
        professionalData.name,
      ),
      this.googleService.createReplaceRequestObject(
        this.googleDocTemplateFields.professionalHeadline,
        professionalData.headline,
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

  private generateProjectRequests(projects: ProjectResumeData[]) {
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
          project ? project.name : '',
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
            ? project.technologies +
                this.googleDocTemplateFields.projectNewLine.repeat(2)
            : '',
        ),
        this.googleService.createReplaceRequestObject(
          this.replaceIndexString(
            this.googleDocTemplateFields.projectResponsibility,
            projectIndex,
          ),
          project
            ? ` / ${project.responsibility}${this.googleDocTemplateFields.projectNewLine}`
            : '',
        ),
        this.googleService.createReplaceRequestObject(
          this.replaceIndexString(
            this.googleDocTemplateFields.projectDates,
            projectIndex,
          ),
          project
            ? this.parseProjectDates(
                project.startDate,
                project.endDate,
                project.duration,
              ) + this.googleDocTemplateFields.projectNewLine
            : '',
        ),
      ];

      projectsArray.push(...projectPlaceholder);
    }

    return projectsArray;
  }

  private parseProfessionalTechnologies(
    technologies: TechnologyEntity[],
  ): string {
    let parsedTechnologies = '';

    technologies?.forEach((technology) => {
      parsedTechnologies += technology.name + '\n';
    });

    return parsedTechnologies;
  }

  private parseProjectTechnologies(technologies: TechnologyEntity[]): string {
    let parsedTechnologies = '';

    technologies?.forEach((technology) => {
      parsedTechnologies += technology.name + ', ';
    });

    return parsedTechnologies;
  }

  private replaceIndexString(text: string, index: number) {
    return text.replace(
      this.googleDocTemplateFields.indexTextForReplace,
      index.toString(),
    );
  }

  private parseProjectDates(
    startDate: Date,
    endDate: Date,
    duration: string,
  ): string {
    const start = format(startDate, 'MMMM yyyy');
    const end = format(endDate, 'MMMM yyyy');

    return `${start} - ${end} (${duration})`;
  }

  private createLevelString(level: number): string {
    const maxLevel = 5;
    const emptyStar = '☆';
    const fullStar = '★';

    let levelString = '';

    for (let i = 0; i < level; i++) {
      levelString += fullStar;
    }

    for (let i = 0; i < maxLevel - level; i++) {
      levelString += emptyStar;
    }

    return levelString;
  }

  private createProfessionalResumeData(
    professional: ProfessionalEntity,
  ): ProfessionalResumeData {
    const projects: ProjectResumeData[] = professional.projects.map(
      (project) => {
        return {
          description: project.project.description,
          duration: `${project.project.duration} months`,
          name: project.project.name,
          startDate: project.project.from,
          endDate: project.project.to,
          technologies: this.parseProjectTechnologies(
            project.project.technologies,
          ),
          responsibility: project.responsibility,
        };
      },
    );

    return {
      name: `${professional.firstName} ${professional.lastName}`,
      headline: professional.headline,
      email: professional.email,
      aboutMe: professional.about,
      englishLevel: this.createLevelString(professional.english),
      projects: projects,
      technologies: this.parseProfessionalTechnologies(
        professional.technologies,
      ),
    };
  }
}
