export type GoogleReplaceRequest = {
  replaceAllText: {
    containsText: { text: string; matchCase: boolean };
    replaceText: string;
  };
};
