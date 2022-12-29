import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { plainToClassFromExist } from 'class-transformer';
import { PaginatedListDto, PaginatedListDtoConstructor } from 'src/dtos/res';
import { PaginatedResult } from 'src/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ApiPaginatedResponse = <TModel extends Type<unknown>>(
  model: TModel,
): any => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginatedListDto) },
          {
            properties: {
              items: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
};

// This implementation is based on the following sample:
// https://github.com/typestack/class-transformer/tree/develop/sample/sample4-generics
export function helperCreatePaginatedResponse<T>(
  dto: PaginatedListDtoConstructor<T>,
  json: PaginatedResult<T>,
): PaginatedListDto<T> {
  return plainToClassFromExist(new PaginatedListDto<T>(dto), json);
}
