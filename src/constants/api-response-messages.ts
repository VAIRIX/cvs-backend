export const API_RESPONSE_MESSAGES = {
  RESOURCE_NOT_FOUND: 'Resource not found',
  INTERNAL_SERVER_ERROR: 'Server error',
  INVALID_CREDENTIALS: 'Invalid credentials',
  ATTRIBUTE_INVALID_DATES:
    'Some of the provided attributes have invalid dates.',
  ITEM_NOT_FOUND: ({ itemName, id }: { itemName: string; id: string }) =>
    `${itemName} with ID "${id}" was not found`,
  ATTRIBUTES_ARRAY_NOT_FOUND:
    "At least one of the provided attributes doesn't exist",
};
