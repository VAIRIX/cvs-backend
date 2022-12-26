import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function IsDateAfter(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsDateAfter',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(thisDate: Date, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedDate: Date = (args.object as any)[relatedPropertyName];

          return thisDate > relatedDate;
        },
      },
    });
  };
}
