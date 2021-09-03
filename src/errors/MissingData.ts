class MissingData extends Error {
  constructor(field) {
    super(`Missing ${field} field on the request body!`);
    this.name = "MissingData";
  }
}

export { MissingData };
