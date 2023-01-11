import { Inject, Injectable } from '@nestjs/common';
import googleConfig from 'src/config/google.config';
import { ConfigType } from '@nestjs/config';
import {
  GoogleDocTemplateFields,
  GoogleReplaceRequest,
  ProfessionalAttributeType,
  ProfessionalResumeData,
  ProjectAttributeType,
  ProjectResumeData,
} from 'src/types/';
import { Req, Res } from 'src/dtos';
import { GoogleService } from 'src/modules/google/google.service';
import { plainToInstance } from 'class-transformer';
import { ProfessionalsRepository } from 'src/repositories';
import { ProfessionalEntity } from 'src/entities';
import { format } from 'date-fns';
import { AttributesService } from '../attributes/attributes.service';
import { DEFAULT_ATTRIBUTES_TYPES } from 'src/constants';

@Injectable()
export class ResumeBuilderService {
  private googleDocTemplateFields: GoogleDocTemplateFields;

  constructor(
    @Inject(googleConfig.KEY)
    private readonly googleConf: ConfigType<typeof googleConfig>,
    private readonly googleService: GoogleService,
    private readonly professionalsRepository: ProfessionalsRepository,
    private readonly attributesService: AttributesService,
  ) {
    this.googleDocTemplateFields = this.googleConf.googleDocTemplateFields;
  }

  async generateResume(buildResumeReqDto: Req.BuildResumeReqDto): Promise<any> {
    const professional = await this.professionalsRepository.findOneOrFail({
      where: { id: buildResumeReqDto.professionalId },
      relations: {
        projects: {
          project: {
            attributes: {
              attribute: {
                type: true,
              },
            },
          },
        },
        attributes: {
          attribute: {
            type: true,
          },
        },
      },
    });

    const professionalResumeData =
      this.createProfessionalResumeData(professional);
    const templateId = await this.googleService.getTemplateCopyId(
      professionalResumeData.name,
    );
    const replaceRequests = this.createReplaceRequests(professionalResumeData);
    const resumeUrl = await this.googleService.fillTemplate(
      templateId,
      replaceRequests,
    );

    await this.professionalsRepository.update(professional.id, {
      resumeUrl: resumeUrl,
    });

    return plainToInstance(Res.BuildResumeResDto, { resumeUrl });
  }

  private createReplaceRequests(
    professionalData: ProfessionalResumeData,
  ): GoogleReplaceRequest[] {
    const projects = this.generateProjectRequests(professionalData.projects);

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

  private parseProfessionalAttributes(
    attributes: ProfessionalAttributeType[],
  ): string {
    let parsedAttributes = '';

    attributes?.forEach((attribute) => {
      parsedAttributes += attribute.name + '\n';
    });

    return parsedAttributes;
  }

  private parseProjectAttributes(attributes: ProjectAttributeType[]): string {
    let parsedAttributes = '';

    attributes?.forEach((attribute) => {
      parsedAttributes += attribute.name + ', ';
    });

    return parsedAttributes;
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
    const professionalAttributesKeyMap =
      this.attributesService.professionalAttributesKeyMap(
        professional.attributes,
      );

    const projects: ProjectResumeData[] = professional.projects.map(
      (project) => {
        const projectAttributesKeyMap =
          this.attributesService.projectAttributesKeyMap(
            project.project.attributes,
          );
        return {
          description: project.project.description,
          duration: `${project.project.duration} months`,
          name: project.project.name,
          startDate: project.project.from,
          endDate: project.project.to,
          technologies: this.parseProjectAttributes(
            projectAttributesKeyMap.get(DEFAULT_ATTRIBUTES_TYPES.TECHNOLOGIES),
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
      technologies: this.parseProfessionalAttributes(
        professionalAttributesKeyMap.get(DEFAULT_ATTRIBUTES_TYPES.TECHNOLOGIES),
      ),
    };
  }
}
